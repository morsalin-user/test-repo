"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { showToast } from "@/components/toast"

export default function UploadPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    downloadLink: "",
    author: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        showToast("Content submitted for review!", "success")
        router.push("/browse")
      } else {
        throw new Error("Failed to submit content")
      }
    } catch (error) {
      showToast("Failed to submit content. Please try again.", "error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const isValidLink = (url) => {
    const allowedDomains = ["mediafire.com", "mega.nz", "gofile.io"]
    try {
      const urlObj = new URL(url)
      return allowedDomains.some((domain) => urlObj.hostname.includes(domain))
    } catch {
      return false
    }
  }

  return (
    <div className="min-h-screen gradient-bg">
      {/* Navigation */}
      <nav className="border-b border-purple-500/20 backdrop-blur-sm bg-black/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
              AuraVerse
            </div>
          </Link>
          <div className="flex items-center gap-2 md:gap-4">
            <Link href="/browse" className="btn btn-ghost text-sm md:text-base">
              Browse
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-purple-100">Share Your Content</h1>
          <p className="text-gray-300">
            Upload your Minecraft content and share it with the community. All submissions are reviewed before going
            live.
          </p>
        </div>

        <div className="content-card purple-glow">
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <h2 className="text-xl font-bold text-purple-100">Upload Content</h2>
          </div>
          <p className="text-gray-300 mb-6">Fill out the form below to submit your content for review.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-purple-200 mb-2">
                Title
              </label>
              <input
                id="title"
                type="text"
                placeholder="Enter a descriptive title for your content"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="input"
                required
              />
            </div>

            <div>
              <label htmlFor="author" className="block text-purple-200 mb-2">
                Author Name
              </label>
              <input
                id="author"
                type="text"
                placeholder="Your name or username"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="input"
                required
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-purple-200 mb-2">
                Category
              </label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="select"
                required
              >
                <option value="">Select a category</option>
                <option value="plugins">Plugins</option>
                <option value="servers">Server Setups</option>
                <option value="mods">Mods</option>
                <option value="maps">Maps</option>
                <option value="textures">Texture Packs</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="description" className="block text-purple-200 mb-2">
                Description
              </label>
              <textarea
                id="description"
                placeholder="Describe your content, what it does, how to install it, etc."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="textarea"
                required
              />
            </div>

            <div>
              <label htmlFor="downloadLink" className="block text-purple-200 mb-2 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  />
                </svg>
                Download Link
              </label>
              <input
                id="downloadLink"
                type="url"
                placeholder="https://mediafire.com/... or https://mega.nz/... or https://gofile.io/..."
                value={formData.downloadLink}
                onChange={(e) => setFormData({ ...formData, downloadLink: e.target.value })}
                className="input"
                required
              />
              <div className="alert alert-info mt-2">
                <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Only links from MediaFire, MEGA, and GoFile.io are allowed.
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isSubmitting || !isValidLink(formData.downloadLink)}
            >
              {isSubmitting ? "Submitting..." : "Submit for Review"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}