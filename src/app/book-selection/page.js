"use client"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Clock } from "lucide-react"

export default function BookSelectionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Choose Your Book Collection</h1>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto">
            Select from our carefully curated collection of new and second-hand legal books
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* New Books */}
          <Link href="/products?condition=new">
            <Card className="bg-white/10 backdrop-blur-sm border-purple-300 hover:bg-white/20 transition-all cursor-pointer group">
              <CardHeader className="text-center">
                <div className="bg-yellow-400 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <BookOpen className="h-10 w-10 text-purple-900" />
                </div>
                <CardTitle className="text-2xl text-white">New Books</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-purple-100 mb-6">
                  Brand new legal books with the latest editions, pristine condition, and full warranty coverage.
                </p>
                <ul className="text-sm text-purple-200 space-y-2 mb-6">
                  <li>✓ Latest editions and updates</li>
                  <li>✓ Pristine condition guaranteed</li>
                  <li>✓ Full publisher warranty</li>
                  <li>✓ Latest legal precedents</li>
                </ul>
                <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-purple-900">Browse New Books</Button>
              </CardContent>
            </Card>
          </Link>

          {/* Used Books */}
          <Link href="/products?condition=used">
            <Card className="bg-white/10 backdrop-blur-sm border-purple-300 hover:bg-white/20 transition-all cursor-pointer group">
              <CardHeader className="text-center">
                <div className="bg-green-400 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Clock className="h-10 w-10 text-purple-900" />
                </div>
                <CardTitle className="text-2xl text-white">Second-Hand Books</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-purple-100 mb-6">
                  Quality pre-owned legal books at affordable prices, carefully inspected and graded for condition.
                </p>
                <ul className="text-sm text-purple-200 space-y-2 mb-6">
                  <li>✓ Significant cost savings</li>
                  <li>✓ Quality condition guaranteed</li>
                  <li>✓ Detailed condition reports</li>
                  <li>✓ Environmentally friendly</li>
                </ul>
                <Button className="w-full bg-green-500 hover:bg-green-600 text-purple-900">Browse Used Books</Button>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="text-center mt-12">
          <Link href="/products">
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-purple-900 bg-transparent"
            >
              View All Books
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
