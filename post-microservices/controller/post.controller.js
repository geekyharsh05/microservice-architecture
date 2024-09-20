import prisma from "../db/db.config.js";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

class PostController {
  static async index(req, res) {
    try {
      const posts = await prisma.post.findMany({});

      let userIds = [];
      posts.forEach((item) => {
        userIds.push(item.user_id);
      });

      const response = await axios.post(
        `${process.env.AUTH_MICRO_URL}/api/v1/user/getUsers`,
        { userIds }
      );

      const users = {};
      response.data.users.forEach((item) => {
        users[item.id] = item;
      });

      let postWithUsers = await Promise.all(
        posts.map((post) => {
          const user = users[post.user_id];

          return {
            ...post,
            user,
          };
        })
      );

      return res.json({ postWithUsers });
    } catch (error) {
      console.log("the post fetch error is", error);
      return res.status(500).json({ message: "Something went wrong." });
    }
  }

  static async store(req, res) {
    try {
      const authenticatedUser = req.user;
      const { title, content } = req.body;

      const post = await prisma.post.create({
        data: {
          user_id: authenticatedUser.userId,
          title,
          content,
        },
      });

      return res
        .status(201)
        .json({ message: "Post created successfully!", post });
    } catch (error) {
      console.error("Error creating post:", error);
      return res.status(500).json({ message: "Something went wrong." });
    }
  }
}

export default PostController;
