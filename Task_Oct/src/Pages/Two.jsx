import { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";

function Two() {
  const [count, setCount] = useState(0);
  // count மாறும் ஒவ்வொரு முறையும் run ஆகும்
  useEffect(() => {
    document.title = `Count: ${count}`;
    console.log("Component Loaded! 1");
  }, [count]);

  // Component load ஆகும்போது ஒரே ஒரு முறை
  useEffect(() => {
    console.log("Component Loaded!");
  }, []);
  return (
    <>
      <h6 className="p-0 m-0">UseEffect</h6>
      <hr />
      <div className="d-flex gap-2 align-items-center">
        <h4 className="p-0 m-0">Count: {count}</h4>
        <p className="text-muted p-0 m-0">Browser tab title-ஐ பாருங்க</p>
        <Button className="btn btn-success" onClick={() => setCount(count + 1)}>
          Increase
        </Button>
      </div>

      <Card className="p-2 mt-2">
        <h6 className="text-danger">UseEffect</h6>
        <p>
          <span className="text-danger">Concept: </span>Component load
          ஆகும்போது, அல்லது ஏதாவது value மாறும்போது ஒரு வேலை (side effect)
          செய்ய. <br></br>
        </p>
        <p>
          <span className="text-danger">Ex: </span>: API call, document title
          மாத்துதல், timer.
        </p>
        <h6 className="text-danger">Step by Step:</h6>
        <ol>
          <li>useEffect(() = []); இதுதான் structure.</li>
          <li>
            [] (empty array) → component load ஆகும்போது ஒரே ஒரு முறை மட்டும்.
          </li>
          <li>[count] → count மாறும் ஒவ்வொரு முறையும்.</li>
          <li>
            Array எதுவுமே இல்லன்னா → ஒவ்வொரு render-க்கும் run ஆகும்
            (பெரும்பாலும் தவிர்க்கணும்).
          </li>
          <li>இங்கே count கூடும்போது browser tab title மாறும்.</li>
        </ol>
      </Card>
    </>
  );
}

export default Two;
