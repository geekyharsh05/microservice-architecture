import bcrypt from "bcrypt";

async function comparePasswords(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

export default comparePasswords;
