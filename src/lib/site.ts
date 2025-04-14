import { env } from "@/env/client"

type SiteConfig = {
  name: string
  description: string
  url: string
}

export const siteConfig: SiteConfig = {
  name: "syncheus",
  description: "A prometheus alerts synchronization tool between multiple clusters.",
  url: env.NEXT_PUBLIC_APP_URL,
}
