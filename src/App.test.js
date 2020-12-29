import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Search Github Repositories/i);
  expect(linkElement).toBeInTheDocument();
});

test('render search input field and add sample values', () => {
  const { container } = render(<App />);
  const input = container.querySelector(`[aria-label="search"]`);
  fireEvent.change(input, { target: { value: 'react' } })
  expect(input.value).toBe('react')
  fireEvent.change(input, { target: { value: '' } })
  expect(input.value).toBe('')
})
