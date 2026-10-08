import React, { useEffect, useState } from "react";
import { Card, Col, Row, Form } from "react-bootstrap";

function SampleProductList() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  const categories = ["all", ...new Set(products.map((item) => item.category))];
  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h6>Sample Product List</h6>

      <Row className="mb-3 justify-content-end">
        <Col md={2}>
          <Form.Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="form-control"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === "all" ? "All" : category}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      <Row xs={1} sm={2} md={3} lg={4} className="g-3">
        {filteredProducts.map((product) => (
          <Col key={product.id}>
            <Card className="h-100 shadow-sm text-center">
              <Card.Body className="border border-primary rounded p-2">
                <Card.Title className="h6">{product.title}</Card.Title>
                <Card.Text className="text-danger mb-1">
                  {product.category}
                </Card.Text>
                <Card.Text className="fw-bold text-dark">
                  ${product.price.toFixed(2)}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default SampleProductList;
