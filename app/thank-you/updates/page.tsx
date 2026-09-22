import type { Metadata } from "next"
import { ThankYouShell } from "@/components/thank-you-shell"
import { MetaPixelLead } from "@/components/meta-pixel-lead"

export const metadata: Metadata = {
  title: "You're in · Monichs updates",
  description:
    "You've joined the Monichs circle. Updates, behind-the-scenes and launch alerts are on their way.",
  robots: { index: false, follow: false },
}

export default function UpdatesThankYouPage() {
  return (
    <>
      <MetaPixelLead contentName="Updates" />
      <ThankYouShell
        accent="brass"
        eyebrow="Welcome to the club"
        title={
          <>
            Thank you for{" "}
            <em className="font-light italic text-[#d1a75a]">joining the club</em>.
          </>
        }
        subtitle="Thank you for subscribing. You'll receive all our updates directly by email."
      />
    </>
  )
}
