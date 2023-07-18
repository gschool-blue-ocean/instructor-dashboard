// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function AssessDetails() {
//   const assessDetails = Object.freeze([
//     { ID: 1, Week: '02', Assessment: 'DOM API Assessment', Grade: '95%' },
//     { ID: 2, Week: '06', Assessment: 'Server Side Assessment', Grade: '92%' },
//     { ID: 3, Week: '07', Assessment: 'Server and DB Assessment', Grade: '94%' },
//     { ID: 4, Week: '10', Assessment: 'React Assessment', Grade: '96%' },
//   ]);

//   //const [assessments, setAssessments] = useState(null);

//   async function fetchAssessment() {
//     try {
//       const res = await axios.get(`/api/assessment`);
//       if (res.data.length > 0) {
//         //setAssessment(res.data);
//         console.log(res.data[0].mcsp);
//         let arrDetails = res.data.map(detail => (
//             <tr key={detail.assessment_id}>
//               <td>{detail.mcsp}</td>
//               <td>{detail.assessment_name}</td>
//               <td>{detail.percent}</td>
//             </tr>
//             // console.log('detail', detail);
//        ));
//        document.querySelector('table tbody').append(arrDetails);
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   }

//  // useEffect(() => {
//     fetchAssessment();
//  // }, []);

//   function handleClick(e) {
//     let id = e.target.dataset.id;
//     console.log("id", id);
//   }

//   return (
//         <div>

//             <section
//                 className="mx-auto mt-8 min-h-screen bg-{#f1f5f9}"
//                 style={{ maxWidth: "600px", minWidth: "344px" }}
//                 >
//                 <table>
//                     <caption>Assessment Results</caption>
//                     <thead>
//                     <tr>
//                         <th>MCSP</th>
//                         <th>Assessment</th>
//                         <th>Grade</th>
//                     </tr>
//                     </thead>
//                     <tbody></tbody>
//                 </table>
//             </section>

//         </div>
//  );
// }

// export default AssessDetails;

import React, { useState, useEffect } from "react";
import axios from "axios";

function AssessDetails() {
	const [assessments, setAssessments] = useState([]);

	useEffect(() => {
		async function fetchAssessment() {
			try {
				const res = await axios.get(`/api/assessment/${1}`);
				if (res.data.length > 0) {
					setAssessments(res.data);
				}
			} catch (err) {
				console.log(err);
			}
		}

		fetchAssessment();
	}, []);

	function handleClick(e) {
		let id = e.target.dataset.id;
		console.log("id", id);
	}

	return (
		<div>
			<section
				className="mx-auto mt-8 min-h-screen bg-{#f1f5f9}"
				style={{ maxWidth: "600px", minWidth: "344px" }}
			>
				<table>
					<caption>Assessment Results</caption>
					<thead>
						<tr>
							<th>MCSP</th>
							<th>Assessment</th>
							<th>Grade</th>
						</tr>
					</thead>
					<tbody>
						{assessments.map((detail) => (
							<tr key={detail.assessment_id}>
								<td>{detail.mcsp}</td>
								<td>{detail.assessment_name}</td>
								<td>{detail.percent}</td>
							</tr>
						))}
					</tbody>
				</table>
			</section>
		</div>
	);
}

export default AssessDetails;
