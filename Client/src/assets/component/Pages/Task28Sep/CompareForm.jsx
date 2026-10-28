// import { useState, useRef } from "react";
// import { Card } from "react-bootstrap";
// import Form from "react-bootstrap/Form";

// function CompareForm() {
//   const [name, setName] = useState("");
//   const [age, setAge] = useState("");
//   const ageRef = useRef(null);
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Controlled:", name);
//     console.log("Age (uncontrolled):", ageRef.current.value);
//   };
//   return (
//     <div>
//       <h5>Task 4: Controlled vs Uncontrolled</h5>
//       <div className="mt-2 d-flex gap-2">
//         <Form onSubmit={handleSubmit}>
//           <Form.Group className="mb-3" controlId="">
//             <Form.Label>Enter Name</Form.Label>
//             <Form.Control
//               type="text"
//               value={name}
//               placeholder="Username"
//               onChange={(e) => setName(e.target.value)}
//             />
//           </Form.Group>
//           <Form.Group className="mb-3" controlId="">
//             <Form.Label>Enter Age</Form.Label>
//             <Form.Control
//               type="number"
//               placeholder="age"
//               ref={ageRef}
//               onChange={(e) => setAge(e.target.value)}
//             />
//           </Form.Group>
//           <button type="submit" className="btn btn-success mt-2">
//             Submit
//           </button>
//         </Form>
//       </div>
//       <h6>Enter Name : {name}</h6>
//       <h6>Enter Age : {age}</h6>
//       <Card className="p-2 mt-2">
//         <p className="p-0 m-0 text-danger">Doute : ageRef</p>
//       </Card>
//     </div>
//   );
// }

// export default CompareForm;

import { useState, useRef } from "react";
import { Card } from "react-bootstrap";
import Form from "react-bootstrap/Form";

function CompareForm() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const ageRef = useRef(null);
  const handleSubmit = (e) => {
    setAge(ageRef.current.value);
    e.preventDefault();
    console.log("Controlled:", name);
    console.log("Age (uncontrolled):", age);
  };
  return (
    <div>
      <h5>Task 4: Controlled vs Uncontrolled</h5>
      <div className="mt-2 d-flex gap-2">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="">
            <Form.Label>Enter Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              placeholder="Username"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="">
            <Form.Label>Enter Age</Form.Label>
            <Form.Control
              type="number"
              placeholder="age"
              ref={ageRef}
              onChange={(e) => setAge(e.target.value)}
            />
          </Form.Group>
          <button type="submit" className="btn btn-success mt-2">
            Submit
          </button>
        </Form>
      </div>
      <h6>Enter Name : {name}</h6>
      <h6>Enter Age : {age}</h6>
      <Card className="p-2 mt-2">
        <p className="p-0 m-0 text-danger">Doute : ageRef</p>
      </Card>
    </div>
  );
}

export default CompareForm;
