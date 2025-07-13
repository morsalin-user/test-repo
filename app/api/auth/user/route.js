import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"

export async function GET() {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get("auth-token")

    if (!token) {
      return NextResponse.json({ user: null })
    }

    const decoded = jwt.verify(token.value, process.env.JWT_SECRET || "your-secret-key")
    return NextResponse.json({ user: decoded })
  } catch (error) {
    return NextResponse.json({ user: null })
  }
}
