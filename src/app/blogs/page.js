import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

async function getBlogs() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/blogs`, {
      cache: "no-store",
    })
    if (!response.ok) return []
    return await response.json()
  } catch (error) {
    console.error("Failed to fetch blogs:", error)
    return []
  }
}

export default async function BlogsPage() {
  const blogs = await getBlogs()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Legal News & Blogs</h1>

      {blogs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No blogs available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <Card key={blog._id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg line-clamp-2">{blog.title}</CardTitle>
                <p className="text-sm text-gray-500">{new Date(blog.createdAt).toLocaleDateString()}</p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 line-clamp-3 mb-4">
                  {blog.excerpt || blog.content.substring(0, 150) + "..."}
                </p>
                <Link href={`/blog/${blog._id}`}>
                  <Button variant="outline" className="w-full bg-transparent">
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
