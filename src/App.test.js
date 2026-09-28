import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  test('renders header, Exercise 1, and Exercise 2 & 3', () => {
    render(<App />);

    expect(screen.getByRole('heading', { level: 1, name: /Exercise 14: useContext/i })).toBeInTheDocument();
    expect(screen.getByText(/Theme Switcher using useContext/i)).toBeInTheDocument();
    expect(screen.getByText(/Restaurant Dishes & Real-Time Cart using useContext/i)).toBeInTheDocument();
  });
});