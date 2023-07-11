import React, { useEffect, useState } from "react";


const StudentOverview = () => {
  const [studentName, setStudentName] = useState("");
  const [cohort, setCohort] = useState("");

  return (
    <section class="rounded-lg border-solid border-4 border-black	 h-screen m-4">
  
      <p class="place-content-center text-center">
        Welcome back,{studentName} {cohort}
      </p>
      <p class="place-content-center text-center"> Track, manage and forecast your performance</p>
      <div class="flex place-content-center">
      <div class="rounded-lg border-solid border-4 border-black	py-8 m-2 h-fit w-64" >Assignments Completion</div>
      <div class="rounded-lg border-solid border-4 border-black	py-8 m-2 h-fit w-64">Project Completion</div>
      <div class="rounded-lg border-solid border-4 border-black	py-8 m-2 h-fit w-64">Assessment Results</div>
      <div class="rounded-lg border-solid border-4 border-black	py-8 m-2 h-fit w-64">Points Accured</div>
      </div>
    </section>
  );
};

export default StudentOverview;
