import { db } from "@/db/drizzle-db"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const username = searchParams.get("username") as string
  const user = await db.query.admin.findFirst({
    where: (admin, { eq }) => eq(admin.username, username),
  })

  return NextResponse.json(user)
}
