"use client"

import { useState } from "react"

const STRIPE_CHECKOUT_URL = "#stripe-checkout"

export function ReservePage() {
  const [number, setNumber] = useState("01")
  const checkoutUrl = `${STRIPE_CHECKOUT_URL}?edition=${number}`

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#07111f] text-[#f4e6da]">
      <section className="relative isolate flex min-h-screen items-start px-3 py-3 sm:items-center sm:px-8 sm:py-10 lg:px-14">
        <div aria-hidden="true" className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_75%_20%,rgba(232,197,166,0.16),transparent_34%),radial-gradient(circle_at_12%_85%,rgba(65,107,148,0.2),transparent_38%)]" />
        <div className="mx-auto grid w-full max-w-6xl items-center gap-3 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="order-2 text-center lg:order-1 lg:text-left">
            <div className="mb-2 flex items-center justify-center gap-2 text-[9px] font-bold uppercase tracking-[0.22em] text-[#e8c5a6] lg:justify-start"><span className="h-px w-6 bg-[#e8c5a6]/70" />Monichs · Super Early Bird</div>
            <h1 className="mx-auto max-w-md text-[1.8rem] font-semibold leading-[0.98] tracking-[-0.06em] text-[#f7eee8] sm:text-5xl lg:mx-0 lg:text-6xl">Your place in the first 50.</h1>
            <p className="mx-auto mt-2 max-w-sm text-[11px] leading-[1.35] text-[#f4e6da]/65 sm:text-base lg:mx-0 lg:text-lg">Reserve the $1,400 launch price for just $5 before the campaign goes live.</p>
            <div className="mx-auto mt-3 max-w-md rounded-2xl border border-[#e8c5a6]/25 bg-[#101d2e]/85 p-3 text-left shadow-2xl backdrop-blur-sm sm:p-6 lg:mx-0">
              <div className="flex items-end justify-between gap-3"><div><p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#e8c5a6]">Reserve today</p><p className="mt-1 text-3xl font-semibold tracking-tight">$5</p></div><div className="text-right"><p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#f4e6da]/45">Limited to</p><p className="mt-1 text-xl font-semibold text-[#e8c5a6]">50 spots</p></div></div>
              <div className="mt-3 border-t border-[#e8c5a6]/15 pt-3"><label htmlFor="edition-number" className="flex items-center justify-between text-[11px] font-semibold text-[#f4e6da]/85">Choose your engraved number <span className="font-normal text-[#f4e6da]/45">01–50</span></label><select id="edition-number" value={number} onChange={(event) => setNumber(event.target.value)} className="mt-2 h-11 w-full rounded-lg border border-[#e8c5a6]/45 bg-[#07111f] px-3 text-sm font-semibold text-[#f4e6da] outline-none transition focus:border-[#e8c5a6] focus:ring-2 focus:ring-[#e8c5a6]/25">{Array.from({ length: 50 }, (_, index) => { const value = String(index + 1).padStart(2, "0"); return <option key={value} value={value}>#{value}</option> })}</select></div>
              <a href={checkoutUrl} className="cta-red mt-4 min-h-11 justify-center no-underline"><span>Reserve now · $5</span><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></a>
            </div>
            <p className="mt-3 text-[10px] text-[#f4e6da]/40">Secure checkout · Applied toward your $1,400 purchase</p>
          </div>
          <div className="order-1 flex justify-center lg:order-2 lg:justify-end"><div className="relative w-full max-w-[34rem]"><div aria-hidden="true" className="absolute -inset-4 rounded-[1.5rem] bg-[#e8c5a6]/10 blur-3xl" /><div className="relative overflow-hidden rounded-[1.25rem] border border-[#e8c5a6]/25 bg-[#101d2e] shadow-[0_30px_100px_-30px_rgba(0,0,0,0.8)]"><img src="/images/watches-trio-detail.jpg" alt="Three Monichs Swiss Made watches" className="aspect-[16/5] w-full object-cover object-center sm:aspect-[4/3]" /><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#07111f] via-[#07111f]/45 to-transparent px-4 pb-3 pt-12 sm:px-5 sm:pb-5 sm:pt-20"><p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#e8c5a6]">Swiss Made · Limited Edition</p><p className="mt-1 text-xs text-[#f4e6da]/75 sm:text-sm">Designed in Italy. Engineered in Switzerland.</p></div></div><div className="absolute -bottom-3 left-3 rounded-full border border-[#e8c5a6]/35 bg-[#07111f]/95 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-[#e8c5a6] backdrop-blur-md sm:-left-5 sm:px-4 sm:py-2 sm:text-[10px]">Edition 01—50</div></div></div>
        </div>
      </section>
    </main>
  )
}
