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
      const { userIds } = req.body;
      if (!userIds) {
        return res.status(400).json({ message: "Please provide user ids" });
      }

      const users = await prisma.user.findMany({
        where: {
          id: {
            in: userIds,
          },
        },
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
  static async changeUserDetail(req, res) {
    const { name, email } = req.body;

    try {
      // Validate if id, name, or email are present in the request
      if (!userId || (!name && !email)) {
        return res.status(400).json({
          message: "User-id, and at least one field field is required",
        });
      }

      // Update the user in the database
      const updatedUser = await prisma.user.update({
        where: { id: id },
        data: {
          ...(name && { name }), // Update name only if it's provided
          ...(email && { email }), // Update email only if it's provided
        },
      });

      return res.json({
        message: "User details updated successfully",
        updatedUser,
      });
    } catch (error) {
      return res.status(500).json({
        message: "An error occurred while updating user details",
      });
    }
  }
}

export default UserController;
