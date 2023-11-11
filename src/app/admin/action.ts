"use server"

import { db } from "@/db/drizzle-db"
import { admin } from "@/db/schema"
import { compare } from "bcrypt"
import { eq } from "drizzle-orm"
import { sign } from "jsonwebtoken"

const MAX_AGE = 60 * 60 * 24 * 1 // 1 day

type LoginResponse = Promise<{
  error: string | null
  jwt: string | null
}>

export async function login(form: FormData): LoginResponse {
  const username = form.get("username") as string
  const password = form.get("password") as string

  const user = await db.query.admin.findFirst({
    where: eq(admin.username, username),
  })
  if (!user) {
    return {
      error: "User not found",
      jwt: null,
    }
  }

  const valid = await compare(password, user.password)
  if (!valid) {
    return {
      error: "Invalid password",
      jwt: null,
    }
  }

  const token = sign({ id: user.id, username }, process.env.JWT_SECRET_KEY!, {
    expiresIn: MAX_AGE,
  })

  return { error: null, jwt: token }
}
