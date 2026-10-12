import { useState } from "react";

function StateChangeObserver() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h5>Task 1: State Change Observer</h5>
      <div className="mt-2 d-flex gap-2 align-items-center">
        <button
          type="button"
          className="btn btn-success"
          onClick={() => {
            setCount(count + 1);
            console.log("State Change Observer:", count);
          }}
        >
          Increment
        </button>
        <p className="m-0 p-0">
          <b>State Change Observer : {count}</b>
        </p>
      </div>
    </div>
  );
}

export default StateChangeObserver;
