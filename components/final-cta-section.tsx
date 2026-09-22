"use client"

import { useRef, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { submitLead } from "@/lib/submit-lead"

/* ── helpers ─────────────────────────────────────────── */
function useInView(threshold = 0.12) {
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

function Fade({
  children, delay = 0, direction = "up", className = "",
}: {
  children: React.ReactNode; delay?: number; direction?: "up" | "down" | "left" | "right" | "none"; className?: string
}) {
  const { ref, visible } = useInView()
  const offset =
    direction === "up" ? "translateY(36px)" :
    direction === "down" ? "translateY(-36px)" :
    direction === "left" ? "translateX(40px)" :
    direction === "right" ? "translateX(-40px)" : "none"
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : offset,
        transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  )
}

/* ── animated counter ────────────────────────────────── */
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const { ref, visible } = useInView(0.3)
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!visible) return
    let start: number | null = null
    const duration = 1400
    const step = (ts: number) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setVal(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [visible, target])
  return <span ref={ref}>{val}{suffix}</span>
}

/* ── product image carousel (single image, reserved for future multi-image) ─ */
function ProductCarousel({ badge }: { badge: string }) {
  return (
    <div className="relative overflow-hidden rounded-xl bg-[#0a0a1a] aspect-[4/3]">
      <img
        src="https://lightgreen-fox-390407.hostingersite.com/wp-content/uploads/2026/04/Main-7.png"
        alt="Watch packaging"
        className="h-full w-full object-cover"
      />

      {/* Warranty badge */}
      <div className="absolute left-3 top-3 rounded-md bg-[#0a0a0a]/75 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
        {badge}
      </div>
    </div>
  )
}

/* ── data ─────────────────────────────────────────────── */
const perks = [
  "Unique serial number",
  "Lifetime VIP Club",
  "2-year warranty",
  "Worldwide shipping",
]

const tiers = [
  {
    name: "Super Early Bird",
    price: "1,400",
    retail: "2,400",
    save: "1,000",
    currency: "$",
    suffix: " USD",
    note: "First 24 hours only",
    discount: "−42%",
    highlight: true,
    badge: "Best Deal",
    perks,
    showCarousel: true,
    carouselBadge: "2 year warranty",
  },
] as const

/* ── updates signup form ─────────────────────────────── */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function UpdatesForm() {
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
        source: "final_cta_updates",
      })
      router.push("/thank-you/updates")
    } catch {
      setStatus("error")
      setError("Something went wrong. Please try again in a moment.")
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-6 flex max-w-md flex-col gap-3"
      noValidate
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email address"
        aria-label="Email address"
        autoComplete="email"
        required
        className="w-full rounded-xl border-2 border-[#e8c5a6]/45 bg-[#f4e6da]/[0.08] px-5 py-4 text-[15px] text-[#f4e6da] placeholder-[#f4e6da]/70 outline-none transition-all hover:border-[#e8c5a6]/65 focus:border-[#e8c5a6] focus:bg-[#f4e6da]/[0.12] focus:ring-2 focus:ring-[#e8c5a6]/25"
      />
      <button
        type="submit"
        disabled={status === "submitting"}
        className="cta-red mt-1"
      >
        <span>{status === "submitting" ? "Sending…" : "Alert me before launch"}</span>
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
  )
}

/* ── check icon ──────────────────────────────────────── */
function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

