"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Eye, Edit, DollarSign } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function BookSubmissionManagement() {
  const [submissions, setSubmissions] = useState([])
  const [selectedSubmission, setSelectedSubmission] = useState(null)
  const [showDetails, setShowDetails] = useState(false)
  const [offerAmount, setOfferAmount] = useState("")
  const [adminNotes, setAdminNotes] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    fetchSubmissions()
  }, [])

  const fetchSubmissions = async () => {
    try {
      const response = await fetch("/api/book-submissions", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      if (response.ok) {
        const data = await response.json()
        setSubmissions(data)
      }
    } catch (error) {
      console.error("Failed to fetch submissions:", error)
    }
  }

  const updateSubmissionStatus = async (id, status, condition = null) => {
    try {
      const updateData = { status }
      if (condition) updateData.condition = condition
      if (offerAmount && status === "offered") updateData.offerAmount = Number.parseFloat(offerAmount)
      if (adminNotes) updateData.notes = adminNotes

      const response = await fetch(`/api/book-submissions/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updateData),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Submission updated successfully!",
        })
        fetchSubmissions()
        setShowDetails(false)
        setOfferAmount("")
        setAdminNotes("")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update submission",
        variant: "destructive",
      })
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "reviewed":
        return "bg-blue-100 text-blue-800"
      case "offered":
        return "bg-purple-100 text-purple-800"
      case "accepted":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getConditionColor = (condition) => {
    switch (condition) {
      case "excellent":
        return "bg-green-100 text-green-800"
      case "very-good":
        return "bg-blue-100 text-blue-800"
      case "good":
        return "bg-yellow-100 text-yellow-800"
      case "fair":
        return "bg-orange-100 text-orange-800"
      case "poor":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-purple-900">Book Submissions Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {submissions.map((submission) => (
              <div key={submission._id} className="border border-purple-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-purple-900">{submission.title}</h3>
                    <p className="text-sm text-gray-600">by {submission.author}</p>
                    <p className="text-sm text-gray-500">Seller: {submission.sellerName}</p>
                    <p className="text-sm text-gray-500">Email: {submission.sellerEmail}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(submission.status)}>{submission.status.toUpperCase()}</Badge>
                    {submission.condition && (
                      <Badge className={getConditionColor(submission.condition)}>
                        {submission.condition.replace("-", " ").toUpperCase()}
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <strong>Submitted Condition:</strong> {submission.condition?.replace("-", " ")}
                  </div>
                  <div>
                    <strong>Category:</strong> {submission.category || "N/A"}
                  </div>
                  <div>
                    <strong>Submitted:</strong> {new Date(submission.createdAt).toLocaleDateString()}
                  </div>
                </div>

                {submission.offerAmount && (
                  <div className="mb-4">
                    <strong className="text-green-600">Offer Amount: ${submission.offerAmount}</strong>
                  </div>
                )}

                {submission.notes && (
                  <div className="mb-4 p-3 bg-gray-50 rounded">
                    <strong>Admin Notes:</strong> {submission.notes}
                  </div>
                )}

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setSelectedSubmission(submission)
                      setShowDetails(true)
                      setOfferAmount(submission.offerAmount?.toString() || "")
                      setAdminNotes(submission.notes || "")
                    }}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </Button>

                  <Select
                    value={submission.status}
                    onValueChange={(status) => updateSubmissionStatus(submission._id, status)}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="reviewed">Reviewed</SelectItem>
                      <SelectItem value="offered">Offered</SelectItem>
                      <SelectItem value="accepted">Accepted</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Details Modal */}
      {showDetails && selectedSubmission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-purple-900">Book Submission Details</h2>
              <Button variant="outline" onClick={() => setShowDetails(false)}>
                Close
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Book Information */}
              <div>
                <h3 className="text-lg font-semibold text-purple-900 mb-4">Book Information</h3>
                <div className="space-y-2">
                  <div>
                    <strong>Title:</strong> {selectedSubmission.title}
                  </div>
                  <div>
                    <strong>Author:</strong> {selectedSubmission.author}
                  </div>
                  <div>
                    <strong>ISBN:</strong> {selectedSubmission.isbn || "N/A"}
                  </div>
                  <div>
                    <strong>Publisher:</strong> {selectedSubmission.publisher || "N/A"}
                  </div>
                  <div>
                    <strong>Publication Year:</strong> {selectedSubmission.publicationYear || "N/A"}
                  </div>
                  <div>
                    <strong>Category:</strong> {selectedSubmission.category || "N/A"}
                  </div>
                  <div>
                    <strong>Condition:</strong> {selectedSubmission.condition?.replace("-", " ")}
                  </div>
                </div>

                {selectedSubmission.description && (
                  <div className="mt-4">
                    <strong>Description:</strong>
                    <p className="mt-1 text-gray-700">{selectedSubmission.description}</p>
                  </div>
                )}
              </div>

              {/* Seller Information */}
              <div>
                <h3 className="text-lg font-semibold text-purple-900 mb-4">Seller Information</h3>
                <div className="space-y-2">
                  <div>
                    <strong>Name:</strong> {selectedSubmission.sellerName}
                  </div>
                  <div>
                    <strong>Email:</strong> {selectedSubmission.sellerEmail}
                  </div>
                  <div>
                    <strong>Phone:</strong> {selectedSubmission.sellerPhone || "N/A"}
                  </div>
                  <div>
                    <strong>Submitted:</strong> {new Date(selectedSubmission.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>

            {/* Images */}
            {selectedSubmission.images && selectedSubmission.images.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-purple-900 mb-4">Book Images</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {selectedSubmission.images.map((image, index) => (
                    <img
                      key={index}
                      src={image || "/placeholder.svg"}
                      alt={`Book ${index + 1}`}
                      className="w-full h-32 object-cover rounded border"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Admin Actions */}
            <div className="mt-6 border-t pt-6">
              <h3 className="text-lg font-semibold text-purple-900 mb-4">Admin Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="offerAmount">Offer Amount ($)</Label>
                  <Input
                    id="offerAmount"
                    type="number"
                    step="0.01"
                    value={offerAmount}
                    onChange={(e) => setOfferAmount(e.target.value)}
                    placeholder="Enter offer amount"
                  />
                </div>
                <div>
                  <Label htmlFor="status">Update Status</Label>
                  <Select
                    value={selectedSubmission.status}
                    onValueChange={(status) => {
                      setSelectedSubmission({ ...selectedSubmission, status })
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="reviewed">Reviewed</SelectItem>
                      <SelectItem value="offered">Offered</SelectItem>
                      <SelectItem value="accepted">Accepted</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="mt-4">
                <Label htmlFor="adminNotes">Admin Notes</Label>
                <Textarea
                  id="adminNotes"
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Add notes about this submission..."
                  rows={3}
                />
              </div>

              <div className="mt-4 flex gap-2">
                <Button
                  onClick={() =>
                    updateSubmissionStatus(
                      selectedSubmission._id,
                      selectedSubmission.status,
                      selectedSubmission.condition,
                    )
                  }
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Update Submission
                </Button>
                {selectedSubmission.status !== "offered" && offerAmount && (
                  <Button
                    onClick={() => updateSubmissionStatus(selectedSubmission._id, "offered")}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <DollarSign className="h-4 w-4 mr-1" />
                    Send Offer
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
