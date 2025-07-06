import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, BookOpen, Calendar, Clock } from "lucide-react"

export default function NotesPage() {
  const announcements = [
    {
      id: 1,
      title: "New Legal Database Access",
      content:
        "We now provide complimentary access to Westlaw and LexisNexis for customers purchasing textbooks worth $500 or more.",
      type: "announcement",
      date: "2024-01-15",
      priority: "high",
    },
    {
      id: 2,
      title: "Holiday Shipping Schedule",
      content:
        "Please note our modified shipping schedule during the holiday season. Orders placed after December 20th will be processed after January 2nd.",
      type: "notice",
      date: "2024-01-10",
      priority: "medium",
    },
    {
      id: 3,
      title: "Student Discount Program",
      content:
        "Law students can now enjoy 15% off on all used books. Simply verify your student status during checkout.",
      type: "promotion",
      date: "2024-01-08",
      priority: "medium",
    },
    {
      id: 4,
      title: "Book Condition Grading Update",
      content:
        "We've updated our book condition grading system to provide more accurate descriptions. Check our condition guide for details.",
      type: "update",
      date: "2024-01-05",
      priority: "low",
    },
  ]

  const getTypeIcon = (type) => {
    switch (type) {
      case "announcement":
        return <AlertCircle className="h-5 w-5 text-purple-600" />
      case "notice":
        return <Clock className="h-5 w-5 text-orange-600" />
      case "promotion":
        return <BookOpen className="h-5 w-5 text-green-600" />
      case "update":
        return <Calendar className="h-5 w-5 text-blue-600" />
      default:
        return <AlertCircle className="h-5 w-5 text-gray-600" />
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case "announcement":
        return "bg-purple-100 text-purple-800"
      case "notice":
        return "bg-orange-100 text-orange-800"
      case "promotion":
        return "bg-green-100 text-green-800"
      case "update":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-purple-900 mb-4">Important Notes & Announcements</h1>
        <p className="text-gray-600">
          Stay updated with the latest news, policies, and important information from Law Bookstore.
        </p>
      </div>

      <div className="space-y-6">
        {announcements.map((note) => (
          <Card key={note.id} className="border-purple-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  {getTypeIcon(note.type)}
                  <CardTitle className="text-xl text-purple-900">{note.title}</CardTitle>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getPriorityColor(note.priority)}>{note.priority.toUpperCase()}</Badge>
                  <Badge variant="outline" className={getTypeColor(note.type)}>
                    {note.type.toUpperCase()}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">{note.content}</p>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-1" />
                {new Date(note.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Contact Information */}
      <Card className="mt-12 border-purple-200 bg-purple-50">
        <CardHeader>
          <CardTitle className="text-xl text-purple-900">Need More Information?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-4">
            If you have any questions about our policies, shipping, or need assistance with your order, please don't
            hesitate to contact us.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <strong className="text-purple-900">Email:</strong>
              <br />
              info@lawbookstore.com
            </div>
            <div>
              <strong className="text-purple-900">Phone:</strong>
              <br />
              (555) 123-4567
            </div>
            <div>
              <strong className="text-purple-900">Hours:</strong>
              <br />
              Mon-Fri: 9AM-6PM EST
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
