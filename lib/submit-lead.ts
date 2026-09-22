/**
 * Shared helper that submits lead form data to the LeadConnector webhook.
 *
 * All forms on the site POST here. The `source` field is REQUIRED and lets
 * you distinguish which form / section each submission came from inside
 * LeadConnector.
 *
 * Current sources used on the site:
 *   - "hero_early_bird"          → EarlyBirdSignup card inside the Hero
 *   - "early_bird_section"       → "Claim Your Place" section (mid page)
 *   - "final_cta_updates"        → "Let's Make That Real" card in the Final CTA
 */

export const LEAD_WEBHOOK_URL =
  "https://services.leadconnectorhq.com/hooks/S8hhwrGFBLYGJuhRTH71/webhook-trigger/c9cfa5c1-7d47-4fa0-83fa-1a6c03f65d7f"

export type LeadPayload = {
  email: string
  /** Identifier of the form / placement the submission came from. */
  source: string
}

export async function submitLead(payload: LeadPayload): Promise<void> {
  const body = {
    email: payload.email.trim(),
    source: payload.source,
    // helpful metadata for disambiguation inside LeadConnector
    page_url:
      typeof window !== "undefined" ? window.location.href : undefined,
    submitted_at: new Date().toISOString(),
  }

  const res = await fetch(LEAD_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    // LeadConnector accepts simple JSON POST; keep mode default (cors)
  })

  if (!res.ok) {
    throw new Error(`Lead submission failed: ${res.status}`)
  }
}
