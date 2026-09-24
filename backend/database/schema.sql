CREATE DATABASE IF NOT EXISTS college_exam_timetable;

USE college_exam_timetable;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('admin', 'student') NOT NULL,
  academic_year VARCHAR(50) NULL,
  section VARCHAR(20) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT chk_student_profile CHECK (
    (role = 'admin' AND academic_year IS NULL AND section IS NULL)
    OR
    (role = 'student' AND academic_year IS NOT NULL AND section IS NOT NULL)
  )
);

CREATE TABLE IF NOT EXISTS exams (
  id INT AUTO_INCREMENT PRIMARY KEY,
  subject VARCHAR(150) NOT NULL,
  academic_year VARCHAR(50) NOT NULL,
  section VARCHAR(20) NOT NULL,
  exam_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  status ENUM('scheduled', 'cancelled') NOT NULL DEFAULT 'scheduled',
  created_by INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_exams_created_by FOREIGN KEY (created_by) REFERENCES users(id),
  CONSTRAINT chk_exam_time CHECK (start_time < end_time)
);
