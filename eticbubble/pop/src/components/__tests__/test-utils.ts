import React from 'react';

export const createMockComponent = (name: string) => {
  const Component = ({ children, ...props }: { children?: React.ReactNode }) => (
    <div {...props}>{children}</div>
  );
  Component.displayName = name;
  return Component;
}; 