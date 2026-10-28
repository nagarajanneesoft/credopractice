// import Button from "react-bootstrap/Button";
// import Card from "react-bootstrap/Card";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";

// const cards = Array.from({ length: 6 }, (_, index) => ({
//   id: index + 1,
//   title: `Card Title ${index + 1}`,
//   image: `https://placehold.co/600x400?text=Image+${index + 1}`,
// }));

// function LazzyLoad() {
//   return (
//     <>
//       <h6 className="p-0 m-0">LazzyLoad</h6>
//       <hr />

//       <Row className="g-3">
//         {cards.map((item) => (
//           <Col key={item.id} xs={12} md={6} lg={4}>
//             <Card>
//               <Card.Img
//                 variant="top"
//                 src={item.image}
//                 loading="lazy"
//                 width={600}
//                 height={400}
//                 alt={item.title}
//               />
//               <Card.Body>
//                 <Card.Title>{item.title}</Card.Title>
//                 <Card.Text>
//                   Some quick example text to build on the card title and make up
//                   the bulk of the card's content.
//                 </Card.Text>
//                 <Button variant="primary">Go somewhere</Button>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//     </>
//   );
// }

// export default LazzyLoad;

import { useEffect, useState } from "react";
import Placeholder from "react-bootstrap/Placeholder";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Col, Row } from "react-bootstrap";

function LazzyLoad() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 3 seconds la data vandhuchu nu simulate pannrom
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <h6 className="p-0 m-0">LazzyLoad</h6>
      <hr />
      {loading ? (
        <Row className="g-3">
          {[1, 2].map((card) => (
            <Col key={card} xs={12} sm={6} md={4}>
              <Card className="h-100">
                <Placeholder as="div" animation="glow">
                  <Placeholder
                    xs={12}
                    className="d-block rounded-top"
                    style={{ height: "190px" }}
                  />
                </Placeholder>
                <Card.Body>
                  <Placeholder as={Card.Title} animation="glow">
                    <Placeholder xs={7} />
                  </Placeholder>
                  <Placeholder as={Card.Text} animation="glow">
                    <Placeholder xs={12} /> <Placeholder xs={10} />
                    <Placeholder xs={8} />
                  </Placeholder>
                  <Placeholder.Button variant="primary" xs={5} />
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        // Unmaiyaana content (load aana piragu)
        <>
          <Row>
            <Col xs={12} sm={6} md={4}>
              <Card>
                <Card.Img variant="top" src="https://placehold.co/600x400" />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <Button variant="primary">Submit</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} sm={6} md={4}>
              <Card>
                <Card.Img variant="top" src="https://placehold.co/600x400" />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <Button variant="primary">Submit</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
}

export default LazzyLoad;
