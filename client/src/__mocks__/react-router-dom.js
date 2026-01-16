// Mock for react-router-dom
const React = require('react');

module.exports = {
  useNavigate: () => jest.fn(),
  BrowserRouter: ({ children }) => children,
  MemoryRouter: ({ children }) => children,
  Routes: ({ children }) => children,
  Route: ({ element }) => element,
  Link: ({ to, children, ...props }) => React.createElement('a', { href: to, ...props }, children),
};
