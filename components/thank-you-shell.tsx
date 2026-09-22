"use client"

import Link from "next/link"
import Image from "next/image"
import type { ReactNode } from "react"
import { SiteFooter } from "@/components/site-footer"

/* ── Accent tokens per page variant ─────────────────── */
type Accent = "gold" | "cream" | "brass"

const accentMap: Record<
  Accent,
  {
    text: string
    bgSoft: string
    border: string
    borderStrong: string
  }
> = {
  gold: {
    text: "text-[#e8c5a6]",
    bgSoft: "bg-[#e8c5a6]/10",
    border: "border-[#e8c5a6]/25",
    borderStrong: "border-[#e8c5a6]/50",
  },
  cream: {
    text: "text-[#f4e6da]",
    bgSoft: "bg-[#f4e6da]/10",
    border: "border-[#f4e6da]/25",
    borderStrong: "border-[#f4e6da]/50",
  },
  brass: {
    text: "text-[#d1a75a]",
    bgSoft: "bg-[#d1a75a]/12",
    border: "border-[#d1a75a]/30",
    borderStrong: "border-[#d1a75a]/55",
  },
}

/* ── Props ───────────────────────────────────────────── */
export function ThankYouShell({
  accent = "gold",
  eyebrow,
  title,
  subtitle,
}: {
  accent?: Accent
  eyebrow: string
  title: ReactNode
  subtitle: string
}) {
  const a = accentMap[accent]

  return (
    <>
      <main className="relative min-h-screen w-full overflow-x-hidden overflow-y-auto bg-[#0b1628] text-[#f4e6da]">
        {/* Background glows */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(232,197,166,0.10),transparent_60%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-[radial-gradient(ellipse_at_bottom,rgba(19,41,75,0.9),transparent_70%)]"
        />
        {/* Subtle grain */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.5'/></svg>\")",
          }}
        />

        <div className="relative mx-auto flex w-full max-w-4xl flex-col px-5 pt-8 pb-20 sm:px-6 md:pt-12 md:pb-24 lg:px-8 lg:pt-14">
          {/* ── Top bar: logo (left) + Kickstarter badge (right) ── */}
          <header className="flex items-center justify-between gap-4 border-b border-white/5 pb-6 md:pb-8">
            <Link
              href="/"
              aria-label="Back to Monichs home"
              className="inline-flex shrink-0"
            >
              <img
                src="https://lightgreen-fox-390407.hostingersite.com/wp-content/uploads/2026/04/Logo-in-linea-1.png"
                alt="Monichs"
                className="h-6 w-auto md:h-8 lg:h-9"
              />
            </Link>

            <img
              src="/images/kickstarter-coming-soon.png"
              alt="Coming soon on Kickstarter"
              className="h-8 w-auto md:h-10 lg:h-11"
            />
          </header>

          {/* ── Hero: gratitude (compact, sits at the top) ── */}
          <section className="mt-6 flex flex-col items-center text-center md:mt-8">
            <div
              className={`inline-flex items-center gap-2 rounded-full border ${a.border} ${a.bgSoft} px-3.5 py-1.5`}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={a.text}
                aria-hidden="true"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
              <span
                className={`text-[10.5px] font-semibold uppercase tracking-[0.24em] ${a.text}`}
              >
                {eyebrow}
              </span>
            </div>

            <h1 className="mt-4 max-w-2xl text-balance text-[24px] font-light leading-[1.15] tracking-tight text-[#f4e6da] sm:text-[28px] md:text-[32px]">
              {title}
            </h1>

            <p className="mx-auto mt-3 max-w-xl text-pretty text-[15px] leading-[1.65] text-[#f4e6da]/70 md:mt-4 md:text-[16px]">
              {subtitle}
            </p>
          </section>

          {/* ── Two next-step CTAs: Facebook (1) + Kickstarter (2) ── */}
          <section className="mt-10 md:mt-12">
            <p
              className={`text-center text-[10.5px] font-bold uppercase tracking-[0.28em] ${a.text}`}
            >
              Your next 2 steps
            </p>
            <p className="mx-auto mt-2 max-w-md text-center text-[13px] leading-[1.6] text-[#f4e6da]/65">
              Both take less than 30 seconds. Don&apos;t skip them — this is where
              the real perks live.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row md:mt-7">
              {/* 1 — Facebook private group */}
              <a
                href="https://www.facebook.com/groups/1325636005729742"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Step 1: Join the private Facebook group"
                className="group relative flex flex-1 items-center gap-4 overflow-hidden rounded-xl px-5 py-4 shadow-[0_12px_30px_-12px_rgba(24,119,242,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-12px_rgba(24,119,242,0.75)]"
                style={{ backgroundColor: "#1877F2" }}
              >
                {/* Step number badge */}
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/30"
                  aria-hidden="true"
                >
                  <span className="text-[16px] font-black leading-none text-white">
                    1
                  </span>
                </span>

                {/* Text */}
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-[0.22em] text-white/90">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="#ffffff"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path d="M13.5 21v-8h2.7l.4-3.1H13.5V7.9c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1v2.3H7.7V13h2.7v8h3.1z" />
                    </svg>
                    Facebook · Private Group
                  </p>
                  <p className="mt-1.5 text-[19px] font-extrabold leading-[1.15] text-white">
                    Join the private group
                  </p>
                  <p className="mt-1.5 text-[14px] leading-[1.5] text-white/90">
                    Sneak peeks, behind-the-scenes from Rachele&apos;s atelier and
                    early model previews.
                  </p>
                </div>

                {/* Arrow */}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </a>

              {/* 2 — Kickstarter Pre-Launch */}
              <a
                href="https://www.kickstarter.com/projects/monichs/monichs-delta-collection-italian-design-swiss-engineering"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Step 2: Get notified on Kickstarter launch day"
                className="group relative flex flex-1 items-center gap-4 overflow-hidden rounded-xl px-5 py-4 shadow-[0_12px_30px_-12px_rgba(5,206,82,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-12px_rgba(5,206,82,0.75)]"
                style={{ backgroundColor: "#05CE52" }}
              >
                {/* Step number badge */}
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/30"
                  aria-hidden="true"
                >
                  <span className="text-[16px] font-black leading-none text-white">
                    2
                  </span>
                </span>

                {/* Text */}
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-[0.22em] text-white/90">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="#ffffff"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path d="M3 4h3.5v6.4L10.4 4H14l-4.4 7L14 20h-3.6L6.5 13.3V20H3V4z" />
                    </svg>
                    Kickstarter · Pre-Launch
                  </p>
                  <p className="mt-1.5 text-[19px] font-extrabold leading-[1.15] text-white">
                    Notify me on launch day
                  </p>
                  <p className="mt-1.5 text-[14px] leading-[1.5] text-white/90">
                    Lock the Super Early Bird price during the first 24 hours.
                  </p>
                </div>

                {/* Arrow */}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </a>
            </div>
          </section>

          {/* ── Watches image ── */}
          <section className="mt-12 md:mt-16">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] md:aspect-[21/9]">
              <Image
                src="/images/watches-trio.jpg"
                alt="The Monichs Delta Trilogy — Sunset, Celeste, and Virentia"
                fill
                priority
                className="object-cover object-center"
                sizes="(min-width: 1024px) 56rem, 100vw"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b1628]/40 via-transparent to-transparent"
              />
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
    </>
  )
}
