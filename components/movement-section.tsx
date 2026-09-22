"use client"

import { useEffect, useRef, useState } from "react"

function FadeIn({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: {
  children: React.ReactNode
  delay?: number
  direction?: "up" | "down" | "left" | "right"
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  const directionStyles = {
    up: "translate-y-8",
    down: "-translate-y-8",
    left: "translate-x-8",
    right: "-translate-x-8",
  }

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translate(0, 0)" : undefined,
      }}
    >
      <div
        className={`${!isVisible ? directionStyles[direction] : ""} transition-transform duration-700 ease-out`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {children}
      </div>
    </div>
  )
}

export function MovementSection() {
  return (
    <section className="w-full bg-[#0b090d]">
      {/* Text Header */}
      <div className="relative overflow-hidden bg-[#0b090d] py-16 md:py-20">
        {/* Decorative side images */}
        <img
          src="https://lightgreen-fox-390407.hostingersite.com/wp-content/uploads/2026/04/Main-1-2.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-1/2 hidden w-[28%] max-w-[340px] -translate-x-[20%] -translate-y-1/2 select-none opacity-70 md:block lg:w-[24%]"
        />
        <img
          src="https://lightgreen-fox-390407.hostingersite.com/wp-content/uploads/2026/04/Main-9.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-1/2 hidden w-[28%] max-w-[340px] translate-x-[20%] -translate-y-1/2 select-none opacity-70 md:block lg:w-[24%]"
        />

        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          {/* Decorative Line */}
          <FadeIn delay={0} direction="up">
            <div className="mx-auto mb-6 h-px w-12 bg-[#f4e6da]/30" />
          </FadeIn>

          {/* Eyebrow */}
          <FadeIn delay={100} direction="up">
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#f4e6da]/60">
              The Movement
            </p>
          </FadeIn>

          {/* Headline */}
          <FadeIn delay={200} direction="up">
            <h2 className="mt-5 text-2xl font-bold uppercase leading-tight tracking-wide text-[#ffffff] md:text-3xl lg:text-4xl">
              Sellita SW200-2
              <br />
              Elaboré
            </h2>
          </FadeIn>

          {/* Description */}
          <FadeIn delay={300} direction="up">
            <p className="mt-5 text-[14px] leading-relaxed text-[#f4e6da]/70 md:text-[15px]">
              Swiss Made, reliable, now with a 65-hour
              <br className="hidden sm:block" />
              power reserve.
            </p>
          </FadeIn>
        </div>
      </div>

      {/* Watchmaker Video */}
      <div className="flex justify-center py-8 md:py-10">
        <FadeIn delay={400} direction="up" className="flex justify-center">
          <div className="w-[90vw]">
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-[#0a0a0a] md:aspect-[21/9]">
              <video
                src="https://lightgreen-fox-390407.hostingersite.com/wp-content/uploads/2026/04/Virentia-Visual-Oriz-V1.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Watchmaker crafting timepiece"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
