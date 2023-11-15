import { NextResponse } from "next/server"
import prisma from "@/db/prisma-db"
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"

export async function POST(req: Request) {
  const { username, password } = await req.json()

  const MAX_AGE = 60 * 60 * 24 * 1 // 1 day

  const admin = await prisma.admin.findFirst({
    where: {
      username: {
        equals: username,
      },
    },
  })

  if (!admin) {
    return NextResponse.json({
      error: "Either username or password is incorrect",
      jwt: null,
    })
  }

  const valid = await compare(password, admin.password)
  if (!valid) {
    return NextResponse.json({
      error: "Either username or password is incorrect",
      jwt: null,
    })
  }

  const token = sign({ id: admin.id, username }, process.env.JWT_SECRET_KEY!, {
    expiresIn: MAX_AGE,
  })

  return NextResponse.json({ error: null, jwt: token })
}
