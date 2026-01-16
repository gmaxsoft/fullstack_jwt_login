import PostService from '../post.service';
import api from '../api';

jest.mock('../api');

describe('PostService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllPublicPosts', () => {
    it('should fetch all public posts', async () => {
      const mockResponse = {
        data: [
          { id: 1, title: 'Post 1', content: 'Content 1' },
          { id: 2, title: 'Post 2', content: 'Content 2' },
        ],
      };

      api.get.mockResolvedValue(mockResponse);

      const result = await PostService.getAllPublicPosts();

      expect(api.get).toHaveBeenCalledWith('/posts/public');
      expect(result).toEqual(mockResponse);
    });

    it('should handle errors when fetching public posts', async () => {
      const mockError = new Error('Network error');
      api.get.mockRejectedValue(mockError);

      await expect(PostService.getAllPublicPosts()).rejects.toThrow('Network error');
    });
  });

  describe('getAllPrivatePosts', () => {
    it('should fetch all private posts', async () => {
      const mockResponse = {
        data: [
          { id: 1, title: 'Private Post 1', content: 'Private Content 1' },
          { id: 2, title: 'Private Post 2', content: 'Private Content 2' },
        ],
      };

      api.get.mockResolvedValue(mockResponse);

      const result = await PostService.getAllPrivatePosts();

      expect(api.get).toHaveBeenCalledWith('/posts/private');
      expect(result).toEqual(mockResponse);
    });

    it('should handle errors when fetching private posts', async () => {
      const mockError = new Error('Unauthorized');
      api.get.mockRejectedValue(mockError);

      await expect(PostService.getAllPrivatePosts()).rejects.toThrow('Unauthorized');
    });
  });
});
