import Link from "next/link"

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Cookie Policy", href: "/cookies" },
  { label: "Imprint", href: "/imprint" },
]

const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com/monichs.swiss",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/people/Monichs/61551995049130",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.5 21v-8h2.7l.4-3.1H13.5V7.9c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1v2.3H7.7V13h2.7v8h3.1z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:hello@monichs.com",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    ),
  },
]

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="w-full bg-[#0a0a0a] text-[#d9d4cc]">
      {/* Top section: logo + tagline + social */}
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="flex flex-col items-start gap-10 md:flex-row md:items-center md:justify-between">
          {/* Brand */}
          <div className="flex flex-col gap-5">
            <Link href="/" aria-label="Monichs home" className="inline-block">
              <img
                src="https://lightgreen-fox-390407.hostingersite.com/wp-content/uploads/2026/04/Logo-in-linea-1.png"
                alt="Monichs"
                className="h-10 w-auto object-contain md:h-12"
              />
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-white/60">
              Designed in Italy, engineered in Switzerland. A trilogy of mechanical watches
              built for collectors who value substance over spectacle.
            </p>
          </div>

          {/* Social */}
          <nav aria-label="Social media" className="flex items-center gap-3">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-[#b8975f] hover:text-[#b8975f]"
              >
                {s.icon}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-auto max-w-6xl px-6">
        <div className="h-px w-full bg-white/10" />
      </div>

      {/* Bottom section: legal */}
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
          {/* Copyright */}
          <p className="text-xs leading-relaxed text-white/50">
            &copy; {year} Monichs Watches. All rights reserved.
            <span className="mx-2 hidden text-white/25 md:inline">·</span>
            <br className="md:hidden" />
            <span className="text-white/50">Swiss Made. Handcrafted with intention.</span>
          </p>

          {/* Legal links */}
          <nav aria-label="Legal" className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {legalLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs text-white/60 transition-colors hover:text-[#b8975f]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
