DROP TABLE IF EXISTS student CASCADE;
CREATE TABLE student (
  student_id SERIAL PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  email VARCHAR(100),
  mcsp_id INT,
  FOREIGN KEY (mcsp_id) REFERENCES mcsp(mcsp_id)

);
--need add the ability to see mcsp number
DROP TABLE IF EXISTS mcsp;
CREATE TABLE mcsp (
  mcsp_id SERIAL PRIMARY KEY,
  mcsp VARCHAR(8),
);
DROP TABLE IF EXISTS teacher CASCADE;
CREATE TABLE teacher (
  teacher_id SERIAL PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  email VARCHAR(100)
);
DROP TABLE IF EXISTS assignment;
DROP TABLE IF EXISTS project;
CREATE TABLE project (
    project_id INT PRIMARY KEY,
    student_id INT,
    teacher_id INT,
    teacher_name VARCHAR(20),
    project_name VARCHAR(50),
    score INT CHECK (score >= 0 AND score <= 100),
    total INT CHECK (score >= 0 AND score <= 100),
    feedback VARCHAR(800),
    FOREIGN KEY (student_id) REFERENCES student(student_id),
    FOREIGN KEY (teacher_id) REFERENCES teacher(teacher_id)
);
-- 
CREATE TABLE assignment(
    assignment_id INT PRIMARY KEY,
    student_id INT,
    completed BOOLEAN DEFAULT false,
    FOREIGN KEY (student_id) REFERENCES student(student_id)
);

DROP TABLE IF EXISTS mcsp_teacher;
CREATE TABLE mcsp_teacher (
  mcsp_id INT,
  teacher_id INT,
  FOREIGN KEY (mcsp_id) REFERENCES mcsp(mcsp_id),
  FOREIGN KEY (teacher_id) REFERENCES teacher(teacher_id)
);
CREATE TABLE attendance_points(
  attendance_points_id SERIAL PRIMARY KEY,
  student_id INT,
  points INT,
  FOREIGN KEY (student_id) REFERENCES student(student_id)
);

--notes for assignment, we need to make it so that we can assign a assignment based on MCSP and in rare cases to a student individually.
--after student login: 
--table with missing points
--assignment.length for assignment completetion percentage
  -- SELECT COUNT(*) FROM assignment WHERE completed = true AND student_id=$1
  --number for assignments completed,