import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Product from "@/models/Product"
import { verifyToken } from "@/lib/auth"

export async function GET() {
  try {
    await connectDB()
    const products = await Product.find({}).sort({ createdAt: -1 })
    return NextResponse.json(products)
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const user = await verifyToken(request)
    if (!user || !user.isAdmin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const productData = await request.json()
    console.log("Received product data:", {
      ...productData,
      images: productData.images ? `${productData.images.length} images` : "No images",
    }) // Debug log

    await connectDB()

    const product = await Product.create(productData)
    console.log("Created product:", {
      id: product._id,
      title: product.title,
      images: product.images ? product.images.length : 0,
    }) // Debug log

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error("Error creating product:", error)
    return NextResponse.json(
      {
        message: "Internal server error",
        error: error.message,
      },
      { status: 500 },
    )
  }
}
