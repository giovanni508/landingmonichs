"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { submitLead } from "@/lib/submit-lead"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function EarlyBirdSignup() {
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
        source: "hero_early_bird",
      })
      router.push("/thank-you/super-early-bird")
    } catch {
      setStatus("error")
      setError("Something went wrong. Please try again in a moment.")
    }
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#e8c5a6]/25 bg-[#0b1628]/70 p-6 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.55)] backdrop-blur-md md:p-7">
      {/* Top accent stripe */}
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#e8c5a6]/50 to-transparent" />

      {/* Soft glow halo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-6 -z-10 rounded-[28px] bg-[#e8c5a6]/[0.07] blur-3xl"
      />

      {/* Kickstarter logo image (above the section) — centered */}
      <div className="mb-5 flex justify-center md:mb-6 md:justify-center">
        <img
          src="/images/kickstarter-coming-soon.png"
          alt="Coming soon on Kickstarter"
          className="h-14 w-auto md:h-16"
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* Eyebrow — centered on mobile (no dash), with dash on desktop */}
      <div className="flex items-center justify-center gap-3 md:justify-start">
        <span className="hidden h-px w-8 bg-[#e8c5a6]/70 md:inline-block" />
        <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#e8c5a6]">
          Early Bird Access
        </span>
      </div>

      <h3 className="mt-3 text-[22px] font-bold leading-tight tracking-tight text-[#f4e6da] md:text-2xl">
        Be first to secure launch day pricing
      </h3>

      <p className="mt-2 max-w-md text-[13px] leading-relaxed text-[#f4e6da]/65">
        Available for the first 24 hours only.
      </p>

      {/* Super Early Bird badge — with explicit price comparison */}
      <div
        className="relative mt-5 overflow-hidden rounded-xl border border-[#e8c5a6]/45 bg-gradient-to-r from-[#e8c5a6]/[0.16] via-[#e8c5a6]/[0.10] to-[#e8c5a6]/[0.04] shadow-[0_10px_30px_-12px_rgba(232,197,166,0.45)]"
        role="group"
        aria-label="Super Early Bird offer: USD 1,400 instead of USD 2,400, first 24 hours only"
      >
        {/* Animated highlight sheen */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-[#f4e6da]/20 to-transparent"
          style={{ animation: "badge-sheen 3.6s ease-in-out infinite" }}
        />

        {/* Top row: label + window */}
        <div className="relative grid grid-cols-2 items-stretch divide-x divide-[#e8c5a6]/25">
          <div className="flex items-center justify-center px-2 py-2 text-center sm:px-3">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#f4e6da] sm:text-[10.5px]">
              Super Early Bird
            </span>
          </div>

          <div className="flex items-center justify-center gap-1.5 px-2 py-2 text-center sm:px-3">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="shrink-0 text-[#e8c5a6]"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" />
            </svg>
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#f4e6da]/90 sm:text-[10.5px]">
              First 24 hours
            </span>
          </div>
        </div>

        {/* Bottom row: WAS → NOW price comparison with discount chip */}
        <div className="relative flex items-center justify-center gap-3 border-t border-[#e8c5a6]/25 px-3 py-3 sm:gap-4 sm:px-4">
          {/* WAS price (struck through) */}
          <div className="flex flex-col items-center text-center">
            <span className="text-[8.5px] font-bold uppercase tracking-[0.22em] text-[#f4e6da]/45">
              Retail
            </span>
            <span className="mt-0.5 text-[13px] font-bold leading-none tracking-tight text-[#f4e6da]/45 line-through sm:text-[14px]">
              USD 2,400
            </span>
          </div>

          {/* Arrow */}
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
            className="shrink-0 text-[#e8c5a6]/70"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>

          {/* NOW price (the offer) */}
          <div className="flex flex-col items-center text-center">
            <span className="text-[8.5px] font-bold uppercase tracking-[0.22em] text-[#e8c5a6]">
              You pay
            </span>
            <span className="mt-0.5 text-[18px] font-black leading-none tracking-tight text-[#f4e6da] sm:text-[20px]">
              USD 1,400
            </span>
          </div>

          {/* Discount chip */}
          <span
            className="ml-1 inline-flex shrink-0 items-center rounded-full bg-[#c0392b] px-2 py-1 text-[9.5px] font-black uppercase tracking-[0.12em] text-white shadow-[0_4px_12px_-4px_rgba(192,57,43,0.6)] sm:text-[10px]"
            aria-label="42 percent off"
          >
            −42%
          </span>
        </div>

        {/* Save line — concrete saving in dollars */}
        <p className="relative border-t border-[#e8c5a6]/15 bg-[#0b1628]/40 px-3 py-1.5 text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-[#e8c5a6]">
          You save USD 1,000
        </p>
        <div className="flex justify-center border-t border-[#e8c5a6]/15 px-3 py-2">
          <span className="inline-flex items-center rounded-full border border-[#e8c5a6]/45 bg-[#e8c5a6]/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-[#f4e6da]">
            Payable in 3 installments
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3" noValidate>
        <label className="block">
          <span className="sr-only">Email address</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            placeholder="Email address"
            aria-label="Email address"
            className="h-14 w-full rounded-lg border-2 border-[#e8c5a6]/45 bg-[#f4e6da]/[0.08] px-4 text-[15px] text-[#f4e6da] placeholder:text-[#f4e6da]/70 outline-none transition-all hover:border-[#e8c5a6]/65 focus:border-[#e8c5a6] focus:bg-[#f4e6da]/[0.12] focus:ring-2 focus:ring-[#e8c5a6]/25"
          />
        </label>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="cta-red mt-1"
        >
          <span>{status === "submitting" ? "Locking in…" : "Lock in your early bird discount"}</span>
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
          <p role="alert" className="text-[12px] text-[#e8806a]">
            {error}
          </p>
        )}
      </form>
    </div>
  )
}
