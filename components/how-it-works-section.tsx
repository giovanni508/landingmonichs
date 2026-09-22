"use client"

import { useEffect, useRef, useState, useCallback } from "react"

/* ── scroll-triggered animation hook ── */
function useAnimateOnScroll(threshold = 0.15) {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, visible }
}

function FadeIn({
  children,
  delay = 0,
  className = "",
  direction = "up",
}: {
  children: React.ReactNode
  delay?: number
  className?: string
  direction?: "up" | "left" | "right"
}) {
  const { ref, visible } = useAnimateOnScroll()

  const translateFrom =
    direction === "up"
      ? "translate-y-8"
      : direction === "left"
        ? "-translate-x-8"
        : "translate-x-8"

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-x-0 translate-y-0" : `opacity-0 ${translateFrom}`
      } ${className}`}
    >
      {children}
    </div>
  )
}

/* ── step data ── */
const steps = [
  {
    id: 1,
    tab: "Become a Founder of the Community",
    title: "Become A Founder\nOf The Community",
    image: "/images/watch-sketch.jpg",
    body: (
      <>
        <p className="font-semibold text-[#f4e6da]">
          Choose your model from the Delta Trilogy and support the project on Kickstarter.
        </p>
        <p className="mt-3">
          The first 50 super early birds at{" "}
          <span className="font-semibold text-[#f4e6da]">$1,400 USD</span>{" "}
          <span className="text-[#f4e6da]/50">(35% discount)</span>
          , then{" "}
          <span className="font-semibold text-[#f4e6da]">$1,600 USD</span>{" "}
          for subsequent early bird supporters.
        </p>
        <p className="mt-3">
          Every backer receives an exclusive serial number and lifetime access to the{" "}
          <span className="font-semibold text-[#f4e6da]">Monichs Club VIP</span>
          : exclusive previews of all future releases, early access to new models,
          exclusive content, and a starring role in the brand's growth.
        </p>
      </>
    ),
  },
  {
    id: 2,
    tab: "Behind the Scenes of Watchmaking",
    title: "Behind The Scenes\nOf Watchmaking",
    image: "/images/watch-sketch.jpg",
    body: (
      <>
        <p className="font-semibold text-[#f4e6da]">
          During the campaign, we'll share exclusive updates.
        </p>
        <p className="mt-3">
          From the Swiss assembly process to quality testing,
          through to final packaging.
        </p>
        <p className="mt-3">
          Every backer will receive exclusive content about the{" "}
          <span className="font-semibold text-[#f4e6da]">
            behind-the-scenes of Swiss Made production
          </span>.
        </p>
      </>
    ),
  },
  {
    id: 3,
    tab: "Expected Delivery: Q4 2026",
    title: "Expected Delivery:\nQ4 2026",
    image: "/images/watch-sketch.jpg",
    body: (
      <>
        <p className="font-semibold text-[#f4e6da]">
          You'll receive your Monichs with premium packaging.
        </p>
        <p className="mt-3">
          Numbered authenticity certificate, warranty card,
          maintenance guide, and immediate activation of your{" "}
          <span className="font-semibold text-[#f4e6da]">lifetime VIP access</span>{" "}
          to the Monichs Club.
        </p>
        <p className="mt-3">
          From that moment on, you'll always be the first to know:{" "}
          <span className="font-semibold text-[#f4e6da]">
            new releases, exclusive events, special collaborations
          </span>.
        </p>
      </>
    ),
  },
]

/* ── Animated content panel (desktop overlay) ── */
function StepContent({
  step,
  visible,
}: {
  step: (typeof steps)[0]
  visible: boolean
}) {
  return (
    <div
      className={`absolute inset-0 hidden flex-col justify-end p-6 transition-all duration-500 ease-in-out md:p-10 lg:flex lg:p-14 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"
      }`}
    >
      <h3 className="max-w-lg whitespace-pre-line text-2xl font-bold leading-tight text-[#ffffff] md:text-4xl lg:text-5xl">
        {step.title}
      </h3>
      <div className="mt-5 max-w-md text-[13px] leading-[1.7] text-[#f4e6da]/70 md:text-sm md:leading-[1.75]">
        {step.body}
      </div>
    </div>
  )
}

/* ── Mobile content panel (flows below image, cross-fades) ── */
function MobileStepContent({
  step,
  visible,
}: {
  step: (typeof steps)[0]
  visible: boolean
}) {
  return (
    <div
      aria-hidden={!visible}
      className={`transition-all duration-500 ease-in-out ${
        visible
          ? "relative opacity-100 translate-y-0"
          : "pointer-events-none absolute inset-x-0 top-0 opacity-0 translate-y-3"
      }`}
    >
      <h3 className="whitespace-pre-line text-[26px] font-bold leading-[1.15] text-[#ffffff] sm:text-3xl">
        {step.title}
      </h3>
      <div className="mt-4 text-[14px] leading-[1.75] text-[#f4e6da]/75">
        {step.body}
      </div>
    </div>
  )
}

/* ── Animated background layer ── */
function StepImage({
  step,
  visible,
}: {
  step: (typeof steps)[0]
  visible: boolean
}) {
  return (
    <img
      src={step.image}
      alt={step.tab}
      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    />
  )
}

export function HowItWorksSection() {
  const [active, setActive] = useState(0)
  const [prev, setPrev] = useState<number | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleTabClick = useCallback((index: number) => {
    if (index === active) return
    setPrev(active)
    setActive(index)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setPrev(null), 600)
  }, [active])

  useEffect(() => () => { if (timeoutRef.current) clearTimeout(timeoutRef.current) }, [])

  return (
    <section className="relative w-full bg-[#0a0a0a]">
      {/* ── Header ── */}
      <div className="mx-auto max-w-3xl px-6 pb-10 pt-24 text-center md:pt-32 md:pb-14">
        <FadeIn delay={0} direction="up">
          <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-[#f4e6da]/50 md:text-xs">
            Become Part of the Story
          </p>
        </FadeIn>

        <FadeIn delay={100} direction="up">
          <h2 className="mt-5 text-3xl font-bold uppercase tracking-wide text-[#ffffff] md:text-4xl lg:text-5xl">
            How it Works
          </h2>
        </FadeIn>

        <FadeIn delay={200} direction="up">
          <p className="mt-6 text-sm leading-relaxed text-[#f4e6da]/65 md:text-base md:leading-relaxed">
            {"This is not a simple pre-order. It's the opportunity to become part of the story of a brand that redefines the concept of luxury timepieces. Here's how it works:"}
          </p>
        </FadeIn>
      </div>

      {/* ── Card area ── */}
      <FadeIn delay={300} direction="up" className="w-full pb-20 md:pb-24">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] md:rounded-3xl">

          {/* Image stack — on mobile it's its own block, on desktop the overlay lives on top */}
          <div className="relative aspect-[16/10] w-full md:aspect-[16/9]">
            {steps.map((step, i) => (
              <StepImage key={step.id} step={step} visible={i === active} />
            ))}

            {/* Gradient overlays (desktop only, for overlay legibility) */}
            <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent lg:block" />
            <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-[#0a0a0a]/70 via-transparent to-transparent lg:block" />

            {/* Desktop overlay content panels */}
            {steps.map((step, i) => (
              <StepContent key={step.id} step={step} visible={i === active} />
            ))}

            {/* Soft fade into the mobile text block below */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-[#0a0a0a] lg:hidden" />
          </div>

          {/* Mobile / tablet content block — sits BELOW the image for full readability */}
          <div className="relative px-6 pt-6 pb-2 sm:px-8 lg:hidden">
            <div className="relative min-h-[280px] sm:min-h-[260px]">
              {steps.map((step, i) => (
                <MobileStepContent key={step.id} step={step} visible={i === active} />
              ))}
            </div>
          </div>

          {/* ── Step navigation ──
              Mobile: vertical stack with comfortable tap targets.
              Desktop: original 3-column grid. */}
          <div className="relative border-t border-[#ffffff]/10 bg-[#0a0a0a]">
            {/* Mobile nav */}
            <div className="flex flex-col lg:hidden">
              {steps.map((step, i) => {
                const isActive = active === i
                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => handleTabClick(i)}
                    aria-pressed={isActive}
                    className={`group relative flex items-center gap-4 px-6 py-5 text-left transition-colors ${
                      i !== 0 ? "border-t border-[#ffffff]/10" : ""
                    }`}
                  >
                    {/* Left active indicator */}
                    <span
                      aria-hidden="true"
                      className={`absolute left-0 top-0 h-full w-[2px] transition-colors duration-300 ${
                        isActive ? "bg-[#f4e6da]" : "bg-transparent"
                      }`}
                    />

                    <span
                      className={`shrink-0 text-[12px] font-semibold tracking-widest transition-colors duration-300 ${
                        isActive ? "text-[#f4e6da]/70" : "text-[#f4e6da]/30"
                      }`}
                    >
                      {`0${step.id}`}
                    </span>

                    <span
                      className={`text-[13px] leading-snug transition-colors duration-300 ${
                        isActive
                          ? "font-medium text-[#f4e6da]"
                          : "text-[#f4e6da]/55"
                      }`}
                    >
                      {step.tab}
                    </span>

                    {/* Chevron on active */}
                    <svg
                      aria-hidden="true"
                      className={`ml-auto h-4 w-4 shrink-0 transition-all duration-300 ${
                        isActive ? "translate-x-0 text-[#f4e6da]/70" : "-translate-x-1 text-[#f4e6da]/20"
                      }`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </button>
                )
              })}
            </div>

            {/* Desktop nav (original) */}
            <div className="hidden grid-cols-3 lg:grid">
              {steps.map((step, i) => (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => handleTabClick(i)}
                  className={`group relative px-4 py-4 text-left transition-colors md:px-6 md:py-5 ${
                    i !== 0 ? "border-l border-[#ffffff]/10" : ""
                  }`}
                >
                  {/* Progress bar indicator */}
                  <div className="absolute inset-x-0 top-0 h-[2px] overflow-hidden bg-[#ffffff]/10">
                    <div
                      className={`h-full bg-[#f4e6da] transition-all duration-500 ease-in-out ${
                        active === i ? "w-full" : "w-0"
                      }`}
                    />
                  </div>

                  <span
                    className={`block text-[10px] leading-snug transition-colors duration-300 md:text-xs ${
                      active === i
                        ? "font-medium text-[#f4e6da]"
                        : "text-[#f4e6da]/40 group-hover:text-[#f4e6da]/60"
                    }`}
                  >
                    <span
                      className={`font-semibold transition-colors duration-300 ${
                        active === i ? "text-[#f4e6da]/60" : "text-[#f4e6da]/25"
                      }`}
                    >
                      {`0${step.id}`}
                    </span>{" "}
                    {step.tab}
                  </span>
                </button>
              ))}
            </div>
          </div>

          </div>
        </div>
      </FadeIn>
    </section>
  )
}
