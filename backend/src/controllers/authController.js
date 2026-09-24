import bcrypt from "bcryptjs";

import { pool } from "../config/db.js";
import { clearAuthCookie, setAuthCookie } from "../utils/authCookies.js";
import { signAuthToken } from "../utils/tokens.js";

function publicUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    academicYear: user.academicYear,
    section: user.section
  };
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const [rows] = await pool.query(
      `SELECT id, name, email, password_hash AS passwordHash, role,
              academic_year AS academicYear, section
       FROM users
       WHERE email = ?`,
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = rows[0];
    const passwordMatches = await bcrypt.compare(password, user.passwordHash);

    if (!passwordMatches) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = signAuthToken(user);
    setAuthCookie(res, token);

    res.json({ user: publicUser(user) });
  } catch (error) {
    next(error);
  }
}

export function logout(req, res) {
  clearAuthCookie(res);
  res.json({ message: "Logged out" });
}

export function getCurrentUser(req, res) {
  res.json({ user: publicUser(req.user) });
}
