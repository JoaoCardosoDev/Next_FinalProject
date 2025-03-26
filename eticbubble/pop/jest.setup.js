import '@testing-library/jest-dom'
import React from 'react'

// Create mock component helper
const createMockComponent = (name) => {
  const Component = ({ children, asChild, sideOffset, forceMount, ...props }) => {
    // Filter out Radix UI specific props
    const validProps = Object.entries(props).reduce((acc, [key, value]) => {
      if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
        acc[key] = value
      }
      return acc
    }, {})
    
    return <div {...validProps}>{children}</div>
  }
  Component.displayName = name
  return Component
}

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => <img {...props} />
}))

// Mock next-auth/react
jest.mock('next-auth/react', () => ({
  __esModule: true,
  signIn: jest.fn(),
  signOut: jest.fn()
}))

// Mock next/link
jest.mock('next/link', () => createMockComponent('Link'))

// Mock Avatar components
jest.mock('@/components/ui/avatar', () => ({
  Avatar: createMockComponent('Avatar'),
  AvatarImage: createMockComponent('AvatarImage'),
  AvatarFallback: createMockComponent('AvatarFallback')
}))

// Mock Radix UI dropdown menu
jest.mock('@radix-ui/react-dropdown-menu', () => ({
  Root: createMockComponent('DropdownMenu'),
  Trigger: createMockComponent('DropdownMenuTrigger'),
  Content: createMockComponent('DropdownMenuContent'),
  Item: createMockComponent('DropdownMenuItem'),
  Label: createMockComponent('DropdownMenuLabel'),
  Separator: createMockComponent('DropdownMenuSeparator'),
  CheckboxItem: createMockComponent('DropdownMenuCheckboxItem'),
  RadioItem: createMockComponent('DropdownMenuRadioItem'),
  Sub: createMockComponent('DropdownMenuSub'),
  SubTrigger: createMockComponent('DropdownMenuSubTrigger'),
  SubContent: createMockComponent('DropdownMenuSubContent'),
  Portal: createMockComponent('DropdownMenuPortal'),
  Group: createMockComponent('DropdownMenuGroup'),
  RadioGroup: createMockComponent('DropdownMenuRadioGroup')
}))

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
    }
  },
  useSearchParams() {
    return {
      get: jest.fn(),
    }
  },
}))

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

// Mock matchMedia
window.matchMedia = window.matchMedia || function() {
  return {
    matches: false,
    addListener: function() {},
    removeListener: function() {}
  }
}

// Mock Radix UI Portal
jest.mock('@radix-ui/react-portal', () => ({
  Portal: ({ children }) => children,
})) 