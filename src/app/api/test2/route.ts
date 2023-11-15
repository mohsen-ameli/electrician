import { db } from "@/db/drizzle-db"
import { admin } from "@/db/schema"
import { eq, sql } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const username = searchParams.get("username") as string
  console.log("TEST 2222222222222222222222222222", username)
  const user = await db.query.admin.findFirst({
    where: eq(admin.username, username),
  })

  return NextResponse.json(user)
}
