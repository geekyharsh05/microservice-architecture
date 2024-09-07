export const logoutOptions = {
  httpOnly: true,
  secure: true,
};

const options = {
  ...logoutOptions,
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

export default options;
