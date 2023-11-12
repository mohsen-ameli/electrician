import { verify } from "jsonwebtoken"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get("jwt")
    if (!token) return NextResponse.json(false)

    verify(token.value, process.env.JWT_SECRET_KEY!)
    return NextResponse.json(true)
  } catch (error) {
    return NextResponse.json(false)
  }
}
