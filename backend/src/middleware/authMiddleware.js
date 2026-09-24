import { pool } from "../config/db.js";
import { verifyAuthToken } from "../utils/tokens.js";

export async function requireAuth(req, res, next) {
  try {
    const token = req.cookies.auth_token;

    if (!token) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const payload = verifyAuthToken(token);
    const [rows] = await pool.query(
      `SELECT id, name, email, role, academic_year AS academicYear, section
       FROM users
       WHERE id = ?`,
      [payload.id]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "Authentication required" });
    }

    req.user = rows[0];
    next();
  } catch (error) {
    return res.status(401).json({ message: "Authentication required" });
  }
}

export function requireRole(role) {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({ message: "Access denied" });
    }

    next();
  };
}
