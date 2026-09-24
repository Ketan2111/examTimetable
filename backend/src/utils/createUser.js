import bcrypt from "bcryptjs";
import dotenv from "dotenv";

import { pool } from "../config/db.js";

dotenv.config();

function getArg(name) {
  const prefix = `--${name}=`;
  const value = process.argv.find((arg) => arg.startsWith(prefix));
  return value ? value.slice(prefix.length).trim() : "";
}

function printUsageAndExit() {
  console.error(
    [
      "Usage:",
      "  npm run create-user -- --role=admin --name=\"Admin Name\" --email=admin@example.com --password=\"Password123\"",
      "  npm run create-user -- --role=student --name=\"Student Name\" --email=student@example.com --password=\"Password123\" --academicYear=\"2nd Year\" --section=A"
    ].join("\n")
  );
  process.exit(1);
}

const role = getArg("role");
const name = getArg("name");
const email = getArg("email").toLowerCase();
const password = getArg("password");
const academicYear = getArg("academicYear");
const section = getArg("section");

if (!["admin", "student"].includes(role) || !name || !email || !password) {
  printUsageAndExit();
}

if (role === "student" && (!academicYear || !section)) {
  console.error("Student users require academicYear and section.");
  printUsageAndExit();
}

if (role === "admin" && (academicYear || section)) {
  console.error("Admin users must not include academicYear or section.");
  printUsageAndExit();
}

try {
  const passwordHash = await bcrypt.hash(password, 12);

  const [result] = await pool.query(
    `INSERT INTO users (name, email, password_hash, role, academic_year, section)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      name,
      email,
      passwordHash,
      role,
      role === "student" ? academicYear : null,
      role === "student" ? section : null
    ]
  );

  console.log(`Created ${role} user with id ${result.insertId}.`);
} catch (error) {
  if (error.code === "ER_DUP_ENTRY") {
    console.error("A user with this email already exists.");
  } else {
    console.error(error.message);
  }

  process.exitCode = 1;
} finally {
  await pool.end();
}
