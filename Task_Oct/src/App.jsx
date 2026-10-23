import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import Dashboard from "../src/Pages/Dashboard";
import { Route, Routes } from "react-router-dom";
import One from "../src/Pages/One";
import Two from "../src/Pages/Two";
import Three from "../src/Pages/Three";
import Four from "../src/Pages/Four";
import Five from "../src/Pages/Five";
import Six from "../src/Pages/Six";
import Seven from "../src/Pages/Seven";
import Eight from "../src/Pages/Eight";
import { Col, Container, Row } from "react-bootstrap";

function App() {
  return (
    <>
      <Header />
      <main className="flex-shrink-0 mt-5">
        <Container>
          <Row>
            <Col>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/one" element={<One />} />
                <Route path="/two" element={<Two />} />
                <Route path="/three" element={<Three />} />
                <Route path="/four" element={<Four />} />
                <Route path="/five" element={<Five />} />
                <Route path="/six" element={<Six />} />
                <Route path="/seven" element={<Seven />} />
                <Route path="/eight" element={<Eight />} />
              </Routes>
            </Col>
          </Row>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;
