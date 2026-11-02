import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import { Link, Navigate, useLocation } from "react-router-dom";

const methodLabels = {
  card: "Card",
  upi: "UPI",
  cod: "Cash on Delivery",
};

export default function OrderSuccess() {
  const { state } = useLocation();

  // Direct-a URL type panni vandha (payment pannaama) home-ku anuppu
  if (!state?.orderId) {
    return <Navigate to="/" replace />;
  }

  return (
    <Container className="py-5">
      <Card
        className="shadow-sm text-center p-4 mx-auto"
        style={{ maxWidth: 480 }}
      >
        <div className="display-4 text-success">✓</div>
        <h3 className="mt-2">Order Placed Successfully!</h3>
        <p className="text-muted">Thank you for your purchase.</p>

        <div className="bg-light rounded p-3 text-start my-3">
          <div className="d-flex justify-content-between">
            <span>Order ID</span>
            <strong>{state.orderId}</strong>
          </div>
          <div className="d-flex justify-content-between">
            <span>Amount</span>
            <strong>₹{state.amount}</strong>
          </div>
          <div className="d-flex justify-content-between">
            <span>Payment</span>
            <strong>{methodLabels[state.method]}</strong>
          </div>
        </div>

        <Button as={Link} to="/products" variant="success">
          Continue Shopping
        </Button>
      </Card>
    </Container>
  );
}
