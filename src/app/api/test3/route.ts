import { db } from "@/db/drizzle-db"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const username = searchParams.get("username") as string
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.username, username),
  })

  return NextResponse.json(user)
}
