import React from 'react';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    removeItemCompletely,
    clearCart,
    totalCount,
    totalValue
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="cart-card empty-cart-card">
        <div className="empty-cart-content">
          <span className="empty-cart-icon">🛒</span>
          <h3>Your Cart is Empty</h3>
          <p>No dishes have been added yet. Choose something tasty from the menu!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-card">
      <div className="cart-header">
        <div className="cart-title-group">
          <h3>🛒 Shopping Cart</h3>
          <span className="cart-items-count-badge">
            {totalCount} {totalCount === 1 ? 'item' : 'items'}
          </span>
        </div>
        <button
          className="clear-cart-btn"
          onClick={clearCart}
          title="Empty entire cart"
        >
          🗑️ Clear Cart
        </button>
      </div>

      <div className="cart-items-table-wrapper">
        <table className="cart-table">
          <thead>
            <tr>
              <th>Dish</th>
              <th className="text-center">Price</th>
              <th className="text-center">Quantity</th>
              <th className="text-right">Subtotal</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => {
              const itemSubtotal = (parseFloat(item.price) * item.quantity).toFixed(2);
              return (
                <tr key={item.id} className="cart-item-row">
                  <td className="dish-name-cell">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-thumb"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    <div className="dish-cell-info">
                      <span className="dish-name-text">{item.name}</span>
                      <span className="dish-category-text">{item.category}</span>
                    </div>
                  </td>
                  <td className="text-center item-price-cell">
                    ${parseFloat(item.price).toFixed(2)}
                  </td>
                  <td className="text-center quantity-cell">
                    <div className="qty-controls">
                      <button
                        className="qty-btn"
                        onClick={() => removeFromCart(item.id)}
                        title="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="qty-number">{item.quantity}</span>
                      <button
                        className="qty-btn"
                        onClick={() => addToCart(item)}
                        title="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="text-right subtotal-cell">
                    ${itemSubtotal}
                  </td>
                  <td className="text-center action-cell">
                    <button
                      className="remove-btn"
                      onClick={() => removeItemCompletely(item.id)}
                      title={`Remove all ${item.name}`}
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="cart-summary-footer">
        <div className="summary-details">
          <div className="summary-row">
            <span className="summary-label">Total Number of Items:</span>
            <span className="summary-val highlight-count">{totalCount}</span>
          </div>
          <div className="summary-row">
            <span className="summary-label">Total Monetary Value:</span>
            <span className="summary-val highlight-total">${totalValue.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;