"use client";

import React, { createContext, useContext, useState } from "react";

interface PostContextType {
  refreshPosts: () => void;
  setRefreshPosts: (callback: () => void) => void;
  refreshPostCount: () => void;
  setRefreshPostCount: (callback: () => void) => void;
}

const PostContext = createContext<PostContextType>({
  refreshPosts: () => {},
  setRefreshPosts: () => {},
  refreshPostCount: () => {},
  setRefreshPostCount: () => {},
});

export function PostProvider({ children }: { children: React.ReactNode }) {
  const [refreshPosts, setRefreshPosts] = useState<() => void>(() => {});
  const [refreshPostCount, setRefreshPostCount] = useState<() => void>(() => {});

  return (
    <PostContext.Provider value={{ refreshPosts, setRefreshPosts, refreshPostCount, setRefreshPostCount }}>
      {children}
    </PostContext.Provider>
  );
}

export const usePostContext = () => useContext(PostContext);
