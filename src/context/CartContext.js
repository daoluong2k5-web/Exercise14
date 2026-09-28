import React, { createContext, useContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Add item or increment quantity
  const addToCart = (dish) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((item) => item.id === dish.id);
      if (existingItemIndex > -1) {
        const updated = [...prevItems];
        updated[existingItemIndex] = {
          ...updated[existingItemIndex],
          quantity: updated[existingItemIndex].quantity + 1
        };
        return updated;
      } else {
        return [...prevItems, { ...dish, quantity: 1 }];
      }
    });
  };

  // Decrement quantity or remove if quantity reaches 0
  const removeFromCart = (dishId) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === dishId);
      if (!existingItem) return prevItems;
      if (existingItem.quantity > 1) {
        return prevItems.map((item) =>
          item.id === dishId ? { ...item, quantity: item.quantity - 1 } : item
        );
      } else {
        return prevItems.filter((item) => item.id !== dishId);
      }
    });
  };

  // Remove completely from cart
  const removeItemCompletely = (dishId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== dishId));
  };

  // Clear cart completely
  const clearCart = () => {
    setCartItems([]);
  };

  // Real-time calculation of total count and total price
  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalValue = parseFloat(
    cartItems
      .reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0)
      .toFixed(2)
  );

  const value = {
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    removeItemCompletely,
    clearCart,
    totalCount,
    totalValue
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;
