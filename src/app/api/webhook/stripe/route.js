import { NextResponse } from "next/server"
import Stripe from "stripe"
import { connectDB } from "@/lib/mongodb"
import Order from "@/models/Order"
import Product from "@/models/Product"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET

export async function POST(request) {
  const body = await request.text()
  const sig = request.headers.get("stripe-signature")

  let event

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message)
    return NextResponse.json({ message: "Webhook signature verification failed" }, { status: 400 })
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object

    try {
      await connectDB()

      const product = await Product.findById(session.metadata.productId)
      const quantity = Number.parseInt(session.metadata.quantity)

      const order = await Order.create({
        stripeSessionId: session.id,
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
      await Product.findByIdAndUpdate(session.metadata.productId, { $inc: { stock: -quantity } })

      console.log("Order created:", order._id)
    } catch (error) {
      console.error("Error processing webhook:", error)
    }
  }

  return NextResponse.json({ received: true })
}
