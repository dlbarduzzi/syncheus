import { Button } from "@/components/ui/button"

export default function Page() {
  return (
    <div>
      <section aria-labelledby="sign-up-header">
        <h1 id="sign-up-header" className="sr-only">
          Sign up.
        </h1>
      </section>
      <div className="p-4">
        <Button type="button" size="md">Create Account</Button>
      </div>
    </div>
  )
}
