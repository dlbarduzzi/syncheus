import superjson from "superjson"

import { cache } from "react"
import { initTRPC } from "@trpc/server"

const t = initTRPC.create({
  transformer: superjson,
})

export const router = t.router

export const procedure = t.procedure.use(({ next }) => {
  return next({ ctx: {
    db: {
      users: {
        getOne: () => {
          return { id: 1, name: "Bob" }
        },
        getAll: () => {
          return [{ id: 1, name: "Bob" }, { id: 2, name: "Alice" }]
        },
      },
    },
    // eslint-disable-next-line no-console
    logger: (msg: string) => console.log(`logger | INFO | ${msg}`),
  } })
})

export const createContext = cache(async () => {
  return { sample: "A sample context value." }
})
