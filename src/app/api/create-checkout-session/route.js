import { NextResponse } from "next/server"
import Stripe from "stripe"
import { connectDB } from "@/lib/mongodb"
import Product from "@/models/Product"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST(request) {
  try {
    const { productId, quantity } = await request.json()

    await connectDB()
    const product = await Product.findById(productId)

    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 })
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: product.title,
              description: `by ${product.author}`,
            },
            unit_amount: Math.round(product.price * 100),
          },
          quantity: quantity,
        },
      ],
      mode: "payment",
      success_url: `${request.headers.get("origin")}/success?session_id={CHECKOUT_SESSION_ID}&product_id=${productId}&quantity=${quantity}`,
      cancel_url: `${request.headers.get("origin")}/product/${productId}`,
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "GB", "AU"],
      },
      metadata: {
        productId: productId,
        quantity: quantity.toString(),
      },
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (error) {
    console.error("Error creating checkout session:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
