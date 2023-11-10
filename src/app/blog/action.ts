import { verify } from "jsonwebtoken"
import { cookies } from "next/headers"

export async function authenticate() {
  const cookieStore = cookies()
  const token = cookieStore.get("jwt")
  if (!token) {
    return false
  }

  try {
    verify(token.value, process.env.JWT_SECRET_KEY!)
    return true
  } catch (error) {
    return false
  }
}
