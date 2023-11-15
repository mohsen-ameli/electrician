import { db } from "@/db/drizzle-db"
import { admin } from "@/db/schema"
import { sql } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  // const blogs = await db.query.blogs.findMany()
  const { searchParams } = new URL(req.url)
  const username = searchParams.get("username")
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
  console.log(username)
  const a = await db.execute(
    sql`SELECT * FROM admin WHERE username = (${username});`
  )

  return NextResponse.json(a)
}
