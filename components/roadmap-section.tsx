"use client"

import { useRef, useEffect, useState } from "react"

const milestones = [
  {
    period: "Q2 2026",
    tag: "Kickstarter Launch",
    title: "The Trilogy Goes Live",
    subtitle: "Celeste, Sunset, Virentia",
    bullets: [
      "Kickstarter campaign live",
      "Super Early Bird (first 24 hours): $1,400 USD — was $2,400, save $1,000 (−42%)",
      "Early Bird (after 24h): $1,600 USD — was $2,400, save $800 (−33%)",
      "Founding community — private group access",
      "Weekly production updates for all backers",
      "Retailer selection underway across Europe in parallel",
    ],
    accent: "#b8975f",
    image: "https://lightgreen-fox-390407.hostingersite.com/wp-content/uploads/2026/04/Main-5.png",
    icon: (color: string) => (
      <svg className="h-5 w-5" fill="none" stroke={color} viewBox="0 0 24 24" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    ),
  },
  {
    period: "Q3 2026",
    tag: "Production & Assembly",
    title: "Swiss Made in Action",
    subtitle: "Assembly begins right after the campaign closes",
    bullets: [
      "Assembly begins immediately after campaign closes",
      "Custom component production and Swiss Made quality control",
      "Final testing and certification",
      "Exclusive behind-the-scenes content for backers",
      "European retail partnerships being finalized",
    ],
    accent: "#13294b",
    image: "https://lightgreen-fox-390407.hostingersite.com/wp-content/uploads/2026/04/Main-2-2.png",
    icon: (color: string) => (
      <svg className="h-5 w-5" fill="none" stroke={color} viewBox="0 0 24 24" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    period: "Q4 2026",
    tag: "Delivery + First New Releases",
    title: "First Monichs on Wrists",
    subtitle: "Founder backers receive their watches — and the journey continues",
    bullets: [
      "Delivery of Trilogy units to Kickstarter backers",
      "Premium packaging — complete unboxing experience",
      "Monichs Club VIP activation for all founders",
      "First new releases begin: regular drops alongside Trilogy delivery",
      "Community feedback loop: you shape what comes next",
    ],
    accent: "#7ec49b",
    image: "https://lightgreen-fox-390407.hostingersite.com/wp-content/uploads/2026/04/Main-1-1.png",
    icon: (color: string) => (
      <svg className="h-5 w-5" fill="none" stroke={color} viewBox="0 0 24 24" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
      </svg>
    ),
  },
  {
    period: "Early 2027",
    tag: "Steady Rhythm",
    title: "Monthly Releases, Retail Presence",
    subtitle: "From one brand to a worldwide rhythm",
    bullets: [
      "New references released on a regular cadence",
      "VIP members get early access to every drop",
      "Limited numbered editions — VIP exclusive",
      "European retail network active — selected independent boutiques",
    ],
    accent: "#c97b6b",
    image: "https://lightgreen-fox-390407.hostingersite.com/wp-content/uploads/2026/04/Main-12.png",
    isExpansion: true,
    icon: (color: string) => (
      <svg className="h-5 w-5" fill="none" stroke={color} viewBox="0 0 24 24" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
  },
]

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

function Fade({ children, delay = 0, direction = "up", className = "" }: {
  children: React.ReactNode; delay?: number; direction?: "up" | "left" | "right" | "none"; className?: string
}) {
  const { ref, visible } = useInView(0.1)
  const offset =
    direction === "up" ? "translateY(32px)" :
    direction === "left" ? "translateX(-40px)" :
    direction === "right" ? "translateX(40px)" : "none"
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : offset,
      transition: `opacity 0.75s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.75s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
    }}>
      {children}
    </div>
  )
}

/* ===== Single milestone block — left spine, content to the right ===== */
function Milestone({ m }: { m: typeof milestones[0] }) {
  const { ref, visible } = useInView(0.1)

  return (
    <div ref={ref} className="relative pl-16 pb-16 md:pl-24 md:pb-20">
      {/* Node on the spine */}
      <div
        className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full border-2 md:h-14 md:w-14"
        style={{
          borderColor: m.accent,
          backgroundColor: visible ? `${m.accent}18` : "transparent",
          boxShadow: visible ? `0 0 24px ${m.accent}30, 0 0 48px ${m.accent}12` : "none",
          transform: visible ? "scale(1)" : "scale(0.6)",
          transition: "all 0.6s cubic-bezier(0.34,1.56,0.64,1) 0.05s",
        }}
      >
        {m.icon(m.accent)}
        {visible && (
          <span
            className="absolute inline-flex h-full w-full rounded-full animate-ping opacity-20"
            style={{ backgroundColor: m.accent, animationDuration: "2.5s" }}
          />
        )}
      </div>

      {/* Content */}
      <div
        className="flex flex-col gap-5"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateX(20px)",
          transition: "opacity 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s, transform 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s",
        }}
      >
        {/* Period pill */}
        <div className="flex flex-wrap items-center gap-2">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[11px] font-black uppercase tracking-widest"
            style={{ backgroundColor: `${m.accent}18`, color: m.accent }}
          >
            {m.period}
          </span>
          {m.isExpansion && (
            <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-[#555]">
              Post-Kickstarter
            </span>
          )}
        </div>

        {/* Tag + Title */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#555]">{m.tag}</p>
          <h3 className="mt-1.5 text-xl font-black leading-tight text-white md:text-2xl">{m.title}</h3>
          <p className="mt-1 text-sm italic text-[#666]">{m.subtitle}</p>
        </div>

        {/* Divider */}
        <div className="h-px w-10" style={{ backgroundColor: `${m.accent}50` }} />

        {/* Bullets */}
        <ul className="flex flex-col gap-2">
          {m.bullets.map((b, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-[13px] leading-relaxed text-[#888]"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateX(-16px)",
                transition: `opacity 0.45s ease ${0.25 + i * 0.06}s, transform 0.45s ease ${0.25 + i * 0.06}s`,
              }}
            >
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: m.accent }} />
              <span>{b}</span>
            </li>
          ))}
        </ul>

        {/* Image */}
        {m.image && (
          <div
            className="relative w-full max-w-xl overflow-hidden rounded-xl border"
            style={{
              aspectRatio: "4/3",
              borderColor: `${m.accent}25`,
              backgroundColor: `${m.accent}06`,
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateY(12px)",
              transition: "opacity 0.6s ease 0.35s, transform 0.6s ease 0.35s",
            }}
          >
            <img
              src={m.image || "/placeholder.svg"}
              alt={`${m.title} — ${m.period}`}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        )}
      </div>
    </div>
  )
}

export function RoadmapSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#0b090d] px-6 py-28 md:py-36">

      {/* Background ambient glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/4 -translate-x-1/2 h-[800px] w-[600px] opacity-[0.04] blur-[120px]"
        style={{ background: "radial-gradient(ellipse at center, #b8975f 0%, transparent 70%)" }}
      />

      <div className="relative z-10 mx-auto max-w-3xl">

        {/* Header */}
        <div className="mb-20 text-center">
          <Fade delay={0}>
            <p className="text-[11px] font-bold uppercase tracking-[0.45em] text-[#444]">The Journey</p>
          </Fade>
          <Fade delay={0.1}>
            <h2 className="mt-5 text-4xl font-black uppercase tracking-tight text-white md:text-5xl lg:text-6xl text-balance">
              Road to
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #b8975f 0%, #d4be8a 50%, #b8975f 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Monichs Global
              </span>
            </h2>
          </Fade>
          <Fade delay={0.2}>
            <div className="mx-auto mt-7 h-px w-20 bg-gradient-to-r from-transparent via-[#b8975f]/40 to-transparent" />
          </Fade>
          <Fade delay={0.3}>
            <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-[#777]">
              Kickstarter isn&apos;t the finish line. It&apos;s the starting point.{" "}
              <span className="font-semibold text-white">Full transparency on where we&apos;re going.</span>
            </p>
          </Fade>
        </div>

        {/* Timeline: left spine with content to the right */}
        <div className="relative">
          <div
            className="absolute left-6 top-0 h-full w-px md:left-7"
            style={{ background: "linear-gradient(to bottom, transparent, #b8975f30 10%, #b8975f30 90%, transparent)" }}
          />
          {milestones.map((m, i) => (
            <Milestone key={i} m={m} />
          ))}
        </div>

        {/* Footer transparency note */}
        <Fade delay={0.1} direction="up">
          <div className="mt-16 rounded-3xl border border-[#b8975f]/15 bg-gradient-to-br from-[#b8975f]/5 to-transparent p-10 text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#b8975f] mb-4">
              Why share the roadmap?
            </p>
            <p className="mx-auto max-w-2xl text-[15px] leading-relaxed text-[#888]">
              Transparency. Anyone backing Monichs should know exactly where this project is heading.{" "}
              <span className="font-semibold text-white">
                Founder backers will always have a front-row seat:
              </span>{" "}
              lifetime VIP, exclusive previews, a direct voice in future decisions.{" "}
              <em className="text-[#b8975f]">This is your brand as much as it is ours.</em>
            </p>
          </div>
        </Fade>

      </div>
    </section>
  )
}
