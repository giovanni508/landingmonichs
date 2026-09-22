"use client"

import { useEffect, useRef, useState } from "react"

function useFadeIn(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
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

export function DetailsSection() {
  return (
    <section className="w-full bg-[#fafafa] px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">

        {/* Row 1: Case Size - Text Left, Image Right */}
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <AnimatedItem delay={0} direction="left">
            <div>
              <h3 className="text-2xl font-bold text-[#0a0a0a] md:text-3xl">
                38mm. A deliberate choice.
              </h3>
              <p className="mt-4 text-[15px] leading-[1.85] text-[#555]">
                Proportion over trend, wearability over size.
                A watch that feels right on any wrist.
              </p>
            </div>
          </AnimatedItem>
          <AnimatedItem delay={150} direction="right">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#e5e5e5]">
              <img
                src="https://lightgreen-fox-390407.hostingersite.com/wp-content/uploads/2026/04/Celeste_in_hand.png"
                alt="Celeste watch 38mm on wrist"
                className="h-full w-full object-cover"
              />
            </div>
          </AnimatedItem>
        </div>

        {/* Spacer */}
        <div className="my-20 h-px w-full bg-[#e0e0e0]" />

        {/* Row 2: Hard Coating - Image Left, Text Right (mobile: text first) */}
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <AnimatedItem delay={0} direction="left" className="order-2 md:order-1">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#e5e5e5]">
              <img
                src="https://lightgreen-fox-390407.hostingersite.com/wp-content/uploads/2026/04/Bracelet.png"
                alt="Monichs bracelet detail"
                className="h-full w-full object-cover"
              />
            </div>
          </AnimatedItem>
          <AnimatedItem delay={150} direction="right" className="order-1 md:order-2">
            <div>
              <h3 className="text-2xl font-bold text-[#0a0a0a] md:text-3xl">
                1,200 Vickers hardness.
              </h3>
              <p className="mt-4 text-[15px] leading-[1.85] text-[#555]">
                Hard coating: scratch-resistant after years of daily wear.
                Tool-watch protection on a refined timepiece.
              </p>
            </div>
          </AnimatedItem>
        </div>

        {/* Spacer */}
        <div className="my-20 h-px w-full bg-[#e0e0e0]" />

        {/* Row 3: Movement - Text Left, Image Right */}
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <AnimatedItem delay={0} direction="left">
            <div>
              <h3 className="text-2xl font-bold text-[#0a0a0a] md:text-3xl">
                Sellita SW200-2 Elabore.
              </h3>
              <p className="mt-4 text-[15px] leading-[1.85] text-[#555]">
                Swiss Made, 65-hour power reserve, Cotes de Geneve finishing.
                Sapphire crystal. 10 ATM water resistance.
              </p>
            </div>
          </AnimatedItem>
          <AnimatedItem delay={150} direction="right">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#e5e5e5]">
              <img
                src="https://lightgreen-fox-390407.hostingersite.com/wp-content/uploads/2026/04/Movement-scaled.png"
                alt="Sellita SW200-2 Elabore movement"
                className="h-full w-full object-cover"
              />
            </div>
          </AnimatedItem>
        </div>

        {/* Spacer */}
        <div className="my-20 h-px w-full bg-[#e0e0e0]" />

        {/* Row 4: Rotor - Image Left, Text Right (mobile: text first) */}
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <AnimatedItem delay={0} direction="left" className="order-2 md:order-1">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#e5e5e5]">
              <img
                src="https://lightgreen-fox-390407.hostingersite.com/wp-content/uploads/2026/04/rotor.png"
                alt="Custom Monichs rotor with Cotes de Geneve finishing"
                className="h-full w-full object-cover"
              />
            </div>
          </AnimatedItem>
          <AnimatedItem delay={150} direction="right" className="order-1 md:order-2">
            <div>
              <h3 className="text-2xl font-bold text-[#0a0a0a] md:text-3xl">
                Custom Monichs rotor.
              </h3>
              <p className="mt-4 text-[15px] leading-[1.85] text-[#555]">
                On open-caseback models, the standard rotor has been replaced with a
                Monichs-designed rotor — custom decorated with our insignia and
                Cotes de Geneve. Because hidden details should carry the same
                intention as visible ones.
              </p>
            </div>
          </AnimatedItem>
        </div>

        {/* Spacer */}
        <div className="my-20 h-px w-full bg-[#e0e0e0]" />

        {/* Row 5: Clasp & Lume - Text Left, Image Right */}
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <AnimatedItem delay={0} direction="left">
            <div>
              <h3 className="text-2xl font-bold text-[#0a0a0a] md:text-3xl">
                Engineered details.
              </h3>
              <p className="mt-4 text-[15px] leading-[1.85] text-[#555]">
                Deployant clasp engineered for the integrated bracelet.
                SuperLumiNova indices for any-light legibility.
              </p>
            </div>
          </AnimatedItem>
          <AnimatedItem delay={150} direction="right">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#e5e5e5]">
              <img
                src="https://lightgreen-fox-390407.hostingersite.com/wp-content/uploads/2026/04/Luminova.png"
                alt="SuperLumiNova indices glowing in low light"
                className="h-full w-full object-cover"
              />
            </div>
          </AnimatedItem>
        </div>

        {/* Closing Statement */}
        <AnimatedItem delay={200} direction="up">
          <div className="mt-24 text-center">
            <p className="text-xl font-bold tracking-tight text-[#0a0a0a] md:text-2xl lg:text-3xl">
              Design, engineering, attention to detail.
              <br />
              <span className="font-light italic text-[#666]">
                Everything custom. Everything ours.
              </span>
            </p>
          </div>
        </AnimatedItem>

      </div>
    </section>
  )
}
