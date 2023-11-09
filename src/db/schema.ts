import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core"

export const blogs = sqliteTable("blogs", {
  id: integer("id").notNull().primaryKey(),
  slug: text("slug").notNull().unique(),
  date: integer("date").notNull().default(Date.now()),
  title: text("name").notNull().unique(),
  content: text("content").notNull(),
})
