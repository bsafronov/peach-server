import { ObjectId } from "mongoose";

/* POST ITSELF */
export interface IPost {
  id: string;
  title: string;
  description: string;
  picturePath: string[];
  userId: ObjectId;
  likes: ObjectId[];
  comments: ObjectId[];
}

export interface IPostCreate {
  title: string;
  description: string;
  picture?: string[];
  userId: string;
}

export interface IPostGetMany {
  limit: string;
  page: string;
}

export interface IPostDelete {
  userId: string;
  postId: string;
}

/* POST COMMENT */
export interface IPostComment {
  id: string;
  postId: ObjectId;
  userId: ObjectId;
  description: string;
}

export interface IPostCommentCreate {
  postId: string;
  userId: string;
  description: string;
}

export interface IPostCommentDelete {
  id: string;
  userId: string;
  postId: string;
}

/* POST LIKE */
export interface IPostLike {
  id: string;
  postId: ObjectId;
  userId: ObjectId;
}

export interface IPostLikeCreate {
  postId: string;
  userId: string;
}
