import jwt from "jsonwebtoken"
import { connectDB } from "./mongodb"
import User from "@/models/User"

export async function verifyToken(request) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return null
    }

    const token = authHeader.substring(7)
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret")

    await connectDB()
    const user = await User.findById(decoded.userId).select("-password")

    return user
  } catch (error) {
    console.error("Token verification error:", error)
    return null
  }
}
