'use client'

import { useEffect, useRef, useState } from 'react'

export function WatchSpecsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[55vh] md:h-[60vh] overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/images/watch-sideview.png)',
        }}
      />

      {/* Top Gradient Overlay */}
      <div
        className="absolute top-0 left-0 right-0 h-32 md:h-40 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, #0b090d 0%, rgba(11, 9, 13, 0.5) 50%, transparent 100%)',
        }}
      />

      {/* Specs Cards Container */}
      <div className="absolute bottom-6 md:bottom-8 left-0 right-0 z-10 flex justify-between items-end px-6 md:px-10 lg:px-14">
        {/* Left: Two Circles */}
        <div className="flex items-end gap-3 md:gap-4">
          {/* Cassa Circle */}
          <div
            className={`transform transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: isVisible ? '200ms' : '0ms' }}
          >
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full backdrop-blur-md bg-white/15 border border-white/25 flex flex-col items-center justify-center text-center">
              <span className="text-[10px] md:text-xs font-light text-white/70 leading-none">
                Case
              </span>
              <span className="text-[11px] md:text-xs font-normal text-white/80 leading-tight mt-0.5">
                Steel
              </span>
              <span className="text-xl md:text-2xl font-bold text-white leading-none mt-1">
                316L
              </span>
            </div>
          </div>

          {/* Bracciale Circle */}
          <div
            className={`transform transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: isVisible ? '350ms' : '0ms' }}
          >
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full backdrop-blur-md bg-white/15 border border-white/25 flex flex-col items-center justify-center text-center">
              <span className="text-[10px] md:text-xs font-light text-white/70 leading-none">
                Bracelet
              </span>
              <span className="text-[11px] md:text-xs font-normal text-white/80 leading-tight mt-0.5">
                Integrated
              </span>
              <span className="text-xl md:text-2xl font-bold text-white leading-none mt-1">
                100%
              </span>
            </div>
          </div>
        </div>

        {/* Right: Two Rectangular Cards */}
        <div className="flex items-end gap-3 md:gap-4">
          {/* Sellita Card */}
          <div
            className={`transform transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: isVisible ? '500ms' : '0ms' }}
          >
            <div className="rounded-xl backdrop-blur-md bg-white/15 border border-white/25 px-5 py-4 md:px-6 md:py-5 min-w-[120px] md:min-w-[140px]">
              <div className="flex items-start gap-0.5">
                <span className="text-sm md:text-base font-medium text-white/90">
                  Sellita
                </span>
                <span className="text-[8px] text-white/60 -mt-0.5">↗</span>
              </div>
              <p className="text-lg md:text-xl font-bold text-white leading-tight">
                SW200
              </p>
              <p className="text-[10px] md:text-xs text-white/60 font-light mt-2 leading-tight">
                Élaboré
                <br />
                movement
              </p>
              <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-white/10 border border-white/20 text-[9px] md:text-[10px] text-white/70 font-medium">
                Swiss Made
              </span>
            </div>
          </div>

          {/* Hard Coating Card */}
          <div
            className={`transform transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: isVisible ? '650ms' : '0ms' }}
          >
            <div className="rounded-xl backdrop-blur-md bg-white/15 border border-white/25 px-5 py-4 md:px-6 md:py-5 min-w-[120px] md:min-w-[140px]">
              <div className="flex items-start gap-0.5">
                <span className="text-sm md:text-base font-medium text-white/90">
                  Hard
                </span>
                <span className="text-[8px] text-white/60 -mt-0.5">↗</span>
              </div>
              <p className="text-lg md:text-xl font-bold text-white leading-tight">
                coating
              </p>
              <p className="text-[10px] md:text-xs text-white/60 font-light mt-2 leading-tight">
                Protective
                <br />
                layer
              </p>
              <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-white/10 border border-white/20 text-[9px] md:text-[10px] text-white/70 font-medium">
                Scratch-resistant
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
