import { z } from "zod"
import { createEnv } from "@t3-oss/env-nextjs"

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["test", "development", "production"]),
    LOG_LEVEL: z.enum(["debug", "info", "warn", "error", "silent"]),
    DATABASE_URL: z.string().url(),
  },
  onValidationError: issues => {
    console.error(
      "❌ Invalid client environment variables ❌",
      JSON.stringify(issues, null, 2),
    )
    // eslint-disable-next-line node/no-process-exit
    process.exit(1)
  },
  runtimeEnv: {
    /* eslint-disable node/no-process-env */
    NODE_ENV: process.env.NODE_ENV,
    LOG_LEVEL: process.env.LOG_LEVEL,
    DATABASE_URL: process.env.DATABASE_URL,
    /* eslint-enable node/no-process-env */
  },
  emptyStringAsUndefined: true,
  /* eslint-disable-next-line node/no-process-env */
  skipValidation: process.env.SKIP_ENV_VALIDATIONS === "true",
})
