import { Button, Container } from "react-bootstrap";
import { CartProvider, useCart } from "../../context/CartContext";

// Static products
const products = [
  { id: 1, name: "Laptop", price: 55000 },
  { id: 2, name: "Smart Phone", price: 18000 },
  { id: 3, name: "Headphones", price: 2500 },
];

// Component 1: Navbar (count மட்டும் காட்டும்)
function CartNavbar() {
  const { cart } = useCart();
  return (
    <div className="border rounded p-2 mb-3">
      <b>🛒 Cart ({cart.length})</b>
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

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div>
      <h6>Your Cart</h6>

      {cart.length === 0 && <p>Cart is empty</p>}

      {cart.map((item, index) => (
        <div key={index} className="d-flex align-items-center gap-3 mb-2">
          <span style={{ width: 150 }}>{item.name}</span>
          <span style={{ width: 90 }}>₹{item.price}</span>
          <Button
            size="sm"
            variant="danger"
            onClick={() => removeFromCart(index)}
          >
            Remove
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
    <CartProvider>
      <Container className="py-4">
        <CartNavbar />
        <ProductList />
        <CartSummary />
      </Container>
    </CartProvider>
  );
}
