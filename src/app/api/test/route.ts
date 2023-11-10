import { db } from "@/db/drizzle-db"
import { sql } from "drizzle-orm"
import { NextResponse } from "next/server"

export async function GET() {
  // const blogs = await db.query.blogs.findMany()
  const blogs = await db.execute(sql`SELECT * FROM blogs;`)
  return NextResponse.json(blogs)
}
