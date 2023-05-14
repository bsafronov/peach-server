import { Request, Response } from "express";
import {
  IPostCommentCreate,
  IPostCommentDelete,
  IPostCreate,
  IPostDelete,
  IPostGetMany,
  IPostLike,
  IPostLikeCreate,
} from "../types/post";
import { fileService } from "../services/file";
import { PostModel } from "../models/post";
import { postService } from "../services/post";
import { userService } from "../services/user";

class PostController {
  async getById(req: Request, res: Response) {
    try {
      const { id } = req.body;
      const post = await postService.getById(id);

      res.status(200).json(post);
    } catch (error) {
      res.status(404).json({ error: error });
    }
  }

  async getMany(req: Request, res: Response) {
    try {
      const { limit, page } = req.params;

      const posts = await postService.getMany(page, limit);

      res.status(200).json(posts);
    } catch (error) {
      res.status(404).json({ error: error });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { description, title, userId }: IPostCreate = req.body;
      const pictures = req.files;
      const picturePaths = [];

      if (pictures) {
        for (const pic of Object.values(pictures)) {
          const picturePath = await fileService.uploadImage(pic);
          picturePaths.push(picturePath?.url);
        }
      }

      const post = await PostModel.create({
        title,
        description,
        userId,
        picturePath: picturePaths,
      });

      res.status(200).json(post);
    } catch (error) {
      res.status(404).json({ error: error });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { postId, userId }: IPostDelete = req.body;

      const post = await postService.getById(postId);
      const user = await userService.getById(userId);

      if (!post || !user) {
        return res
          .status(404)
          .json({ error: "Пользователь или пост не найдены" });
      }

      if (user.id !== post.userId) {
        return res.status(400).json({ error: "Отказано в доступе" });
      }
      await post.deleteOne();
      res.status(200).json(true);
    } catch (error) {
      res.status(404).json({ error: error });
    }
  }

  async like(req: Request, res: Response) {
    try {
      const { postId, userId }: IPostLikeCreate = req.body;

      const post = await postService.getById(postId);
      const user = await userService.getById(userId);

      if (!post || !user) {
        return res
          .status(404)
          .json({ error: "Пользователь или пост не найдены" });
      }

      if (post.likes.includes(user.id)) {
        post.likes = post.likes.filter((userId) => userId !== user.id);
        user.likes = user.likes.filter((postId) => postId !== post.id);
      } else {
        post.likes.push(user.id);
        user.likes.push(post.id);
      }

      await post.save();
      await user.save();

      res.status(200).json(post);
    } catch (error) {
      res.status(404).json({ error: error });
    }
  }

  async createComment(req: Request, res: Response) {
    try {
      const { postId, userId, description }: IPostCommentCreate = req.body;
      const post = await postService.getById(postId);
      const user = await userService.getById(userId);

      if (!post || !user) {
        return res
          .status(404)
          .json({ error: "Пользователь или пост не найдены" });
      }

      const comment = await postService.createComment(
        userId,
        postId,
        description
      );

      post.comments.push(comment.id);
      user.comments.push(comment.id);

      res.status(200).json(comment);
    } catch (error) {
      res.status(404).json({ error: error });
    }
  }

  async deleteComment(req: Request, res: Response) {
    try {
      const { id, userId, postId }: IPostCommentDelete = req.body;
      const post = await postService.getById(postId);
      const user = await userService.getById(userId);

      const comment = await postService.getCommentById(id);

      if (!comment || !post || !user) {
        return res
          .status(404)
          .json({ error: "Комментарий, пользователь или пост не найдены" });
      }

      /* Условие удаления: мы владельцы комментария */
      if (user.id === comment.userId || user.posts.includes(post.id)) {
        user.comments.filter((commentId) => commentId !== comment.id);
        post.comments.filter((commentId) => commentId !== comment.id);
      }

      await comment.deleteOne();

      res.status(200).json(true);
    } catch (error) {
      res.status(404).json({ error: error });
    }
  }
}

export const postController = new PostController();
