import postgres from "postgres"
import { eq } from "drizzle-orm"
import { delay } from "@/lib/utils"
import { users } from "@/db/schemas/users"
import { signUpSchema } from "@/modules/users/schemas"
import { procedure, router } from "@/trpc/main"

export const usersRouter = router({
  register: procedure.input(signUpSchema).mutation(async ({ ctx, input }) => {
    try {
      // TODO: check if email already exists.

      // Even tho `procedure.input()` is in place, I would to double check.
      const parsed = signUpSchema.safeParse(input)
      if (!parsed.success) {
        return { ok: false, errors: parsed.error }
      }

      return await ctx.db.transaction(async tx => {
        const [user] = await tx
          .insert(users)
          .values({ email: parsed.data.email })
          .returning()

        if (user == null) {
          return tx.rollback()
        }

        return { ok: true, user }
      })
    }
    catch (error) {
      if (error instanceof postgres.PostgresError) {
        // Prevent leaking sensitive data.
        ctx.logger.error(error.message, {
          status: "POSTGRES_ERROR",
          caller: "users.register",
        })
      }
      else {
        ctx.logger.error("uncaught exception", {
          error: (error as Error)?.message ?? undefined,
          status: "EXCEPTION_ERROR",
          caller: "users.register",
        })
      }
      return { ok: false }
    }
  }),
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
