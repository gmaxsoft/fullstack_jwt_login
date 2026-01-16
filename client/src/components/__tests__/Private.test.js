import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Private from '../Private';
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

describe('Private Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render private component', () => {
    PostService.getAllPrivatePosts.mockResolvedValue({
      data: [],
    });

    render(<Private />);
    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
  });

  it('should fetch and display private posts', async () => {
    const mockPosts = [
      { title: 'Private Post 1', content: 'Private Content 1' },
      { title: 'Private Post 2', content: 'Private Content 2' },
    ];

    PostService.getAllPrivatePosts.mockResolvedValue({
      data: mockPosts,
    });

    render(<Private />);

    await waitFor(() => {
      expect(PostService.getAllPrivatePosts).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(screen.getByText('Private Content 1')).toBeInTheDocument();
      expect(screen.getByText('Private Content 2')).toBeInTheDocument();
    });
  });

  it('should handle error when fetching private posts', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    const mockError = {
      response: { status: 403, data: { message: 'Unauthorized' } },
    };
    PostService.getAllPrivatePosts.mockRejectedValue(mockError);

    render(<Private />);

    await waitFor(() => {
      expect(PostService.getAllPrivatePosts).toHaveBeenCalled();
    });

    consoleSpy.mockRestore();
  });

  it('should render empty state when no posts', async () => {
    PostService.getAllPrivatePosts.mockResolvedValue({
      data: [],
    });

    render(<Private />);

    await waitFor(() => {
      expect(PostService.getAllPrivatePosts).toHaveBeenCalled();
    });
  });
});
