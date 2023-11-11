import { authenticate } from "@/lib/authenticate"
import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json(await authenticate())
}
