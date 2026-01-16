import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Home from '../Home';
import PostService from '../../services/post.service';

jest.mock('../../services/post.service');
jest.mock('../../services/api', () => ({
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

describe('Home Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render home component', () => {
    PostService.getAllPublicPosts.mockResolvedValue({
      data: [],
    });

    render(<Home />);
    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
  });

  it('should fetch and display public posts', async () => {
    const mockPosts = [
      { title: 'Post 1', content: 'Content 1' },
      { title: 'Post 2', content: 'Content 2' },
    ];

    PostService.getAllPublicPosts.mockResolvedValue({
      data: mockPosts,
    });

    render(<Home />);

    await waitFor(() => {
      expect(PostService.getAllPublicPosts).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(screen.getByText('Content 1')).toBeInTheDocument();
      expect(screen.getByText('Content 2')).toBeInTheDocument();
    });
  });

  it('should handle error when fetching posts', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    PostService.getAllPublicPosts.mockRejectedValue(new Error('Failed to fetch'));

    render(<Home />);

    await waitFor(() => {
      expect(PostService.getAllPublicPosts).toHaveBeenCalled();
    });

    consoleSpy.mockRestore();
  });

  it('should render empty state when no posts', async () => {
    PostService.getAllPublicPosts.mockResolvedValue({
      data: [],
    });

    render(<Home />);

    await waitFor(() => {
      expect(PostService.getAllPublicPosts).toHaveBeenCalled();
    });
  });
});
