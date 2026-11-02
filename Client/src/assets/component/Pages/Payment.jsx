import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Spinner,
  Alert,
} from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export default function Payment() {
  const { cart, deliveryCharge, grandTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [method, setMethod] = useState("card");
  const [processing, setProcessing] = useState(false);
  const [form, setForm] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    upiId: "",
  });

  // Cart empty-a irundha payment page-ku vara koodaadhu
  if (cart.length === 0 && !processing) {
    return <Navigate to="/cart" replace />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Dummy validation
  const isCardValid =
    form.name.trim().length >= 3 &&
    /^\d{16}$/.test(form.cardNumber) &&
    /^(0[1-9]|1[0-2])\/\d{2}$/.test(form.expiry) &&
    /^\d{3}$/.test(form.cvv);

  const isUpiValid = /^[\w.-]+@[\w]+$/.test(form.upiId);

  const isFormValid =
    method === "card" ? isCardValid : method === "upi" ? isUpiValid : true;

  const handlePayment = (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    setProcessing(true);

    // Fake payment - 2 sec wait
    setTimeout(() => {
      const orderId = "ORD" + Date.now();

      navigate("/order-success", {
        replace: true,
        state: {
          orderId,
          amount: grandTotal,
          method,
          items: cart.length,
        },
      });
      clearCart();
    }, 2000);
  };

  return (
    <Container className="py-4">
      <h3 className="mb-4">Payment</h3>

      <Alert variant="warning" className="small">
        ⚠️ This is a <strong>dummy payment</strong> for practice. Don't enter
        real card details.
      </Alert>

      <Row className="g-4">
        <Col lg={7}>
          <Card className="shadow-sm">
            <Card.Body>
              <Form onSubmit={handlePayment}>
                <Form.Label className="fw-semibold">Payment Method</Form.Label>
                <div className="mb-4">
                  <Form.Check
                    inline
                    type="radio"
                    id="pay-card"
                    label="Card"
                    name="method"
                    checked={method === "card"}
                    onChange={() => setMethod("card")}
                    disabled={processing}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    id="pay-upi"
                    label="UPI"
                    name="method"
                    checked={method === "upi"}
                    onChange={() => setMethod("upi")}
                    disabled={processing}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    id="pay-cod"
                    label="Cash on Delivery"
                    name="method"
                    checked={method === "cod"}
                    onChange={() => setMethod("cod")}
                    disabled={processing}
                  />
                </div>

                {method === "card" && (
                  <>
                    <Form.Group className="mb-3">
                      <Form.Label>Name on Card</Form.Label>
                      <Form.Control
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Username"
                        disabled={processing}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Card Number</Form.Label>
                      <Form.Control
                        name="cardNumber"
                        value={form.cardNumber}
                        onChange={handleChange}
                        placeholder="4111111111111111"
                        maxLength={16}
                        inputMode="numeric"
                        disabled={processing}
                      />
                      <Form.Text muted>Test number: 4111111111111111</Form.Text>
                    </Form.Group>
                    <Row>
                      <Col xs={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Expiry (MM/YY)</Form.Label>
                          <Form.Control
                            name="expiry"
                            value={form.expiry}
                            onChange={handleChange}
                            placeholder="12/28"
                            maxLength={5}
                            disabled={processing}
                          />
                        </Form.Group>
                      </Col>
                      <Col xs={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>CVV</Form.Label>
                          <Form.Control
                            type="password"
                            name="cvv"
                            value={form.cvv}
                            onChange={handleChange}
                            placeholder="123"
                            maxLength={3}
                            inputMode="numeric"
                            disabled={processing}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </>
                )}

                {method === "upi" && (
                  <Form.Group className="mb-3">
                    <Form.Label>UPI ID</Form.Label>
                    <Form.Control
                      name="upiId"
                      value={form.upiId}
                      onChange={handleChange}
                      placeholder="name@okbank"
                      disabled={processing}
                    />
                  </Form.Group>
                )}

                {method === "cod" && (
                  <p className="text-muted">
                    Pay ₹{grandTotal} in cash when your order arrives.
                  </p>
                )}

                <Button
                  type="submit"
                  variant="success"
                  className="w-100"
                  disabled={!isFormValid || processing}
                >
                  {processing ? (
                    <>
                      <Spinner size="sm" className="me-2" />
                      Processing...
                    </>
                  ) : method === "cod" ? (
                    "Place Order"
                  ) : (
                    `Pay ₹${grandTotal}`
                  )}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={5}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="d-flex justify-content-between small mt-2"
                >
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
              <hr />
              <div className="d-flex justify-content-between small">
                <span>Shipping</span>
                <span>
                  {deliveryCharge === 0 ? (
                    <span className="text-success">FREE</span>
                  ) : (
                    `₹${deliveryCharge}`
                  )}
                </span>
              </div>
              <div className="d-flex justify-content-between fw-bold fs-5 mt-2">
                <span>Total</span>
                <span>₹{grandTotal}</span>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
