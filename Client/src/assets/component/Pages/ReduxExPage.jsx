import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, reset } from "../../Redux/counterSlice";

function ReduxExPage() {
  const count = useSelector((state) => state.counter.value); // data படிக்க
  const dispatch = useDispatch(); // action அனுப்ப

  return (
    <div className="text-center mt-5">
      <h1>Count: {count}</h1>
      <button
        className="btn btn-success m-2"
        onClick={() => dispatch(increment())}
      >
        +
      </button>
      <button
        className="btn btn-danger m-2"
        onClick={() => dispatch(decrement())}
      >
        -
      </button>
      <button
        className="btn btn-secondary m-2"
        onClick={() => dispatch(reset())}
      >
        Reset
      </button>
    </div>
  );
}

export default ReduxExPage;
