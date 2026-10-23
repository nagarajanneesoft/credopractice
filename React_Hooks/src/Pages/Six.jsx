import { useReducer } from "react";
import { Button, Card, Form } from "react-bootstrap";

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return initialState;
    default:
      return state;
  }
}

function Six() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <h6 className="p-0 m-0">useReducer</h6>
      <hr />
      <div className="d-flex gap-2 align-items-center">
        <h4>Count: {state.count}</h4>
        <div className="d-flex gap-2 justify-content-center">
          <Button
            variant="success"
            onClick={() => dispatch({ type: "increment" })}
          >
            +
          </Button>
          <Button
            variant="danger"
            onClick={() => dispatch({ type: "decrement" })}
          >
            -
          </Button>
          <Button
            variant="secondary"
            onClick={() => dispatch({ type: "reset" })}
          >
            Reset
          </Button>
        </div>
      </div>

      <Card className="p-2 mt-2">
        <h6 className="text-danger">useReducer</h6>
        <p>
          <span className="text-danger">Concept: </span>State logic சிக்கலா
          இருக்கும்போது (பல actions) useState-க்கு பதிலா use பண்ணுவோம்.
        </p>
        <p>
          <span className="text-danger">Analogy: </span> Bank counter: நீங்க
          “deposit” / “withdraw” என்று request (action) கொடுக்கிறீங்க; clerk
          (reducer) rules படி balance-ஐ மாத்துறார்.
        </p>
        <h6 className="text-danger">Step by Step:</h6>
        <ol>
          <li>initialState → ஆரம்ப state.</li>
          <li>
            reducer(state, action) → action.type பார்த்து புது state return
            பண்ணும் function.
          </li>
          <li>
            useReducer(reducer, initialState) → state மற்றும் dispatch
            கிடைக்கும்.
          </li>
          <li>
            Button click ஆனா dispatch (type: 'increment') இது reducer-க்கு
            request அனுப்பும்.
          </li>
          <li>Reducer புது state return பண்ணும், screen update ஆகும்.</li>
        </ol>
      </Card>
    </>
  );
}

export default Six;
