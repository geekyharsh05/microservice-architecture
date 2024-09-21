import axios from "axios";
import prisma from "../prisma";

class CommentController {
  // Create a new comment
  static async store(req, res) {
    try {
      const { post_id, content } = req.body;
      const authenticatedUser = req.user;

      // Validate post with Post microservice
      const postResponse = await axios.get(
        `${process.env.POST_MICRO_URL}/api/posts/${post_id}`
      );
      if (!postResponse.data) {
        return res.status(404).json({ message: "Post not found" });
      }

      // Create the comment
      const comment = await prisma.comment.create({
        data: {
          post_id,
          user_id: authenticatedUser.id, // Taken from JWT token
          content,
        },
      });

      return res.status(201).json({ message: "Comment created successfully", comment });
    } catch (error) {
      console.error("Error creating comment:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  // Fetch comments for a post
  static async index(req, res) {
    try {
      const { post_id } = req.params;

      // Fetch the comments for a post
      const comments = await prisma.comment.findMany({
        where: { post_id: parseInt(post_id) },
      });

      // Fetch post information from Post microservice
      const postResponse = await axios.get(
        `${process.env.POST_MICRO_URL}/api/v1/post/${post_id}`
      );
      const post = postResponse.data;

      // Fetch user details for each comment from User microservice
      let userIds = comments.map((comment) => comment.user_id);
      const userResponse = await axios.post(
        `${process.env.USER_MICRO_URL}/api/getUsers`,
        { userIds }
      );
      const users = userResponse.data.users;

      // Add user info to comments
      const commentsWithUsers = comments.map((comment) => ({
        ...comment,
        user: users.find((user) => user.id === comment.user_id),
      }));

      return res.json({ post, comments: commentsWithUsers });
    } catch (error) {
      console.error("Error fetching comments:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default CommentController;
