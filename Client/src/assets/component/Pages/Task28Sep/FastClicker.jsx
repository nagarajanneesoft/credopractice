// import { useState } from "react";
// import { Card } from "react-bootstrap";

// function FastClicker() {
//   const [clicker, setClicker] = useState(0);
//   const handleChange = () => {
//     setClicker(clicker + 5);
//   };
//   return (
//     <div>
//       <h5>Task 5: Fast-Clicker 1</h5>

//       <div>
//         <button type="button" class="btn btn-success" onClick={handleChange}>
//           +5 Increment
//         </button>
//         <p>Right Score: {clicker}</p>
//       </div>
//       <Card className="p-2 mt-2">
//         <p className="p-0 m-0 text-danger">
//           Doute : Above Method Correct or Not
//         </p>
//       </Card>
//     </div>
//   );
// }

// export default FastClicker;

import { useState } from "react";
import { Card } from "react-bootstrap";

function FastClicker() {
  const [clicker, setClicker] = useState(0);
  const handleChange = () => {
    for (let i = 0; i < 5; i++) {
      setClicker((prev) => prev + 1);
    }
  };
  return (
    <div>
      <h5>Task 5: Fast-Clicker 2</h5>

      <div>
        <button type="button" class="btn btn-success" onClick={handleChange}>
          +5 Increment
        </button>
        <p>Right Score: {clicker}</p>
      </div>
      <Card className="p-2 mt-2">
        <p className="p-0 m-0 text-danger">
          Doute : Above Method Correct or Not
        </p>
      </Card>
    </div>
  );
}

export default FastClicker;
