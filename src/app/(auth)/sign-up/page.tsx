import { SignUp } from "@/components/auth/sign-up"

export default function Page() {
  return (
    <div>
      <section aria-labelledby="sign-up-header">
        <h1 id="sign-up-header" className="sr-only">
          Sign up.
        </h1>
      </section>
      <div className="p-4">
        <SignUp />
      </div>
    </div>
  )
}
