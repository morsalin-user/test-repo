"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Trash2, Edit } from "lucide-react"
import RichTextEditor from "./RichTextEditor"

export default function BlogManagement() {
  const [blogs, setBlogs] = useState([])
  const [editingBlog, setEditingBlog] = useState(null)
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    type: "blog", // blog or news
  })
  const { toast } = useToast()

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      const response = await fetch("/api/blogs")
      if (response.ok) {
        const data = await response.json()
        setBlogs(data)
      }
    } catch (error) {
      console.error("Failed to fetch blogs:", error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const url = editingBlog ? `/api/blogs/${editingBlog._id}` : "/api/blogs"
    const method = editingBlog ? "PUT" : "POST"

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: `${formData.type === "blog" ? "Blog" : "News"} ${editingBlog ? "updated" : "created"} successfully!`,
        })
        resetForm()
        fetchBlogs()
      } else {
        throw new Error("Failed to save content")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  const handleEdit = (blog) => {
    setEditingBlog(blog)
    setFormData({
      title: blog.title,
      content: blog.content,
      excerpt: blog.excerpt || "",
      type: blog.type || "blog",
    })
  }

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this content?")) return

    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Content deleted successfully!",
        })
        fetchBlogs()
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete content",
        variant: "destructive",
      })
    }
  }

  const resetForm = () => {
    setEditingBlog(null)
    setFormData({
      title: "",
      content: "",
      excerpt: "",
      type: "blog",
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-purple-900">{editingBlog ? "Edit Content" : "Create New Content"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="text-lg"
                />
              </div>
              <div>
                <Label htmlFor="type">Content Type</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blog">Blog Post</SelectItem>
                    <SelectItem value="news">News Article</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="excerpt">Excerpt (Optional)</Label>
              <Input
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                placeholder="Brief description..."
              />
            </div>

            <div>
              <Label htmlFor="content">Content</Label>
              <RichTextEditor value={formData.content} onChange={(content) => setFormData({ ...formData, content })} />
            </div>

            <div className="flex gap-2">
              <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                {editingBlog ? "Update" : "Publish"} {formData.type === "blog" ? "Blog" : "News"}
              </Button>
              {editingBlog && (
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-purple-900">All Content</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {blogs.map((blog) => (
              <div key={blog._id} className="flex items-center justify-between p-4 border border-purple-200 rounded">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-purple-900">{blog.title}</h3>
                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        blog.type === "news" ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {blog.type === "news" ? "NEWS" : "BLOG"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{new Date(blog.createdAt).toLocaleDateString()}</p>
                  {blog.excerpt && <p className="text-sm text-gray-500 mt-1">{blog.excerpt}</p>}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(blog)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(blog._id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
