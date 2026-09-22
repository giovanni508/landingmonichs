import type { Metadata } from "next"
import { ThankYouShell } from "@/components/thank-you-shell"
import { MetaPixelLead } from "@/components/meta-pixel-lead"

export const metadata: Metadata = {
  title: "Early Bird spot confirmed · Monichs",
  description:
    "Your Early Bird spot is saved. Launch-day email incoming.",
  robots: { index: false, follow: false },
}

export default function EarlyBirdThankYouPage() {
  return (
    <>
      <MetaPixelLead contentName="Early Bird" />
      <ThankYouShell
        accent="cream"
        eyebrow="Welcome to the club"
        title={
          <>
            Thank you for{" "}
            <em className="font-light italic text-[#f4e6da]">joining the club</em>.
          </>
        }
        subtitle="Thank you for subscribing. You'll receive all our updates directly by email."
      />
    </>
  )
}
