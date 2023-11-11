import { authenticate } from "@/lib/authenticate"
import { NextResponse } from "next/server"
import { db } from "@/db/drizzle-db"
import { admin } from "@/db/schema"
import { compare } from "bcrypt"
import { eq } from "drizzle-orm"
import { sign } from "jsonwebtoken"

export async function GET() {
  return NextResponse.json(await authenticate())
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
