"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"

export default function BlogPage() {
  const params = useParams()
  const router = useRouter()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchBlog() {
      if (!params.id) return

      try {
        setLoading(true)
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/blogs/${params.id}`,
          {
            cache: "no-store",
          },
        )

        if (!response.ok) {
          router.push("/404")
          return
        }

        const blogData = await response.json()
        setBlog(blogData)
      } catch (error) {
        console.error("Failed to fetch blog:", error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchBlog()
  }, [params.id, router])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading blog post...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center">
          <p className="text-red-600">Error loading blog post: {error}</p>
        </div>
      </div>
    )
  }

  if (!blog) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center">
          <p className="text-gray-600">Blog post not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <article className="prose prose-lg max-w-none">
        <header className="mb-8 text-center border-b border-purple-200 pb-8">
          <div className="mb-4">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded">BLOG POST</span>
          </div>
          <h1 className="text-4xl font-bold mb-4 text-purple-900">{blog.title}</h1>
          <div className="text-gray-600 mb-4">
            Published on{" "}
            {new Date(blog.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
          {blog.excerpt && <p className="text-xl text-gray-700 italic">{blog.excerpt}</p>}
        </header>

        <div
          className="blog-content leading-relaxed text-gray-800"
          dangerouslySetInnerHTML={{ __html: blog.content }}
          style={{
            lineHeight: "1.8",
            fontSize: "1.1rem",
          }}
        />
      </article>

      <style jsx global>{`
        .blog-content {
          color: #374151 !important;
        }
        .blog-content h1, .blog-content h2, .blog-content h3, 
        .blog-content h4, .blog-content h5, .blog-content h6 {
          color: #581c87 !important;
          margin-top: 2rem;
          margin-bottom: 1rem;
          font-weight: 600;
        }
        .blog-content h1 { font-size: 2rem; }
        .blog-content h2 { font-size: 1.75rem; }
        .blog-content h3 { font-size: 1.5rem; }
        .blog-content h4 { font-size: 1.25rem; }
        .blog-content h5 { font-size: 1.125rem; }
        .blog-content h6 { font-size: 1rem; }
        .blog-content p {
          margin-bottom: 1.5rem;
          color: #374151 !important;
        }
        .blog-content ul, .blog-content ol {
          margin-bottom: 1.5rem;
          padding-left: 2rem;
          color: #374151 !important;
        }
        .blog-content li {
          margin-bottom: 0.5rem;
          color: #374151 !important;
        }
        .blog-content img {
          max-width: 100%;
          height: auto;
          margin: 2rem 0;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .blog-content a {
          color: #7c3aed;
          text-decoration: underline;
        }
        .blog-content a:hover {
          color: #8b5cf6;
        }
        .blog-content blockquote {
          border-left: 4px solid #7c3aed;
          padding-left: 1rem;
          margin: 2rem 0;
          font-style: italic;
          background-color: rgba(124, 58, 237, 0.1);
          padding: 1rem;
          border-radius: 4px;
          color: #374151 !important;
        }
        .blog-content strong, .blog-content b {
          color: #374151 !important;
          font-weight: 600;
        }
        .blog-content em, .blog-content i {
          color: #374151 !important;
          font-style: italic;
        }
        .blog-content u {
          color: #374151 !important;
          text-decoration: underline;
        }
        .blog-content font {
          color: #374151 !important;
        }
      `}</style>
    </div>
  )
}
