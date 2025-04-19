import type { AppContext } from "@/trpc/main"

import bcrypt from "bcryptjs"
import postgres from "postgres"

import { eq } from "drizzle-orm"

import { otps } from "@/db/schemas/otps"
import { users } from "@/db/schemas/users"
import { passwords } from "@/db/schemas/passwords"

import { delay } from "@/lib/utils"
import { signUpSchema } from "@/modules/users/schemas"
import { procedure, router } from "@/trpc/main"
import { generateOTP, lowercase } from "@/tools/strings"

async function findUserByEmail(ctx: AppContext, email: string) {
  return await ctx.db.query.users.findFirst({
    where: eq(users.email, lowercase(email)),
  })
}

async function findOtpByUserId(ctx: AppContext, userId: string) {
  return await ctx.db.query.otps.findFirst({
    where: eq(otps.userId, userId),
  })
}

async function createOtp(ctx: AppContext, userId: string) {
  const otp = await findOtpByUserId(ctx, userId)
  if (otp != null) {
    await ctx.db.delete(otps).where(eq(otps.userId, otp.userId))
  }

  const expiresAt = new Date(Date.now() + 1000 * 60 * 10)
  const randomOtp = generateOTP()

  const otpHash = await bcrypt.hash(randomOtp, 10)

  const [newOtp] = await ctx.db
    .insert(otps)
    .values({ userId, otpHash, expiresAt })
    .returning({ id: otps.id })

  return newOtp
}

async function sendEmailVerification(ctx: AppContext, email: string) {
  ctx.logger.info("sending email verification", { email })
  await delay(3000)
  ctx.logger.info("email verification sent successfully", { email })
}

export const usersRouter = router({
  register: procedure.input(signUpSchema).mutation(async ({ ctx, input }) => {
    try {
      const parsed = signUpSchema.safeParse(input)
      if (!parsed.success) {
        return { ok: false, errors: parsed.error }
      }

      const user = await findUserByEmail(ctx, parsed.data.email)

      if (user != null) {
        return { ok: false, error: "This email is already register." }
      }

      const newUser = await ctx.db.transaction(async tx => {
        const [user] = await tx
          .insert(users)
          .values({ email: parsed.data.email })
          .returning()

        if (user == null) {
          return tx.rollback()
        }

        const passwordHash = await bcrypt.hash(parsed.data.password, 12)

        const [password] = await tx
          .insert(passwords)
          .values({ userId: user.id, passwordHash })
          .returning({ id: passwords.id })

        if (password == null) {
          return tx.rollback()
        }

        return user
      })

      const otpId = await createOtp(ctx, newUser.id)
      if (otpId == null) {
        ctx.logger.error("fail to create otp", {
          status: "OTP_CREATE_ERROR",
          action: "users.register",
          userId: newUser.id,
        })
      }

      sendEmailVerification(ctx, newUser.email)

      return newUser
    }
    catch (error) {
      if (error instanceof postgres.PostgresError) {
        // Prevent leaking sensitive data.
        ctx.logger.error(error.message, {
          status: "POSTGRES_ERROR",
          action: "users.register",
        })
      }
      else {
        ctx.logger.error("uncaught exception", {
          error: (error as Error)?.message ?? undefined,
          status: "EXCEPTION_ERROR",
          action: "users.register",
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
