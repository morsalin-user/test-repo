async function getBlog(id) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/blogs/${id}`, {
      cache: "no-store",
    })
    if (!response.ok) return null
    return await response.json()
  } catch (error) {
    console.error("Failed to fetch blog:", error)
    return null
  }
}

export default async function BlogPage({ params }) {
  const blog = await getBlog(params.id)

  if (!blog) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Blog Not Found</h1>
          <p className="text-gray-600">The blog post you&apos;re looking for doesn&apos;t exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <article className="prose prose-lg max-w-none">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
          <div className="text-gray-600 mb-4">Published on {new Date(blog.createdAt).toLocaleDateString()}</div>
        </header>

        <div className="whitespace-pre-wrap leading-relaxed">{blog.content}</div>
      </article>
    </div>
  )
}
