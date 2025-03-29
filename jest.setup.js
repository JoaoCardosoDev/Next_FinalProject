import '@testing-library/jest-dom'
import React from 'react'

const createMockComponent = (name) => {
  const Component = ({ children, asChild, sideOffset, forceMount, ...props }) => {
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

// Mock components
jest.mock('@/components/ui/avatar', () => ({
  Avatar: createMockComponent('Avatar'),
  AvatarImage: createMockComponent('AvatarImage'),
  AvatarFallback: createMockComponent('AvatarFallback')
}))

jest.mock('@radix-ui/react-dropdown-menu', () => ({
  Root: createMockComponent('DropdownMenu'),
  // ... rest of the mock components
}))

// Browser API mocks
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.matchMedia = window.matchMedia || function() {
  return {
    matches: false,
    addListener: function() {},
    removeListener: function() {}
  }
}

jest.mock('@radix-ui/react-portal', () => ({
  Portal: ({ children }) => children,
})) 