import { z } from "zod"

import { procedure, router } from "@/trpc/main"
import { usersRouter } from "@/modules/users/server/procedures"

export const appRouter = router({
  hello: procedure
    .input(z.object({ name: z.string() }))
    .query(opts => {
      opts.ctx.logger.info(`saying hello to ${opts.input.name}`)
      return { greeting: `Hello, ${opts.input.name}` }
    }),
  users: usersRouter,
})

export type AppRouter = typeof appRouter
