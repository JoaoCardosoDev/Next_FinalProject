import { render, screen } from '@testing-library/react';
import { Logo } from '../Logo';

describe('Logo Component', () => {
  it('renders the water drop logo', () => {
    render(<Logo />);
    const logoImage = screen.getByAltText('Water Drop Logo');
    expect(logoImage).toBeInTheDocument();
  });

  it('has correct dimensions', () => {
    render(<Logo />);
    const container = screen.getByTestId('logo-container');
    expect(container).toHaveClass('h-8 w-10');
  });

  it('has the correct background color', () => {
    render(<Logo />);
    const container = screen.getByTestId('logo-container');
    expect(container).toHaveClass('bg-sector');
  });
}); 