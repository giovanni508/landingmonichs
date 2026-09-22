"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

const images = [
  { src: "https://lightgreen-fox-390407.hostingersite.com/wp-content/uploads/2026/04/Image-8.png", alt: "Monichs — detail 1" },
  { src: "https://lightgreen-fox-390407.hostingersite.com/wp-content/uploads/2026/04/Image-7-scaled.png", alt: "Monichs — detail 2" },
  { src: "https://lightgreen-fox-390407.hostingersite.com/wp-content/uploads/2026/04/Image-6-scaled.png", alt: "Monichs — detail 3" },
  { src: "https://lightgreen-fox-390407.hostingersite.com/wp-content/uploads/2026/04/Image-5-scaled.png", alt: "Monichs — detail 4" },
  { src: "https://lightgreen-fox-390407.hostingersite.com/wp-content/uploads/2026/04/Image-4.png", alt: "Monichs — detail 5" },
  { src: "https://lightgreen-fox-390407.hostingersite.com/wp-content/uploads/2026/04/Movement-1-scaled.png", alt: "Monichs movement" },
  { src: "https://lightgreen-fox-390407.hostingersite.com/wp-content/uploads/2026/04/Celeste_in_hand-scaled.png", alt: "Monichs Celeste in hand" },
  { src: "https://lightgreen-fox-390407.hostingersite.com/wp-content/uploads/2026/04/Main-2.png", alt: "Monichs Sunset" },
  { src: "https://lightgreen-fox-390407.hostingersite.com/wp-content/uploads/2026/04/3v.png", alt: "Monichs Virentia" },
]

// Duplicate for seamless infinite loop
const track = [...images, ...images, ...images]

export function WatchSlider() {
  const railRef = useRef<HTMLDivElement>(null)
  const posRef  = useRef(0)
  const rafRef  = useRef<number>(0)

  useEffect(() => {
    const rail = railRef.current
    if (!rail) return

    // Width of one full set (3 images)
    const getSetWidth = () => rail.scrollWidth / 3

    const animate = () => {
      posRef.current += 0.6 // px per frame — adjust speed here
      const setW = getSetWidth()
      if (posRef.current >= setW) posRef.current -= setW
      rail.style.transform = `translateX(-${posRef.current}px)`
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <section className="w-full bg-white py-6">
      {/* Scrolling strip */}
      <div className="relative w-full overflow-hidden">
        <div
          ref={railRef}
          className="flex will-change-transform"
          style={{ width: "max-content" }}
        >
          {track.map((img, i) => (
            <div
              key={i}
              className="relative mx-1.5 shrink-0 overflow-hidden rounded-sm"
              style={{ width: "clamp(260px, 30vw, 420px)", aspectRatio: "4/3" }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover object-center"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Progress bar — purely decorative, full-width sweep on 12s loop */}
      <div className="mx-auto mt-4 h-[2px] w-1/2 overflow-hidden rounded-full bg-[#00000015]">
        <div
          className="h-full rounded-full bg-[#0a0a0a]"
          style={{ animation: "slider-progress 12s linear infinite" }}
        />
      </div>

      <style>{`
        @keyframes slider-progress {
          0%   { width: 0%; margin-left: 0%; }
          80%  { width: 60%; margin-left: 40%; }
          100% { width: 0%; margin-left: 100%; }
        }
      `}</style>
    </section>
  )
}
