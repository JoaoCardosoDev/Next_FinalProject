"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import UserPostsModal from "@/components/UserPostsModal";
import type { Post } from "@/components/model";

type UserProfile = {
  id: string;
  name: string | null;
  image: string | null;
  instagram: string | null;
  showInstagram: boolean;
};

interface UserPostsContextType {
  openUserPosts: (userId: string, userProfile: UserProfile) => Promise<void>;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  userPosts: Post[];
  selectedUser: UserProfile | null;
}

const UserPostsContext = createContext<UserPostsContextType | null>(null);

export function UserPostsProvider({ children }: { children: ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);

  const openUserPosts = async (userId: string, userProfile: UserProfile) => {
    try {
      const response = await fetch("/api/posts");
      const allPosts = await response.json();
      const filteredPosts = allPosts.filter(
        (post: Post) => post.createdById === userId,
      );
      setUserPosts(filteredPosts);
      setSelectedUser(userProfile);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching user posts:", error);
    }
  };

  return (
    <UserPostsContext.Provider
      value={{
        openUserPosts,
        isModalOpen,
        setIsModalOpen,
        userPosts,
        selectedUser,
      }}
    >
      {children}
      {selectedUser && (
        <UserPostsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          userPosts={userPosts}
          userProfile={selectedUser}
          onFavorite={() => {}} // Implement this based on your existing favorite logic
          onDelete={() => {}} // Implement this based on your existing delete logic
          currentUserId={selectedUser.id}
        />
      )}
    </UserPostsContext.Provider>
  );
}

export function useUserPosts() {
  const context = useContext(UserPostsContext);
  if (!context) {
    throw new Error("useUserPosts must be used within a UserPostsProvider");
  }
  return context;
}
