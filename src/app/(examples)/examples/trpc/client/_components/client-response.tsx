"use client"

import { useTRPC } from "@/trpc/client/provider"
import { useSuspenseQuery } from "@tanstack/react-query"

export function ClientResponse() {
  const trpc = useTRPC()

  const user = useSuspenseQuery(trpc.users.getOne.queryOptions())
  const users = useSuspenseQuery(trpc.users.getAll.queryOptions())
  const hello = useSuspenseQuery(trpc.hello.queryOptions({ name: "John" }))

  return (
    <div>
      <div className="mt-4 bg-gray-100 px-3 py-2 text-sm">
        <pre>{JSON.stringify(hello.data, null, 2)}</pre>
      </div>
      <div className="mt-4 bg-gray-100 px-3 py-2 text-sm">
        <pre>{JSON.stringify(user.data, null, 2)}</pre>
      </div>
      <div className="mt-4 bg-gray-100 px-3 py-2 text-sm">
        <pre>{JSON.stringify(users.data, null, 2)}</pre>
      </div>
    </div>
  )
}
