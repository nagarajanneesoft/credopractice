import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Table,
  Image,
  ButtonGroup,
  ProgressBar,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useCart, FREE_SHIPPING_LIMIT } from "../../context/CartContext";

export default function Cart() {
  const {
    cart,
    addToCart,
    removeFromCart,
    deleteFromCart,
    cartCount,
    cartTotal,
    deliveryCharge,
    grandTotal,
    amountForFreeShipping,
  } = useCart();
  const navigate = useNavigate();

  // Free shipping progress (%)
  const shippingProgress = Math.min(
    (cartTotal / FREE_SHIPPING_LIMIT) * 100,
    100,
  );

  // Cart empty-a irundha
  if (cart.length === 0) {
    return (
      <Container className="py-5 text-center">
        <Card className="p-4 shadow-sm">
          <h4>🛒 Your cart is empty</h4>
          <p className="text-muted">Add some products to continue.</p>
          <div>
            <Button as={Link} to="/products" variant="success">
              Shop Now
            </Button>
          </div>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h3 className="mb-4">My Cart ({cartCount} items)</h3>

      <Row className="g-4">
        {/* Left side - Cart items */}
        <Col lg={8}>
          <Card className="shadow-sm">
            <Table responsive className="mb-0 align-middle">
              <thead className="table-light">
                <tr>
                  <th>Product</th>
                  <th className="text-center">Qty</th>
                  <th className="text-end">Subtotal</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="d-flex align-items-center gap-3">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={60}
                          height={60}
                          rounded
                          className="object-fit-cover"
                        />
                        <div>
                          <div className="fw-semibold">{item.name}</div>
                          <small className="text-muted">₹{item.price}</small>
                        </div>
                      </div>
                    </td>
                    <td className="text-center">
                      <ButtonGroup size="sm">
                        <Button
                          variant="outline-secondary"
                          onClick={() => removeFromCart(item.id)}
                        >
                          −
                        </Button>
                        <Button variant="light" disabled>
                          {item.quantity}
                        </Button>
                        <Button
                          variant="outline-secondary"
                          onClick={() => addToCart(item)}
                        >
                          +
                        </Button>
                      </ButtonGroup>
                    </td>
                    <td className="text-end fw-semibold">
                      ₹{item.price * item.quantity}
                    </td>
                    <td className="text-end">
                      <Button
                        variant="link"
                        className="text-danger p-0"
                        onClick={() => deleteFromCart(item.id)}
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </Col>

        {/* Right side - Order summary */}
        <Col lg={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>

              {/* Free shipping message + progress bar */}
              <div className="my-3">
                {amountForFreeShipping > 0 ? (
                  <small className="text-muted">
                    Add{" "}
                    <strong className="text-dark">
                      ₹{amountForFreeShipping}
                    </strong>{" "}
                    more for{" "}
                    <span className="text-success fw-semibold">
                      FREE shipping
                    </span>
                  </small>
                ) : (
                  <small className="text-success fw-semibold">
                    🎉 You got FREE shipping!
                  </small>
                )}
                <ProgressBar
                  now={shippingProgress}
                  variant="success"
                  className="mt-2"
                  style={{ height: 6 }}
                />
              </div>

              <div className="d-flex justify-content-between">
                <span>Items ({cartCount})</span>
                <span>₹{cartTotal}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Shipping</span>
                <span>
                  {deliveryCharge === 0 ? (
                    <span className="text-success">FREE</span>
                  ) : (
                    `₹${deliveryCharge}`
                  )}
                </span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold fs-5">
                <span>Total</span>
                <span>₹{grandTotal}</span>
              </div>

              <Button
                variant="success"
                className="w-100 mt-3"
                disabled={cart.length === 0}
                onClick={() => navigate("/payment")}
              >
                Proceed to Payment
              </Button>
              <Button
                as={Link}
                to="/products"
                variant="outline-secondary"
                className="w-100 mt-2"
              >
                Continue Shopping
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
