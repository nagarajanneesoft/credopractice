// import { createContext, useContext, useState } from "react";

// const CartContext = createContext();

// export function CartProvider({ children }) {
//   const [cart, setCart] = useState([]);

//   const addToCart = (product, quantity = 1) => {
//     if (!Number.isInteger(quantity) || quantity <= 0) {
//       throw new RangeError("Quantity must be a positive integer");
//     }

//     setCart((currentCart) => {
//       const existingItem = currentCart.find((item) => item.id === product.id);

//       if (!existingItem) {
//         return [...currentCart, { ...product, quantity }];
//       }

//       return currentCart.map((item) =>
//         item.id === product.id
//           ? { ...item, quantity: item.quantity + quantity }
//           : item,
//       );
//     });
//   };

//   const removeFromCart = (productId, quantity = 1) => {
//     if (!Number.isInteger(quantity) || quantity <= 0) {
//       throw new RangeError("Quantity must be a positive integer");
//     }

//     setCart((currentCart) =>
//       currentCart
//         .map((item) =>
//           item.id === productId
//             ? { ...item, quantity: item.quantity - quantity }
//             : item,
//         )
//         .filter((item) => item.quantity > 0),
//     );
//   };

//   return (
//     <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// }

// export const useCart = () => useContext(CartContext);

import { createContext, useContext, useState } from "react";

const CartContext = createContext();

// Shipping rules - inga mattum maathunaa podhum
export const FREE_SHIPPING_LIMIT = 5000;
export const SHIPPING_CHARGE = 50;

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

  // Product-a full-a remove panna (quantity evlo irundhaalum)
  const deleteFromCart = (productId) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== productId),
    );
  };

  // Payment success aanadhum cart empty pannrom
  const clearCart = () => setCart([]);

  // Derived values - state-la store panna vendaam, cart la irundhu calculate pannrom
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  // Cart empty-a irundha 0, ₹5000+ na FREE, illana ₹50
  const deliveryCharge =
    cartTotal === 0 || cartTotal >= FREE_SHIPPING_LIMIT ? 0 : SHIPPING_CHARGE;

  const grandTotal = cartTotal + deliveryCharge;

  // Free shipping-ku innum evlo venum
  const amountForFreeShipping =
    cartTotal > 0 && cartTotal < FREE_SHIPPING_LIMIT
      ? FREE_SHIPPING_LIMIT - cartTotal
      : 0;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        deleteFromCart,
        clearCart,
        cartCount,
        cartTotal,
        deliveryCharge,
        grandTotal,
        amountForFreeShipping,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
