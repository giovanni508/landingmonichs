"use client"

import { useRef, useEffect, useState } from "react"
import { ComponentCarousel } from "./component-carousel"

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

function Fade({
  children,
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode
  delay?: number
  direction?: "up" | "left" | "right" | "none"
}) {
  const { ref, visible } = useInView()
  const transforms: Record<string, string> = {
    up: "translateY(32px)",
    left: "translateX(-32px)",
    right: "translateX(32px)",
    none: "none",
  }
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : transforms[direction],
        transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  )
}

const cards = [
  {
    label: "Case",
    description: "Precision-machined 316L stainless steel. Every facet studied.",
    photo:
      "https://lightgreen-fox-390407.hostingersite.com/wp-content/uploads/2026/04/MNC_I25_Ed_Su-8.png",
    sketch:
      "https://lightgreen-fox-390407.hostingersite.com/wp-content/uploads/2026/04/Image-scaled.png",
  },
  {
    label: "Bracelet",
    description: "Fully integrated. Engineered for seamless case-to-bracelet flow.",
    photo:
      "https://lightgreen-fox-390407.hostingersite.com/wp-content/uploads/2026/04/MNC_I25_Ed_Ce-6.png",
    sketch:
      "https://lightgreen-fox-390407.hostingersite.com/wp-content/uploads/2026/04/Image-1-1.png",
  },
  {
    label: "Rotor",
    description: "Custom-decorated with Côtes de Genève and Monichs insignia.",
    photo:
      "https://lightgreen-fox-390407.hostingersite.com/wp-content/uploads/2026/04/MNC_I25_Ed_Vi-7-1-scaled.png",
    sketch:
      "https://lightgreen-fox-390407.hostingersite.com/wp-content/uploads/2026/04/Image-2-1.png",
  },
]

export function DesignDnaSection() {
  return (
    <section className="w-full bg-[#fafafa] px-6 py-[45px] md:py-[45px]">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <Fade delay={0}>
            <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#13294b]">
              Design DNA
            </p>
          </Fade>
          <Fade delay={0.1}>
            <h2 className="mt-4 text-3xl font-black uppercase tracking-tight text-[#0a0a0a] md:text-4xl lg:text-5xl text-balance">
              Designed in Italy
              <br />
              <span className="font-light italic text-[#13294b]">
                Engineered in Switzerland
              </span>
            </h2>
          </Fade>
          <Fade delay={0.2}>
            <div className="mx-auto mt-6 h-px w-12 bg-[#13294b]/20" />
          </Fade>
          <Fade delay={0.3}>
            <p className="mx-auto mt-6 max-w-lg text-[15px] leading-relaxed text-[#555]">
              Not a white-label project. Every component designed in Italy, engineered in
              Switzerland — from the first sketch to the custom rotor.{" "}
              <span className="font-semibold text-[#0a0a0a]">
                We don&apos;t pick parts from a catalogue. We create them.
              </span>
            </p>
          </Fade>

          {/* Editorial image — visual evidence of the craft */}
          <Fade delay={0.4}>
            <figure className="mx-auto mt-12 w-full max-w-4xl md:mt-16">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-[#13294b]/10 shadow-[0_30px_70px_-25px_rgba(19,41,75,0.35)]">
                <img
                  src="https://lightgreen-fox-390407.hostingersite.com/wp-content/uploads/2026/04/MNC_I25_Ed_Su-15-scaled.jpg"
                  alt="Monichs Delta Sunset on the wrist — designed in Italy, engineered in Switzerland"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </figure>
          </Fade>
        </div>

        {/* Mobile: static vertical stack — no carousel, just scroll */}
        <div className="md:hidden flex flex-col gap-8">
          {cards.map((card, i) => (
            <Fade key={card.label} delay={0.1 + i * 0.08}>
              <article className="group relative overflow-hidden rounded-2xl border border-[#13294b]/10 bg-[#0f1a2e] shadow-[0_18px_45px_-20px_rgba(19,41,75,0.45)]">
                {/* Photo */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#1A1210]">
                  <img
                    src={card.photo || "/placeholder.svg"}
                    alt={card.label}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                  {/* warm radial accent */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(ellipse at 50% 100%, rgba(184,115,51,0.25) 0%, rgba(184,115,51,0) 60%)",
                    }}
                  />
                  {/* Numbered marker */}
                  <span
                    aria-hidden="true"
                    className="absolute left-4 top-4 inline-flex h-8 min-w-8 items-center justify-center rounded-full bg-white/12 px-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md"
                  >
                    0{i + 1}
                  </span>
                </div>

                {/* Text */}
                <div className="px-5 pb-6 pt-5">
                  <h3 className="text-[24px] font-bold tracking-tight text-[#f4e6da] md:text-[20px]">
                    {card.label}
                  </h3>
                  <p className="mt-2 text-[18px] leading-relaxed text-[#a8a095] md:text-[14px]">
                    {card.description}
                  </p>
                </div>

                {/* Sketch reveal — paper texture */}
                <div className="relative border-t border-white/8">
                  <div className="flex items-center justify-between gap-3 bg-[#F2EBDC] px-5 py-3">
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#2B241C]/70">
                      The original sketch
                    </p>
                    <span
                      aria-hidden="true"
                      className="h-px flex-1 bg-[#2B241C]/15"
                    />
                  </div>
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F2EBDC]">
                    <img
                      src={card.sketch || "/placeholder.svg"}
                      alt={`${card.label} — original sketch`}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          "radial-gradient(ellipse at center, transparent 55%, rgba(80,55,30,0.12) 100%)",
                      }}
                    />
                  </div>
                </div>
              </article>
            </Fade>
          ))}
        </div>

        {/* Desktop: 3D Coverflow Carousel — allow side cards to extend beyond max-w-6xl */}
        <Fade delay={0.2}>
          <div className="hidden md:block md:mx-[-3rem] md:overflow-visible">
            <ComponentCarousel cards={cards} />
          </div>
        </Fade>

        {/* Tagline */}
        <Fade delay={0.35}>
          <div className="mx-auto mt-16 max-w-xl rounded-xl border border-[#13294b]/20 bg-[#13294b]/5 p-6 text-center">
            <p className="text-sm font-semibold italic text-[#13294b] leading-relaxed">
              &ldquo;Design, engineering, attention to detail.
              <br />
              Everything custom. Everything ours.&rdquo;
            </p>
          </div>
        </Fade>
      </div>
    </section>
  )
}
