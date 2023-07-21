  <h1 style="text-align:center; background-color: #FB6848; color: #6C6C6B;">Instructor Dashboard</h1>

[![Version](https://img.shields.io/badge/version-1.0-blue.svg)](https://github.com/gschool-blue-ocean/instructor-dashboard)

  <h2 id="description" style="color: #17A2B8; text-align: center;">Table of Contents</h2>

- [Description](#description)
- [Installation](#installation)
- [Features](#features)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [Tech Used](#techused)
- [Clone](#clone)

    <h2 id="description" style="color: #17A2B8; text-align: center;">Description</h2>
  <p> This project provides a firebase authorization for accessing the Galvanize Learn site verifying if an individual is a student or instructor. Once in, the system allows for the student to review their Assignments, Assessments, Projects, and overall status. They can review individualized feedback from the instructor on each project and assessment allowing them to utilize the feedback to increase their overall capabilities and sharpening their skillsets. The instructors can see all of the students within a MCSP that they select from a drop down. They can then click a student's contact card and update their Assignments, Assessments, and Projects. The overall status is auto calculated and not something the instructor needs to complete. They can then add comments, check things as completed, and provide valuable feedback. Additionally, they have the capability to add new students to get their enrollment process started. This will generate an email to the new student telling them to register for a new account. This can be completed from the main log in screen. Once the user signs up they will have access to their grades and standing in the course.
  </p>
    <h2 id="installation" style="color: #17A2B8; text-align: center;">Installation</h2>

    <p>
    To begin, follow the below installation steps and dependency below.  Once you have installed docker make sure you open docker on your computer.  Make sure it is the latest version and the one meant for your system (Mac/Lynx/PC).  
    
    Create containers and copy and paste the migration.sql data into the data container.  Then paste your seed data in there to create a database.  Verify it seeded correctly by running "psql postgres -U".  Then search for the database using "\dt".  Once you verify all the tables have been installed you can then ensure the seed data is in there by running a "SELECT * FROM student" 
    
    Once this is verified, run docker compose up --build and then use the local host url to view the site.
    </p>

1. `cp .env.example .env` - Copy over required environment variables.
   File Contents:
   POSTGRES_USER=postgres
   POSTGRES_PASSWORD=docker
   POSTGRES_DB=blueocean
   CLIENT_PORT=3000
   API_PORT=8000
2. `npm install; npm i vite; npm i docker; npm i react` - Install all dependencies.
3. `docker-compose up` - Run Project.
   > **NOTE**: After installing a new npm dependency, you have to run `docker-compose up --build` to install the new dependencies on the container.

- `docker exec <container_name_or_id> <command>` - Runs command in the context of a container.
- `docker inspect <container_name_or_id>` - Displays info (including IP address) of a container running in docker.
  > **`helpful npm codes`**

<h4 style="color: #17A2B8;text-align:center">`root`</h4>

- `lint` - Checks code for style issues.

- `test` - Runs `test:client` and `test:api`.

- `ci` - Runs `lint` and `test`.

- `test:client` - Runs frontend tests.

- `test:api` - Runs backend tests.

<h4 style="color: #17A2B8;text-align:center">`/client`</h4>

- `dev` - Hosts your assets (executed by docker-compose).

- `build` - Builds your assets for production.

- `test` - Runs tests.

<h4 style="color: #17A2B8;text-align:center">`/server`</h4>

- `dev` - Runs the server in watch mode (executed by docker-compose).

- `start` - Starts the production server.

- `test` - Runs tests.

<h2 id="features" style="color: #17A2B8; text-align:center">Features</h2>
<ul>
<li>
Student/Instructor Authentication
</li>
<li>
Add New Student
</li>
<li>
Create New Account
</li>
<li>
Feedback on Projects
</li>
<li>
Feedback on Assignments
</li>
<li>
Interactive checkboxes changing text styling
</li>
<li>
MCSP Student overview and overall standing
</li>
</ul>

<h2 id="screenshots" style="color: #17A2B8; text-align: center;">Screenshots</h2>

<img src="/ReadMe_Images/Screenshot_2023-07-21_072547.png">
<p>This is the user log in screen.  From here you can log in as a registered user or click sign-up to go to the next image.</p>
</img>
<img src="/ReadMe_Images/Screenshot_2023-07-21_072638.png"></img>
<p>At this point you can create a new user.  If an instructor added a student then the email will link them up to this site.</p>
<img src="/ReadMe_Images/Screenshot_2023-07-21_072724.png"></img>
<p>As an instructor when you log in you will be presented with the most recent MCSP.  You can select the drop down on the top left to change the MCSP cohort and view those students.  You can click on an individual student to then input their data.</p>
<img src="/ReadMe_Images/Screenshot_2023-07-21_072754.png"></img>
<p>If the student doesn't exist the instructor has access to add a new student by clicking on the Galvanize logo to have the sidebar appear and then click Add User to make this screen appear.</p>
<img src="/ReadMe_Images/Screenshot_2023-07-21_073025.png"></img>
<p>This is the view for the student.  When a tile is clicked data will appear below the tile showing the list of assignments/projects/assessments.  The student and review the feedback, but cannot make any changes.  The instructor can add feedback, grades, and mark items as completed.</p>

<h2 id="contributing" style="color: #17A2B8; text-align: center;">Contributing Members</h2>

<div><a href="https://github.com/jkluse">John Kluse</a> <p>Project Manager</p><p>As the Project Manager, John was the steady rock and was the duck on the water in our project.  He was working hard behind the scenes to assist everyone with any roadblocks or challenges they faced while also ensuring me met 100% of the client's requirements.  He coordinated morning and evening stand-ups and was key to our overall success.</p></div>

<div><a href="https://github.com/Josephcarmeli"> Joseph Carmeli</a> <p>Architect Owner</p><p>As the Architect Owner, Joseph worked primarily on the Firebase linking, supporting Seb on backend development, worked on some front end connections with backend, and ensured the data authorization format was solid.  Finally, he ensured that as we were building the front and back end we were following the UI/UX formats.</p></div>

<div><a href="https://github.com/sebbbbby">Sebastian Prieto</a><p>Backend Engineer</p><p>As the Backend Engineer, Seb completed all controllers, routers, migration.sql, seed.sql, and ensured that the back end linked seemlessly with the front end.  He worked bug issues on queries, data pull, and creating our new student links.</p></div>

<div><a href="https://github.com/galVDalton">Dalton Andrews</a><p>UI/UX Owner</p><p>As the UI/UX Owner, Dalton created our wireframing for front end and back end.  Devised the overall look and feel of the website and its features.  Additionally, he worked tailwind CSS features to make the website more visually appealing and added his own creative styling.</p></div>

<div><a href="https://github.com/kchenwei025">Wei Chen</a> <p>Software Engineer</p><p>As a Software Engineer, Wei created the new student log in, added filter functionality, created all contact cards, and created all of the interactive assignment, projects, assessment grading cards.  He also worked on the functionality of the back end with John and Seb ensuring feedbacks, checkboxes, and more were connected.</p></div>

<div><a href="https://github.com/timgall">Tim Galloway</a> <p>Software Engineer</p><p>As a Software Engineer, Tim took the features and designs presented by the UI/UX owner and created the following aspects of the website: Sidebar full functionality, Header full functionality, filters, LogIn screen, Add new student, Readme, and set up the Assignment's functions.</p></div>

<h2 id="techused" style="color: #17A2B8; text-align: center;">Tech Used</h2>

- [`vite`](https://vitejs.dev/) - Module bundler, transpiler and dev server.
- [`vitest`](https://vitest.dev/) - Test runner.
- [`prettier`](https://prettier.io/) - Code formatter/checker.
- [`docker`](https://www.docker.com/) - Containerization framework for dev and deployment.
- [`firebase`](https://www.firebase.com/) - Authorization provider for website access.
- [`markdown`](https://markdownlivepreview.com/) - Used for styling this ReadMe file.
<h2 id="clone" style="color: #17A2B8; text-align: center;"> Clone</h2>

````bash git clone https://github.com/gschool-blue-ocean/instructor-dashboard.git
cd instructor-dashboard```
````
