"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BookOpen } from "lucide-react"

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchBlogs() {
      try {
        setLoading(true)
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
        const response = await fetch(`${baseUrl}/api/blogs?type=blog`, {
          cache: "no-store",
        })
        
        if (!response.ok) {
          setBlogs([])
          return
        }
        
        const blogsData = await response.json()
        setBlogs(blogsData)
      } catch (error) {
        console.error("Failed to fetch blogs:", error)
        setError(error.message)
        setBlogs([])
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-purple-900 mb-4">Legal Insights & Blog Posts</h1>
          <p className="text-gray-600">
            Explore our collection of legal insights, professional articles, and expert commentary.
          </p>
        </div>
        
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading blog posts...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-purple-900 mb-4">Legal Insights & Blog Posts</h1>
          <p className="text-gray-600">
            Explore our collection of legal insights, professional articles, and expert commentary.
          </p>
        </div>
        
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 text-red-400 mx-auto mb-4" />
          <p className="text-red-600 text-lg">Error loading blog posts: {error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-purple-900 mb-4">Legal Insights & Blog Posts</h1>
        <p className="text-gray-600">
          Explore our collection of legal insights, professional articles, and expert commentary.
        </p>
      </div>

      {blogs.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No blog posts available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <Card key={blog._id} className="hover:shadow-lg transition-shadow border-purple-200">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded">BLOG</span>
                  <p className="text-sm text-gray-500">{new Date(blog.createdAt).toLocaleDateString()}</p>
                </div>
                <CardTitle className="text-lg line-clamp-2 text-purple-900">{blog.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 line-clamp-3 mb-4">
                  {blog.excerpt || blog.content.replace(/<[^>]*>/g, "").substring(0, 150) + "..."}
                </p>
                <Link href={`/blog/${blog._id}`}>
                  <Button
                    variant="outline"
                    className="w-full border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white bg-transparent"
                  >
                    Read More
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}