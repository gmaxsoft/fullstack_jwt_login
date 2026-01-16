import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../Login';
import AuthService from '../../services/auth.service';

jest.mock('../../services/auth.service');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Login Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.location.reload = jest.fn();
  });

  it('should render login form', () => {
    renderWithRouter(<Login />);
    
    expect(screen.getByText('Log in')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Your E-mail')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Your password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
  });

  it('should update email input value', () => {
    renderWithRouter(<Login />);
    
    const emailInput = screen.getByPlaceholderText('Your E-mail');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    
    expect(emailInput.value).toBe('test@example.com');
  });

  it('should update password input value', () => {
    renderWithRouter(<Login />);
    
    const passwordInput = screen.getByPlaceholderText('Your password');
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    expect(passwordInput.value).toBe('password123');
  });

  it('should call AuthService.login on form submit', async () => {
    const mockNavigate = jest.fn();
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(mockNavigate);
    
    AuthService.login.mockResolvedValue({
      accessToken: 'test-token',
      email: 'test@example.com',
    });

    renderWithRouter(<Login />);
    
    const emailInput = screen.getByPlaceholderText('Your E-mail');
    const passwordInput = screen.getByPlaceholderText('Your password');
    const submitButton = screen.getByRole('button', { name: /log in/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(AuthService.login).toHaveBeenCalledWith('test@example.com', 'password123');
    });
  });

  it('should handle login error', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    AuthService.login.mockRejectedValue(new Error('Login failed'));

    renderWithRouter(<Login />);
    
    const emailInput = screen.getByPlaceholderText('Your E-mail');
    const passwordInput = screen.getByPlaceholderText('Your password');
    const submitButton = screen.getByRole('button', { name: /log in/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(AuthService.login).toHaveBeenCalled();
    });

    consoleSpy.mockRestore();
  });
});
