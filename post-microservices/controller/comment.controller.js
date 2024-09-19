import prisma from "../../auth-microservices/db/db.config";

class CommentController {
  static async createComment(req, res) {
    try {
      const postId = req.params;
      const { content } = req.body;
      const AuthenticatedUser = req.user;

      const post = await prisma.post.findUnique({
        where: { id: Number(postId) },
      });

      if (!post) {
        return res.status(404).json({ message: "post not found" });
      }

      // create comment
      const comment = await prisma.comment.create({
        data: {
          content,
          user_id: AuthenticatedUser.id,
          post_id: postId,
        },
      });
      return res
        .status(201)
        .json({ message: "comment added sucessfully", comment: comment });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getAllComments(req,res){
    try {
        const {postId} = req.params;

        const post = await prisma.post.findUnique({
            where:{id:Number(postId)},
        });

        if (!post){
            return res
            .status(404)
            .json({message:"post not found"})
        }
        
        // retrive all the comments for the post

        const comments  = await prisma.comment.findMany({
            where:{post_id:postId},
            include:{
                user: { select: { id: true, name: true, email: true } }, // Include user details
            }
        })

        return res
        .status(200)
        .json({message:"all comments found sucessfully",comments:comments})
    } catch (error) {
        return res
        .status(500)
        .json({message:"something went wrong"})
    }
  }
}

export default CommentController
