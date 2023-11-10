import { bigint, pgTable, text, varchar } from "drizzle-orm/pg-core"

export const blogs = pgTable("blogs", {
  slug: varchar("slug", { length: 256 }).notNull().unique().primaryKey(),
  date: bigint("date", { mode: "number" }).notNull(),
  title: text("name").notNull().unique(),
  content: text("content").notNull(),
})
