import { render, screen, fireEvent } from "@testing-library/react";
import { UserMenu } from "../UserMenu";

// First declare the mock function
const mockSignOut = jest.fn(() => Promise.resolve());

// Then use it in the mock
jest.mock("next-auth/react", () => ({
  __esModule: true,
  signIn: jest.fn(),
  signOut: () => mockSignOut(), // Return a function that calls mockSignOut
  default: jest.fn(),
}));

// Add after the next-auth mock
jest.mock("@/components/ui/dropdown-menu", () => ({
  DropdownMenu: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  DropdownMenuTrigger: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  DropdownMenuContent: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  DropdownMenuItem: ({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
  }) => <div onClick={onClick}>{children}</div>,
  DropdownMenuLabel: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  DropdownMenuSeparator: () => <hr />,
}));

jest.mock("@/components/ui/button", () => ({
  Button: ({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
  }) => <button onClick={onClick}>{children}</button>,
}));

jest.mock("@/components/ui/avatar", () => ({
  Avatar: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  AvatarImage: () => null,
  AvatarFallback: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

describe("UserMenu Component", () => {
  beforeEach(() => {
    // Clear mock calls before each test
    mockSignOut.mockClear();
  });

  it("shows login options when not logged in", () => {
    render(<UserMenu session={null} />);
    expect(
      screen.getByText(/Welcome, you can login with/i),
    ).toBeInTheDocument();
    expect(screen.getByText("Discord")).toBeInTheDocument();
    expect(screen.getByText("Google")).toBeInTheDocument();
    expect(screen.getByText("GitHub")).toBeInTheDocument();
  });

  it("shows user menu when logged in", () => {
    const mockSession = {
      user: {
        name: "Test User",
        email: "test@example.com",
        image: null,
      },
      expires: "1",
    };

    render(<UserMenu session={mockSession} />);
    expect(screen.getByText("Test User")).toBeInTheDocument();
  });

  it("shows user information in dropdown", () => {
    const mockSession = {
      user: {
        name: "Test User",
        email: "test@example.com",
        image: null,
      },
      expires: "1",
    };

    render(<UserMenu session={mockSession} />);
    expect(screen.getByText("Test User")).toBeInTheDocument();
    expect(screen.getByText("test@example.com")).toBeInTheDocument();
  });

  it("handles sign out", async () => {
    const mockSession = {
      user: {
        name: "Test User",
        email: "test@example.com",
        image: null,
      },
      expires: "1",
    };

    render(<UserMenu session={mockSession} />);
    const logoutButton = screen.getByText(/log out/i);
    await fireEvent.click(logoutButton);
    expect(mockSignOut).toHaveBeenCalled();
  });
});
