import { NextResponse } from "next/server"
import { db } from "@/db/drizzle-db"
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"

export async function POST(req: Request) {
  const { username, password } = await req.json()

  const MAX_AGE = 60 * 60 * 24 * 1 // 1 day

  const admins = await db.query.admin.findMany()
  if (admins.length === 0) {
    return NextResponse.json({
      error: "Either username or password is incorrect",
      jwt: null,
    })
  }
  const users = admins.filter(admin => admin.username === username)
  if (users.length === 0) {
    return NextResponse.json({
      error: "Either username or password is incorrect",
      jwt: null,
    })
  }
  const user = users[0]

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
