import { ObjectId } from "mongoose";

export interface IUser {
  id: string;
  email: string;
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
  picturePath?: string;
  posts: ObjectId[];
  likes: ObjectId[];
  comments: ObjectId[];
}

export interface IAuthRegister {
  email: string;
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface IAuthLogin {
  email: string;
  password: string;
}
