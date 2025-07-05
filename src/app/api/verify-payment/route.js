import { NextResponse } from "next/server"
import Stripe from "stripe"
import { connectDB } from "@/lib/mongodb"
import Order from "@/models/Order"
import Product from "@/models/Product"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST(request) {
  try {
    const { sessionId } = await request.json()

    if (!sessionId) {
      return NextResponse.json({ message: "Session ID required" }, { status: 400 })
    }

    // Retrieve the checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items", "customer_details"],
    })

    if (session.payment_status !== "paid") {
      return NextResponse.json({ message: "Payment not completed" }, { status: 400 })
    }

    await connectDB()

    // Check if order already exists
    const existingOrder = await Order.findOne({ stripeSessionId: sessionId })
    if (existingOrder) {
      return NextResponse.json({ order: existingOrder })
    }

    // Get product details
    const product = await Product.findById(session.metadata.productId)
    const quantity = Number.parseInt(session.metadata.quantity)

    // Create order
    const order = await Order.create({
      stripeSessionId: sessionId,
      customerName: session.customer_details.name,
      customerEmail: session.customer_details.email,
      shippingAddress: session.shipping_details?.address,
      items: [
        {
          productId: product._id,
          title: product.title,
          author: product.author,
          price: product.price,
          quantity: quantity,
        },
      ],
      total: (session.amount_total / 100).toFixed(2),
      status: "completed",
    })

    // Update product stock
    await Product.findByIdAndUpdate(session.metadata.productId, {
      $inc: { stock: -quantity },
    })

    return NextResponse.json({
      order,
      session: {
        customerName: session.customer_details.name,
        customerEmail: session.customer_details.email,
        total: (session.amount_total / 100).toFixed(2),
      },
    })
  } catch (error) {
    console.error("Error verifying payment:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
