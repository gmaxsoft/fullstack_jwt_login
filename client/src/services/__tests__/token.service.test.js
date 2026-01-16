import TokenService from '../token.service';

describe('TokenService', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  describe('getLocalAccessToken', () => {
    it('should return access token from localStorage', () => {
      const mockUser = {
        accessToken: 'test-access-token',
        refreshToken: 'test-refresh-token',
      };
      localStorage.setItem('user', JSON.stringify(mockUser));

      const token = TokenService.getLocalAccessToken();
      expect(token).toBe('test-access-token');
    });

    it('should return undefined if user does not exist', () => {
      const token = TokenService.getLocalAccessToken();
      expect(token).toBeUndefined();
    });

    it('should return undefined if accessToken does not exist', () => {
      const mockUser = { refreshToken: 'test-refresh-token' };
      localStorage.setItem('user', JSON.stringify(mockUser));

      const token = TokenService.getLocalAccessToken();
      expect(token).toBeUndefined();
    });
  });

  describe('getLocalRefreshToken', () => {
    it('should return refresh token from localStorage', () => {
      const mockUser = {
        accessToken: 'test-access-token',
        refreshToken: 'test-refresh-token',
      };
      localStorage.setItem('user', JSON.stringify(mockUser));

      const token = TokenService.getLocalRefreshToken();
      expect(token).toBe('test-refresh-token');
    });

    it('should return undefined if user does not exist', () => {
      const token = TokenService.getLocalRefreshToken();
      expect(token).toBeUndefined();
    });
  });

  describe('setUser', () => {
    it('should save user to localStorage', () => {
      const mockUser = {
        accessToken: 'test-access-token',
        refreshToken: 'test-refresh-token',
        email: 'test@example.com',
      };

      TokenService.setUser(mockUser);

      expect(localStorage.setItem).toHaveBeenCalledWith(
        'user',
        JSON.stringify(mockUser)
      );
    });
  });

  describe('getUser', () => {
    it('should return user from localStorage', () => {
      const mockUser = {
        accessToken: 'test-access-token',
        refreshToken: 'test-refresh-token',
        email: 'test@example.com',
      };
      localStorage.setItem('user', JSON.stringify(mockUser));

      const user = TokenService.getUser();
      expect(user).toEqual(mockUser);
    });

    it('should return null if user does not exist', () => {
      const user = TokenService.getUser();
      expect(user).toBeNull();
    });
  });

  describe('updateNewAccessToken', () => {
    it('should update access token in localStorage', () => {
      const mockUser = {
        accessToken: 'old-access-token',
        refreshToken: 'test-refresh-token',
        email: 'test@example.com',
      };
      localStorage.setItem('user', JSON.stringify(mockUser));

      TokenService.updateNewAccessToken('new-access-token');

      const updatedUser = JSON.parse(localStorage.getItem('user'));
      expect(updatedUser.accessToken).toBe('new-access-token');
      expect(updatedUser.refreshToken).toBe('test-refresh-token');
    });
  });

  describe('removeUser', () => {
    it('should remove user from localStorage', () => {
      const mockUser = { accessToken: 'test-access-token' };
      localStorage.setItem('user', JSON.stringify(mockUser));

      TokenService.removeUser();

      expect(localStorage.removeItem).toHaveBeenCalledWith('user');
    });
  });
});
