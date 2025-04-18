import { eq } from "drizzle-orm"
import { delay } from "@/lib/utils"
import { users } from "@/db/schemas/users"
import { procedure, router } from "@/trpc/main"

export const usersRouter = router({
  getOne: procedure.query(async ({ ctx }) => {
    const user = await ctx.db.query.users.findFirst({
      where: eq(users.email, "john@email.com"),
    })
    return { ok: true, user }
  }),
  getAll: procedure.query(async ({ ctx }) => {
    await delay(1000)
    const users = await ctx.db.query.users.findMany({ limit: 3 })
    if (users.length < 1) {
      ctx.logger.warn("no users found in database")
    }
    return { ok: true, users }
  }),
})
