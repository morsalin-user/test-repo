"use client"

import { useEffect, useState, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle, Loader2 } from "lucide-react"

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")
  const [loading, setLoading] = useState(true)
  const [orderData, setOrderData] = useState(null)
  const [error, setError] = useState(null)

  const verifyPayment = useCallback(async () => {
    try {
      const response = await fetch("/api/verify-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionId }),
      })

      if (response.ok) {
        const data = await response.json()
        setOrderData(data)
      } else {
        setError("Failed to verify payment")
      }
    } catch (error) {
      console.error("Error verifying payment:", error)
      setError("Something went wrong")
    } finally {
      setLoading(false)
    }
  }, [sessionId])

  useEffect(() => {
    if (sessionId) {
      verifyPayment()
    }
  }, [sessionId, verifyPayment])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-md">
        <Card>
          <CardContent className="pt-6 text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p>Verifying your payment...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-md">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-red-600">Payment Error</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600">{error}</p>
            <Link href="/" className="block">
              <Button className="w-full">Back to Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <Card>
        <CardHeader className="text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <CardTitle className="text-2xl">Payment Successful!</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Order Details</h3>
            <p className="text-sm text-gray-600">Customer: {orderData?.session?.customerName}</p>
            <p className="text-sm text-gray-600">Email: {orderData?.session?.customerEmail}</p>
            <p className="text-sm text-gray-600">Total: ${orderData?.session?.total}</p>
            <p className="text-sm text-gray-600">Order ID: {orderData?.order?._id?.slice(-8)}</p>
          </div>

          <p className="text-gray-600">
            Thank you for your purchase! Your order has been confirmed and will be shipped soon.
          </p>

          <div className="space-y-2">
            <Link href="/products" className="block">
              <Button className="w-full">Continue Shopping</Button>
            </Link>
            <Link href="/" className="block">
              <Button variant="outline" className="w-full bg-transparent">
                Back to Home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
