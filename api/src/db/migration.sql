-- DROP TABLE IF EXISTS mcsp CASCADE;
-- DROP TABLE IF EXISTS student CASCADE;
-- DROP TABLE IF EXISTS teacher CASCADE;
-- DROP TABLE IF EXISTS project CASCADE;
-- DROP TABLE IF EXISTS assignment CASCADE;
-- DROP TABLE IF EXISTS attendance_points CASCADE;
-- DROP TABLE IF EXISTS assessment CASCADE;
-- CREATE TABLE mcsp (
--   mcsp_id SERIAL PRIMARY KEY,
--   mcsp VARCHAR(20) UNIQUE
-- );

-- CREATE TABLE student (
--   student_id SERIAL PRIMARY KEY,
--   first_name TEXT,
--   last_name TEXT,
--   email VARCHAR(100),
--   mcsp VARCHAR(20),
--   FOREIGN KEY (mcsp) REFERENCES mcsp(mcsp)

-- );
-- --need add the ability to see mcsp number


-- CREATE TABLE teacher (
--   teacher_id SERIAL PRIMARY KEY,
--   first_name TEXT,
--   last_name TEXT,
--   email VARCHAR(100)
-- );


-- CREATE TABLE project (
--     project_id SERIAL PRIMARY KEY,
--     student_id INT,
--     teacher_id INT,
--     teacher_name VARCHAR(20),
--     project_name VARCHAR(50),
--     design INT CHECK (design >= 0 AND design <= 5),
--     quality INT CHECK (quality >= 0 AND quality <= 5),
--     feedback VARCHAR(800),
--     mcsp VARCHAR(20),
--     FOREIGN KEY (student_id) REFERENCES student(student_id),
--     FOREIGN KEY (teacher_id) REFERENCES teacher(teacher_id),
--     FOREIGN KEY (mcsp) REFERENCES mcsp(mcsp)
-- );

-- -- 

-- CREATE TABLE assignment(
--     assignment_id SERIAL PRIMARY KEY,
--     assignment_name VARCHAR(50),
--     student_id INT,
--     completed BOOLEAN DEFAULT false,
--     mcsp VARCHAR(20),
--     FOREIGN KEY (student_id) REFERENCES student(student_id),
--     FOREIGN KEY (mcsp) REFERENCES mcsp(mcsp)
-- );

-- CREATE TABLE attendance_points(
--   attendance_points_id SERIAL PRIMARY KEY,
--   student_id INT,
--   points INT,
--   mcsp VARCHAR(20),
--   FOREIGN KEY (student_id) REFERENCES student(student_id),
--   FOREIGN KEY (mcsp) REFERENCES mcsp(mcsp)
-- );

-- CREATE TABLE assessment(
--     assignment_id SERIAL PRIMARY KEY,
--     student_id INT,
--     assessment_name VARCHAR(50),
--     percent INT CHECK (percent >= 0 AND percent <= 100),
--     mcsp VARCHAR(20),
--     FOREIGN KEY (student_id) REFERENCES student(student_id),
--     FOREIGN KEY (mcsp) REFERENCES mcsp(mcsp)
-- );

--notes for assignment, we need to make it so that we can assign a assignment based on MCSP and in rare cases to a student individually.
--after student login: 
--table with missing points
--assignment.length for assignment completetion percentage
  -- SELECT COUNT(*) FROM assignment WHERE completed = true AND student_id=$1
  --number for assignments completed,

--clean up m and seed
-- assessment UPDATE function
--think about MCSP wide averages, need to add forgein key of MCSP