import mongoose from "mongoose";
import { IUser } from "../types/user";
import { IPostLike } from "../types/post";

const UserSchema = new mongoose.Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    picturePath: {
      type: String,
    },
    likes: {
      type: [mongoose.Types.ObjectId],
      ref: "Like",
    },
    posts: {
      type: [mongoose.Types.ObjectId],
      ref: "Post",
    },
    comments: {
      type: [mongoose.Types.ObjectId],
      ref: "Comment",
    },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("User", UserSchema);
