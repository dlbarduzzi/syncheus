import { Suspense } from "react"
import { ClientResponse } from "./_components/client-response"
import { getQueryServer, trpcServer } from "@/trpc/server/query-server"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"

export const dynamic = "force-dynamic"

export default function Page() {
  const trpc = trpcServer
  const query = getQueryServer()

  void query.fetchQuery(trpc.users.getOne.queryOptions())
  void query.fetchQuery(trpc.users.getAll.queryOptions())
  void query.fetchQuery(trpc.hello.queryOptions({ name: "John" }))

  return (
    <div>
      <section aria-labelledby="trpc-client-header">
        <h1 id="trpc-client-header" className="sr-only">
          TRPC Client.
        </h1>
      </section>
      <div className="p-4">
        <div className="max-w-fit border border-gray-900 px-3 py-2">
          trpc Client
        </div>
        <div className="mt-4 bg-gray-100 p-3 text-sm">
          <p>Before component</p>
        </div>
        <div className="mt-4">
          <HydrationBoundary state={dehydrate(query)}>
            <Suspense fallback={(
              <div className="mt-4 bg-gray-100 p-3 text-sm">
                <p>Loading...</p>
              </div>
            )}
            >
              <ClientResponse />
            </Suspense>
          </HydrationBoundary>
        </div>
        <div className="mt-4 bg-gray-100 p-3 text-sm">
          <p>After component</p>
        </div>
      </div>
    </div>
  )
}
