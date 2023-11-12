import { db } from "@/db/drizzle-db"
import { admin } from "@/db/schema"
import { sql } from "drizzle-orm"
import { NextResponse } from "next/server"

export async function GET() {
  // const blogs = await db.query.blogs.findMany()
  // const blogs = await db.execute(sql`CREATE TABLE IF NOT EXISTS "admin" (
  //   "id" serial PRIMARY KEY NOT NULL,
  //   "username" varchar(256) NOT NULL,
  //   "password" varchar(256) NOT NULL,
  //   CONSTRAINT "admin_username_unique" UNIQUE("username")
  // );`)
  // await db.insert(admin).values({
  //   username: ".",
  //   password: await bcrypt.hash(".", 10),
  // })

  const blogs = {}
  return NextResponse.json(blogs)
}
