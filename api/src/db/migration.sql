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
--     completed BOOLEAN DEFAULT false,
--     mcsp VARCHAR(20),
--     presentation_points INT CHECK (design >= 0 AND design <= 5),
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
--     assessment_id SERIAL PRIMARY KEY,
--     student_id INT,
--     assessment_name VARCHAR(50),
--     percent INT CHECK (percent >= 0 AND percent <= 100),
--     mcsp VARCHAR(20),
--     FOREIGN KEY (student_id) REFERENCES student(student_id),
--     FOREIGN KEY (mcsp) REFERENCES mcsp(mcsp)
-- );


