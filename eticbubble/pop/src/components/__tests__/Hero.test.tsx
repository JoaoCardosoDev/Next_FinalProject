import { render, screen } from '@testing-library/react';
import Hero from '../Hero';
import { useSession } from 'next-auth/react';

// Add the missing mock for next-auth/react
jest.mock('next-auth/react', () => ({
  useSession: jest.fn()
}));

describe('Hero Component', () => {
  beforeEach(() => {
    // Clear mock before each test
    (useSession as jest.Mock).mockClear();
  });

  it('renders the main heading', () => {
    (useSession as jest.Mock).mockReturnValue({
      data: null,
      status: 'unauthenticated'
    });

    render(<Hero />);
    expect(screen.getByRole('heading', { 
      name: /Where Fleeting Thoughts Find Their Voice/i 
    })).toBeInTheDocument();
  });

  it('shows start sharing button when not logged in', () => {
    (useSession as jest.Mock).mockReturnValue({
      data: null,
      status: 'unauthenticated'
    });

    render(<Hero />);
    expect(screen.getByRole('button', { 
      name: /Start Sharing Thoughts/i 
    })).toBeInTheDocument();
  });

  it('hides start sharing button when logged in', () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { name: 'Test User' } },
      status: 'authenticated'
    });

    render(<Hero />);
    expect(screen.queryByRole('button', { 
      name: /Start Sharing Thoughts/i 
    })).not.toBeInTheDocument();
  });
}); 