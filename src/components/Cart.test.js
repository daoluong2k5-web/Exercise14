import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CartProvider } from '../context/CartContext';
import DishesList from './DishesList';
import Cart from './Cart';

function CartTestWrapper() {
  return (
    <CartProvider>
      <DishesList />
      <Cart />
    </CartProvider>
  );
}

describe('Exercise 2 & 3: Shopping Cart and Real-time Updates', () => {
  test('initially shows empty cart message', () => {
    render(<CartTestWrapper />);
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });

  test('adds dishes to cart and calculates real-time count and total value', () => {
    render(<CartTestWrapper />);

    const addUthappizzaBtn = screen.getByTitle(/add uthappizza to cart/i);
    fireEvent.click(addUthappizzaBtn);

    expect(screen.queryByText(/your cart is empty/i)).not.toBeInTheDocument();
    expect(screen.getByText('1 item')).toBeInTheDocument();
    expect(screen.getAllByText('$4.99').length).toBeGreaterThan(0);

    const addVadonutBtn = screen.getByTitle(/add vadonut to cart/i);
    fireEvent.click(addVadonutBtn);

    expect(screen.getByText('2 items')).toBeInTheDocument();
    expect(screen.getByText('$6.98')).toBeInTheDocument();

    fireEvent.click(addUthappizzaBtn);
    expect(screen.getByText('3 items')).toBeInTheDocument();
    expect(screen.getByText('$11.97')).toBeInTheDocument();
  });

  test('increments, decrements and clears cart properly', () => {
    render(<CartTestWrapper />);

    const addBtn = screen.getByTitle(/add zucchipakoda to cart/i);
    fireEvent.click(addBtn);
    expect(screen.getByText('1 item')).toBeInTheDocument();

    const incBtn = screen.getByTitle(/increase quantity/i);
    fireEvent.click(incBtn);
    expect(screen.getByText('2 items')).toBeInTheDocument();
    expect(screen.getAllByText('$3.98').length).toBeGreaterThan(0);

    const decBtn = screen.getByTitle(/decrease quantity/i);
    fireEvent.click(decBtn);
    expect(screen.getByText('1 item')).toBeInTheDocument();
    expect(screen.getAllByText('$1.99').length).toBeGreaterThan(0);

    const clearBtn = screen.getByTitle(/empty entire cart/i);
    fireEvent.click(clearBtn);
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });
});