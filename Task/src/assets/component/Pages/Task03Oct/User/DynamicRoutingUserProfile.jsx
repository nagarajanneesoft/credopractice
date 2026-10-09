// import { Card } from "react-bootstrap";
// import { useParams } from "react-router-dom";
// function DynamicRoutingUserProfile() {
//   const { name } = useParams();
//   return (
//     <div>
//       <h5>Task 9: Dynamic Routing For UserProfiles</h5>
//       <Card>
//         <Card.Body>
//           <Card.Title>{name}</Card.Title>
//           <Card.Text>Welcome, {name}!</Card.Text>
//         </Card.Body>
//       </Card>
//     </div>
//   );
// }

// export default DynamicRoutingUserProfile;

import { Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
function DynamicRoutingUserProfile() {
  const { name } = useParams();
  return (
    <>
      <h5>Task 9: Dynamic Routing For UserProfiles</h5>
      <Card>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>Welcome, {name}!</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}

export default DynamicRoutingUserProfile;
