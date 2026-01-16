import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Signup from '../Signup';
import AuthService from '../../services/auth.service';

jest.mock('../../services/auth.service');

const renderWithRouter = (component) => {
  return render(component);
};

describe('Signup Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.location.reload = jest.fn();
  });

  it('should render signup form', () => {
    renderWithRouter(<Signup />);
    
    expect(screen.getByRole('heading', { name: /sign up/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
  });

  it('should update email input value', () => {
    renderWithRouter(<Signup />);
    
    const emailInput = screen.getByPlaceholderText('email');
    fireEvent.change(emailInput, { target: { value: 'newuser@example.com' } });
    
    expect(emailInput.value).toBe('newuser@example.com');
  });

  it('should update password input value', () => {
    renderWithRouter(<Signup />);
    
    const passwordInput = screen.getByPlaceholderText('password');
    fireEvent.change(passwordInput, { target: { value: 'newpassword123' } });
    
    expect(passwordInput.value).toBe('newpassword123');
  });

  it('should call AuthService.signup on form submit', async () => {
    AuthService.signup.mockResolvedValue({
      accessToken: 'test-token',
      email: 'newuser@example.com',
    });

    renderWithRouter(<Signup />);
    
    const emailInput = screen.getByPlaceholderText('email');
    const passwordInput = screen.getByPlaceholderText('password');
    const submitButton = screen.getByRole('button', { name: /sign up/i });

    fireEvent.change(emailInput, { target: { value: 'newuser@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'newpassword123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(AuthService.signup).toHaveBeenCalledWith('newuser@example.com', 'newpassword123');
    });
  });

  it('should handle signup error', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    AuthService.signup.mockRejectedValue(new Error('Signup failed'));

    renderWithRouter(<Signup />);
    
    const emailInput = screen.getByPlaceholderText('email');
    const passwordInput = screen.getByPlaceholderText('password');
    const submitButton = screen.getByRole('button', { name: /sign up/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(AuthService.signup).toHaveBeenCalled();
    });

    consoleSpy.mockRestore();
  });
});
