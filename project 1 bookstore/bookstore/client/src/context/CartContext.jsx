import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // ⭐ Add item to cart
  const addToCart = (book) => {
    setCart(prev => {
      const existing = prev.find(item => item._id === book._id);
      if (existing) {
        return prev.map(item =>
          item._id === book._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...book, quantity: 1 }];
    });
  };

  // ⭐ Remove item
  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item._id !== id));
  };

  // ⭐ Update quantity
  const updateQty = (id, qty) => {
    setCart(prev =>
      prev.map(item =>
        item._id === id ? { ...item, quantity: qty } : item
      )
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
