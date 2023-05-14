import mongoose from "mongoose";
import { IPost } from "../types/post";

const PostSchema = new mongoose.Schema<IPost>(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    picturePath: {
      type: [String],
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    comments: {
      type: [mongoose.Types.ObjectId],
      ref: "Comment",
    },
    likes: {
      type: [mongoose.Types.ObjectId],
      ref: "Like",
    },
  },
  { timestamps: true }
);

export const PostModel = mongoose.model("Post", PostSchema);
