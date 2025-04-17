import { env } from "@/env/server"
import { createLogger, format, transports } from "winston"

export const logger = createLogger({
  level: env.LOG_LEVEL,
  format: format.combine(format.timestamp(), format.json()),
  transports: [new transports.Console()],
  silent: env.NODE_ENV === "test" || env.LOG_LEVEL === "silent",
})
