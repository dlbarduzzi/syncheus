import postgres from "postgres"
import { drizzle } from "drizzle-orm/postgres-js"

import { env } from "@/env/server"
import { users } from "./schemas/users"
import { passwords } from "./schemas/passwords"

const schema = { users, passwords }

const client = postgres(env.DATABASE_URL)
const connect = drizzle({ client, schema })

export const db = connect
