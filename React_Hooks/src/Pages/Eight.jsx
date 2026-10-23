import { Button, Card, Alert } from "react-bootstrap";
import useToggle from "../components/useToggle";

function Eight() {
  const [showAlert, toggleAlert] = useToggle(false);
  const [isDark, toggleDark] = useToggle(false);

  return (
    <>
      <h6 className="p-0 m-0">Custom Hook (useCustom)</h6>
      <hr />
      <div className="d-flex gap-2 align-items-center">
        <Card
          className="p-4 m-3"
          style={{ width: "22rem" }}
          bg={isDark ? "dark" : "light"}
          text={isDark ? "white" : "dark"}
        >
          <div className="d-flex gap-2 mb-3">
            <Button variant="primary" onClick={toggleAlert}>
              {showAlert ? "Hide" : "Show"} Alert
            </Button>
            <Button variant="secondary" onClick={toggleDark}>
              Dark Mode
            </Button>
          </div>
          {showAlert && (
            <Alert variant="success">Custom Hook வேலை செய்யுது! 🎉</Alert>
          )}
        </Card>
      </div>

      <Card className="p-2 mt-2">
        <h6 className="text-danger">Custom Hook (useCustom)</h6>
        <p>
          <span className="text-danger">Concept: </span>திரும்பத் திரும்ப வரும்
          logic-ஐ ஒரு தனி function-ஆ எடுத்து, பல component-ல் reuse பண்ண. Name
          எப்போதும் use என்று ஆரம்பிக்கணும்.
        </p>

        <h6 className="text-danger">Step by Step:</h6>
        <ol>
          <li>useToggle.js என்று தனி file உருவாக்குங்க.</li>
          <li>
            அதுக்குள்ள useState use பண்ணி true/false toggle logic எழுதுறோம்.
          </li>
          <li>[value, toggle] return பண்ணுறோம்.</li>
          <li>
            UseCustomDemo-ல் useToggle() ஐ இரண்டு முறை call பண்ணி, இரண்டு
            தனித்தனி toggle உருவாக்கினோம் (alert, dark mode).
          </li>
          <li>
            ஒவ்வொரு call-க்கும் தனி state இருக்கும்; logic ஒரே இடத்தில், reuse
            பல இடத்தில்.
          </li>
        </ol>
      </Card>
    </>
  );
}

export default Eight;
