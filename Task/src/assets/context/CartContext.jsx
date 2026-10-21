import { createContext, useContext, useState } from "react";

// 1) பலகை
const CartContext = createContext();

// 2) Provider
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]); // முதல்ல cart காலி

  // பழைய cart + புது product
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  // index-ல உள்ள ஒரு item-ஐ மட்டும் நீக்கு
  const removeFromCart = (index) => {
    setCart(cart.filter((item, i) => i !== index));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

// 3) படிக்க
export const useCart = () => useContext(CartContext);
