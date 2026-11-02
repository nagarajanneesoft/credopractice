import React, { useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { products } from "../data/productsData";
import { useCart } from "../../../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams(); // URL la irundhu id edukkum (string-a varum)

  const { addToCart } = useCart(); // Context la irundhu addToCart function
  const [added, setAdded] = useState(false); // "Added" feedback kaata

  // id string, item.id number. So Number(id) nu maathanum
  const product = products.find((item) => item.id === Number(id));

  // Add to Cart click pannumbodhu
  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500); // 1.5 sec kazhichu normal-a maarum
  };
  const navigate = useNavigate();

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
              {/* <Button variant="success">Add to Cart</Button> */}
              <div className="d-flex gap-2">
                <Button
                  variant={added ? "outline-success" : "success"}
                  onClick={handleAddToCart}
                >
                  {added ? "✓ Added to Cart" : "Add to Cart"}
                </Button>
                <Button
                  variant={added ? "outline-success" : "success"}
                  onClick={() => navigate("/cart")}
                >
                  Go to Cart
                </Button>
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}
