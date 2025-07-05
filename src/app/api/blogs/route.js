import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Blog from "@/models/Blog"
import { verifyToken } from "@/lib/auth"

export async function GET() {
  try {
    await connectDB()
    const blogs = await Blog.find({}).sort({ createdAt: -1 })
    return NextResponse.json(blogs)
  } catch (error) {
    console.error("Error fetching blogs:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const user = await verifyToken(request)
    if (!user || !user.isAdmin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const blogData = await request.json()
    await connectDB()

    const blog = await Blog.create(blogData)
    return NextResponse.json(blog, { status: 201 })
  } catch (error) {
    console.error("Error creating blog:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
