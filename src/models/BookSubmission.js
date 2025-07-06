import mongoose from "mongoose"

const BookSubmissionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    isbn: String,
    publisher: String,
    publicationYear: Number,
    category: String,
    condition: {
      type: String,
      required: true,
      enum: ["excellent", "very-good", "good", "fair", "poor"],
    },
    description: String,
    images: [String],
    sellerName: {
      type: String,
      required: true,
    },
    sellerEmail: {
      type: String,
      required: true,
    },
    sellerPhone: String,
    status: {
      type: String,
      enum: ["pending", "reviewed", "offered", "accepted", "rejected", "completed"],
      default: "pending",
    },
    offerAmount: Number,
    notes: String,
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.BookSubmission || mongoose.model("BookSubmission", BookSubmissionSchema)
