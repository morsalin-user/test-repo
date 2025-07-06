import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import BookSubmission from "@/models/BookSubmission"
import { verifyToken } from "@/lib/auth"

export async function PUT(request, { params }) {
  try {
    const user = await verifyToken(request)
    const { id } = await params
    const updateData = await request.json()

    await connectDB()

    // If user is not admin, they can only accept offers
    if (!user.isAdmin) {
      // Check if this is the user's submission
      const submission = await BookSubmission.findById(id)
      if (!submission || submission.sellerEmail !== user.email) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
      }

      // Only allow accepting offers
      if (updateData.status !== "accepted") {
        return NextResponse.json({ message: "You can only accept offers" }, { status: 400 })
      }
    }

    const submission = await BookSubmission.findByIdAndUpdate(id, updateData, { new: true })

    if (!submission) {
      return NextResponse.json({ message: "Submission not found" }, { status: 404 })
    }

    return NextResponse.json(submission)
  } catch (error) {
    console.error("Error updating book submission:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
