import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders text in header', () => {
  render(<App />);
  const headerText = screen.getByText(/t-l-d-o/i);

  expect(headerText).toBeInTheDocument();
});

test('renders text in about', () => {
  render(<App />);
  const aboutText = screen.getByText(/about/i);

  expect(aboutText).toBeInTheDocument();
});

test('renders text in stack', () => {
  render(<App />);
  const stackText = screen.getByText(/stack/i);

  expect(stackText).toBeInTheDocument();
});

test('renders text in projects', () => {
  render(<App />);
  const projectsText = screen.getByText(/projects/i);

  expect(projectsText).toBeInTheDocument();
});

test('renders text in contact', () => {
  render(<App />);
  const contactText = screen.getByText(/contact/i);

  expect(contactText).toBeInTheDocument();
});

test('renders text in footer', () => {
  render(<App />);
  const footerText = screen.getByText(/copyright/i);

  expect(footerText).toBeInTheDocument();
});
