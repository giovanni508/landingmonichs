"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { EarlyBirdSignup } from "./early-bird-signup"

function useAnimateOnMount(delay: number = 0) {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(timeout)
  }, [delay])

  return { ref, visible }
}

type Direction = "up" | "left" | "right" | "down" | "none"

function AnimatedElement({
  children,
  delay = 0,
  className = "",
  direction = "up",
  distance = 8,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
  direction?: Direction
  distance?: number
}) {
  const { ref, visible } = useAnimateOnMount(delay)

  const hidden =
    direction === "up"
      ? `translate-y-${distance} opacity-0`
      : direction === "down"
        ? `-translate-y-${distance} opacity-0`
        : direction === "left"
          ? `-translate-x-${distance} opacity-0`
          : direction === "right"
            ? `translate-x-${distance} opacity-0`
            : "opacity-0"

  return (
    <div
      ref={ref}
      className={`transition-all duration-[900ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] will-change-transform ${
        visible ? "opacity-100 translate-x-0 translate-y-0" : hidden
      } ${className}`}
    >
      {children}
    </div>
  )
}

/**
 * Brand video card used in the hero.
 * `variant="compact"` renders a wide, near-horizontal frame for mobile placement.
 * Default renders the original portrait/auto-height frame for desktop.
 */
export function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className="relative w-full min-h-[100svh] overflow-hidden bg-[#060a14]">
      {/* Background Image with slow Ken Burns effect */}
      <div className="absolute inset-0">
        <div
          className={`absolute inset-0 transition-transform duration-[14000ms] ease-out will-change-transform ${
            mounted ? "scale-100" : "scale-110"
          }`}
        >
          <Image
            src="/images/watch-hero.png"
            alt="Monichs Celeste luxury watch with blue dial"
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        {/* Layered overlays for depth and legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#060a14]/80 via-[#060a14]/55 to-[#060a14]/90 lg:bg-gradient-to-r lg:from-[#060a14]/90 lg:via-[#060a14]/55 lg:to-[#060a14]/25" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#060a14]/60 via-transparent to-[#060a14]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#060a14_95%)] opacity-70" />

        {/* Subtle grain for cinematic texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-[100svh] items-center">
        <div className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-6 sm:py-14 md:py-24 lg:px-12 lg:py-28">
          <div className="flex flex-col items-center gap-8 text-center lg:flex-row lg:items-center lg:justify-between lg:gap-16 lg:text-left">
            {/* Main column: text + (mobile) video + form */}
            <div className="flex w-full max-w-xl flex-col items-center lg:items-start">
              {/* Brand Logo */}
              <AnimatedElement delay={100} direction="down" distance={4}>
                <img
                  src="https://lightgreen-fox-390407.hostingersite.com/wp-content/uploads/2026/04/Logo-in-linea-1.png"
                  alt="Monichs"
                  className="mb-5 h-5 w-auto md:mb-8 md:h-7 lg:mb-12 lg:h-9"
                />
              </AnimatedElement>

              {/* Eyebrow label */}
              <AnimatedElement delay={250} direction="up" distance={4}>
                <div className="mb-4 flex items-center justify-center gap-3 md:mb-5 lg:justify-start">
                  <span className="hidden h-px w-10 bg-[#e8c5a6]/60 lg:inline-block" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#e8c5a6]/80">
                    Delta Trilogy
                  </span>
                </div>
              </AnimatedElement>

              <AnimatedElement delay={400} direction="up">
                <h1 className="text-[30px] font-light tracking-tight leading-[1.05] text-white sm:text-4xl md:text-5xl lg:text-[56px]">
                  Italian Design.
                </h1>
              </AnimatedElement>

              <AnimatedElement delay={550} direction="up">
                <h1 className="mt-1 text-[30px] font-bold tracking-tight leading-[1.05] text-white sm:text-4xl md:text-5xl lg:text-[56px]">
                  Swiss Manufacture.
                </h1>
              </AnimatedElement>

              <AnimatedElement delay={760} direction="up" className="w-full">
                <div className="relative mx-auto mt-7 aspect-[16/10] w-full max-w-md overflow-visible lg:mx-0">
                  <div className="absolute inset-0 overflow-hidden rounded-2xl border border-[#e8c5a6]/25 bg-[#0b1628]/70 shadow-[0_24px_70px_-28px_rgba(0,0,0,0.8)]">
                    <Image
                      src="/images/watches-trio-detail.jpg"
                      alt="Three Monichs Delta Trilogy watches displayed together"
                      width={1600}
                      height={1067}
                      priority
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <Image
                    src="/images/super-early-bird-badge.png"
                    alt="Super Early Bird Kickstarter pricing"
                    width={260}
                    height={260}
                    className="absolute -right-8 -top-10 z-10 w-24 rotate-6 drop-shadow-[0_12px_20px_rgba(0,0,0,0.35)] sm:-right-10 sm:-top-12 sm:w-32"
                  />
                </div>
              </AnimatedElement>

              <AnimatedElement delay={900} direction="up" className="w-full">
                <p className="mx-auto mt-6 max-w-md text-[13.5px] leading-[1.7] text-[#f4e6da]/85 sm:text-sm md:mt-7 md:text-[15px] lg:mx-0">
                  {`Three Swiss Made timepieces. Sellita SW200 Élaboré movement. Case, bracelet, dial, rotor: every component designed in-house. Top-grade hard coating.`}
                </p>
              </AnimatedElement>

              {/* Early Bird Signup CTA */}
              <AnimatedElement delay={1150} direction="up" className="w-full lg:w-auto">
                <div className="mx-auto mt-7 w-full max-w-md md:mt-8 lg:mx-0">
                  <EarlyBirdSignup />
                </div>
              </AnimatedElement>
            </div>

          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <AnimatedElement
        delay={1400}
        direction="up"
        className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:block"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/50">
            Scroll
          </span>
          <span className="relative flex h-8 w-5 items-start justify-center rounded-full border border-white/30">
            <span
              aria-hidden="true"
              className="mt-1.5 h-1.5 w-1 rounded-full bg-white/70"
              style={{ animation: "heroScrollDot 1.8s ease-in-out infinite" }}
            />
          </span>
        </div>
      </AnimatedElement>

      {/* Local animations */}
      <style jsx>{`
        @keyframes heroShimmer {
          0% {
            transform: translateX(0%);
          }
          50% {
            transform: translateX(400%);
          }
          100% {
            transform: translateX(400%);
          }
        }
        @keyframes heroScrollDot {
          0% {
            transform: translateY(0);
            opacity: 0;
          }
          35% {
            opacity: 1;
          }
          100% {
            transform: translateY(10px);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  )
}
