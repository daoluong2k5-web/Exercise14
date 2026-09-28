import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '../context/ThemeContext';
import Theme from './Theme';

describe('Exercise 1: Theme Component and useContext', () => {
  test('renders Toggle Theme button with initial light theme styles', () => {
    render(
      <ThemeProvider>
        <Theme />
      </ThemeProvider>
    );

    const toggleBtn = screen.getByRole('button', { name: /toggle theme/i });
    expect(toggleBtn).toBeInTheDocument();
    expect(toggleBtn).toHaveStyle({ backgroundColor: '#eeeeee', color: '#000000' });
    expect(screen.getByText('LIGHT')).toBeInTheDocument();
  });

  test('toggles to dark theme on button click and updates styles dynamically', () => {
    render(
      <ThemeProvider>
        <Theme />
      </ThemeProvider>
    );

    const toggleBtn = screen.getByRole('button', { name: /toggle theme/i });
    fireEvent.click(toggleBtn);

    expect(toggleBtn).toHaveStyle({ backgroundColor: '#61dafb', color: '#ffffff' });
    expect(screen.getByText('DARK')).toBeInTheDocument();

    fireEvent.click(toggleBtn);
    expect(toggleBtn).toHaveStyle({ backgroundColor: '#eeeeee', color: '#000000' });
    expect(screen.getByText('LIGHT')).toBeInTheDocument();
  });
});