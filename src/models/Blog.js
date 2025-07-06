import mongoose from "mongoose"

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    excerpt: {
      type: String,
    },
    type: {
      type: String,
      enum: ["blog", "news"],
      default: "blog",
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema)
