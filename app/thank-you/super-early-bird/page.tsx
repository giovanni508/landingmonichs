import type { Metadata } from "next"
import { ThankYouShell } from "@/components/thank-you-shell"
import { MetaPixelLead } from "@/components/meta-pixel-lead"

export const metadata: Metadata = {
  title: "Super Early Bird confirmed · Monichs",
  description:
    "Your priority access to the Super Early Bird tier is secured. Next stop: Kickstarter.",
  robots: { index: false, follow: false },
}

export default function SuperEarlyBirdThankYouPage() {
  return (
    <>
      <MetaPixelLead contentName="Super Early Bird" />
      <ThankYouShell
        accent="gold"
        eyebrow="Welcome to the club"
        title={
          <>
            Thank you for{" "}
            <em className="font-light italic text-[#e8c5a6]">joining the club</em>.
          </>
        }
        subtitle="Thank you for subscribing. You'll receive all our updates directly by email."
      />
    </>
  )
}
