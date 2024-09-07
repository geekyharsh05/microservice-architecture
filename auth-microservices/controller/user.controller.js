class UserController {
  static async getUsers(req, res) {
    const { userIds } = req.body;

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
      },
    });

    return res.json({ users: users });
  }

  static async getUserById(req, res) {
    try {
      const { id } = req.params;

      const user = await prisma.user.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          name: true,
          email: true,
          created_at: true,
          updated_at: true,
        },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default UserController;
