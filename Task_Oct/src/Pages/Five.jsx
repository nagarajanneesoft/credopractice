import { useState, useCallback, memo } from "react";
import { Button, Card } from "react-bootstrap";

const ChildButton = memo(({ onClick }) => {
  console.log("Child rendered");
  return (
    <Button variant="primary" onClick={onClick}>
      Add Item
    </Button>
  );
});

function Five() {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([]);

  const addItem = useCallback(() => {
    setItems((prev) => [...prev, `Item ${prev.length + 1}`]);
  }, []);
  return (
    <>
      <h6 className="p-0 m-0">useCallback</h6>
      <hr />
      <div className="d-flex gap-2 align-items-center">
        <Button
          variant="secondary"
          className=""
          onClick={() => setCount(count + 1)}
        >
          Count +
        </Button>
        <ChildButton onClick={addItem} />
      </div>
      <div className="d-flex gap-2">
        <ul className="">
          {items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
      <Card className="p-2 mt-2">
        <h6 className="text-danger">useCallback</h6>
        <p>
          <span className="text-danger">Concept: </span>Function-ஐ ஒவ்வொரு
          render-லயும் புதுசா உருவாக்காம, அதே function-ஐ நினைவில் வைக்க. useMemo
          value-ஐ நினைவில் வைக்கும்; useCallback function-ஐ நினைவில் வைக்கும்.
        </p>

        <h6 className="text-danger">Step by Step:</h6>
        <ol>
          <li>
            memo(...) → Props மாறலன்னா child component மறுபடி render ஆகாது.
          </li>
          <li>
            Parent re-render ஆனா addItem function புதுசா உருவாகும், அதனால memo
            வேலை செய்யாது.
          </li>
          <li>useCallback(fn, []) போட்டா அதே function தொடர்ந்து இருக்கும்.</li>
          <li>
            “Count +” click பண்ணுங்க: console-ல் “Child rendered” மறுபடி வராது.
          </li>
          <li>
            useCallback இல்லாம try பண்ணினா ஒவ்வொரு click-க்கும் “Child rendered”
            வரும். வித்தியாசத்தைப் பாருங்க.
          </li>
        </ol>
      </Card>
    </>
  );
}

export default Five;
