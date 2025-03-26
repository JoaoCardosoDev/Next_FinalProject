import { render, screen } from "@testing-library/react";
import { NavMenu } from "../NavMenu";

// Mock the NavigationMenu components before using them
jest.mock("@/components/ui/navigation-menu", () => ({
  NavigationMenu: ({ children }: { children: React.ReactNode }) => (
    <nav>{children}</nav>
  ),
  NavigationMenuList: ({ children }: { children: React.ReactNode }) => (
    <ul>{children}</ul>
  ),
  NavigationMenuItem: ({ children }: { children: React.ReactNode }) => (
    <li>{children}</li>
  ),
  NavigationMenuLink: ({ children }: { children: React.ReactNode }) => (
    <a>{children}</a>
  ),
  navigationMenuTriggerStyle: () => "mock-style",
}));

// Simple mock for next/link
jest.mock(
  "next/link",
  () =>
    function Link({ children }: { children: React.ReactNode }) {
      return <>{children}</>;
    },
);

describe("NavMenu Component", () => {
  it("includes the logo", () => {
    render(<NavMenu />);
    expect(screen.getByAltText("Water Drop Logo")).toBeInTheDocument();
  });
});
