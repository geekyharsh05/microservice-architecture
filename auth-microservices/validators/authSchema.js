import z from "zod";

const signupSchema = z.object({
  name: z.string().min(3).max(100),
  email: z.string().email(),
  password: z.string().min(6).max(50),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(50),
});

const changePasswordSchema = z.object({
  oldPassword: z.string().min(6).max(50),
  newPassword: z.string().min(6).max(50),
});

const refreshAccessToken = z.object({
  refreshToken: z.string().min(6).max(50).optional(),
});

const authSchema = {
  signup: signupSchema,
  login: loginSchema,
  changePassword: changePasswordSchema,
  refreshAccessToken: refreshAccessToken,
};

export default authSchema;
