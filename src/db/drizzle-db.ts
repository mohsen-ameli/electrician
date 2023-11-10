import { drizzle } from "drizzle-orm/postgres-js"
import { migrate } from "drizzle-orm/postgres-js/migrator"
import postgres from "postgres"
import * as schema from "@/db/schema"

const migrationClient = postgres(process.env.POSTGRES_URL!)
migrate(drizzle(migrationClient), { migrationsFolder: "drizzle" })

const queryClient = postgres(process.env.POSTGRES_URL!)
export const db = drizzle(queryClient, { schema })
