import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, reset } from "../../Redux/counterSlice";
import { Row, Col, Card } from "react-bootstrap";
function ReduxExPage() {
  const count = useSelector((state) => state.counter.value); // data படிக்க
  const dispatch = useDispatch(); // action அனுப்ப

  return (
    <>
      <h6 className="p-0 m-0">Redux Page</h6>
      <hr />
      <Row>
        <Col md={4} className="mx-auto">
          <Card className="p-3">
            <div className="text-center mt-5">
              <h5>Count: {count}</h5>
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
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default ReduxExPage;
