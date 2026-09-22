"use client"

import { useEffect, useRef, useState } from "react"

/* ── Local fade-in helper (same pattern used by the other sections) ── */
function useFadeIn(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, visible }
}

function AnimatedItem({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: {
  children: React.ReactNode
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  className?: string
}) {
  const { ref, visible } = useFadeIn(0.1)

  const translate: Record<string, string> = {
    up: "translateY(32px)",
    down: "translateY(-32px)",
    left: "translateX(32px)",
    right: "translateX(-32px)",
    none: "none",
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : translate[direction],
        transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

/* ── Click-to-play video card ── */
function RetailerVideo() {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  const handlePlay = () => {
    setIsPlaying(true)
    // Defer to next tick so the controls attribute renders before play()
    requestAnimationFrame(() => {
      videoRef.current?.play().catch(() => {
        /* autoplay may be blocked — controls remain visible so the user can hit play again */
      })
    })
  }

  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-[#0a0a0a] shadow-[0_30px_60px_-30px_rgba(10,10,10,0.45)]">
      <video
        ref={videoRef}
        src="https://lightgreen-fox-390407.hostingersite.com/wp-content/uploads/2026/05/Rece-Deff.mp4"
        className="block h-auto w-full"
        preload="metadata"
        playsInline
        controls={isPlaying}
        onEnded={() => setIsPlaying(false)}
      />

      {!isPlaying && (
        <button
          type="button"
          onClick={handlePlay}
          aria-label="Play the retailer review video"
          className="group absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-black/15 via-black/30 to-black/55 transition-colors duration-300 hover:from-black/25 hover:via-black/40 hover:to-black/65"
        >
          {/* Play button */}
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white/95 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.65)] transition-transform duration-300 group-hover:scale-105 md:h-24 md:w-24">
            <svg
              width="26"
              height="30"
              viewBox="0 0 26 30"
              fill="none"
              className="ml-1.5"
              aria-hidden="true"
            >
              <path
                d="M2 2.5L24 15L2 27.5V2.5Z"
                fill="#0a0a0a"
                stroke="#0a0a0a"
                strokeWidth="3"
                strokeLinejoin="round"
              />
            </svg>
          </span>

          {/* Caption */}
          <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/30 px-3 py-1.5 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#e8c5a6]" />
            <span className="text-[10.5px] font-bold uppercase tracking-[0.28em] text-white">
              Watch the review
            </span>
          </span>
        </button>
      )}
    </div>
  )
}

export function RetailerReviewSection() {
  return (
    <section
      aria-labelledby="retailer-review-title"
      className="w-full bg-white px-6 py-16 md:py-24"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mx-auto max-w-3xl text-center">
          <AnimatedItem delay={0} direction="up">
            <p className="text-[10.5px] font-bold uppercase tracking-[0.35em] text-[#8b6f47]">
              Independent Review
            </p>
          </AnimatedItem>

          <AnimatedItem delay={120} direction="up">
            <h2
              id="retailer-review-title"
              className="mt-4 text-balance text-[34px] font-black uppercase leading-[1.02] tracking-tight text-[#0a0a0a] md:text-5xl lg:text-[56px]"
            >
              Judged by a Jeweller.
              <br />
              <span className="text-[#8b6f47]">Since 1930.</span>
            </h2>
          </AnimatedItem>

          <AnimatedItem delay={220} direction="up">
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-[16px] leading-[1.6] text-[#5a544a] md:text-[17px]">
              An Italian watch retailer puts the Trilogia Delta on the bench.
            </p>
          </AnimatedItem>

          <AnimatedItem delay={300} direction="none">
            <div className="mx-auto mt-6 h-px w-16 bg-[#0a0a0a]/20" />
          </AnimatedItem>
        </div>

        {/* Video + Quotes */}
        <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-2 md:gap-12 lg:gap-16">
          {/* Video (left) */}
          <AnimatedItem delay={120} direction="up" className="md:order-1">
            <RetailerVideo />
          </AnimatedItem>

          {/* Quotes (right) */}
          <AnimatedItem delay={240} direction="up" className="md:order-2">
            <div className="flex h-full flex-col justify-center">
              {/* Quote 1 — On the watch */}
              <div>
                <p className="text-[10.5px] font-bold uppercase tracking-[0.32em] text-[#8b6f47]">
                  On the watch.
                </p>
                <blockquote className="mt-3 text-pretty text-[18px] font-medium leading-[1.55] text-[#0a0a0a] md:text-[20px] lg:text-[22px]">
                  <span
                    aria-hidden="true"
                    className="mr-1 align-top text-[36px] font-black leading-none text-[#8b6f47]/45"
                  >
                    &ldquo;
                  </span>
                  Case, dial, integrated bracelet, open caseback &mdash; the
                  attention to detail is real. In my experience, this is a
                  serious watch.
                </blockquote>
              </div>

              {/* Divider */}
              <div className="my-8 h-px w-12 bg-[#0a0a0a]/15 md:my-10" />

              {/* Quote 2 — On the people */}
              <div>
                <p className="text-[10.5px] font-bold uppercase tracking-[0.32em] text-[#8b6f47]">
                  On the people.
                </p>
                <blockquote className="mt-3 text-pretty text-[18px] font-medium leading-[1.55] text-[#0a0a0a] md:text-[20px] lg:text-[22px]">
                  <span
                    aria-hidden="true"
                    className="mr-1 align-top text-[36px] font-black leading-none text-[#8b6f47]/45"
                  >
                    &ldquo;
                  </span>
                  What stands out is the passion. They put their faces on the
                  work &mdash; and in this trade, that still counts.
                </blockquote>
              </div>

              {/* Attribution */}
              <footer className="mt-10 border-t border-[#0a0a0a]/15 pt-5">
                <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <span className="text-[15px] font-extrabold tracking-tight text-[#0a0a0a]">
                    Gioielleria Sordi
                  </span>
                  <span className="text-[#0a0a0a]/30">&middot;</span>
                  <span className="text-[13px] italic text-[#5a544a]">
                    Italian watch retailer since 1930
                  </span>
                </p>
              </footer>
            </div>
          </AnimatedItem>
        </div>
      </div>
    </section>
  )
}
