import React from 'react';
import { render, screen } from '@testing-library/react';
import AuthService from '../../services/auth.service';

jest.mock('../../services/auth.service');
jest.mock('react-router-dom');

import App from '../../App';

describe('App Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render navigation links', () => {
    AuthService.getCurrentUser.mockReturnValue(null);

    render(<App />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Log in')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  it('should show private link when user is logged in', () => {
    const mockUser = {
      accessToken: 'test-token',
      email: 'test@example.com',
    };
    AuthService.getCurrentUser.mockReturnValue(mockUser);

    render(<App />);

    expect(screen.getByText('Private')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
    expect(screen.queryByText('Log in')).not.toBeInTheDocument();
    expect(screen.queryByText('Register')).not.toBeInTheDocument();
  });

  it('should hide private link when user is not logged in', () => {
    AuthService.getCurrentUser.mockReturnValue(null);

    render(<App />);

    expect(screen.queryByText('Private')).not.toBeInTheDocument();
    expect(screen.queryByText('Logout')).not.toBeInTheDocument();
  });

  it('should call logout when logout link is clicked', () => {
    const mockUser = {
      accessToken: 'test-token',
      email: 'test@example.com',
    };
    AuthService.getCurrentUser.mockReturnValue(mockUser);

    render(<App />);

    const logoutLink = screen.getByText('Logout');
    logoutLink.click();

    expect(AuthService.logout).toHaveBeenCalled();
  });
});
