"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

export function TrilogySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [darkness, setDarkness] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current
      if (!section) return

      const rect = section.getBoundingClientRect()
      const viewportH = window.innerHeight

      // Progress: 0 at top, 1 when section is halfway up the viewport
      const progress = Math.min(Math.max((viewportH - rect.top) / (viewportH * 0.8), 0), 1)

      setDarkness(progress)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Text color interpolation: white → near-black
  const textProgress = Math.min(darkness * 1.2, 1)
  const textR = Math.round(255 - (255 - 30) * textProgress)
  const textG = Math.round(255 - (255 - 30) * textProgress)
  const textB = Math.round(255 - (255 - 30) * textProgress)
  const textColor = `rgb(${textR},${textG},${textB})`

  // Accent (lighter gray) interpolation
  const accentProgress = Math.min(darkness * 1.1, 1)
  const accentR = Math.round(200 - (200 - 120) * accentProgress)
  const accentG = Math.round(200 - (200 - 120) * accentProgress)
  const accentB = Math.round(200 - (200 - 120) * accentProgress)
  const accentColor = `rgb(${accentR},${accentG},${accentB})`

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#1a1a1a]"
    >
      {/* Top text area - white background */}
      <div className="relative z-10 flex flex-col items-center justify-center bg-white px-6 pt-16 pb-10 text-center sm:px-8 sm:pt-20 sm:pb-12 md:min-h-[40vh] md:py-32">
        <h2
          className="max-w-4xl text-[28px] font-bold leading-[1.2] tracking-tight transition-colors duration-200 text-balance sm:text-4xl md:text-5xl md:leading-tight lg:text-6xl"
          style={{ color: textColor }}
        >
          Honest design, solid engineering,{" "}
          <span
            className="font-light italic transition-colors duration-200"
            style={{ color: accentColor }}
          >
            obsessive attention
            <br />
            to detail
          </span>
        </h2>
      </div>

      {/* Bottom image area - full-bleed card on mobile, 90vw on desktop */}
      <div className="flex justify-center bg-white px-4 pt-2 pb-16 sm:px-6 sm:pb-20 md:px-6 md:pt-0 md:py-16">
        <div className="w-full max-w-[90vw] sm:w-[90vw]">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[#0b1628] shadow-[0_30px_70px_-25px_rgba(19,41,75,0.4)] sm:aspect-[16/9] md:aspect-[21/9]">
            <video
              src="https://lightgreen-fox-390407.hostingersite.com/wp-content/uploads/2026/04/Deff-2.webm"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="Monichs Delta Trilogy timepieces"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <span aria-hidden="true" className="pointer-events-none absolute left-4 top-4 h-4 w-4 border-l border-t border-[#e8c5a6]/50 sm:left-6 sm:top-6" />
            <span aria-hidden="true" className="pointer-events-none absolute right-4 top-4 h-4 w-4 border-r border-t border-[#e8c5a6]/50 sm:right-6 sm:top-6" />
            <span aria-hidden="true" className="pointer-events-none absolute bottom-4 left-4 h-4 w-4 border-b border-l border-[#e8c5a6]/50 sm:bottom-6 sm:left-6" />
            <span aria-hidden="true" className="pointer-events-none absolute bottom-4 right-4 h-4 w-4 border-b border-r border-[#e8c5a6]/50 sm:bottom-6 sm:right-6" />
          </div>
        </div>
      </div>
    </section>
  )
}
