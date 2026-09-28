import React, { useState } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Theme from './components/Theme';
import DishesList from './components/DishesList';
import Cart from './components/Cart';
import './App.css';

function MainContent() {
  const [activeTab, setActiveTab] = useState('all');
  const { theme } = useTheme();

  return (
    <div className={`app-root theme-${theme}`}>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="main-content-container">
        {/* EXERCISE 1: THEME SWITCHER */}
        {(activeTab === 'all' || activeTab === 'theme') && (
          <section className="exercise-section">
            <div className="exercise-section-header">
              <span className="exercise-badge">Exercise 1</span>
              <h2>Theme Switcher using useContext</h2>
              <p className="exercise-desc">
                Demonstrates <code>createContext</code>, <code>ThemeProvider</code>, and consuming theme state via custom hook <code>useTheme()</code> to toggle between Light mode (<code>#eeeeee</code>) and Dark mode (<code>#61dafb</code>).
              </p>
            </div>

            <div className="exercise-card-content">
              <Theme />
            </div>
          </section>
        )}

        {/* EXERCISE 2 & 3: DISHES LIST & REAL-TIME CART */}
        {(activeTab === 'all' || activeTab === 'dishes' || activeTab === 'cart') && (
          <section className="exercise-section">
            <div className="exercise-section-header">
              <span className="exercise-badge">Exercise 2 & 3</span>
              <h2>Restaurant Dishes & Real-Time Cart using useContext</h2>
              <p className="exercise-desc">
                Demonstrates sharing state and actions across multiple decoupled components (<code>DishesList</code> and <code>Cart</code>) via <code>CartContext</code> and <code>CartProvider</code> with real-time recalculation of total count and monetary value without page refresh.
              </p>
            </div>

            <div className="cart-app-grid">
              {(activeTab === 'all' || activeTab === 'dishes') && (
                <div className={`cart-grid-col ${activeTab === 'all' ? 'col-dishes' : 'col-full'}`}>
                  <DishesList />
                </div>
              )}

              {(activeTab === 'all' || activeTab === 'cart') && (
                <div className={`cart-grid-col ${activeTab === 'all' ? 'col-cart' : 'col-full'}`}>
                  <Cart />
                </div>
              )}
            </div>
          </section>
        )}
      </main>

      <footer className="app-footer">
        <p>
          FER202 Front-End Web Development with React • Exercise 14: useContext Hook
        </p>
        <p className="footer-sub">
          Built with React 19, Context API & Hooks. FPT University.
        </p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <MainContent />
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;