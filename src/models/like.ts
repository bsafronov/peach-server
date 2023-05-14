import mongoose from "mongoose";
import { IPostLike } from "../types/post";

const LikeSchema = new mongoose.Schema<IPostLike>(
  {
    postId: {
      type: mongoose.Types.ObjectId,
      ref: "Post",
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const LikeModel = mongoose.model("Like", LikeSchema);
