// class PostController {
//     static async getPosts(req, res) {
//         try {
//             const posts = await prisma.post.findMany();
//             res.status(200).json(posts);
//         } catch (error) {
//             res.status(500).json({ message: "Internal server error" });
//         }
//     }

//     static async getPostById(req, res) {
//         try {
//             const { id } = req.params;
//             const post = await prisma.post.findUnique({
//                 where: {
//                     id: id,
//                 },
//             });
//             res.status(200).json(post);
//         } catch (error) {
//             res.status(500).json({ message: "Internal server error" });
//         }
//     }

//     static async createPost(req, res) {
//         try {
//             const { title, content } = req.body;
//             const post = await prisma.post.create({
//                 data: {
//                     title,
//                     content,
//                 },
//             });
//             res.status(201).json(post);
//         } catch (error) {
//             res.status(500).json({ message: "Internal server error" });
//         }
//     }

//     static async updatePost(req, res) {
//         try {
//             const { id } = req.params;
//             const { title, content } = req.body;
//             const post = await prisma.post.update({
//                 where: {
//                     id: id,
//                 },
//                 data: {
//                     title,
//                     content,
//                 },
//             });
//             res.status(200).json(post);
//         } catch (error) {
//             res.status(500).json({ message: "Internal server error" });
//         }
//     }

//     static async deletePost(req, res) {
//         try {
//             const { id } = req.params;
//             const post = await prisma.post.delete({
//                 where: {
//                     id: id,
//                 },
//             });
//             res.status(200).json(post);
//         } catch (error) {
//             res.status(500).json({ message: "Internal server error" });
//         }
//     }
// }

class PostController {
  static async index(req, res) {
    try {
      let userIds = [];
      posts.forEach((item) => {
        userIds.push(item.user_id);
      });

      const response = await axios.post(
        `${process.env.AUTH_MICRO_URL}/api/getUsers`,
        userIds
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
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async store(req, res) {
    try {
      const authenticatedUser = req.user;
      const { title, content } = req.body;
      const post = await prisma.post.create({
        data: {
          user_id: authenticatedUser.id,
          title,
          content,
        },
      });

      return res.json({ message: "Post created successfully!", post });
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong." });
    }
  }
}

export default PostController;
