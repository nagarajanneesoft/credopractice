import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  InputGroup,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { products } from "./data/productsData";
import { useCart } from "../../context/CartContext";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);

function ProductCard({ product }) {
  const { cart, addToCart } = useCart();
  const quantity =
    cart.find((cartItem) => cartItem.id === product.id)?.quantity ?? 0;

  return (
    <Card className="cart-demo-product h-100">
      <Card.Img
        variant="top"
        src={product.image}
        alt={product.name}
        className="cart-demo-product__image"
      />
      <Card.Body className="d-flex flex-column">
        <Badge bg="light" text="dark" className="align-self-start mb-2">
          {product.category}
        </Badge>
        <Card.Title className="h6">{product.name}</Card.Title>
        <div className="d-flex align-items-center justify-content-between mt-auto pt-3">
          <strong>{formatPrice(product.price)}</strong>
          <Button
            size="sm"
            variant={quantity > 0 ? "outline-success" : "success"}
            onClick={() => addToCart(product)}
            disabled={quantity === 5}
          >
            {quantity === 5 ? "Limit reached" : "Add to cart"}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

function CartSummary() {
  const { cart, addToCart, removeFromCart } = useCart();
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <Card className="cart-demo-summary">
      <Card.Body className="p-4">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div>
            <p className="cart-demo-eyebrow mb-1">YOUR SELECTION</p>
            <h2 className="h4 mb-0">Your cart</h2>
          </div>
          <Badge pill bg="success" className="cart-demo-summary__count">
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </Badge>
        </div>

        {cart.length === 0 ? (
          <div className="cart-demo-empty text-center">
            <div className="cart-demo-empty__icon" aria-hidden="true">
              🛍️
            </div>
            <h3 className="h6">Your cart is waiting</h3>
            <p className="text-muted mb-3">
              Add something you like to see it here.
            </p>
            <Button as={Link} to="/products" variant="outline-success" size="sm">
              Browse all products
            </Button>
          </div>
        ) : (
          <>
            <div className="cart-demo-items">
              {cart.map((item) => (
                <div className="cart-demo-item" key={item.id}>
                  <img
                    className="cart-demo-item__image"
                    src={
                      item.image ??
                      products.find((product) => product.id === item.id)?.image
                    }
                    alt=""
                  />
                  <div className="cart-demo-item__details">
                    <div className="d-flex justify-content-between gap-2">
                      <div>
                        <h3 className="cart-demo-item__name">{item.name}</h3>
                        <span className="text-muted small">
                          {formatPrice(item.price)} each
                        </span>
                      </div>
                      <strong className="cart-demo-item__total">
                        {formatPrice(item.price * item.quantity)}
                      </strong>
                    </div>
                    <div className="d-flex align-items-center justify-content-between mt-2">
                      <InputGroup size="sm" className="cart-demo-quantity">
                        <Button
                          variant="outline-secondary"
                          aria-label={`Decrease ${item.name} quantity`}
                          onClick={() => removeFromCart(item.id)}
                        >
                          −
                        </Button>
                        <span
                          className="cart-demo-quantity__value"
                          aria-label={`Quantity: ${item.quantity}`}
                        >
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline-secondary"
                          aria-label={`Increase ${item.name} quantity`}
                          onClick={() => addToCart(item)}
                          disabled={item.quantity === 5}
                        >
                          +
                        </Button>
                      </InputGroup>
                      <Button
                        variant="link"
                        size="sm"
                        className="cart-demo-remove p-0"
                        onClick={() => removeFromCart(item.id, item.quantity)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-demo-totals pt-3 mt-3">
              <div className="d-flex justify-content-between text-muted mb-2">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="d-flex justify-content-between text-muted mb-3">
                <span>Delivery</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <strong className="h6 mb-0">Items total</strong>
                <strong className="h5 text-success mb-0">
                  {formatPrice(subtotal)}
                </strong>
              </div>
            </div>
            <p className="cart-demo-note mb-0 mt-3">
              Your cart count in the header updates automatically.
            </p>
          </>
        )}
      </Card.Body>
    </Card>
  );
}

export default function CartDemo() {
  return (
    <Container className="cart-demo">
      <header className="cart-demo-hero">
        <div>
          <p className="cart-demo-hero__eyebrow">A LITTLE SOMETHING FOR YOU</p>
          <h1>Cart Demo</h1>
          <p className="cart-demo-hero__description mb-0">
            Explore the collection and keep track of your picks in one place.
          </p>
        </div>
        <div className="cart-demo-hero__mark" aria-hidden="true">
          🛒
        </div>
      </header>

      <Row className="g-4">
        <Col lg={7}>
          <div className="cart-demo-section-heading">
            <div>
              <p className="cart-demo-eyebrow mb-1">HANDPICKED FOR YOU</p>
              <h2 className="h4 mb-0">Explore products</h2>
            </div>
            <span className="text-muted small">{products.length} products</span>
          </div>
          <Row xs={1} sm={2} className="g-3">
            {products.map((product) => (
              <Col key={product.id}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        </Col>

        <Col lg={5}>
          <CartSummary />
        </Col>
      </Row>
    </Container>
  );
}
