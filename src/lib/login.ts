"use server"

import prisma from "@/lib/prisma"
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"

export async function login(username: string, password: string) {
  const MAX_AGE = 60 * 60 * 24 * 1 // 1 day

  const admin = await prisma.admin.findFirst({
    where: { username: { equals: username } },
  })

  if (!admin) {
    return {
      error: "Either username or password is incorrect",
      jwt: null,
    }
  }

  const valid = await compare(password, admin.password)
  if (!valid) {
    return {
      error: "Either username or password is incorrect",
      jwt: null,
    }
  }

  const token = sign({ id: admin.id, username }, process.env.JWT_SECRET_KEY!, {
    expiresIn: MAX_AGE,
  })

  return { error: null, jwt: token }
}
