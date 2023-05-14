import { CommentModel } from "../models/comment";
import { PostModel } from "../models/post";

class PostService {
  async getById(id: string) {
    return await PostModel.findById(id);
  }

  async getMany(page: string, limit: string) {
    return await PostModel.find();
  }

  async createComment(userId: string, postId: string, description: string) {
    return await CommentModel.create({
      postId,
      userId,
      description,
    });
  }

  async getCommentById(id: string) {
    return await CommentModel.findById(id);
  }
}

export const postService = new PostService();
