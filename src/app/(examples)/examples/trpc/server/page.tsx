import { trpcServer, getQueryServer } from "@/trpc/server/query-server"

export const dynamic = "force-dynamic"

export default async function Page() {
  const trpc = trpcServer
  const query = getQueryServer()

  const user = await query.fetchQuery(trpc.users.getOne.queryOptions())
  const users = await query.fetchQuery(trpc.users.getAll.queryOptions())

  const hello = await query.fetchQuery(trpc.hello.queryOptions({
    name: "John",
  }))

  return (
    <div>
      <section aria-labelledby="trpc-server-header">
        <h1 id="trpc-server-header" className="sr-only">
          TRPC Server.
        </h1>
      </section>
      <div className="p-4">
        <div className="max-w-fit border border-gray-900 px-3 py-2">
          trpc Server
        </div>
        <div className="mt-4 bg-gray-100 px-3 py-2 text-sm">
          <pre>{JSON.stringify(hello, null, 2)}</pre>
        </div>
        <div className="mt-4 bg-gray-100 px-3 py-2 text-sm">
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
        <div className="mt-4 bg-gray-100 px-3 py-2 text-sm">
          <pre>{JSON.stringify(users, null, 2)}</pre>
        </div>
      </div>
    </div>
  )
}
