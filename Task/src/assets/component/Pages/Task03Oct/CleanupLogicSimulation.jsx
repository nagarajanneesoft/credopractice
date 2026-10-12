import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    console.log("Timer started ▶️");

    const id = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    // Cleanup function
    return () => {
      clearInterval(id);
      console.log("Timer stopped & cleaned ⏹️");
    };
  }, []);

  return <p className="mt-2">Timer: {seconds} sec</p>;
}

function CleanupLogicSimulation() {
  const [show, setShow] = useState(true);

  return (
    <div>
      <h5>Task 4: Cleanup Logic Simulation</h5>

      <button
        type="button"
        className="btn btn-success"
        onClick={() => setShow(!show)}
      >
        {show ? "Hide" : "Show"}
      </button>
      <p>{show && <Timer />}</p>

      <Card className="p-2 mt-2">
        <p className="p-0 m-0 text-danger">Doute</p>
      </Card>
    </div>
  );
}

export default CleanupLogicSimulation;
