import prisma from "../db/db.config.js";

class UserController {
  
  static async getUserById(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Please provide user id" });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return res.json({ user });
  }

  static async getUsers(req, res) {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          created_at: true,
          updated_at: true,
          refreshToken: true,
        },
      });

      return res.json({ users });
    } catch (error) {
      console.error("Error fetching users:", error);
      return res
        .status(500)
        .json({ message: "An error occurred while fetching users" });
    }
  }
}

export default UserController;
