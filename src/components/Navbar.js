import React from 'react';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import './Navbar.css';

const Navbar = ({ activeTab, setActiveTab }) => {
  const { totalCount, totalValue } = useCart();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="app-navbar">
      <div className="navbar-top">
        <div className="brand-group">
          <img
            src="images/fpt_logo.jpg"
            alt="FPT University"
            className="fpt-logo-img"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <div className="brand-text">
            <span className="brand-badge">FER202 • React Hook</span>
            <h1 className="brand-title">Exercise 14: useContext</h1>
          </div>
        </div>

        <div className="navbar-quick-status">
          <button
            className={`quick-theme-pill ${theme}`}
            onClick={toggleTheme}
            title="Click to toggle theme"
          >
            <span className="theme-icon">{theme === 'light' ? '☀️' : '🌙'}</span>
            <span className="theme-text">{theme.toUpperCase()}</span>
          </button>

          <div
            className="navbar-cart-pill"
            onClick={() => setActiveTab('cart')}
            title="View Cart"
          >
            <span className="nav-cart-icon">🛒</span>
            <span className="nav-cart-count">{totalCount} items</span>
            <span className="nav-cart-divider">|</span>
            <span className="nav-cart-total">${totalValue.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <nav className="navbar-tabs">
        <button
          className={`nav-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          📋 All Exercises
        </button>
        <button
          className={`nav-tab-btn ${activeTab === 'theme' ? 'active' : ''}`}
          onClick={() => setActiveTab('theme')}
        >
          🎨 Exercise 1: Theme Switcher
        </button>
        <button
          className={`nav-tab-btn ${activeTab === 'dishes' ? 'active' : ''}`}
          onClick={() => setActiveTab('dishes')}
        >
          🍲 Exercise 2 & 3: Restaurant Menu
        </button>
        <button
          className={`nav-tab-btn ${activeTab === 'cart' ? 'active' : ''}`}
          onClick={() => setActiveTab('cart')}
        >
          🛒 Cart View ({totalCount})
        </button>
      </nav>
    </header>
  );
};

export default Navbar;