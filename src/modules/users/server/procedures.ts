import { delay } from "@/lib/utils"
import { procedure, router } from "@/trpc/main"

export const usersRouter = router({
  getOne: procedure.query(async ({ ctx }) => {
    const user = ctx.db.users.getOne()
    return { ok: true, user }
  }),
  getAll: procedure.query(async ({ ctx }) => {
    await delay(1000)
    const users = ctx.db.users.getAll()
    if (users.length < 1) {
      ctx.logger.info("no users found in database")
    }
    return { ok: true, users }
  }),
})
