import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Truck, Shield, Star, Users, Award, PenTool, Gavel } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <Gavel className="h-8 w-8 text-yellow-400 mr-3" />
              <p className="text-lg italic text-yellow-400 font-medium">&quot;Let the Lawyers be aware&quot;</p>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Your Premier Destination for
              <span className="text-yellow-400 block">Legal Literature</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-purple-100 max-w-2xl mx-auto">
              Discover comprehensive legal resources with our extensive collection of new and used law books, delivered
              with excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book-selection">
                <Button size="lg" className="text-lg px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-purple-900">
                  Explore Our Collection
                </Button>
              </Link>
              <Link href="/blogs">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-purple-900 bg-transparent"
                >
                  Legal Insights & News
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Sections */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Books Section */}
            <Card className="hover:shadow-lg transition-shadow border-purple-200">
              <CardHeader className="text-center">
                <BookOpen className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle className="text-2xl text-purple-900">Legal Books</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">
                  Extensive collection of new and used legal books from all practice areas
                </p>
                <Link href="/book-selection">
                  <Button className="bg-purple-600 text-white hover:bg-purple-700">Browse Books</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Blog Section */}
            <Card className="hover:shadow-lg transition-shadow border-purple-200 bg-purple-50">
              <CardHeader className="text-center">
                <PenTool className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle className="text-2xl text-purple-900">Legal Insights</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">
                  Stay updated with latest legal news, case studies, and professional insights
                </p>
                <Link href="/blogs">
                  <Button className="bg-purple-600 hover:bg-purple-700">Read Articles</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Sell Books Section */}
            <Card className="hover:shadow-lg transition-shadow border-purple-200">
              <CardHeader className="text-center">
                <Star className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle className="text-2xl text-purple-900">Sell Your Books</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">Turn your legal books into cash with our easy selling process</p>
                <Link href="/sell-books">
                  <Button className="bg-purple-600 hover:bg-purple-700">Sell Now</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4">Why Choose Law Bookstore?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We&apos;re committed to providing legal professionals and students with the highest quality resources and
              service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Extensive Collection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Comprehensive library spanning all legal disciplines, from constitutional law to specialized practice
                  areas.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">Fast & Reliable Delivery</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Quick processing and secure shipping to get your legal resources when you need them most.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Quality Guaranteed</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Every book is carefully inspected and accurately described, with detailed condition reports.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-yellow-600" />
                </div>
                <CardTitle className="text-xl">Expert Curation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our legal experts carefully select and organize our collection for maximum relevance and utility.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-red-600" />
                </div>
                <CardTitle className="text-xl">Community Focused</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Serving law students, practicing attorneys, and legal scholars with personalized recommendations.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-indigo-600" />
                </div>
                <CardTitle className="text-xl">Competitive Pricing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Fair prices on both new and used books, with special discounts for students and bulk orders.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4">Popular Legal Categories</h2>
            <p className="text-xl text-gray-600">Explore our most sought-after legal practice areas</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              "Constitutional Law",
              "Criminal Law",
              "Civil Procedure",
              "Corporate Law",
              "Family Law",
              "Tax Law",
              "Environmental Law",
              "Intellectual Property",
            ].map((category) => (
              <Link key={category} href="/book-selection">
                <Card className="hover:shadow-md transition-shadow cursor-pointer border-purple-200 hover:border-purple-400">
                  <CardContent className="p-6 text-center">
                    <h3 className="font-semibold text-purple-900">{category}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-purple-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Build Your Legal Library?</h2>
          <p className="text-xl mb-8 text-purple-100 max-w-2xl mx-auto">
            Join thousands of legal professionals who trust us for their educational and professional needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book-selection">
              <Button size="lg" className="text-lg px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-purple-900">
                Start Shopping
              </Button>
            </Link>
            <Link href="/register">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-purple-900 bg-transparent"
              >
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
