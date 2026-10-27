import MemoHeader from "../MemoHeader";
import MemoFooter from "../MemoFooter";
import { Card } from "react-bootstrap";
import { useState } from "react";

function MemoPage() {
  const [count, setCount] = useState(0);
  console.log("Counter Page is rendering.....");
  return (
    <>
      <h6 className="p-0 m-0">Memo Page</h6>
      <hr />
      <MemoHeader />
      <Card className="p-2 text-center">
        <h6>Memo Page</h6>
        <div>
          <p>
            <span>Current count :</span>
            <span>{count}</span>
          </p>
          <div>
            <button
              className="btn btn-success"
              onClick={() => setCount(count + 1)}
            >
              {" "}
              ADD{" "}
            </button>
          </div>
        </div>
      </Card>

      <MemoFooter />
    </>
  );
}

export default MemoPage;
