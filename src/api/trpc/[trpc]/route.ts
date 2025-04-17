import { appRouter } from "@/trpc/router/app"
import { createContext } from "@/trpc/main"
import { fetchRequestHandler } from "@trpc/server/adapters/fetch"

function handler(req: Request) {
  fetchRequestHandler({
    req,
    router: appRouter,
    endpoint: "/api/trpc",
    createContext,
  })
}

export { handler as GET, handler as POST }
