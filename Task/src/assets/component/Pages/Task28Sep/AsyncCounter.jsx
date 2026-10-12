import { useEffect, useState } from "react";

function AsyncCounter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
    console.log("Console value (Old Count):", count);
  };

  useEffect(() => console.log("Console value (New Count):", count));

  return (
    <div>
      <h5>Task 3: Async Counter</h5>
      <div className="mt-2 d-flex gap-2 align-items-center">
        <button type="button" className="btn btn-success" onClick={handleClick}>
          Increment
        </button>
        <p className="m-0 p-0">
          <b>Increment : {count}</b>
        </p>
      </div>
    </div>
  );
}

export default AsyncCounter;
