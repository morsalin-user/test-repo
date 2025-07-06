"use client"

import { useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BookManagement from "@/components/admin/BookManagement"
import BlogManagement from "@/components/admin/BlogManagement"
import OrderManagement from "@/components/admin/OrderManagement"
import BookSubmissionManagement from "@/components/admin/BookSubmissionManagement"

export default function AdminPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && (!user || !user.isAdmin)) {
      router.push("/")
    }
  }, [user, loading, router])

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  if (!user || !user.isAdmin) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-purple-900">Admin Dashboard</h1>

      <Tabs defaultValue="books" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-purple-100">
          <TabsTrigger value="books" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            Books
          </TabsTrigger>
          <TabsTrigger value="blogs" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            Blogs & News
          </TabsTrigger>
          <TabsTrigger value="orders" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            Orders
          </TabsTrigger>
          <TabsTrigger value="submissions" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
            Book Submissions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="books">
          <BookManagement />
        </TabsContent>

        <TabsContent value="blogs">
          <BlogManagement />
        </TabsContent>

        <TabsContent value="orders">
          <OrderManagement />
        </TabsContent>

        <TabsContent value="submissions">
          <BookSubmissionManagement />
        </TabsContent>
      </Tabs>
    </div>
  )
}
