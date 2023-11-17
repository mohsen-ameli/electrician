"use server"

import { verify } from "jsonwebtoken"
import { cookies } from "next/headers"

export async function isAuthenticated() {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get("jwt")
    if (!token) {
      return false
    } else {
      verify(token.value, process.env.JWT_SECRET_KEY!)
      return true
    }
  } catch (error) {
    return false
  }
}
