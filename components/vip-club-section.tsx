"use client"

import { useEffect, useRef, useState } from "react"

/* ─────────────────────────────────────────────────────────────
   Animated wrapper with IntersectionObserver
───────────────────────────────────────────────────────────── */
function FadeIn({
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
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const directionStyles: Record<string, string> = {
    up: "translate-y-8",
    down: "-translate-y-8",
    left: "translate-x-8",
    right: "-translate-x-8",
    none: "",
  }

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translate(0,0)" : undefined,
      }}
      {...(!isVisible && {
        className: `${className} ${directionStyles[direction]} opacity-0`,
      })}
    >
      {children}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Animated Counter for infographic stats
───────────────────────────────────────────────────────────── */
function AnimatedCounter({
  target,
  suffix = "",
  duration = 2000,
}: {
  target: number
  suffix?: string
  duration?: number
}) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const startTime = Date.now()
          const animate = () => {
            const elapsed = Date.now() - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(target * eased))
            if (progress < 1) requestAnimationFrame(animate)
          }
          animate()
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [target, duration])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

/* ─────────────────────────────────────────────────────────────
   Benefit Card with animated icon
───────────────────────────────────────────────────────────── */
function BenefitCard({
  icon,
  title,
  description,
  delay,
}: {
  icon: React.ReactNode
  title: string
  description: string
  delay: number
}) {
  return (
    <FadeIn delay={delay} direction="up">
      <div className="group relative h-full rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md transition-all duration-300 hover:border-[#b8975f]/40 hover:bg-white/[0.08] md:p-8">
        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#b8975f]/15 text-[#b8975f] transition-transform duration-300 group-hover:scale-110">
          {icon}
        </div>
        <h4 className="mb-2 text-base font-bold text-white md:text-lg">{title}</h4>
        <p className="text-sm leading-relaxed text-white/60">{description}</p>
      </div>
    </FadeIn>
  )
}

/* ─────────────────────────────────────────────────────────────
   Main VIP Club Section
───────────────────────────────────────────────────────────── */
export function VipClubSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#0a0a0a]">
      {/* ─── Top hero: title + watch-drawing background ─── */}
      <div className="relative">
        {/* Top decorative watch drawing */}
        <img
          src="https://lightgreen-fox-390407.hostingersite.com/wp-content/uploads/2026/04/Main-9-1.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 w-[130%] max-w-none -translate-x-1/2 select-none opacity-[0.22] md:w-[110%] md:opacity-[0.28]"
        />
        {/* Soft fade to black at the bottom of the hero image */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#0a0a0a]" />

        {/* Hero content */}
        <div className="relative z-10 px-6 pb-16 pt-40 md:pb-20 md:pt-56 lg:pt-64">
          <div className="mx-auto max-w-4xl text-center">
            <FadeIn delay={0} direction="up">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/70">
                Monichs Club VIP
              </p>
            </FadeIn>

            <FadeIn delay={100} direction="up">
              <h2 className="mt-6 text-4xl font-black uppercase leading-[1.05] tracking-tight text-white md:text-5xl lg:text-6xl text-balance">
                More than a watch
                <br />
                An exclusive community
              </h2>
            </FadeIn>

            <FadeIn delay={200} direction="up">
              <p className="mx-auto mt-8 max-w-2xl text-sm leading-relaxed text-white/60 md:text-base">
                Backing Monichs on Kickstarter doesn&apos;t just get you a Swiss Made timepiece at an exclusive price.
                It gets you into a community of enthusiasts — and lifetime VIP access to everything that comes next.
              </p>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* ─── Stats row ─── */}
      <FadeIn delay={300} direction="up" className="relative z-10 px-6 pb-24">
        <div className="mx-auto grid max-w-2xl grid-cols-2 gap-3 md:gap-4">
          {[
            { value: 100, suffix: "%", label: "Exclusive Access" },
            { value: 1, suffix: "", label: "Lifetime Membership", display: "∞" },
          ].map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center rounded-xl border border-white/10 bg-white/[0.03] p-5 text-center backdrop-blur-sm"
            >
              <span className="text-3xl font-black text-white md:text-4xl">
                {stat.display ? stat.display : <AnimatedCounter target={stat.value} suffix={stat.suffix} />}
              </span>
              <span className="mt-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/50 md:text-xs">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </FadeIn>

      {/* ─── Benefits grid with second watch-drawing background ─── */}
      <div className="relative px-6 pb-24">
        {/* Side watch drawing */}
        <img
          src="https://lightgreen-fox-390407.hostingersite.com/wp-content/uploads/2026/04/Main-10.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 w-[140%] max-w-none -translate-x-1/2 -translate-y-1/2 select-none opacity-[0.10] md:w-[110%] md:opacity-[0.14]"
        />
        {/* Subtle vignette to blend drawing */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]" />

        <div className="relative z-10 mx-auto max-w-5xl">
          <FadeIn delay={100} direction="up">
            <div className="mb-12 text-center">
              <h3 className="text-2xl font-bold text-white md:text-3xl">
                What is the Monichs Club VIP?
              </h3>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/60 md:text-base">
                The heartbeat of our community. An exclusive group reserved for founder backers who believed in Monichs from day one.
                Not a loyalty program — <span className="font-semibold text-white">a way to build the brand together</span> with those who wear it.
              </p>
            </div>
          </FadeIn>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <BenefitCard
              delay={200}
              icon={
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              }
              title="Early Access to Monthly Releases"
              description="Starting Q3 2026, a new reference every month. VIP members purchase before public release. Limited drops, exclusive variants — you're always first."
            />

            <BenefitCard
              delay={300}
              icon={
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              }
              title="Previews and Behind the Scenes"
              description="Every update, collaboration, and production diary — reserved for VIP. From design evolution to technical choices, from Swiss assembly to international partnerships."
            />

            <BenefitCard
              delay={400}
              icon={
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              }
              title="Private Collectors Group"
              description="Access to the Monichs private group: connect with fellow collectors, share feedback, influence future releases. This isn't a monologue — it's a conversation."
            />

            <BenefitCard
              delay={500}
              icon={
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="23 7 16 12 23 17 23 7" />
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                </svg>
              }
              title="Exclusive Content"
              description="Video, live streams, reserved Q&A sessions. Watch the creative process unfold, see how new models are born, participate in key decisions."
            />

            <BenefitCard
              delay={600}
              icon={
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              }
              title="Special Editions & Collaborations"
              description="Some models will be reserved exclusively for VIP members. Unique colourways, limited numbered editions, special collaborations. If you're in the Club, you always have an edge."
            />

            <BenefitCard
              delay={700}
              icon={
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              }
              title="Why We Do This"
              description="Because a brand is built with its community. Founder backers aren't customers — they're co-founders, ambassadors, the first believers. The Club is our way of saying thank you."
            />
          </div>
        </div>
      </div>

      {/* ─── Bottom VIP card image ─── */}
      <FadeIn delay={200} direction="up" className="relative z-10 px-6 pb-24 md:pb-32">
        <div className="mx-auto max-w-6xl">
          <div className="relative aspect-[21/9] overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a]">
            <img
              src="https://lightgreen-fox-390407.hostingersite.com/wp-content/uploads/2026/04/Main-8.png"
              alt="Monichs VIP Community"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </FadeIn>
    </section>
  )
}