/* ── component ────────────────────────────────────────── */
export function FinalCtaSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#f0ebe2] py-24 md:py-32">
      <div className="relative z-10 mx-auto max-w-6xl px-6">

        {/* ── Header ── */}
        <div className="text-center">
          <Fade delay={0}>
            <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#8a8578]">
              Limited Spots Available
            </p>
          </Fade>

          <Fade delay={0.1}>
            <h2 className="mt-5 text-5xl font-black uppercase tracking-tight text-[#0a0a0a] md:text-6xl lg:text-7xl leading-[1.02] text-balance">
              Let&apos;s Make
              <br />
              It Happen
            </h2>
          </Fade>

          <Fade delay={0.2}>
            <p className="mx-auto mt-6 max-w-md text-[13px] leading-relaxed text-[#777]">
              The Delta Trilogy is ready to launch on Kickstarter.
              Join now for exclusive updates, private community access,
              and early bird pricing before it&apos;s gone.
            </p>
          </Fade>
        </div>

        {/* ── Single stat card ── */}
        <Fade delay={0.3}>
          <div className="mt-10 flex justify-center">
            <div className="rounded-2xl bg-[#13294b] px-12 py-7 text-center">
              <p className="text-5xl font-black leading-none text-white">
                <Counter target={24} />
                <span className="ml-1 text-2xl font-bold tracking-wide text-white/70">h</span>
              </p>
              <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.22em] text-white/70">
                Super Early Bird Window
              </p>
            </div>
          </div>
        </Fade>

        {/* ── Pricing tiers ── */}
        <div className="mx-auto mt-14 grid max-w-md grid-cols-1 gap-5">
          {tiers.map((t, i) => (
            <Fade key={i} delay={0.35 + i * 0.1} direction="up">
              <div className="flex h-full flex-col gap-5">

                {/* Price card */}
                <div
                  className={`relative rounded-2xl p-6 transition-all duration-300 ${
                    t.highlight
                      ? "bg-[#13294b] text-white"
                      : "bg-white"
                  }`}
                >
                  {t.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="rounded-full bg-[#b8975f] px-3.5 py-1 text-[10px] font-black uppercase tracking-[0.15em] text-white">
                        {t.badge}
                      </span>
                    </div>
                  )}

                  {/* Top row: discount chip + retail strikethrough */}
                  <div className="flex flex-wrap items-center gap-2">
                    {t.discount ? (
                      <span
                        className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                          t.highlight
                            ? "bg-[#c0392b] text-white shadow-[0_4px_12px_-4px_rgba(192,57,43,0.6)]"
                            : "bg-[#13294b]/10 text-[#13294b]"
                        }`}
                      >
                        {t.discount}
                      </span>
                    ) : (
                      <span className="inline-block text-[10px] font-bold uppercase tracking-[0.22em] text-[#8a8578]">
                        {t.label}
                      </span>
                    )}

                    {t.retail && (
                      <span
                        className={`text-[12px] font-bold tracking-tight ${
                          t.highlight ? "text-white/45" : "text-[#999]"
                        }`}
                      >
                        Retail{" "}
                        <span className="line-through">
                          {t.currency}
                          {t.retail}
                        </span>
                      </span>
                    )}
                  </div>

                  <p
                    className={`mt-3 text-[11px] font-bold uppercase tracking-[0.22em] ${
                      t.highlight ? "text-white/70" : "text-[#888]"
                    }`}
                  >
                    {t.name}
                  </p>

                  <p
                    className={`mt-1 text-4xl font-black leading-tight ${
                      t.highlight ? "text-white" : "text-[#0a0a0a]"
                    }`}
                  >
                    {t.currency}
                    {t.price}
                    <span
                      className={`ml-1 align-baseline text-lg font-bold tracking-wide ${
                        t.highlight ? "text-white/70" : "text-[#888]"
                      }`}
                    >
                      USD
                    </span>
                  </p>

                  <p
                    className={`mt-1 text-[12px] ${
                      t.highlight ? "text-white/55" : "text-[#999]"
                    }`}
                  >
                    {t.note}
                  </p>

                  {/* Save banner — concrete dollar amount */}
                  {t.save && (
                    <div
                      className={`mt-4 flex items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-center ${
                        t.highlight
                          ? "border-[#e8c5a6]/35 bg-[#e8c5a6]/[0.10]"
                          : "border-[#13294b]/15 bg-[#13294b]/[0.04]"
                      }`}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                        className={`shrink-0 ${
                          t.highlight ? "text-[#e8c5a6]" : "text-[#13294b]"
                        }`}
                      >
                        <path d="m5 12 5 5L20 7" />
                      </svg>
                      <span
                        className={`text-[11px] font-extrabold uppercase tracking-[0.18em] ${
                          t.highlight ? "text-[#f4e6da]" : "text-[#13294b]"
                        }`}
                      >
                        You save {t.currency}
                        {t.save} USD
                      </span>
                    </div>
                  )}
                </div>

                {/* Perks list */}
                {t.perks && (
                  <ul className="flex flex-col gap-2.5 px-2 pt-1">
                    {t.perks.map((p, pi) => (
                      <li key={pi} className="flex items-center gap-2.5 text-[14px] font-semibold text-[#0a0a0a]">
                        <CheckIcon className="h-4 w-4 shrink-0 text-[#13294b]" />
                        {p}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Product carousel */}
                {t.showCarousel && (
                  <div className="mt-1">
                    <ProductCarousel badge={t.carouselBadge} />
                  </div>
                )}
              </div>
            </Fade>
          ))}
        </div>

        {/* ── Updates CTA card ── */}
        <Fade delay={0.75}>
          <div
            className="relative mt-16 mx-auto max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-[#0f1a2e] px-6 py-10 text-center shadow-[0_30px_80px_-30px_rgba(0,0,0,0.85)] md:px-10 md:py-12"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0) 35%)",
            }}
          >
            {/* Top accent stripe */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#e8c5a6]/40 to-transparent"
            />

            {/* Kickstarter coming soon �� visual cue above the heading */}
            <div className="mb-6 flex justify-center">
              <img
                src="/images/kickstarter-coming-soon.png"
                alt="Coming soon on Kickstarter"
                className="h-14 w-auto md:h-16"
                loading="lazy"
                decoding="async"
              />
            </div>

            <h3 className="text-2xl font-black uppercase tracking-tight text-[#f4e6da] md:text-3xl">
              Let&apos;s Make That Real!
            </h3>

            <p className="mx-auto mt-3 max-w-md text-[13px] leading-relaxed text-[#f4e6da]/65 md:text-[14px]">
              Please be sure to submit your email to receive our updates about the
              progress of the project and to get notified as soon as we&apos;re live.
            </p>

            <UpdatesForm />

            <p className="mt-5 text-[11px] text-[#f4e6da]/45">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </Fade>

      </div>
    </section>
  )
}
