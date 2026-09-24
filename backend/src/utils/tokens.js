import jwt from "jsonwebtoken";

export function signAuthToken(user) {
  return jwt.sign(
    {
      id: user.id,
      role: user.role
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "1d"
    }
  );
}

export function verifyAuthToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}
