// import React from "react";
// import { Container, Row, Col, Card, Button } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import { products } from "../data/productsData";

// export default function Products() {
//   return (
//     <Container className="py-4">
//       <h2 className="mb-4">Products</h2>

//       <Row>
//         {products.map((item) => (
//           <Col key={item.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
//             <Card className="h-100 shadow-sm">
//               <Card.Img variant="top" src={item.image} alt={item.name} />
//               <Card.Body className="d-flex flex-column">
//                 <Card.Title>{item.name}</Card.Title>
//                 <Card.Text>₹{item.price}</Card.Text>

//                 {/* Click panna /products/1 nu URL maarum */}
//                 <Button
//                   as={Link}
//                   to={`/products/${item.id}`}
//                   variant="primary"
//                   className="mt-auto"
//                 >
//                   View Details
//                 </Button>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//     </Container>
//   );
// }

// import React from "react";
// import { Container, Row, Col, Card, Button, Nav, Badge } from "react-bootstrap";
// import { Link, useParams } from "react-router-dom";
// import { products, categories } from "../data/productsData";

// export default function Products() {
//   // /products/category/:categoryName la irundhu category edukkum
//   // /products la irundha categoryName undefined
//   const { categoryName } = useParams();

//   // Category irundha filter, illana ella products
//   const filteredProducts = categoryName
//     ? products.filter((item) => item.category === categoryName)
//     : products;

//   return (
//     <Container className="py-4">
//       <h6 className="mb-3">
//         {categoryName ? categoryName : "All Products"}{" "}
//         <Badge bg="secondary">{filteredProducts.length}</Badge>
//       </h6>

//       {/* Category buttons */}
//       <Nav variant="pills" className="mb-4 gap-2">
//         <Nav.Item>
//           <Nav.Link as={Link} to="/products" active={!categoryName}>
//             All
//           </Nav.Link>
//         </Nav.Item>

//         {categories.map((cat) => (
//           <Nav.Item key={cat}>
//             <Nav.Link
//               as={Link}
//               to={`/products/category/${cat}`}
//               active={categoryName === cat}
//             >
//               {cat}
//             </Nav.Link>
//           </Nav.Item>
//         ))}
//       </Nav>

//       {/* Product list */}
//       <Row>
//         {filteredProducts.length === 0 ? (
//           <p>Products Not Found</p>
//         ) : (
//           filteredProducts.map((item) => (
//             <Col key={item.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
//               <Card className="h-100 shadow-sm">
//                 <Card.Img variant="top" src={item.image} alt={item.name} />
//                 <Card.Body className="d-flex flex-column">
//                   <Badge bg="info" className="align-self-start mb-2">
//                     {item.category}
//                   </Badge>
//                   <Card.Title>{item.name}</Card.Title>
//                   <Card.Text>₹{item.price}</Card.Text>

//                   <Button
//                     as={Link}
//                     to={`/products/${item.id}`}
//                     variant="primary"
//                     className="mt-auto"
//                   >
//                     View Details
//                   </Button>
//                 </Card.Body>
//               </Card>
//             </Col>
//           ))
//         )}
//       </Row>
//     </Container>
//   );
// }

import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Nav,
  Badge,
  Form,
  InputGroup,
} from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { products, categories } from "../data/productsData";
import { useCart } from "../../../context/CartContext";

export default function Products() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, addToCart, removeFromCart } = useCart();

  // 1. URL la irundhu query string-ah eduthu parse pannrom
  const queryParams = new URLSearchParams(location.search);

  // 2. Values edukkrom. Param illana .get() null tharum
  const category = queryParams.get("category"); // "Mobiles" or null
  const search = queryParams.get("search") || ""; // "phone" or ""

  // 3. Helper: oru param maathumbodhu mathadhu apdiye irukkanum
  //    e.g. category maathumbodhu search value pogakoodadhu
  const buildQuery = (key, value) => {
    const params = new URLSearchParams(location.search);
    if (value) {
      params.set(key, value); // add or update
    } else {
      params.delete(key); // remove
    }
    const query = params.toString();
    return query ? `?${query}` : "";
  };

  // 4. Filter: category + search rendum apply
  const filteredProducts = products.filter((item) => {
    const matchCategory = category ? item.category === category : true;
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  // 5. Search type pannumbodhu URL update
  const handleSearch = (e) => {
    navigate(
      {
        pathname: "/products",
        search: buildQuery("search", e.target.value),
      },
      { replace: true }, // back button la ovvoru letter-um history-la serkaadhu
    );
  };
  const customstyle = {
    width: "25%",
    height: "32px",
  };

  const getCartQuantity = (productId) =>
    cart.find((cartItem) => cartItem.id === productId)?.quantity ?? 0;

  return (
    <Container className="py-4">
      <h2 className="mb-3">
        {category ? category : "All Products"}{" "}
        <Badge bg="secondary">{filteredProducts.length}</Badge>
      </h2>

      <div className="d-flex justify-content-between">
        {/* Category buttons */}
        <Nav variant="pills" className="mb-4 gap-2">
          <Nav.Item>
            <Nav.Link
              as={Link}
              to={`/products${buildQuery("category", "")}`}
              active={!category}
            >
              All
            </Nav.Link>
          </Nav.Item>

          {categories.map((cat) => (
            <Nav.Item key={cat}>
              <Nav.Link
                as={Link}
                to={`/products${buildQuery("category", cat)}`}
                active={category === cat}
              >
                {cat}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
        {/* Search box */}
        <Form.Control
          type="text"
          placeholder="Search products..."
          className="mb-3"
          value={search}
          onChange={handleSearch}
          style={customstyle}
        />
      </div>
      {/* Product list */}
      <Row>
        {filteredProducts.length === 0 ? (
          <p>Products Not Found</p>
        ) : (
          filteredProducts.map((item) => {
            const quantity = getCartQuantity(item.id);

            return (
              <Col key={item.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                <Card className="h-100 shadow-sm">
                  <Card.Img variant="top" src={item.image} alt={item.name} />
                  <Card.Body className="d-flex flex-column">
                    <Badge bg="info" className="align-self-start mb-2">
                      {item.category}
                    </Badge>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>₹{item.price}</Card.Text>
                    <InputGroup className="mb-2">
                      <Button
                        variant="outline-secondary"
                        aria-label={`Decrease ${item.name} quantity`}
                        onClick={() => removeFromCart(item.id)}
                        disabled={quantity === 0}
                      >
                        −
                      </Button>
                      <Form.Control
                        type="number"
                        aria-label={`${item.name} quantity`}
                        min="0"
                        max="5"
                        value={quantity}
                        readOnly
                      />
                      <Button
                        variant="outline-secondary"
                        aria-label={`Increase ${item.name} quantity`}
                        onClick={() => addToCart(item)}
                        disabled={quantity === 5}
                      >
                        +
                      </Button>
                    </InputGroup>
                    <Button
                      as={Link}
                      to={`/products/${item.id}`}
                      variant="dark"
                      className="mt-auto"
                    >
                      View Details
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })
        )}
      </Row>
    </Container>
  );
}
