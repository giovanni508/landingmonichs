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
  direction?: "up" | "down" | "left" | "right" | "none"
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [delay])

  const directionStyles = {
    up: "translate-y-8",
    down: "-translate-y-8",
    left: "translate-x-8",
    right: "-translate-x-8",
    none: "",
  }

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className} ${
        isVisible ? "opacity-100 translate-x-0 translate-y-0" : `opacity-0 ${directionStyles[direction]}`
      }`}
    >
      {children}
    </div>
  )
}

const watches = [
  {
    ref: "M-001",
    name: "Celeste",
    tagline: "Time seen from above.",
    description:
      "Clarity, essence, stillness. The powder-blue lacquered dial evokes altitude and silence. Clean lines, zero excess. A timepiece that speaks without shouting.",
    specs: [
      "38mm 316L steel",
      "Hard coating",
      "Integrated custom bracelet",
      "Deployant clasp",
      "Sellita SW200-2 Élaboré",
      "65h reserve",
      "Sapphire crystal",
      "SuperLumiNova",
      "10 ATM",
      "Closed caseback with erosion decoration",
      "Swiss Made",
    ],
    accent: "#3b82f6", // blue
  },
  {
    ref: "M-002",
    name: "Sunset",
    tagline: "Every piece is an unrepeatable emotion.",
    description:
      "The dial is cut from genuine natural agate: no two are identical. Like a sunset, your piece exists nowhere else in the world. Nature as designer.",
    specs: [
      "38mm 316L steel",
      "Hard coating",
      "Natural agate dial (unique)",
      "Integrated custom bracelet",
      "Deployant clasp",
      "Sellita SW200-2 Élaboré",
      "65h reserve",
      "Sapphire crystal",
      "SuperLumiNova",
      "10 ATM",
      "Closed caseback",
      "Swiss Made",
    ],
    accent: "#E35205", // orange
  },
  {
    ref: "M-003",
    name: "Virentia",
    tagline: "The silent heartbeat of nature.",
    description:
      "The flagship. Forest-green dial, rose gold bezel and central links, open caseback revealing the custom-designed Monichs rotor with Côtes de Genève finishing. Every detail — visible and hidden — carries the same intention.",
    specs: [
      "38mm 316L steel",
      "Hard coating",
      "Rose gold accents (bezel + central links)",
      "Integrated custom bracelet",
      "Deployant clasp",
      "Sellita SW200-2 Élaboré",
      "65h reserve",
      "Sapphire crystal",
      "SuperLumiNova",
      "10 ATM",
      "Open caseback with custom Monichs rotor",
      "Swiss Made",
    ],
    accent: "#4A6A1D", // deep forest green
  },
]

export function ProductHighlightsSection() {
  return (
    <section className="w-full bg-[#0b090d]">
      {/* Section Header */}
      <div className="px-6 py-24 text-center md:py-32">
        <FadeIn delay={0} direction="up">
          <p className="text-xs font-medium uppercase tracking-[0.4em] text-[#f4e6da]/50">
            Product Highlights
          </p>
        </FadeIn>
        <FadeIn delay={100} direction="up">
          <h2 className="mx-auto mt-6 max-w-3xl text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl text-balance">
            More than a watch:
            <br />
            <span className="font-light italic text-[#f4e6da]/70">a founding membership.</span>
          </h2>
        </FadeIn>
        <FadeIn delay={200} direction="up">
          <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-[#f4e6da]/60">
            Every Kickstarter purchase includes lifetime Monichs Club VIP.
            <br />
            The three Trilogy references:
          </p>
        </FadeIn>
      </div>

      {/* Watch Cards */}
      {watches.map((watch, index) => (
        <div
          key={watch.ref}
          className={`${index % 2 === 0 ? "bg-[#0b090d]" : "bg-[#0f0d12]"}`}
        >
          <div className="mx-auto max-w-7xl px-6 py-20 md:py-28 lg:px-8">
            <div
              className={`flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16 ${
                index % 2 === 0 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image Area */}
              <FadeIn
                delay={100}
                direction={index % 2 === 0 ? "left" : "right"}
                className="order-2 flex-1 lg:order-none"
              >
                <div className="relative">
                  {/* Main Hero Image Placeholder or Video */}
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#1a1a1a] md:aspect-[3/4]">
                    {watch.ref === "M-001" ? (
                      <video
                        className="absolute inset-0 h-full w-full object-cover"
                        muted
                        autoPlay
                        loop
                        playsInline
                      >
                        <source
                          src="https://lightgreen-fox-390407.hostingersite.com/wp-content/uploads/2026/04/CELESTE_INDOSSATI_VERT.mp4"
                          type="video/mp4"
                        />
                      </video>
                    ) : watch.ref === "M-002" ? (
                      <video
                        className="absolute inset-0 h-full w-full object-cover"
                        muted
                        autoPlay
                        loop
                        playsInline
                      >
                        <source
                          src="https://lightgreen-fox-390407.hostingersite.com/wp-content/uploads/2026/04/SUNSET-INDOSSATI-VERT_1.mp4"
                          type="video/mp4"
                        />
                      </video>
                    ) : watch.ref === "M-003" ? (
                      <video
                        className="absolute inset-0 h-full w-full object-cover"
                        muted
                        autoPlay
                        loop
                        playsInline
                      >
                        <source
                          src="https://lightgreen-fox-390407.hostingersite.com/wp-content/uploads/2026/04/VIRENTIA_INDOSSATI-VERT.mp4"
                          type="video/mp4"
                        />
                      </video>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div
                            className="mx-auto mb-4 h-20 w-20 rounded-full opacity-20"
                            style={{ backgroundColor: watch.accent }}
                          />
                          <p className="text-sm text-[#f4e6da]/30">
                            {watch.name} Hero Image
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  {/* Secondary Detail Images */}
                  {watch.ref === "M-002" && (
                    <div className="mt-4 grid grid-cols-3 gap-3">
                      {[
                        "https://lightgreen-fox-390407.hostingersite.com/wp-content/uploads/2026/04/Main-1.png",
                        "https://lightgreen-fox-390407.hostingersite.com/wp-content/uploads/2026/04/Main-2.png",
                        "https://lightgreen-fox-390407.hostingersite.com/wp-content/uploads/2026/04/Main.png",
                      ].map((src, i) => (
                        <div
                          key={i}
                          className="aspect-square overflow-hidden rounded-lg bg-[#1a1a1a]"
                        >
                          <img
                            src={src}
                            alt={`Sunset watch detail ${i + 1}`}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  {watch.ref === "M-003" && (
                    <div className="mt-4 grid grid-cols-3 gap-3">
                      {[
                        "https://lightgreen-fox-390407.hostingersite.com/wp-content/uploads/2026/04/1v.png",
                        "https://lightgreen-fox-390407.hostingersite.com/wp-content/uploads/2026/04/2v.png",
                        "https://lightgreen-fox-390407.hostingersite.com/wp-content/uploads/2026/04/3v.png",
                      ].map((src, i) => (
                        <div
                          key={i}
                          className="aspect-square overflow-hidden rounded-lg bg-[#1a1a1a]"
                        >
                          <img
                            src={src}
                            alt={`Virentia watch detail ${i + 1}`}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </FadeIn>

              {/*
                Content Area
                On mobile (flex-col) the wrapper uses `contents`, so its two
                children become direct flex items of the outer flex. Combined
                with `order-*`, the visual order on mobile becomes:
                  1. Description block (order-1)
                  2. Image (order-2)
                  3. Specifications (order-3)
                On desktop (lg:) the wrapper becomes a normal block column,
                restoring the original side-by-side layout.
              */}
              <div className="contents lg:order-none lg:block lg:max-w-lg lg:flex-1">
                <div className="order-1 lg:order-none">
                  <FadeIn delay={200} direction="up">
                    <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#f4e6da]/40">
                      Ref. {watch.ref}
                    </p>
                  </FadeIn>

                  <FadeIn delay={300} direction="up">
                    <h3
                      className="mt-4 text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl"
                      style={{ color: watch.accent }}
                    >
                      {watch.name}
                    </h3>
                  </FadeIn>

                  <FadeIn delay={400} direction="up">
                    <p className="mt-4 text-xl font-light italic text-white md:text-2xl">
                      &ldquo;{watch.tagline}&rdquo;
                    </p>
                  </FadeIn>

                  <FadeIn delay={500} direction="up">
                    <p className="mt-6 text-[15px] leading-[1.8] text-[#f4e6da]/70">
                      {watch.description}
                    </p>
                  </FadeIn>
                </div>

                <FadeIn
                  delay={600}
                  direction="up"
                  className="order-3 lg:order-none"
                >
                  <div className="border-[#f4e6da]/10 lg:mt-8 lg:border-t lg:pt-8">
                    <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#f4e6da]/50">
                      Specifications
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {watch.specs.map((spec) => (
                        <span
                          key={spec}
                          className="rounded-full border border-[#f4e6da]/15 bg-[#f4e6da]/5 px-3 py-1.5 text-[11px] text-[#f4e6da]/60"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}
