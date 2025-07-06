import mongoose from "mongoose"

const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    isbn: {
      type: String,
      required: true,
    },
    publisher: {
      type: String,
      required: true,
    },
    publicationYear: {
      type: Number,
      required: true,
    },
    pages: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    condition: {
      type: String,
      enum: ["new", "used"],
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    images: [
      {
        type: String,
        required: false,
      },
    ],
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Book || mongoose.model("Book", BookSchema)
