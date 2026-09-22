"use client"

import { useCallback, useEffect, useRef, useState } from "react"

type CardData = {
  label: string
  description: string
  photo: string
  sketch: string
}

type Props = {
  cards: CardData[]
}

export function ComponentCarousel({ cards }: Props) {
  const [active, setActive] = useState(Math.floor(cards.length / 2))
  const [flipped, setFlipped] = useState<boolean[]>(() => cards.map(() => false))
  const [reduced, setReduced] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollerRef = useRef<HTMLDivElement>(null)

  // prefers-reduced-motion
  useEffect(() => {
    if (typeof window === "undefined") return
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener?.("change", update)
    return () => mq.removeEventListener?.("change", update)
  }, [])

  // mobile detection (md breakpoint = 768px)
  useEffect(() => {
    if (typeof window === "undefined") return
    const mq = window.matchMedia("(max-width: 767px)")
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener?.("change", update)
    return () => mq.removeEventListener?.("change", update)
  }, [])

  // On mobile, the first/highlighted card should be Case (index 0), not the middle one.
  useEffect(() => {
    if (typeof window === "undefined") return
    const isMobileInitial = window.matchMedia("(max-width: 767px)").matches
    if (isMobileInitial) {
      setActive(0)
      // snap the scroller to the first card on mount (no smooth scroll to avoid flicker)
      requestAnimationFrame(() => {
        if (scrollerRef.current) {
          const scroller = scrollerRef.current
          const target = scroller.children[0] as HTMLElement | undefined
          if (target) {
            scroller.scrollLeft =
              target.offsetLeft - (scroller.clientWidth - target.clientWidth) / 2
          }
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const goTo = useCallback(
    (idx: number) => {
      const next = Math.max(0, Math.min(cards.length - 1, idx))
      if (next === active) return
      setActive(next)
      setFlipped(cards.map(() => false))

      // scroll mobile scroller to the right card
      if (scrollerRef.current) {
        const scroller = scrollerRef.current
        const target = scroller.children[next] as HTMLElement | undefined
        if (target) {
          scroller.scrollTo({
            left: target.offsetLeft - (scroller.clientWidth - target.clientWidth) / 2,
            behavior: "smooth",
          })
        }
      }
    },
    [active, cards]
  )

  const flipActive = useCallback(() => {
    setFlipped((prev) => {
      const n = [...prev]
      n[active] = !n[active]
      return n
    })
  }, [active])

  // Keyboard navigation (desktop only)
  useEffect(() => {
    if (isMobile) return
    const el = containerRef.current
    if (!el) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault()
        goTo(active - 1)
      } else if (e.key === "ArrowRight") {
        e.preventDefault()
        goTo(active + 1)
      } else if (e.key === "Enter" || e.key === " ") {
        if (document.activeElement === el) {
          e.preventDefault()
          flipActive()
        }
      }
    }
    el.addEventListener("keydown", onKey)
    return () => el.removeEventListener("keydown", onKey)
  }, [active, goTo, flipActive, isMobile])

  // Track active card via scroll position on mobile
  useEffect(() => {
    if (!isMobile) return
    const scroller = scrollerRef.current
    if (!scroller) return
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const center = scroller.scrollLeft + scroller.clientWidth / 2
        let closest = 0
        let minDist = Infinity
        Array.from(scroller.children).forEach((child, i) => {
          const el = child as HTMLElement
          const c = el.offsetLeft + el.clientWidth / 2
          const d = Math.abs(c - center)
          if (d < minDist) {
            minDist = d
            closest = i
          }
        })
        setActive((prev) => (prev === closest ? prev : closest))
      })
    }
    scroller.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      scroller.removeEventListener("scroll", onScroll)
      cancelAnimationFrame(raf)
    }
  }, [isMobile])

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="Monichs component showcase"
      className="relative w-full outline-none"
    >
      {/* Radial amber glow behind center card */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full md:h-[500px] md:w-[500px]"
        style={{
          background:
            "radial-gradient(circle, rgba(184,115,51,0.18) 0%, rgba(184,115,51,0.06) 40%, transparent 70%)",
          filter: "blur(20px)",
        }}
        aria-hidden="true"
      />

      {/* ===== MOBILE: native horizontal scroll-snap with 3D focus ===== */}
      <div
        ref={scrollerRef}
        className="md:hidden -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-[12vw] pb-6 pt-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        style={{
          scrollPaddingLeft: "12vw",
          scrollPaddingRight: "12vw",
          perspective: reduced ? "none" : "1200px",
        }}
      >
        {cards.map((card, i) => {
          const isActive = i === active
          const isFlipped = flipped[i]
          return (
            <div
              key={i}
              className="relative h-[460px] w-[76vw] max-w-[320px] shrink-0 snap-center"
              style={{
                transformStyle: "preserve-3d",
                transform: isActive ? "scale(1)" : "scale(0.92)",
                opacity: isActive ? 1 : 0.7,
                filter: isActive ? "none" : "saturate(0.75) brightness(0.92)",
                transition: reduced
                  ? "opacity 300ms ease, transform 300ms ease, filter 300ms ease"
                  : "transform 600ms cubic-bezier(0.22, 1, 0.36, 1), opacity 500ms ease, filter 500ms ease",
              }}
            >
              <div
                className="relative h-full w-full"
                style={{
                  transformStyle: "preserve-3d",
                  transform: !reduced && isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                  transition: reduced
                    ? "opacity 300ms ease"
                    : "transform 900ms cubic-bezier(0.68, -0.25, 0.32, 1.25)",
                }}
              >
                <CardFront
                  card={card}
                  isActive={isActive}
                  onReveal={(e) => {
                    e.stopPropagation()
                    if (isActive) flipActive()
                  }}
                />
                <CardBack
                  card={card}
                  isActive={isActive}
                  onBack={(e) => {
                    e.stopPropagation()
                    if (isActive) flipActive()
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>

      {/* ===== DESKTOP: 3D coverflow layout ===== */}
      <div
        className="hidden md:flex items-center justify-center px-4"
        style={{ perspective: reduced ? "none" : "1800px", perspectiveOrigin: "center center" }}
      >
        <div
          className="relative flex items-center justify-center"
          style={{ transformStyle: "preserve-3d", minHeight: 560, width: "100%", maxWidth: 1100 }}
        >
          {cards.map((card, i) => {
            const offset = i - active
            const abs = Math.abs(offset)
            const isActive = offset === 0
            const isFlipped = flipped[i]
            const isVisible = abs <= 1

            if (!isVisible) return null

            // Coverflow transform composition
            const rotateY = reduced ? 0 : offset * -22 // side cards tilt inward
            const translateX = offset * 260
            const translateZ = reduced ? 0 : isActive ? 40 : -180
            const scale = isActive ? 1 : 0.86

            return (
              <div
                key={i}
                className="absolute"
                style={{
                  transformStyle: "preserve-3d",
                  transform: `translate3d(${translateX}px, 0, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity: isActive ? 1 : 0.55,
                  filter: isActive ? "none" : "saturate(0.6) brightness(0.85) blur(0.4px)",
                  transition: reduced
                    ? "opacity 300ms ease, transform 300ms ease, filter 300ms ease"
                    : "transform 850ms cubic-bezier(0.22, 1, 0.36, 1), opacity 650ms ease, filter 650ms ease",
                  zIndex: isActive ? 20 : 10 - abs,
                  willChange: "transform, opacity, filter",
                }}
              >
                {/* Pulse glow on active */}
                {isActive && !reduced && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-4 rounded-[32px]"
                    style={{
                      boxShadow: "0 0 80px rgba(184,115,51,0.2)",
                      animation: "carousel-pulse 5s ease-in-out infinite",
                    }}
                  />
                )}

                {/* Reflection/shadow plate below the card */}
                {!reduced && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute left-1/2 -bottom-6 h-6 w-[85%] -translate-x-1/2 rounded-[50%]"
                    style={{
                      background:
                        "radial-gradient(ellipse at center, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 70%)",
                      filter: "blur(6px)",
                      opacity: isActive ? 0.9 : 0.5,
                      transition: "opacity 600ms ease",
                    }}
                  />
                )}

                <button
                  type="button"
                  onClick={() => {
                    if (!isActive) goTo(i)
                  }}
                  aria-label={isActive ? `${card.label} — active` : `Show ${card.label}`}
                  className="relative block h-[500px] w-[340px] cursor-pointer border-0 bg-transparent p-0 outline-none"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: !reduced && isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                    transition: reduced
                      ? "opacity 300ms ease"
                      : "transform 900ms cubic-bezier(0.68, -0.25, 0.32, 1.25)",
                  }}
                >
                  <CardFront
                    card={card}
                    isActive={isActive}
                    onReveal={(e) => {
                      e.stopPropagation()
                      if (isActive) flipActive()
                    }}
                  />
                  <CardBack
                    card={card}
                    isActive={isActive}
                    onBack={(e) => {
                      e.stopPropagation()
                      if (isActive) flipActive()
                    }}
                  />
                </button>
              </div>
            )
          })}
        </div>
      </div>

      {/* Controls: arrows + dots */}
      <div className="mt-8 flex items-center justify-center gap-4 md:gap-6">
        <button
          type="button"
          onClick={() => goTo(active - 1)}
          disabled={active === 0}
          aria-label="Previous card"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#13294b]/20 text-[#13294b] transition hover:border-[#13294b]/50 hover:bg-[#13294b]/5 disabled:opacity-30 disabled:pointer-events-none"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div className="flex items-center gap-2" role="tablist" aria-label="Select card">
          {cards.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === active}
              aria-label={`Go to ${cards[i].label}`}
              onClick={() => goTo(i)}
              className="h-2 rounded-full transition-all"
              style={{
                width: i === active ? 24 : 8,
                backgroundColor: i === active ? "#13294b" : "#13294b33",
              }}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => goTo(active + 1)}
          disabled={active === cards.length - 1}
          aria-label="Next card"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#13294b]/20 text-[#13294b] transition hover:border-[#13294b]/50 hover:bg-[#13294b]/5 disabled:opacity-30 disabled:pointer-events-none"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Mobile swipe hint */}
      <p className="mt-3 text-center text-[11px] font-medium uppercase tracking-[0.2em] text-[#13294b]/50 md:hidden">
        Swipe to explore
      </p>

      <style jsx>{`
        @keyframes carousel-pulse {
          0%, 100% {
            box-shadow: 0 0 60px rgba(184, 115, 51, 0.12);
          }
          50% {
            box-shadow: 0 0 90px rgba(184, 115, 51, 0.22);
          }
        }
      `}</style>
    </div>
  )
}

function CardFront({
  card,
  isActive,
  onReveal,
}: {
  card: CardData
  isActive: boolean
  onReveal: (e: React.MouseEvent) => void
}) {
  return (
    <div
      className="absolute inset-0 overflow-hidden rounded-[24px] shadow-2xl"
      style={{
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        background:
          "radial-gradient(ellipse at center, rgba(200,138,74,0.25) 0%, #2a1a14 45%, #1A1210 100%)",
        boxShadow: isActive
          ? "0 30px 60px -15px rgba(0,0,0,0.6), 0 0 0 1px rgba(200,138,74,0.15)"
          : "0 15px 30px -10px rgba(0,0,0,0.5)",
      }}
    >
      {/* Photo — middle to bottom */}
      <div className="absolute inset-x-0 bottom-0 h-[60%] overflow-hidden">
        <img
          src={card.photo || "/placeholder.svg"}
          alt={card.label}
          className="h-full w-full object-cover"
          style={{
            maskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 100%)",
          }}
        />
      </div>

      {/* Text — top */}
      <div className="relative z-10 flex flex-col items-center px-6 pt-8 text-center">
        <h3 className="text-[22px] font-bold tracking-tight text-[#f4e6da]">{card.label}</h3>
        <p className="mt-2 max-w-[240px] text-[13px] leading-relaxed text-[#a8a095]">
          {card.description}
        </p>
      </div>

      {/* See the draw — pill button */}
      {isActive && (
        <div className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2">
          <span
            onClick={onReveal}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                onReveal(e as unknown as React.MouseEvent)
              }
            }}
            className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/40 bg-white/10 px-5 py-2.5 text-[13px] font-semibold uppercase tracking-[0.15em] text-white backdrop-blur-sm transition hover:border-white/60 hover:bg-white/15 md:gap-1.5 md:border-white/30 md:bg-white/5 md:px-4 md:py-2 md:text-[11px] md:hover:bg-white/10"
          >
            See the draw
            <svg
              className="h-3.5 w-3.5 md:h-3 md:w-3"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 6 15 12 9 18" />
            </svg>
          </span>
        </div>
      )}
    </div>
  )
}

function CardBack({
  card,
  isActive,
  onBack,
}: {
  card: CardData
  isActive: boolean
  onBack: (e: React.MouseEvent) => void
}) {
  return (
    <div
      className="absolute inset-0 overflow-hidden rounded-[24px] shadow-2xl"
      style={{
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        transform: "rotateY(180deg)",
        background: "#F2EBDC",
        boxShadow: "0 30px 60px -15px rgba(0,0,0,0.5), inset 0 0 80px rgba(120,90,50,0.08)",
      }}
    >
      {/* Paper grain texture */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.12] mix-blend-multiply"
        aria-hidden="true"
      >
        <filter id={`paper-${card.label}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix values="0 0 0 0 0.2 0 0 0 0 0.15 0 0 0 0 0.1 0 0 0 1 0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#paper-${card.label})`} />
      </svg>

      {/* Edge vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 55%, rgba(80,55,30,0.15) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Back pill button — top center */}
      {isActive && (
        <div className="absolute left-1/2 top-5 z-20 -translate-x-1/2">
          <span
            onClick={onBack}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                onBack(e as unknown as React.MouseEvent)
              }
            }}
            className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#2B241C]/25 bg-white/80 px-5 py-2.5 text-[13px] font-semibold uppercase tracking-[0.15em] text-[#2B241C] backdrop-blur-sm transition hover:bg-white md:gap-1.5 md:border-[#2B241C]/15 md:bg-white/50 md:px-4 md:py-2 md:text-[11px] md:hover:bg-white/80"
          >
            Back
            <svg
              className="h-3.5 w-3.5 md:h-3 md:w-3"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </span>
        </div>
      )}

      {/* Back image — fills the card edge-to-edge */}
      <img
        src={card.sketch || "/placeholder.svg"}
        alt={`${card.label} — back detail`}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Soft gradient for bottom label legibility */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/70 to-transparent"
      />

      {/* Label at the bottom */}
      <div className="absolute bottom-5 left-0 right-0 z-10 text-center">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#2B241C]/60">
          {card.label}
        </p>
      </div>
    </div>
  )
}
