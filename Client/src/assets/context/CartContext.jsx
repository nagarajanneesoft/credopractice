import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product, quantity = 1) => {
    if (!Number.isInteger(quantity) || quantity <= 0) {
      throw new RangeError("Quantity must be a positive integer");
    }

    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === product.id);

      if (!existingItem) {
        return [...currentCart, { ...product, quantity }];
      }

      return currentCart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item,
      );
    });
  };

  const removeFromCart = (productId, quantity = 1) => {
    if (!Number.isInteger(quantity) || quantity <= 0) {
      throw new RangeError("Quantity must be a positive integer");
    }

    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - quantity }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
