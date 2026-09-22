"use client"

import { useState } from "react"

const STRIPE_CHECKOUT_URL = "#stripe-checkout"

export function ReservePage() {
  const [number, setNumber] = useState("01")
  const checkoutUrl = `${STRIPE_CHECKOUT_URL}?edition=${number}`

  return (
    <main className="min-h-screen overflow-hidden bg-[#07111f] text-[#f4e6da]">
      <section className="relative isolate flex min-h-screen items-center px-5 py-8 sm:px-8 lg:px-14">
        <div aria-hidden="true" className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_72%_45%,rgba(232,197,166,0.15),transparent_30%),radial-gradient(circle_at_18%_15%,rgba(65,107,148,0.2),transparent_32%)]" />
        <div aria-hidden="true" className="absolute right-[-18rem] top-[-16rem] -z-10 h-[42rem] w-[42rem] rounded-full border border-[#e8c5a6]/10" />
        <div aria-hidden="true" className="absolute right-[-9rem] top-[-7rem] -z-10 h-[26rem] w-[26rem] rounded-full border border-[#e8c5a6]/10" />
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="order-2 max-w-xl lg:order-1">
            <div className="mb-8 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-[#e8c5a6]"><span className="h-px w-8 bg-[#e8c5a6]/70" />Monichs · Super Early Bird</div>
            <h1 className="max-w-lg text-4xl font-semibold leading-[0.98] tracking-[-0.05em] text-[#f7eee8] sm:text-6xl">Your place in the first 50.</h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-[#f4e6da]/65 sm:text-lg">Reserve your Super Early Bird price for just $5. You&apos;ll secure the $1,400 launch offer before the campaign goes live.</p>
            <div className="mt-9 rounded-2xl border border-[#e8c5a6]/20 bg-white/[0.045] p-5 backdrop-blur-sm sm:p-6">
              <div className="flex items-end justify-between gap-4"><div><p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#e8c5a6]">Reservation</p><p className="mt-2 text-3xl font-semibold tracking-tight">$5</p><p className="mt-1 text-xs text-[#f4e6da]/45">Applied toward your Super Early Bird purchase</p></div><div className="text-right"><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#f4e6da]/45">Only</p><p className="mt-1 text-2xl font-semibold text-[#e8c5a6]">50 spots</p><p className="mt-1 text-xs text-[#f4e6da]/45">available worldwide</p></div></div>
              <div className="mt-6 border-t border-[#e8c5a6]/15 pt-5"><label htmlFor="edition-number" className="flex items-center justify-between text-xs font-semibold text-[#f4e6da]/80">Choose your engraved number<span className="font-normal text-[#f4e6da]/40">1–50</span></label><select id="edition-number" value={number} onChange={(event) => setNumber(event.target.value)} className="mt-3 h-12 w-full rounded-lg border border-[#e8c5a6]/35 bg-[#07111f] px-4 text-sm font-semibold text-[#f4e6da] outline-none transition focus:border-[#e8c5a6] focus:ring-2 focus:ring-[#e8c5a6]/20">{Array.from({ length: 50 }, (_, index) => { const value = String(index + 1).padStart(2, "0"); return <option key={value} value={value}>#{value}</option> })}</select><p className="mt-2 text-[11px] leading-relaxed text-[#f4e6da]/40">Number selection is subject to availability and is confirmed after payment.</p></div>
              <a href={checkoutUrl} className="cta-red mt-5 no-underline"><span>Reserve now · $5</span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></a>
            </div>
            <p className="mt-5 text-center text-[11px] text-[#f4e6da]/35 sm:text-left">Secure checkout · Limited to the first 50 reservations</p>
          </div>
          <div className="order-1 flex justify-center lg:order-2 lg:justify-end"><div className="relative w-full max-w-[34rem]"><div aria-hidden="true" className="absolute -inset-6 rounded-[2rem] bg-[#e8c5a6]/10 blur-3xl" /><div className="relative overflow-hidden rounded-[1.5rem] border border-[#e8c5a6]/20 bg-[#101d2e] shadow-[0_30px_100px_-30px_rgba(0,0,0,0.8)]"><img src="/images/watch-hero.png" alt="Monichs Swiss Made watch" className="aspect-[4/5] w-full object-cover object-center" /><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#07111f] via-[#07111f]/45 to-transparent px-5 pb-5 pt-20"><p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#e8c5a6]">Swiss Made · Limited Edition</p><p className="mt-2 text-sm text-[#f4e6da]/75">Designed in Italy. Engineered in Switzerland.</p></div></div><div className="absolute -bottom-4 -left-3 rounded-full border border-[#e8c5a6]/35 bg-[#07111f]/90 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#e8c5a6] backdrop-blur-md sm:-left-5">Edition 01—50</div></div></div>
        </div>
      </section>
    </main>
  )
}
