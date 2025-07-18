import { signUp } from "@/lib/create-admin"
import { NextRequest, NextResponse } from "next/server"

// Use this to create an admin user for testing purposes
export async function POST(req: NextRequest) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({
      error: "This endpoint is only available in development mode.",
    })
  }
  const body = await req.json()
  if (!body || !body.password || !body.username || !body.email) {
    return NextResponse.json({
      error:
        "username, password, and email is required to create an admin user.",
    })
  }

  const admin = await signUp(body.username, body.password, body.email)
  return NextResponse.json(admin)
}
