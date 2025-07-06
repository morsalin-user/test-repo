import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Book from "@/models/Book"
import { verifyToken } from "@/lib/auth"

export async function GET() {
  try {
    await connectDB()
    const books = await Book.find({}).sort({ createdAt: -1 })
    return NextResponse.json(books)
  } catch (error) {
    console.error("Error fetching books:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const user = await verifyToken(request)
    if (!user || !user.isAdmin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const bookData = await request.json()
    console.log("Received book data:", {
      ...bookData,
      images: bookData.images ? `${bookData.images.length} images` : "No images",
    })

    await connectDB()

    const book = await Book.create(bookData)
    console.log("Created book:", {
      id: book._id,
      title: book.title,
      images: book.images ? book.images.length : 0,
    })

    return NextResponse.json(book, { status: 201 })
  } catch (error) {
    console.error("Error creating book:", error)
    return NextResponse.json(
      {
        message: "Internal server error",
        error: error.message,
      },
      { status: 500 },
    )
  }
}
