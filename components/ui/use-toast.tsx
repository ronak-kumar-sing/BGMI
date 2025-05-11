"use client"

import type React from "react"

// Simplified version of the toast component
import { useState, useEffect, createContext, useContext } from "react"

type ToastProps = {
  title?: string
  description?: string
  duration?: number
  variant?: "default" | "destructive"
}

type ToastContextType = {
  toast: (props: ToastProps) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<(ToastProps & { id: number })[]>([])
  const [counter, setCounter] = useState(0)

  const toast = (props: ToastProps) => {
    const id = counter
    setCounter((prev) => prev + 1)
    setToasts((prev) => [...prev, { ...props, id }])
  }

  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => {
        setToasts((prev) => prev.slice(1))
      }, toasts[0].duration || 3000)
      return () => clearTimeout(timer)
    }
  }, [toasts])

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-0 right-0 p-4 space-y-2 z-50">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`bg-black/80 border ${
              toast.variant === "destructive" ? "border-red-500" : "border-yellow-500/50"
            } p-4 rounded-md shadow-lg max-w-md`}
          >
            {toast.title && <h3 className="font-medium text-white">{toast.title}</h3>}
            {toast.description && <p className="text-gray-300 text-sm">{toast.description}</p>}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

export const toast = (props: ToastProps) => {
  if (typeof window !== "undefined") {
    // Create a custom event to trigger the toast
    const event = new CustomEvent("toast", { detail: props })
    window.dispatchEvent(event)
  }
}
