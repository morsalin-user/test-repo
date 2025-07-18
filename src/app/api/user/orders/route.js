import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Order from "@/models/Order"
import { verifyToken } from "@/lib/auth"

export async function GET(request) {
  try {
    const user = await verifyToken(request)
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    await connectDB()
    const orders = await Order.find({ customerEmail: user.email }).sort({ createdAt: -1 })
    return NextResponse.json(orders)
  } catch (error) {
    console.error("Error fetching user orders:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
