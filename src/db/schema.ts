import { bigint, pgTable, text, varchar, serial } from "drizzle-orm/pg-core"

export const blogs = pgTable("blogs", {
  slug: varchar("slug", { length: 256 }).notNull().unique().primaryKey(),
  date: bigint("date", { mode: "number" }).notNull(),
  title: text("name").notNull().unique(),
  content: text("content").notNull(),
})

export const admin = pgTable("admin", {
  id: serial("id").notNull().primaryKey(),
  username: varchar("username", { length: 256 }).notNull().unique(),
  password: varchar("password", { length: 256 }).notNull(),
})
