import React, { useState } from "react";
// import View from "./View";

const details = [
  {
    ID: 1,
    Week: 4,
    Assignment: "Mini Module: What is an Operating System",
    Status: "Complete",
  },
  {
    ID: 2,
    Week: 4,
    Assignment: "Mini Module: What is Docker",
    Status: "Incomplete",
  },
  { ID: 3, Week: 4, Assignment: "SDC Optimization Paths", Status: "Complete" },
  { ID: 4, Week: 4, Assignment: "Server-Side Rendering", Status: "Incomplete" },
];

function handleClick(e) {
  let id = e.target.dataset.id;
  console.log("id", id);
}

function AssignmentDetails({ onclickFeedback }) {
  const [assignments, setAssignments] = useState(null);

  async function fetchAssignments() {
    try {
      const res = await axios.get(`/api/assignment`);
      if (res.data.length > 0) {
        setAssignments(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    fetchAssignments();
  }, []);

  console.log(assignments);

  const handleCheckboxChange = async (event) => {
    try {
      console.log(event.target.getAttribute("data-assignment-id"));
      const res = await axios.patch(
        `/api/assignment/completion/${Number(
          event.target.getAttribute("data-assignment-id")
        )}`
      );
      if (res.status === 200) {
        fetchAssignments();
      }
    } catch (err) {
      console.log(err);
    }
  };
  const arrDetails = details.map((detail) => (
    <li key={detail.ID}>
      <input
        data-assignment-id={detail.assignment_id}
        type="checkbox"
        checked={detail.completed}
        disabled={false}
        onChange={handleCheckboxChange}
      />
      <p>{detail.Assignment} </p>
      <button data-id={detail.ID} onClick={() => onclickFeedback()}>
        View
      </button>
    </li>
  ));
  return (
    <section
      className="mx-auto mt-8 min-h-screen bg-{#f1f5f9}"
      style={{ maxWidth: "600px", minWidth: "344px" }}
    >
      <h1>Assignment Summary :</h1>
      <div className="mx-auto bg-white drop-shadow-lg">
        <h1>Week Assignment ({details.length})</h1>
        <ul>{arrDetails}</ul>
      </div>
    </section>
  );
}

export default AssignmentDetails;
