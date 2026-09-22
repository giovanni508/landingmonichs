"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { submitLead } from "@/lib/submit-lead"

function useAnimateOnMount(delay: number = 0) {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(timeout)
  }, [delay])

  return { ref, visible }
}

function AnimatedElement({
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
  const { ref, visible } = useAnimateOnMount(delay)

  const translateFrom =
    direction === "up"
      ? "translate-y-8"
      : direction === "left"
        ? "-translate-x-8"
        : "translate-x-8"

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-x-0 translate-y-0" : `opacity-0 ${translateFrom}`
      } ${className}`}
    >
      {children}
    </div>
  )
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function EarlyBirdSection() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle")
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const mail = email.trim()

    if (!EMAIL_RE.test(mail)) {
      setError("Please enter a valid email address.")
      return
    }

    setError(null)
    setStatus("submitting")
    try {
      await submitLead({
        email: mail,
        source: "early_bird_section",
      })
      router.push("/thank-you/early-bird")
    } catch {
      setStatus("error")
      setError("Something went wrong. Please try again in a moment.")
    }
  }

  return (
    <section className="relative w-full overflow-hidden bg-white py-20 md:py-28">
      {/* Decorative ambient glow — subtle warm tint on a light canvas */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 15% 20%, rgba(184,115,51,0.08) 0%, rgba(184,115,51,0) 55%), radial-gradient(ellipse at 85% 80%, rgba(19,41,75,0.06) 0%, rgba(19,41,75,0) 60%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#13294b]/10 to-transparent"
      />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        {/* Eyebrow above the card */}
        <AnimatedElement delay={100} direction="up" className="mb-6 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#13294b]/15 bg-[#13294b]/[0.04] px-3.5 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#b87333]" />
            <span className="text-[10.5px] font-semibold uppercase tracking-[0.28em] text-[#13294b]">
              Founding Membership
            </span>
          </span>
        </AnimatedElement>

        {/* Elevated CTA card */}
        <AnimatedElement delay={200} direction="up">
          <div
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0f1a2e] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.85)]"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0) 35%)",
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr]">
              {/* Left: copy + form */}
              <div className="flex flex-col items-center justify-center px-6 py-10 text-center sm:px-10 lg:px-12 lg:py-14">
                {/* Kickstarter coming soon — visual cue above the CTA */}
                <AnimatedElement delay={240} direction="up" className="mb-6 flex justify-center">
                  <img
                    src="/images/kickstarter-coming-soon.png"
                    alt="Coming soon on Kickstarter"
                    className="h-14 w-auto md:h-16"
                    loading="lazy"
                    decoding="async"
                  />
                </AnimatedElement>

                {/* Title */}
                <AnimatedElement delay={300} direction="up">
                  <h2 className="text-balance text-3xl font-bold leading-[1.08] tracking-tight text-[#f4e6da] sm:text-4xl md:text-5xl">
                    Claim Your Place in the{" "}
                    <span className="italic font-light text-[#e8c5a6]">Monichs Club</span>
                  </h2>
                </AnimatedElement>

                {/* Divider */}
                <AnimatedElement delay={380} direction="up">
                  <div className="mx-auto mt-6 h-px w-12 bg-[#e8c5a6]/40" />
                </AnimatedElement>

                {/* Copy - Paragraph 1 */}
                <AnimatedElement delay={460} direction="up">
                  <p className="mx-auto mt-6 max-w-md text-[15px] leading-relaxed text-[#f4e6da]/70">
                    Join before launch: exclusive updates, private group, every milestone as it happens.
                  </p>
                </AnimatedElement>

                {/* Copy - Paragraph 2 */}
                <AnimatedElement delay={540} direction="up">
                  <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-[#f4e6da]/70">
                    Kickstarter backers enter the{" "}
                    <span className="font-semibold text-[#f4e6da]">
                      Monichs Club VIP for life
                    </span>
                    : early access to every future release, exclusive events, a role in shaping the brand.
                  </p>
                </AnimatedElement>

                {/* Signup Form */}
                <AnimatedElement delay={620} direction="up" className="mt-8 w-full max-w-md">
                  <form onSubmit={handleSubmit} className="flex flex-col gap-3" noValidate>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email address"
                      aria-label="Email address"
                      autoComplete="email"
                      required
                      className="w-full rounded-lg border-2 border-[#e8c5a6]/45 bg-[#f4e6da]/[0.08] px-5 py-4 text-[15px] text-[#f4e6da] placeholder-[#f4e6da]/70 outline-none transition-all hover:border-[#e8c5a6]/65 focus:border-[#e8c5a6] focus:bg-[#f4e6da]/[0.12] focus:ring-2 focus:ring-[#e8c5a6]/25"
                    />
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="cta-red mt-1"
                    >
                      <span>{status === "submitting" ? "Reserving…" : "Reserve my VIP seat now"}</span>
                      {status !== "submitting" && (
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                          className="cta-arrow"
                        >
                          <path d="M5 12h14" />
                          <path d="m12 5 7 7-7 7" />
                        </svg>
                      )}
                    </button>
                    {error && (
                      <p role="alert" className="text-[12px] text-[#ff8a7a]">
                        {error}
                      </p>
                    )}
                  </form>
                </AnimatedElement>
              </div>

              {/* Right: image — full bleed inside the card */}
              <AnimatedElement
                delay={300}
                direction="right"
                className="relative min-h-[280px] lg:min-h-0"
              >
                <div className="relative h-full w-full overflow-hidden lg:absolute lg:inset-0">
                  <img
                    src="https://lightgreen-fox-390407.hostingersite.com/wp-content/uploads/2026/04/Group-803.png"
                    alt="Monichs Club community"
                    className="h-full w-full object-cover"
                  />
                  {/* Subtle warm overlay to harmonize with the card */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(15,26,46,0.45) 0%, rgba(15,26,46,0) 30%)",
                    }}
                  />
                </div>
              </AnimatedElement>
            </div>
          </div>
        </AnimatedElement>
      </div>
    </section>
  )
}
