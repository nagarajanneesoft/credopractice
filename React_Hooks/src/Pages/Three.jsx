import { useRef } from "react";
import { Button, Form, Card, Row, Col } from "react-bootstrap";

function Three() {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus();
    inputRef.current.style.backgroundColor = "#fff3cd";
  };
  return (
    <>
      <h6 className="p-0 m-0">useRef</h6>
      <hr />
      <div className="d-flex gap-2 align-items-center">
        <Form>
          <Form.Group as={Row} className="" controlId="formPlaintextEmail">
            <Col sm="6">
              <Form.Control
                ref={inputRef}
                type="text"
                placeholder="Type here..."
              />
            </Col>
            <Col sm="4">
              <Button className="" variant="success" onClick={focusInput}>
                Focus Input
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </div>

      <Card className="p-2 mt-2">
        <h6 className="text-danger">useRef</h6>
        <p>
          <span className="text-danger">Concept: </span>(a) DOM element-ஐ
          நேரடியா access பண்ண, (b) re-render ஆகாமல் value-ஐ நினைவில் வைக்க.
        </p>
        <p>
          <span className="text-danger">Analogy: </span> சுவரில் ஒட்டின sticky
          note, மாத்தினாலும் வீடு (component) refresh ஆகாது.
        </p>
        <h6 className="text-danger">Step by Step:</h6>
        <ol>
          <li>
            const inputRef = useRef(null) → ஒரு “reference box” உருவாகும்.
          </li>
          <li>
            Input-ல் ref=inputRef கொடுத்தா, அந்த input element இந்த box-க்குள்
            வந்துடும்.
          </li>
          <li>inputRef.current = உண்மையான DOM element.</li>
          <li>
            Button click ஆனா .focus() call ஆகி cursor input-க்குள் போகும்.
          </li>
          <li>
            useRef value மாறினா re-render ஆகாது; இதுதான் useState-இலிருந்து
            வித்தியாசம்.
          </li>
        </ol>
      </Card>
    </>
  );
}

export default Three;
