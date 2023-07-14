import React from "react";

const projectDetails = Object.freeze([
    { ID: 1, Project: 'Browser Calculator', Status: 'Complete' },
    { ID: 2, Project: 'Guessing Game', Status: 'Complete' },
    { ID: 3, Project: 'FE Project', Status: 'Complete' },
    { ID: 4, Project: 'Server-Side Assessment', Status: 'Incomplete' },
    { ID: 5, Project: 'MVP', Status: 'Complete' },
    { ID: 6, Project: 'React', Status: 'Complete' },
    { ID: 7, Project: 'Front End Capstone', Status: 'Complete' },
    { ID: 8, Project: 'Server-Side Capstone', Status: 'Complete' },
    { ID: 9, Project: 'Blue Ocean', Status: 'Incomplete' },
]);

function handleClick(e){
    let id = e.target.dataset.id;
    console.log("id", id);
}

function ProjectDetails() {
    // const arrDetails = projectDetails.map(detail => (
    //     <li key={detail.ID} className={detail.Status}>
    //         {detail.Project}
    //     </li>
    // ));
    const arrDetails = projectDetails.map(detail => 
        <li key={detail.ID} className={detail.Status}>
            <p>{detail.Project} </p>
            <button data-id={detail.ID} onClick={handleClick}>Feedback</button>
        </li>);
    return (
        <section className="mt-8 min-h-screen bg-{#f1f5f9}"
            style={{ maxWidth: "600px", minWidth: "344px" }}
        >
            <h1>Project Summary :</h1>
            <div
                className="mx-auto bg-white drop-shadow-lg"
            >
                <h1>Class Projects({projectDetails.length})</h1>
                <ul>{arrDetails}</ul>
            </div>
        </section>
    );
};

//     return (
//         <section className="mt-8 min-h-screen bg-gray-100">
//             <div
//                 className="w-2/5 mx-auto p-12 bg-white drop-shadow-lg"
//                 style={{ maxWidth: "500px", minWidth: "344px" }}
//             >
//                 TEST!
//                 <ul>{arrDetails}</ul>
//             </div>
//         </section>
//     );
// }

export default ProjectDetails;
