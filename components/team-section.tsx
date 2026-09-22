"use client"

import { useRef, useEffect, useState } from "react"

const team = [
  {
    name: "Giovanni Giordano",
    role: "Strategy, Community & Design",
    born: "November 1997",
    bio: "Bocconi graduate in Economics, Master in Digital Marketing. Founder of a communications agency. Giovanni bridges strategy, community and design — he knows what works in product launches and authentic brand building. A genuine watch enthusiast who made the leap from collector to entrepreneur in 2023.",
    conviction: "A brand should grow with its community, not above it.",
    tags: ["Strategy", "Design", "Brand Building", "Community"],
    photo: "https://lightgreen-fox-390407.hostingersite.com/wp-content/uploads/2026/04/Main-4.png",
  },
  {
    name: "Filippo Triberti",
    role: "Operations & Digital",
    born: "December 2001",
    bio: "Electrical engineering diploma, self-taught digital marketer through real client work. Raised in a family of entrepreneurs, Filippo brings natural initiative and pragmatism. For him, a watch represents time invested in growth and risk.",
    conviction: "He turns ideas into action — the operational engine behind Monichs.",
    tags: ["Operations", "Digital", "Engineering"],
    photo: "https://lightgreen-fox-390407.hostingersite.com/wp-content/uploads/2026/04/Main-2-1.png",
  },
]

function useFadeIn(delay = 0) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return {
    ref,
    style: {
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : "translateY(28px)",
      transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
    } as const,
  }
}

function MemberCard({
  member,
  index,
}: {
  member: (typeof team)[number]
  index: number
}) {
  const card = useFadeIn(index === 0 ? 0 : 100)
  // Alternate desktop layout: first card image-left, second card image-right.
  const reversed = index % 2 === 1

  return (
    <article
      ref={card.ref}
      style={card.style}
      className="grid grid-cols-1 overflow-hidden rounded-2xl bg-white shadow-sm md:grid-cols-2"
    >
      {/* Photo */}
      <div
        className={`relative min-h-[340px] overflow-hidden bg-[#ebe8e3] md:min-h-[520px] ${
          reversed ? "md:order-2" : ""
        }`}
      >
        <img
          src={member.photo || "/placeholder.svg"}
          alt={`Portrait of ${member.name}`}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Text content */}
      <div
        className={`flex flex-col justify-center p-8 md:p-10 lg:p-14 ${
          reversed ? "md:order-1" : ""
        }`}
      >
        {/* Index marker */}
        <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-[#bbb]">
          {String(index + 1).padStart(2, "0")} / {String(team.length).padStart(2, "0")}
        </p>

        {/* Tags */}
        <div className="mt-6 flex flex-wrap gap-2">
          {member.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[#e5e0d8] px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-[#888]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Name & Role */}
        <h3 className="mt-6 text-2xl font-bold tracking-tight text-[#0a0a0a] md:text-3xl">
          {member.name}
        </h3>
        <p className="mt-1 text-sm font-semibold uppercase tracking-[0.2em] text-[#aaa]">
          {member.role}
        </p>

        {/* Divider */}
        <div className="mt-6 h-px w-8 bg-[#e5e0d8]" />

        {/* Born */}
        <p className="mt-6 text-[12px] uppercase tracking-widest text-[#bbb]">
          {member.born}
        </p>

        {/* Bio */}
        <p className="mt-3 text-[14px] leading-[1.85] text-[#555]">{member.bio}</p>

        {/* Conviction */}
        <blockquote className="mt-6 border-l-2 border-[#0a0a0a] pl-4 text-[14px] font-medium italic leading-relaxed text-[#0a0a0a]">
          &ldquo;{member.conviction}&rdquo;
        </blockquote>
      </div>
    </article>
  )
}

export function TeamSection() {
  const header = useFadeIn()

  return (
    <section className="w-full bg-[#f7f5f2] px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div ref={header.ref} style={header.style} className="mb-16 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#999]">
            Who is behind Monichs
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#0a0a0a] md:text-4xl lg:text-5xl text-balance">
            Two Minds,{" "}
            <span className="font-light italic text-[#888]">One Vision</span>
          </h2>
          <div className="mx-auto mt-6 h-px w-10 bg-[#ddd]" />
          <p className="mx-auto mt-6 max-w-xl text-[14px] leading-relaxed text-[#666]">
            Not just two guys with an idea. Entrepreneurs, designers, strategists.
            And above all, enthusiasts who turned years of study and determination
            into a real project.
          </p>
        </div>

        {/* Static stack — vertical on mobile, alternating on desktop */}
        <div className="flex flex-col gap-10 md:gap-14">
          {team.map((member, i) => (
            <MemberCard key={member.name} member={member} index={i} />
          ))}
        </div>

        {/* Team Approach footer note */}
        <p className="mx-auto mt-12 max-w-3xl text-center text-[13px] leading-relaxed text-[#999] md:mt-16">
          No rigid labels, no unnecessary hierarchy. In a startup like ours, everyone wears multiple hats.{" "}
          <span className="font-medium text-[#666]">
            It&apos;s a constant exchange of ideas and collaboration — and it&apos;s exactly what gives us
            a 360-degree perspective on everything we do.
          </span>
        </p>
      </div>
    </section>
  )
}
