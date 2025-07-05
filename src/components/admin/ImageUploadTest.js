"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ImageUploadTest() {
  const [testImage, setTestImage] = useState("")

  const handleTestUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      setTestImage(reader.result)
      console.log("Test image base64 length:", reader.result.length)
    }
    reader.readAsDataURL(file)
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Image Upload Test</CardTitle>
      </CardHeader>
      <CardContent>
        <input type="file" accept="image/*" onChange={handleTestUpload} className="mb-4" />
        {testImage && (
          <div>
            <p className="mb-2">Test image loaded successfully!</p>
            <img src={testImage || "/placeholder.svg"} alt="Test" className="w-32 h-32 object-cover rounded" />
            <p className="text-sm text-gray-600 mt-2">Base64 length: {testImage.length} characters</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
