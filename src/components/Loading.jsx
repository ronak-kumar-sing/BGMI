import React, { useState, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Constants for animation parameters
const MAX_SCALE = 1.5;
const OPACITY_END_SCROLL = 400; // Scroll Y (px) when opacity reaches 0 and loading hides

function Loading() {
  const [isVisible, setIsVisible] = useState(true);
  const [showScrollCue, setShowScrollCue] = useState(false);

  const loadingRef = useRef(null);
  const textContainerRef = useRef(null);
  const scrollCueRef = useRef(null);

  // Main GSAP animation for scaling text and fading out screen
  useLayoutEffect(() => {
    if (!isVisible || !loadingRef.current || !textContainerRef.current) {
      return;
    }

    // Timer to show the scroll cue if user hasn't scrolled
    const cueTimer = setTimeout(() => {
      if (window.scrollY < 10) { // Check if user hasn't scrolled much
        setShowScrollCue(true);
      }
    }, 2500); // Show cue after 2.5 seconds

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.body, // Or a more specific scroll container if available
          start: 'top top',
          end: `+=${OPACITY_END_SCROLL}`,
          scrub: 1, // Smooth scrubbing
          onUpdate: (self) => {
            // Hide scroll cue if visible and user starts scrolling
            if (self.progress > 0.05 && showScrollCue) {
              setShowScrollCue(false);
            }
          },
        },
        onComplete: () => {
          setShowScrollCue(false); // Ensure cue is hidden
          setIsVisible(false);     // Trigger component hide/unmount
        },
      });

      // Animate text scaling
      tl.to(textContainerRef.current, {
        scale: MAX_SCALE,
        ease: 'power1.inOut',
      }, 0); // Start at the beginning of the timeline

      // Animate loading screen fade out
      tl.to(loadingRef.current, {
        autoAlpha: 0, // Fades opacity and sets visibility:hidden
        ease: 'power1.inOut',
      }, 0); // Start at the beginning of the timeline
    }, loadingRef); // Scope GSAP context to the loadingRef element

    return () => {
      clearTimeout(cueTimer); // Clean up timer
      ctx.revert(); // Clean up GSAP animations and ScrollTrigger instances
    };
  }, [isVisible]); // Rerun effect if isVisible changes

  // Effect for animating the scroll cue itself
  useLayoutEffect(() => {
    if (!scrollCueRef.current) {
      return;
    }

    if (showScrollCue) {
      // Animate cue into view with a bobbing motion
      gsap.fromTo(scrollCueRef.current,
        { autoAlpha: 0, y: 20 }, // Start transparent and slightly down
        {
          autoAlpha: 1,
          y: 0,
          repeat: -1,       // Loop indefinitely
          yoyo: true,         // Animate back and forth
          ease: 'power1.inOut',
          duration: 0.8,
        }
      );
    } else {
      // Stop animation and fade out the cue
      gsap.killTweensOf(scrollCueRef.current); // Stop any ongoing animations on the cue
      gsap.to(scrollCueRef.current, { autoAlpha: 0, duration: 0.3 });
    }
  }, [showScrollCue]); // Rerun effect if showScrollCue changes

  // If not visible (animation completed), render nothing
  if (!isVisible) {
    return null;
  }

  return (
    <div
      ref={loadingRef}
      className="flex flex-col items-center justify-center h-screen bg-black fixed top-0 left-0 w-full z-50"
      // GSAP will handle opacity and visibility via autoAlpha
    >
      <div
        ref={textContainerRef}
        className="flex flex-col items-center"
        // GSAP handles transform for scaling
      >
        <span className="text-white text-7xl tracking-tight font-extrabold">BATTLEGOURNDS</span>
        <div className="flex items-center justify-center gap-4 mt-4">
          <span className="text-5xl bg-white px-2 rounded tracking-tight font-extrabold">MOBILE</span>
          <span className="text-white text-5xl tracking-tight font-extrabold">INDIA</span>
        </div>
      </div>

      {/* Scroll Cue Element */}
      {showScrollCue && (
        <div
          ref={scrollCueRef}
          className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-white text-sm flex flex-col items-center pointer-events-none"
          style={{ autoAlpha: 0 }} // Initial state for GSAP, will be made visible by animation
        >
          <span>Scroll to explore</span>
          <div className="mt-2 text-2xl animate-bounce">↓</div> {/* Tailwind's bounce for arrow */}
        </div>
      )}
    </div>
  );
}

export default Loading;