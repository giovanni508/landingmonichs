"use client"

import { useEffect } from "react"

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

/**
 * Fires the Meta Pixel `Lead` event once on mount.
 * Mount this on every thank-you page so each successful form
 * submission is counted as a Lead conversion in Ads Manager.
 *
 * Optional props let you attach contextual data to the event
 * (e.g. content_name to differentiate the three TYPs).
 */
export function MetaPixelLead({
  contentName,
  value,
  currency = "USD",
}: {
  contentName?: string
  value?: number
  currency?: string
}) {
  useEffect(() => {
    // Wait briefly for the base pixel to finish initializing on first paint.
    const fire = () => {
      if (typeof window === "undefined" || typeof window.fbq !== "function") return
      const payload: Record<string, unknown> = {}
      if (contentName) payload.content_name = contentName
      if (typeof value === "number") {
        payload.value = value
        payload.currency = currency
      }
      window.fbq("track", "Lead", Object.keys(payload).length ? payload : undefined)
    }

    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      fire()
    } else {
      const t = setTimeout(fire, 800)
      return () => clearTimeout(t)
    }
  }, [contentName, value, currency])

  return null
}
