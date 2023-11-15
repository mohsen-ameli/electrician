import { db } from "@/db/drizzle-db"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const username = searchParams.get("username")
  try {
    const users = await db.query.admin.findMany()
    if (users) {
      const user = users.filter(user => user.username === username)
      return NextResponse.json(user)
    } else {
      return NextResponse.json({ error: "no users found" })
    }
  } catch (error) {
    return NextResponse.json({
      some: "shit happened",
      error: JSON.stringify(error),
    })
  }
}
