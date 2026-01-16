import AuthService from '../auth.service';
import api from '../api';
import TokenService from '../token.service';

jest.mock('../api', () => ({
  __esModule: true,
  default: {
    get: jest.fn(() => Promise.resolve({ data: {} })),
    post: jest.fn(() => Promise.resolve({ data: {} })),
    interceptors: {
      request: { use: jest.fn() },
      response: { use: jest.fn() },
    },
  },
}));
jest.mock('../token.service');

describe('AuthService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('signup', () => {
    it('should sign up user and save token', async () => {
      const mockResponse = {
        data: {
          accessToken: 'test-access-token',
          refreshToken: 'test-refresh-token',
          email: 'test@example.com',
        },
      };

      api.post.mockResolvedValue(mockResponse);

      const result = await AuthService.signup('test@example.com', 'password123');

      expect(api.post).toHaveBeenCalledWith('/auth/signup', {
        email: 'test@example.com',
        password: 'password123',
      });
      expect(TokenService.setUser).toHaveBeenCalledWith(mockResponse.data);
      expect(result).toEqual(mockResponse.data);
    });

    it('should not save token if accessToken is missing', async () => {
      const mockResponse = {
        data: {
          email: 'test@example.com',
        },
      };

      api.post.mockResolvedValue(mockResponse);

      const result = await AuthService.signup('test@example.com', 'password123');

      expect(TokenService.setUser).not.toHaveBeenCalled();
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('login', () => {
    it('should login user and save token', async () => {
      const mockResponse = {
        data: {
          accessToken: 'test-access-token',
          refreshToken: 'test-refresh-token',
          email: 'test@example.com',
        },
      };

      api.post.mockResolvedValue(mockResponse);

      const result = await AuthService.login('test@example.com', 'password123');

      expect(api.post).toHaveBeenCalledWith('/auth/login', {
        email: 'test@example.com',
        password: 'password123',
      });
      expect(TokenService.setUser).toHaveBeenCalledWith(mockResponse.data);
      expect(result).toEqual(mockResponse.data);
    });

    it('should not save token if accessToken is missing', async () => {
      const mockResponse = {
        data: {
          email: 'test@example.com',
        },
      };

      api.post.mockResolvedValue(mockResponse);

      const result = await AuthService.login('test@example.com', 'password123');

      expect(TokenService.setUser).not.toHaveBeenCalled();
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('logout', () => {
    it('should remove user from localStorage', () => {
      AuthService.logout();
      expect(TokenService.removeUser).toHaveBeenCalled();
    });
  });

  describe('getCurrentUser', () => {
    it('should return current user from localStorage', () => {
      const mockUser = {
        accessToken: 'test-access-token',
        email: 'test@example.com',
      };
      localStorage.setItem('user', JSON.stringify(mockUser));

      const user = AuthService.getCurrentUser();
      expect(user).toEqual(mockUser);
    });

    it('should return null if no user is logged in', () => {
      localStorage.removeItem('user');

      const user = AuthService.getCurrentUser();
      expect(user).toBeNull();
    });
  });
});
