// import { useState } from "react";

// function SimpleCounter() {
//   const [count, setCount] = useState(0);

//   const handleIncrement = () => {
//     setCount(count + 1);
//   };

//   const handleDecrement = () => {
//     if (count > 0) {
//       setCount(count - 1);
//     }
//   };

//   const handleReset = () => {
//     setCount(0);
//   };

//   return (
//     <div>
//       <h5>Counter App</h5>
//       <h2>{count}</h2>
//       <div className="d-flex gap-2">
//         <button
//           type="button"
//           className="btn btn-danger"
//           onClick={handleDecrement}
//           disabled={count === 0}
//         >
//           Decrement
//         </button>
//         <button
//           type="button"
//           className="btn btn-success"
//           onClick={handleIncrement}
//         >
//           Increment
//         </button>
//         <button
//           type="button"
//           className="btn btn-secondary"
//           onClick={handleReset}
//         >
//           Reset
//         </button>
//       </div>
//     </div>
//   );
// }

// export default SimpleCounter;

import { useState } from "react";

function SimpleCounter() {
  const [count, setCount] = useState(0);

  const MIN = 0;
  const MAX = 10;
  const handleIncrement = () => {
    if (count < MAX) {
      setCount(count + 1);
    }
  };
  const handleDecrement = () => {
    if (count > MIN) {
      setCount(count - 1);
    }
  };
  const handleReset = () => {
    setCount(0);
  };

  return (
    <div>
      <h5>Task 3: Counter APP</h5>
      <h2>{count}</h2>
      <div className="d-flex gap-2">
        <button
          type="button"
          className="btn btn-success"
          onClick={handleIncrement}
          disabled={count == 10}
        >
          Increment
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={handleDecrement}
          disabled={count == 0}
        >
          Decrement
        </button>
        <button type="button" className="btn btn-info" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default SimpleCounter;
