import mongoose from "mongoose";
import { IPostComment } from "../types/post";

const CommentSchema = new mongoose.Schema<IPostComment>(
  {
    postId: {
      type: mongoose.Types.ObjectId,
      ref: "Post",
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const CommentModel = mongoose.model("Comment", CommentSchema);
