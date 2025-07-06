"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Upload, X, DollarSign, BookOpen, Camera } from "lucide-react"

export default function SellBooksPage() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    publisher: "",
    publicationYear: "",
    category: "",
    condition: "",
    description: "",
    sellerName: "",
    sellerEmail: "",
    sellerPhone: "",
    images: [],
  })
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })
  }

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files)
    const base64Images = []

    for (const file of files) {
      if (file.type.startsWith("image/")) {
        try {
          if (file.size > 5 * 1024 * 1024) {
            toast({
              title: "Error",
              description: `Image ${file.name} is too large. Please use images under 5MB.`,
              variant: "destructive",
            })
            continue
          }
          const base64 = await convertToBase64(file)
          base64Images.push(base64)
        } catch (error) {
          console.error("Error converting image:", error)
        }
      }
    }

    setFormData({ ...formData, images: [...formData.images, ...base64Images] })
  }

  const removeImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index)
    setFormData({ ...formData, images: newImages })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/sell-books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Your book submission has been received! We'll contact you within 24-48 hours with our offer.",
        })
        setFormData({
          title: "",
          author: "",
          isbn: "",
          publisher: "",
          publicationYear: "",
          category: "",
          condition: "",
          description: "",
          sellerName: "",
          sellerEmail: "",
          sellerPhone: "",
          images: [],
        })
      } else {
        throw new Error("Failed to submit book")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit your book. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4">Sell Your Legal Books</h1>
          <p className="text-xl text-gray-600">Turn your legal books into cash with our easy selling process</p>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="text-center border-purple-200">
            <CardHeader>
              <Camera className="h-12 w-12 text-purple-600 mx-auto mb-2" />
              <CardTitle className="text-lg">1. Submit Details</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Fill out the form with book details and upload clear photos</p>
            </CardContent>
          </Card>

          <Card className="text-center border-purple-200">
            <CardHeader>
              <BookOpen className="h-12 w-12 text-purple-600 mx-auto mb-2" />
              <CardTitle className="text-lg">2. We Inspect</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Our experts review your submission and assess the book's value</p>
            </CardContent>
          </Card>

          <Card className="text-center border-purple-200">
            <CardHeader>
              <DollarSign className="h-12 w-12 text-purple-600 mx-auto mb-2" />
              <CardTitle className="text-lg">3. Get Paid</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Receive our offer and get paid quickly upon acceptance</p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-purple-200">
          <CardHeader>
            <CardTitle className="text-2xl text-purple-900">Book Submission Form</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Book Information */}
              <div>
                <h3 className="text-lg font-semibold text-purple-900 mb-4">Book Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Book Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="author">Author *</Label>
                    <Input
                      id="author"
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="isbn">ISBN</Label>
                    <Input
                      id="isbn"
                      value={formData.isbn}
                      onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                      placeholder="978-3-16-148410-0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="publisher">Publisher</Label>
                    <Input
                      id="publisher"
                      value={formData.publisher}
                      onChange={(e) => setFormData({ ...formData, publisher: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="publicationYear">Publication Year</Label>
                    <Input
                      id="publicationYear"
                      type="number"
                      value={formData.publicationYear}
                      onChange={(e) => setFormData({ ...formData, publicationYear: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Legal Category</Label>
                    <Input
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      placeholder="e.g., Constitutional Law, Criminal Law"
                    />
                  </div>
                </div>
              </div>

              {/* Condition */}
              <div>
                <Label htmlFor="condition">Book Condition *</Label>
                <Select
                  value={formData.condition}
                  onValueChange={(value) => setFormData({ ...formData, condition: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excellent">Excellent - Like new, no wear</SelectItem>
                    <SelectItem value="very-good">Very Good - Minor wear, all pages intact</SelectItem>
                    <SelectItem value="good">Good - Some wear, highlighting/notes possible</SelectItem>
                    <SelectItem value="fair">Fair - Significant wear, but readable</SelectItem>
                    <SelectItem value="poor">Poor - Heavy wear, damaged pages</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description">Additional Details</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Any additional details about the book's condition, edition, or special features..."
                  rows={4}
                />
              </div>

              {/* Images */}
              <div>
                <Label htmlFor="images">Book Photos *</Label>
                <p className="text-sm text-gray-600 mb-2">
                  Please upload clear photos of the book cover, spine, and any damage or wear
                </p>
                <div className="mt-2">
                  <input
                    type="file"
                    id="images"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <label
                    htmlFor="images"
                    className="flex items-center justify-center w-full h-32 border-2 border-dashed border-purple-300 rounded-lg cursor-pointer hover:bg-purple-50"
                  >
                    <div className="text-center">
                      <Upload className="mx-auto h-8 w-8 text-purple-400" />
                      <p className="mt-2 text-sm text-purple-600">Click to upload photos</p>
                    </div>
                  </label>
                </div>
                {formData.images.length > 0 && (
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`Book ${index + 1}`}
                          className="w-full h-24 object-cover rounded"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Seller Information */}
              <div>
                <h3 className="text-lg font-semibold text-purple-900 mb-4">Your Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="sellerName">Full Name *</Label>
                    <Input
                      id="sellerName"
                      value={formData.sellerName}
                      onChange={(e) => setFormData({ ...formData, sellerName: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="sellerEmail">Email Address *</Label>
                    <Input
                      id="sellerEmail"
                      type="email"
                      value={formData.sellerEmail}
                      onChange={(e) => setFormData({ ...formData, sellerEmail: e.target.value })}
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="sellerPhone">Phone Number</Label>
                    <Input
                      id="sellerPhone"
                      type="tel"
                      value={formData.sellerPhone}
                      onChange={(e) => setFormData({ ...formData, sellerPhone: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                disabled={
                  loading || !formData.title || !formData.author || !formData.condition || formData.images.length === 0
                }
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                {loading ? "Submitting..." : "Submit Book for Evaluation"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Information Section */}
        <Card className="mt-8 border-purple-200">
          <CardHeader>
            <CardTitle className="text-xl text-purple-900">What Happens Next?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-gray-600">
              <p>
                <strong>1. Review Process:</strong> Our team will review your submission within 24-48 hours and assess
                the book's condition and market value.
              </p>
              <p>
                <strong>2. Offer:</strong> We'll send you a fair offer based on the book's condition, demand, and
                current market prices.
              </p>
              <p>
                <strong>3. Acceptance:</strong> If you accept our offer, we'll arrange for book pickup or provide
                shipping instructions.
              </p>
              <p>
                <strong>4. Payment:</strong> Once we receive and verify the book, payment will be processed within 2-3
                business days.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
