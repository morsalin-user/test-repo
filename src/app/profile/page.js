"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, ShoppingBag, BookOpen, DollarSign, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ProfilePage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [userOrders, setUserOrders] = useState([])
  const [userSubmissions, setUserSubmissions] = useState([])
  const [loadingData, setLoadingData] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    } else if (user) {
      fetchUserData()
    }
  }, [user, loading, router])

  const fetchUserData = async () => {
    try {
      // Fetch user orders
      const ordersResponse = await fetch("/api/user/orders", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      if (ordersResponse.ok) {
        const orders = await ordersResponse.json()
        setUserOrders(orders)
      }

      // Fetch user book submissions
      const submissionsResponse = await fetch("/api/book-submissions", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      if (submissionsResponse.ok) {
        const submissions = await submissionsResponse.json()
        setUserSubmissions(submissions)
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error)
    } finally {
      setLoadingData(false)
    }
  }

  const acceptOffer = async (submissionId) => {
    try {
      const response = await fetch(`/api/book-submissions/${submissionId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ status: "accepted" }),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Offer accepted successfully!",
        })
        fetchUserData() // Refresh data
      } else {
        throw new Error("Failed to accept offer")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to accept offer",
        variant: "destructive",
      })
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "reviewed":
        return "bg-blue-100 text-blue-800"
      case "offered":
        return "bg-purple-100 text-purple-800"
      case "accepted":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading || loadingData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const totalSpent = userOrders.reduce((total, order) => total + Number.parseFloat(order.total || 0), 0)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-purple-900 mb-4">My Profile</h1>
        <p className="text-gray-600">Manage your account and view your activity</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-purple-100">
          <TabsTrigger value="profile" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            <User className="h-4 w-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="orders" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            <ShoppingBag className="h-4 w-4 mr-2" />
            Orders
          </TabsTrigger>
          <TabsTrigger value="submissions" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            <BookOpen className="h-4 w-4 mr-2" />
            Book Submissions
          </TabsTrigger>
          <TabsTrigger value="activity" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            <DollarSign className="h-4 w-4 mr-2" />
            Activity
          </TabsTrigger>
        </TabsList>

        {/* Profile Information */}
        <TabsContent value="profile">
          <Card className="border-purple-200">
            <CardHeader>
              <CardTitle className="text-purple-900">Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-purple-900 mb-4">Account Details</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Full Name</label>
                      <p className="text-lg">{user.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Email Address</label>
                      <p className="text-lg">{user.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Account Type</label>
                      <Badge className={user.isAdmin ? "bg-purple-600 text-white" : "bg-gray-600 text-white"}>
                        {user.isAdmin ? "Administrator" : "Customer"}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-purple-900 mb-4">Account Statistics</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Orders:</span>
                      <span className="font-semibold">{userOrders.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Book Submissions:</span>
                      <span className="font-semibold">{userSubmissions.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Spent:</span>
                      <span className="font-semibold">${totalSpent.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Orders */}
        <TabsContent value="orders">
          <Card className="border-purple-200">
            <CardHeader>
              <CardTitle className="text-purple-900">Purchase History</CardTitle>
            </CardHeader>
            <CardContent>
              {userOrders.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No orders found.</p>
              ) : (
                <div className="space-y-4">
                  {userOrders.map((order) => (
                    <div key={order._id} className="border border-purple-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-purple-900">Order #{order._id.slice(-8)}</h3>
                          <p className="text-sm text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</p>
                        </div>
                        <Badge
                          className={
                            order.status === "completed" ? "bg-green-600 text-white" : "bg-yellow-600 text-white"
                          }
                        >
                          {order.status.toUpperCase()}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h4 className="font-medium text-purple-900 mb-2">Items</h4>
                          {order.items?.map((item, index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span>
                                {item.title} x {item.quantity}
                              </span>
                              <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                          ))}
                        </div>

                        <div>
                          <h4 className="font-medium text-purple-900 mb-2">Shipping Address</h4>
                          <div className="text-sm text-gray-600">
                            {order.shippingAddress?.line1 && (
                              <>
                                <p>{order.shippingAddress.line1}</p>
                                {order.shippingAddress.line2 && <p>{order.shippingAddress.line2}</p>}
                                <p>
                                  {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                                  {order.shippingAddress.postal_code}
                                </p>
                                <p>{order.shippingAddress.country}</p>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="border-t pt-2 flex justify-between font-semibold">
                        <span>Total</span>
                        <span className="text-purple-900">${order.total}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Book Submissions */}
        <TabsContent value="submissions">
          <Card className="border-purple-200">
            <CardHeader>
              <CardTitle className="text-purple-900">Book Submissions</CardTitle>
            </CardHeader>
            <CardContent>
              {userSubmissions.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No book submissions found.</p>
              ) : (
                <div className="space-y-4">
                  {userSubmissions.map((submission) => (
                    <div key={submission._id} className="border border-purple-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-purple-900">{submission.title}</h3>
                          <p className="text-sm text-gray-600">by {submission.author}</p>
                          <p className="text-sm text-gray-500">
                            Submitted: {new Date(submission.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge className={getStatusColor(submission.status)}>{submission.status.toUpperCase()}</Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <strong>Condition:</strong> {submission.condition?.replace("-", " ")}
                        </div>
                        <div>
                          <strong>Category:</strong> {submission.category || "N/A"}
                        </div>
                        {submission.offerAmount && (
                          <div>
                            <strong className="text-green-600">Offer: ${submission.offerAmount}</strong>
                          </div>
                        )}
                      </div>

                      {submission.status === "offered" && (
                        <div className="mb-4 p-3 bg-green-50 rounded border-l-4 border-green-600">
                          <div className="flex justify-between items-center">
                            <div>
                              <strong className="text-green-900">Offer Received: ${submission.offerAmount}</strong>
                              <p className="text-sm text-green-700">Would you like to accept this offer?</p>
                            </div>
                            <Button
                              onClick={() => acceptOffer(submission._id)}
                              className="bg-green-600 hover:bg-green-700 text-white"
                            >
                              <Check className="h-4 w-4 mr-1" />
                              Accept Offer
                            </Button>
                          </div>
                        </div>
                      )}

                      {submission.notes && (
                        <div className="mt-4 p-3 bg-purple-50 rounded border-l-4 border-purple-600">
                          <strong className="text-purple-900">Admin Notes:</strong>
                          <p className="text-gray-700 mt-1">{submission.notes}</p>
                        </div>
                      )}

                      {submission.description && (
                        <div className="mt-4">
                          <strong>Your Description:</strong>
                          <p className="text-gray-700 mt-1">{submission.description}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Activity Summary */}
        <TabsContent value="activity">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-purple-200">
              <CardHeader>
                <CardTitle className="text-purple-900">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Recent Orders */}
                  {userOrders.slice(0, 3).map((order) => (
                    <div key={order._id} className="flex items-center space-x-3 p-3 bg-purple-50 rounded">
                      <ShoppingBag className="h-5 w-5 text-purple-600" />
                      <div>
                        <p className="font-medium">Order #{order._id.slice(-8)}</p>
                        <p className="text-sm text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}

                  {/* Recent Submissions */}
                  {userSubmissions.slice(0, 2).map((submission) => (
                    <div key={submission._id} className="flex items-center space-x-3 p-3 bg-green-50 rounded">
                      <BookOpen className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium">Submitted: {submission.title}</p>
                        <p className="text-sm text-gray-600">{new Date(submission.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-200">
              <CardHeader>
                <CardTitle className="text-purple-900">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                    <span className="font-medium">Total Orders</span>
                    <span className="text-2xl font-bold text-blue-600">{userOrders.length}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                    <span className="font-medium">Books Submitted</span>
                    <span className="text-2xl font-bold text-green-600">{userSubmissions.length}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded">
                    <span className="font-medium">Total Spent</span>
                    <span className="text-2xl font-bold text-purple-600">${totalSpent.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded">
                    <span className="font-medium">Pending Submissions</span>
                    <span className="text-2xl font-bold text-yellow-600">
                      {userSubmissions.filter((s) => s.status === "pending").length}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
