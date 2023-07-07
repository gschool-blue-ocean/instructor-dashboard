DROP TABLE IF EXISTS student;
CREATE TABLE student (
  student_id SERIAL PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  email VARCHAR(100),
  mcsp VARCHAR(8)
);

DROP TABLE IF EXISTS mcsp;
CREATE TABLE mcsp (
  mcsp_id SERIAL PRIMARY KEY,
  mcsp VARCHAR(8),
  teacher_id INT
);
DROP TABLE IF EXISTS teacher;
CREATE TABLE teacher (
  teacher_id SERIAL PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  email VARCHAR(100)
);