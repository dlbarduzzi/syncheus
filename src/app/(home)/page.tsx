import { Button } from "@/components/ui/button"
import NextLink from "next/link"

export default function Page() {
  return (
    <div>
      <section aria-labelledby="homepage-header">
        <h1 id="homepage-header" className="sr-only">
          Homepage.
        </h1>
      </section>
      <div className="p-4">
        <Button asChild>
          <NextLink href="/sign-up" prefetch={false}>Sign up</NextLink>
        </Button>
      </div>
    </div>
  )
}
