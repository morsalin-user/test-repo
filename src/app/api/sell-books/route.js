import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import BookSubmission from "@/models/BookSubmission"

export async function POST(request) {
  try {
    const submissionData = await request.json()
    await connectDB()

    const submission = await BookSubmission.create({
      ...submissionData,
      status: "pending",
      submittedAt: new Date(),
    })

    return NextResponse.json({ message: "Book submission received successfully", id: submission._id }, { status: 201 })
  } catch (error) {
    console.error("Error creating book submission:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
