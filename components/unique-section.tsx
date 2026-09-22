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

export function UniqueSection() {
  return (
    <section className="w-full bg-[#fafafa] px-6 pb-0 pt-14 md:pt-20">
      <div className="mx-auto max-w-4xl text-center">

        {/* Eyebrow */}
        <AnimatedItem delay={0} direction="up">
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#999]">
            The Craft
          </p>
        </AnimatedItem>

        {/* Section title */}
        <AnimatedItem delay={120} direction="up">
          <h2 className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight text-[#0a0a0a] md:text-5xl lg:text-6xl text-balance">
            Our Watches{" "}
            <span className="font-light italic text-[#666]">Features</span>
          </h2>
        </AnimatedItem>

        {/* Divider */}
        <AnimatedItem delay={220} direction="none">
          <div className="mx-auto mt-6 h-px w-16 bg-[#0a0a0a]/15" />
        </AnimatedItem>

      </div>
    </section>
  )
}
