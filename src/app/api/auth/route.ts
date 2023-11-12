import { NextResponse } from "next/server"
import { db } from "@/db/drizzle-db"
import { admin } from "@/db/schema"
import { compare } from "bcryptjs"
import { eq } from "drizzle-orm"
import { sign } from "jsonwebtoken"
import { cookies } from "next/headers"

export async function GET() {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get("jwt")
    if (!token) return NextResponse.json(false)

    return NextResponse.json(true)
  } catch (error) {
    return NextResponse.json(false)
  }
}

export async function POST(req: Request) {
  const { username, password } = await req.json()

  const MAX_AGE = 60 * 60 * 24 * 1 // 1 day

  const user = await db.query.admin.findFirst({
    where: eq(admin.username, username),
  })
  if (!user) {
    return NextResponse.json({
      error: "Either username or password is incorrect",
      jwt: null,
    })
  }

  const valid = await compare(password, user.password)
  if (!valid) {
    return NextResponse.json({
      error: "Either username or password is incorrect",
      jwt: null,
    })
  }

  const token = sign({ id: user.id, username }, process.env.JWT_SECRET_KEY!, {
    expiresIn: MAX_AGE,
  })

  return NextResponse.json({ error: null, jwt: token })
}
