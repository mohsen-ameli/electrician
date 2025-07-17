"use server"

import prisma from "@/db/prisma-db"
import { hash } from "bcryptjs"

export async function signUp(
  username: string,
  password: string,
  email: string
) {
  const existingAdmin = await prisma.admin.findFirst({
    where: { username: { equals: username } },
  })
  if (existingAdmin) return { error: "Username already exists" }

  const existingEmail = await prisma.admin.findFirst({
    where: { email: { equals: email } },
  })
  if (existingEmail) return { error: "Email already exists" }

  const hashedPassword = await hash(password, 10)
  await prisma.admin.create({
    data: {
      username,
      password: hashedPassword,
      email,
    },
  })

  return { error: null, success: true }
}
