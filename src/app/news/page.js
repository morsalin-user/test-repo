import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Calendar, Clock } from "lucide-react"

async function getNews() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/blogs?type=news`, {
      cache: "no-store",
    })
    if (!response.ok) return []
    return await response.json()
  } catch (error) {
    console.error("Failed to fetch news:", error)
    return []
  }
}

export default async function NewsPage() {
  const news = await getNews()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-purple-900 mb-4">Legal News & Updates</h1>
        <p className="text-gray-600">Stay informed with the latest legal news, updates, and important announcements.</p>
      </div>

      {news.length === 0 ? (
        <div className="text-center py-12">
          <Clock className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No news articles available at the moment.</p>
          <p className="text-gray-400">Check back soon for the latest legal updates.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((article) => (
            <Card key={article._id} className="hover:shadow-lg transition-shadow border-purple-200">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded">NEWS</span>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(article.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <CardTitle className="text-lg line-clamp-2 text-purple-900">{article.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 line-clamp-3 mb-4">
                  {article.excerpt || article.content.replace(/<[^>]*>/g, "").substring(0, 150) + "..."}
                </p>
                <Link href={`/news/${article._id}`}>
                  <Button
                    variant="outline"
                    className="w-full border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white bg-transparent"
                  >
                    Read Full Article
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
