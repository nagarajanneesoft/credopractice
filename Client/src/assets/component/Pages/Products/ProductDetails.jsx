import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { products } from "../data/productsData";

export default function ProductDetails() {
  const { id } = useParams(); // URL la irundhu id edukkum (string-a varum)

  // id string, item.id number. So Number(id) nu maathanum
  const product = products.find((item) => item.id === Number(id));

  // Wrong id kuduthaa
  if (!product) {
    return (
      <Container className="py-4">
        <Card className="p-3 text-center">
          <h4>Product Not Found</h4>
        </Card>
        <Row className="d-flex justify-content-center mt-3">
          <Col sm={4} className="text-center">
            <Button as={Link} to="/products" variant="danger">
              Back to Products
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Button
        as={Link}
        to="/products"
        variant="outline-secondary"
        className="mb-3"
      >
        ← Back to Products
      </Button>

      <Card className="shadow-sm">
        <Row className="g-0">
          <Col md={5}>
            <Card.Img
              src={product.image}
              alt={product.name}
              className="h-100 object-fit-cover"
            />
          </Col>
          <Col md={7}>
            <Card.Body>
              <Card.Title as="h3">{product.name}</Card.Title>
              <Card.Subtitle className="mb-3 text-success">
                ₹{product.price}
              </Card.Subtitle>
              <Card.Text>{product.description}</Card.Text>
              <Button variant="success">Add to Cart</Button>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}
