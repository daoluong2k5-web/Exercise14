import React from 'react';
import dishes from '../data/dishes';
import { useCart } from '../context/CartContext';
import './DishesList.css';

const DishesList = () => {
  const { addToCart, cartItems } = useCart();

  const getItemQuantity = (dishId) => {
    const item = cartItems.find((i) => i.id === dishId);
    return item ? item.quantity : 0;
  };

  return (
    <div className="dishes-section">
      <div className="section-intro">
        <h3>🍽️ Our Menu</h3>
        <p>Explore delicious chef-curated dishes and add your favorites directly to your cart.</p>
      </div>

      <div className="dishes-grid">
        {dishes.map((dish) => {
          const qty = getItemQuantity(dish.id);
          const badgeClass = dish.label ? `dish-badge badge-${dish.label.toLowerCase()}` : '';
          return (
            <div key={dish.id} className="dish-card">
              <div className="dish-image-wrapper">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="dish-image"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    if (e.target.nextSibling) {
                      e.target.nextSibling.style.display = 'flex';
                    }
                  }}
                />
                <div className="dish-image-fallback" style={{ display: 'none' }}>
                  <span className="fallback-icon">🍲</span>
                  <span className="fallback-title">{dish.name}</span>
                </div>

                <div className="dish-badges">
                  {dish.label && (
                    <span className={badgeClass}>
                      {dish.label}
                    </span>
                  )}
                  <span className="dish-category-badge">{dish.category}</span>
                </div>
              </div>

              <div className="dish-body">
                <div className="dish-header">
                  <h4 className="dish-title">{dish.name}</h4>
                  <span className="dish-price">${parseFloat(dish.price).toFixed(2)}</span>
                </div>

                <p className="dish-description">{dish.description}</p>

                <div className="dish-actions">
                  <button
                    className="add-to-cart-btn"
                    onClick={() => addToCart(dish)}
                    title={`Add ${dish.name} to cart`}
                  >
                    <span className="cart-icon">🛒</span>
                    Add to Cart
                  </button>

                  {qty > 0 && (
                    <span className="item-qty-badge" title="Quantity currently in cart">
                      In Cart: {qty}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DishesList;