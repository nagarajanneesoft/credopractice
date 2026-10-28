import { useState, useMemo } from "react";
import { Button, Card, Form } from "react-bootstrap";

function Four() {
  const [number, setNumber] = useState(5);
  const [dark, setDark] = useState(false);

  const factorial = useMemo(() => {
    console.log("Calculating factorial...");
    let result = 1;
    for (let i = 1; i <= number; i++) result *= i;
    return result;
  }, [number]);

  return (
    <>
      <h6 className="p-0 m-0">useMemo</h6>
      <hr />
      <div className="d-flex gap-2 align-items-center">
        <Card
          className="p-4 m-3"
          style={{ width: "22rem" }}
          bg={dark ? "dark" : "light"}
          text={dark ? "white" : "dark"}
        >
          <Form.Control
            type="number"
            value={number}
            onChange={(e) => setNumber(Number(e.target.value))}
          />
          <h5 className="mt-3">Factorial: {factorial}</h5>
          <Button variant="success" onClick={() => setDark(!dark)}>
            Toggle Theme
          </Button>
        </Card>
      </div>

      <Card className="p-2 mt-2">
        <h6 className="text-danger">useRef</h6>
        <p>
          <span className="text-danger">Concept: </span>கனமான calculation-ஐ
          ஒவ்வொரு முறையும் செய்யாமல், dependency மாறினால் மட்டும் மறுபடி செய்ய
          (result-ஐ நினைவில் வைக்க).
        </p>
        <p>
          <span className="text-danger">Analogy: </span> ஒரு முறை கணக்கு போட்டு
          answer-ஐ நோட்டில் எழுதி வச்சுக்கிறது; அடுத்த முறை மறுபடி போடாம
          நோட்டைப் பார்க்கிறது.
        </p>
        <h6 className="text-danger">Step by Step:</h6>
        <ol>
          <li>
            useMemo(() = calculation, [number]) → number மாறினா மட்டுமே
            calculation run ஆகும்.
          </li>
          <li>
            “Toggle Theme” click பண்ணினா component re-render ஆகும், ஆனா
            factorial மறுபடி calculate ஆகாது.
          </li>
          <li>
            Console-ல் “Calculating factorial...” எப்போ வருது என்று கவனிங்க:
            number மாத்தும்போது மட்டும்.
          </li>
          <li>
            சின்ன calculation-க்கு useMemo தேவையில்ல; கனமான வேலைக்கு மட்டும் use
            பண்ணுங்க.
          </li>
        </ol>
      </Card>
    </>
  );
}

export default Four;
