import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import BookSubmission from "@/models/BookSubmission"
import { verifyToken } from "@/lib/auth"

export async function GET(request) {
  try {
    const user = await verifyToken(request)
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    let submissions
    if (user.isAdmin) {
      // Admin can see all submissions
      submissions = await BookSubmission.find({}).sort({ createdAt: -1 })
    } else {
      // Users can only see their own submissions
      submissions = await BookSubmission.find({ sellerEmail: user.email }).sort({ createdAt: -1 })
    }

    return NextResponse.json(submissions)
  } catch (error) {
    console.error("Error fetching book submissions:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
