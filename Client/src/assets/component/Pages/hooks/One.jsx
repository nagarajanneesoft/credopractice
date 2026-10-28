import { useState } from "react";
import { Card } from "react-bootstrap";

function One() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h6 className="p-0 m-0">UseState</h6>
      <hr />
      <h4 className="p-0 m-0">{count}</h4>
      <div className="d-flex gap-2">
        <button className="btn btn-danger" onClick={() => setCount(count - 1)}>
          -
        </button>
        <button className="btn btn-success" onClick={() => setCount(count + 1)}>
          +
        </button>

        <button className="btn btn-warning" onClick={() => setCount(0)}>
          Reset
        </button>
      </div>

      <Card className="p-2 mt-2">
        <h6 className="text-danger">UseState</h6>
        <p>
          <span className="text-danger">Concept: </span>Component-க்குள்
          மாறக்கூடிய data (state) வைக்க. Value மாறினா screen தானாகவே update
          ஆகும்.
        </p>
        <p>
          <span className="text-danger">Analogy:</span> Notebook-ல் எழுதின
          number-ஐ அழிச்சு புதுசா எழுதுற மாதிரி.
        </p>
        <h6 className="text-danger">Step by Step:</h6>
        <ol>
          <li>useState ஐ react-இலிருந்து import பண்ணுறோம்.</li>
          <li>
            const [count, setCount] = useState(0) → count = தற்போதைய value,
            setCount = value மாத்த function, 0 = ஆரம்ப value.
          </li>
          <li>Button click ஆனா setCount(count + 1) call ஆகும்.</li>
          <li>
            State மாறினதும் React component-ஐ மறுபடி render பண்ணி புது value
            காட்டும்.
          </li>
          <li>
            முக்கியம்: count = count + 1 என்று நேரடியா மாத்தக்கூடாது; எப்போதும்
            setCount தான் use பண்ணனும்.
          </li>
        </ol>
      </Card>
    </>
  );
}

export default One;
