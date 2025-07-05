import { NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Product from "@/models/Product"
import { verifyToken } from "@/lib/auth"

export async function GET(request, { params }) {
  try {
    await connectDB()
    const product = await Product.findById(params.id)

    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error("Error fetching product:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request, { params }) {
  try {
    const user = await verifyToken(request)
    if (!user || !user.isAdmin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const productData = await request.json()
    console.log("Updating product with data:", {
      ...productData,
      images: productData.images ? `${productData.images.length} images` : "No images",
    }) // Debug log

    await connectDB()

    const product = await Product.findByIdAndUpdate(params.id, productData, { new: true })

    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 })
    }

    console.log("Updated product:", {
      id: product._id,
      title: product.title,
      images: product.images ? product.images.length : 0,
    }) // Debug log

    return NextResponse.json(product)
  } catch (error) {
    console.error("Error updating product:", error)
    return NextResponse.json(
      {
        message: "Internal server error",
        error: error.message,
      },
      { status: 500 },
    )
  }
}

export async function DELETE(request, { params }) {
  try {
    const user = await verifyToken(request)
    if (!user || !user.isAdmin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    await connectDB()
    const product = await Product.findByIdAndDelete(params.id)

    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Product deleted successfully" })
  } catch (error) {
    console.error("Error deleting product:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
