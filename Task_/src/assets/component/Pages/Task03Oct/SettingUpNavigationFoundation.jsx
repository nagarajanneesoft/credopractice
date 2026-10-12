import Card from "react-bootstrap/Card";
import { Container, Row, Col } from "react-bootstrap";
function SettingUpNavigationFoundation() {
  return (
    <div>
      <h5>Task 6: Setting Up Navigation Foundation</h5>
      <Container>
        <Row>
          <Col sm={12}>
            <div className="mt-2 d-flex gap-2">
              <Card className="p-3">
                <ul>
                  <li>
                    npm create vite@latest my-router-app -- --template react
                  </li>
                  <li>cd my-router-app</li>
                  <li>npm install</li>
                  <li>npm install react-router-dom</li>
                  <li>npm run dev</li>
                </ul>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default SettingUpNavigationFoundation;
