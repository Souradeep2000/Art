import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    content: { type: String },
    product_id: { type: String, required: true },
    rating: { type: Number, default: 0, required: true },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reply: { type: Array },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
