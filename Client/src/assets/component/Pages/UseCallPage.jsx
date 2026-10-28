import { useState, useCallback } from "react";
import Childcomponent from "../Childcomponent";
function UseCallPage() {
  const [count, setCount] = useState(0);
  const showMessage = useCallback(
    () => console.log(" Hi i am Parent Component "),
    [],
  );

  return (
    <>
      <h6 className="p-0 m-0">Use Call Back Function</h6>
      <hr />
      <div className="counter-inforamtion">
        <p> Count : {count} </p>
        <button onClick={() => setCount(count + 1)}> Add count </button>
      </div>

      <div className="child-component">
        <Childcomponent showMessage={showMessage} />
      </div>
    </>
  );
}

export default UseCallPage;
