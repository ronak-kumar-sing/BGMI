"use client"

import { useEffect, useRef } from "react"

interface RecoilPatternProps {
  patterns: {
    weapon: string
    path: string
    color: string
  }[]
}

export function RecoilPattern({ patterns }: RecoilPatternProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw recoil patterns
    patterns.forEach((pattern) => {
      const pathData = pattern.path

      // Parse SVG path data
      const commands = pathData.match(/[a-zA-Z][^a-zA-Z]*/g) || []

      ctx.beginPath()
      ctx.strokeStyle = pattern.color
      ctx.lineWidth = 2

      let x = canvas.width / 2
      let y = 20 // Start from top

      commands.forEach((command) => {
        const type = command[0]
        const args = command
          .slice(1)
          .trim()
          .split(/[\s,]+/)
          .map(Number)

        if (type === "M") {
          // Move to (relative to center)
          x = canvas.width / 2 + args[0]
          y = 20 + args[1]
          ctx.moveTo(x, y)
        } else if (type === "m") {
          // Relative move
          x += args[0]
          y += args[1]
          ctx.moveTo(x, y)
        } else if (type === "L") {
          // Line to (relative to center)
          x = canvas.width / 2 + args[0]
          y = 20 + args[1]
          ctx.lineTo(x, y)
        } else if (type === "l") {
          // Relative line
          x += args[0]
          y += args[1]
          ctx.lineTo(x, y)
        } else if (type === "C") {
          // Cubic bezier (absolute)
          const x1 = canvas.width / 2 + args[0]
          const y1 = 20 + args[1]
          const x2 = canvas.width / 2 + args[2]
          const y2 = 20 + args[3]
          const x3 = canvas.width / 2 + args[4]
          const y3 = 20 + args[5]
          ctx.bezierCurveTo(x1, y1, x2, y2, x3, y3)
          x = x3
          y = y3
        } else if (type === "c") {
          // Cubic bezier (relative)
          const x1 = x + args[0]
          const y1 = y + args[1]
          const x2 = x + args[2]
          const y2 = y + args[3]
          const x3 = x + args[4]
          const y3 = y + args[5]
          ctx.bezierCurveTo(x1, y1, x2, y2, x3, y3)
          x = x3
          y = y3
        }
      })

      ctx.stroke()

      // Add weapon label
      ctx.font = "10px sans-serif"
      ctx.fillStyle = pattern.color
      ctx.textAlign = "center"
      ctx.fillText(
        pattern.weapon,
        canvas.width / 2 + (patterns.length > 1 ? (pattern.weapon === patterns[0].weapon ? -30 : 30) : 0),
        10,
      )
    })

    // Draw crosshair
    ctx.beginPath()
    ctx.strokeStyle = "rgba(255, 255, 255, 0.3)"
    ctx.lineWidth = 1
    ctx.moveTo(canvas.width / 2, 0)
    ctx.lineTo(canvas.width / 2, canvas.height)
    ctx.moveTo(0, 20)
    ctx.lineTo(canvas.width, 20)
    ctx.stroke()
  }, [patterns])

  return <canvas ref={canvasRef} width={200} height={120} className="max-w-full"></canvas>
}
