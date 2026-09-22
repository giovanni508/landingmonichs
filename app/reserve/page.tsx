import type { Metadata } from "next"
import { ReservePage } from "@/components/reserve-page"

export const metadata: Metadata = {
  title: "Reserve your Monichs | Super Early Bird",
  description: "Reserve one of the first 50 Monichs watches for the Super Early Bird price.",
}

export default function ReserveRoute() {
  return <ReservePage />
}

