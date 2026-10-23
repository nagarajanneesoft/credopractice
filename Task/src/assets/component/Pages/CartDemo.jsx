import { Button, Container } from "react-bootstrap";
import { useCart } from "../../context/CartContext";

// Static products
const products = [
  { id: 1, name: "Laptop", price: 55000 },
  { id: 2, name: "Smart Phone", price: 18000 },
  { id: 3, name: "Headphones", price: 2500 },
];

// Component 1: Navbar (count மட்டும் காட்டும்)
function CartNavbar() {
  const { cart } = useCart();
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  return (
    <div className="border rounded p-2 mb-3">
      <b>🛒 Cart ({itemCount})</b>
    </div>
  );
}

// Component 2: Product list (Add button)
function ProductList() {
  const { addToCart } = useCart();
  return (
    <div className="mb-4">
      <h6>Products</h6>
      {products.map((p) => (
        <div key={p.id} className="d-flex align-items-center gap-3 mb-2">
          <span style={{ width: 150 }}>{p.name}</span>
          <span style={{ width: 90 }}>₹{p.price}</span>
          <Button size="sm" variant="success" onClick={() => addToCart(p)}>
            Add
          </Button>
        </div>
      ))}
    </div>
  );
}

// Component 3: Cart summary (Remove button + Total)
function CartSummary() {
  const { cart, removeFromCart } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div>
      <h6>Your Cart</h6>

      {cart.length === 0 && <p>Cart is empty</p>}

      {cart.map((item) => (
        <div key={item.id} className="d-flex align-items-center gap-3 mb-2">
          <span style={{ width: 150 }}>{item.name}</span>
          <span style={{ width: 90 }}>₹{item.price}</span>
          <span style={{ width: 90 }}>Qty: {item.quantity}</span>
          <Button
            size="sm"
            variant="danger"
            onClick={() => removeFromCart(item.id)}
          >
            Remove 1
          </Button>
        </div>
      ))}

      <b>Total: ₹{total}</b>
    </div>
  );
}

// Page
export default function CartDemo() {
  return (
    <Container className="py-4">
      <CartNavbar />
      <ProductList />
      <CartSummary />
    </Container>
  );
}
