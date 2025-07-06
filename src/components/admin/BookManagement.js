"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Trash2, Edit, X, Upload } from "lucide-react"
import ImageUploadTest from "./ImageUploadTest"

export default function ProductManagement() {
  const [products, setProducts] = useState([])
  const [editingProduct, setEditingProduct] = useState(null)
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    publisher: "",
    publicationYear: "",
    pages: "",
    category: "",
    description: "",
    price: "",
    condition: "new",
    stock: "",
    images: [],
  })
  const [imageFiles, setImageFiles] = useState([])
  const { toast } = useToast()

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products")
      if (response.ok) {
        const data = await response.json()
        setProducts(data)
      }
    } catch (error) {
      console.error("Failed to fetch products:", error)
    }
  }

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        console.log("Converted image to base64, size:", reader.result.length) // Debug log
        resolve(reader.result)
      }
      reader.onerror = (error) => {
        console.error("FileReader error:", error)
        reject(error)
      }
    })
  }

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files)
    console.log("Selected files:", files.length) // Debug log

    if (files.length === 0) return

    const base64Images = []

    for (const file of files) {
      if (file.type.startsWith("image/")) {
        try {
          // Check file size (limit to 5MB)
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
          console.log("Successfully converted:", file.name) // Debug log
        } catch (error) {
          console.error("Error converting image:", file.name, error)
          toast({
            title: "Error",
            description: `Failed to process image: ${file.name}`,
            variant: "destructive",
          })
        }
      } else {
        toast({
          title: "Error",
          description: `${file.name} is not a valid image file.`,
          variant: "destructive",
        })
      }
    }

    if (base64Images.length > 0) {
      setFormData({ ...formData, images: [...formData.images, ...base64Images] })
      setImageFiles([...imageFiles, ...files.filter((f) => f.type.startsWith("image/"))])

      toast({
        title: "Success",
        description: `${base64Images.length} image(s) uploaded successfully!`,
      })
    }
  }

  const removeImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index)
    const newFiles = imageFiles.filter((_, i) => i !== index)
    setFormData({ ...formData, images: newImages })
    setImageFiles(newFiles)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Ensure images are included in the form data
    const productData = {
      ...formData,
      images: formData.images || [], // Ensure images array exists
    }

    console.log("Submitting product data:", productData) // Debug log

    const url = editingProduct ? `/api/products/${editingProduct._id}` : "/api/products"
    const method = editingProduct ? "PUT" : "POST"

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(productData),
      })

      if (response.ok) {
        const savedProduct = await response.json()
        console.log("Saved product:", savedProduct) // Debug log
        toast({
          title: "Success",
          description: `Product ${editingProduct ? "updated" : "created"} successfully!`,
        })
        resetForm()
        fetchProducts()
      } else {
        const errorData = await response.json()
        console.error("API Error:", errorData)
        throw new Error(errorData.message || "Failed to save product")
      }
    } catch (error) {
      console.error("Submit error:", error)
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setFormData({
      title: product.title,
      author: product.author,
      isbn: product.isbn,
      publisher: product.publisher,
      publicationYear: product.publicationYear,
      pages: product.pages,
      category: product.category,
      description: product.description,
      price: product.price,
      condition: product.condition,
      stock: product.stock,
      images: product.images || [],
    })
    setImageFiles([])
  }

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Product deleted successfully!",
        })
        fetchProducts()
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive",
      })
    }
  }

  const resetForm = () => {
    setEditingProduct(null)
    setFormData({
      title: "",
      author: "",
      isbn: "",
      publisher: "",
      publicationYear: "",
      pages: "",
      category: "",
      description: "",
      price: "",
      condition: "new",
      stock: "",
      images: [],
    })
    setImageFiles([])
  }

  return (
    <div className="space-y-6">
      <ImageUploadTest />
      <Card>
        <CardHeader>
          <CardTitle>{editingProduct ? "Edit Product" : "Add New Product"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="author">Author</Label>
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
                required
              />
            </div>
            <div>
              <Label htmlFor="publisher">Publisher</Label>
              <Input
                id="publisher"
                value={formData.publisher}
                onChange={(e) => setFormData({ ...formData, publisher: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="publicationYear">Publication Year</Label>
              <Input
                id="publicationYear"
                type="number"
                value={formData.publicationYear}
                onChange={(e) => setFormData({ ...formData, publicationYear: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="pages">Pages</Label>
              <Input
                id="pages"
                type="number"
                value={formData.pages}
                onChange={(e) => setFormData({ ...formData, pages: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="condition">Condition</Label>
              <Select
                value={formData.condition}
                onValueChange={(value) => setFormData({ ...formData, condition: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="used">Used</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                required
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="images">Product Images</Label>
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
                  className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
                >
                  <div className="text-center">
                    <Upload className="mx-auto h-8 w-8 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">Click to upload images</p>
                  </div>
                </label>
              </div>
              {formData.images.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Product ${index + 1}`}
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
            <div className="md:col-span-2 flex gap-2">
              <Button type="submit">{editingProduct ? "Update Product" : "Add Product"}</Button>
              {editingProduct && (
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
          <CardTitle>All Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {products.map((product) => (
              <div key={product._id} className="flex items-center justify-between p-4 border rounded">
                <div className="flex items-center space-x-4">
                  {product.images && product.images.length > 0 && (
                    <img
                      src={product.images[0] || "/placeholder.svg"}
                      alt={product.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                  <div>
                    <h3 className="font-semibold">{product.title}</h3>
                    <p className="text-sm text-gray-600">
                      by {product.author} - ${product.price} ({product.condition})
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(product)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(product._id)}>
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
