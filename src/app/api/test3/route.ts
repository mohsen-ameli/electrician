import { db } from "@/db/drizzle-db"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const username = searchParams.get("username") as string
  const users = await db.query.admin.findMany()
  const user = users.filter(user => user.username === username)

  return NextResponse.json(user)
}
