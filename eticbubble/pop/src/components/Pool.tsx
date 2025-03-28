"use client";

import React, { useEffect, useState } from "react";
import { PostPool, Post } from "./model";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import FavoritesDrawer from "./FavoritesDrawer";
import { usePostContext } from "@/contexts/PostContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useSearchParams } from "next/navigation";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { useUserPosts } from "@/contexts/UserPostsContext";
import { cn } from "@/lib/utils";

export default function Pool() {
  const [posts, setPosts] = useState<Post[]>([]);
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const showUserPostsOnly = searchParams.get("userPosts") === "true";
  const { setRefreshPosts, refreshPostCount } = usePostContext();
  const [postToDelete, setPostToDelete] = useState<number | null>(null);
  const { openUserPosts } = useUserPosts();
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set());
  const [animationOrder, setAnimationOrder] = useState<number[]>([]);

  const filteredPosts =
    showUserPostsOnly && session?.user?.id
      ? posts.filter((post) => post.createdById === session.user.id)
      : posts;

  const favorites = filteredPosts.filter((post) => post.isFavorited);
  const unfavoritedPosts = filteredPosts.filter((post) => !post.isFavorited);

  useEffect(() => {
    const fetchPosts = async () => {
      const pool = new PostPool();
      const fetchedPosts = await pool.fetchPosts();
      const sortedPosts = [...fetchedPosts].sort(
        (a, b) =>
          b.favoriteCount - a.favoriteCount ||
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
      setPosts(sortedPosts);
    };

    fetchPosts();
    setRefreshPosts(() => fetchPosts);
  }, [setRefreshPosts]);

  useEffect(() => {
    let animationTimeout: NodeJS.Timeout;
    const observer = new IntersectionObserver(
      (entries) => {
        const newlyVisibleCards: string[] = [];

        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target instanceof HTMLElement) {
            const cardId = entry.target.getAttribute("data-card-id");
            if (cardId) {
              newlyVisibleCards.push(cardId);
            }
          }
        });

        if (newlyVisibleCards.length > 0) {
          // Stagger the animations
          newlyVisibleCards.forEach((cardId, index) => {
            animationTimeout = setTimeout(() => {
              setVisibleCards((prev) => new Set([...prev, cardId]));
            }, index * 100); // 100ms delay between each card
          });
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      },
    );

    // Find all cards and observe them
    const cards = document.querySelectorAll("[data-card-id]");
    cards.forEach((card) => observer.observe(card));

    return () => {
      observer.disconnect();
      if (animationTimeout) {
        clearTimeout(animationTimeout);
      }
    };
  }, [unfavoritedPosts]);

  const toggleFavorite = async (postId: number) => {
    try {
      const response = await fetch(`/api/posts/${postId}/favorite`, {
        method: "POST",
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.error || "Failed to toggle favorite");
        return;
      }

      const { favorited } = await response.json();

      // Update posts and maintain sorting
      setPosts((prevPosts) => {
        const updatedPosts = prevPosts.map((post) =>
          post.id === postId
            ? {
                ...post,
                isFavorited: favorited,
                favoriteCount: favorited
                  ? post.favoriteCount + 1
                  : post.favoriteCount - 1,
              }
            : post,
        );
        return [...updatedPosts].sort(
          (a, b) =>
            b.favoriteCount - a.favoriteCount ||
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
      });
    } catch (error) {
      console.error("Error toggling favorite:", error);
      alert("Failed to toggle favorite");
    }
  };

  const deletePost = async (postId: number) => {
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.error || "Failed to delete post");
        return;
      }

      // Remove the post from state
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));

      // Refresh the post count in PostButton
      if (refreshPostCount) {
        refreshPostCount();
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post");
    }
  };

  const handleUserClick = (userId: string, userProfile: any) => {
    openUserPosts(userId, userProfile);
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {unfavoritedPosts.map((post) => (
          <Card
            key={post.id}
            data-card-id={post.id.toString()}
            className={cn(
              "relative",
              "transition-all duration-500 ease-out",
              visibleCards.has(post.id.toString())
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0",
            )}
          >
            <CardHeader className="relative">
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-1 items-start gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={post.createdBy.image ?? ""}
                      alt={post.createdBy.name ?? "Anonymous"}
                    />
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <CardTitle>{post.title}</CardTitle>
                    <div className="space-y-1">
                      <CardDescription>
                        By{" "}
                        <span
                          className="cursor-pointer hover:underline"
                          onClick={() =>
                            handleUserClick(post.createdById, post.createdBy)
                          }
                        >
                          {post.createdBy.name ?? "Anonymous"}
                        </span>
                      </CardDescription>
                      {post.createdBy.instagram &&
                        ("showInstagram" in post.createdBy
                          ? (post.createdBy.showInstagram as boolean)
                          : true) && (
                          <a
                            href={post.createdBy.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-500 hover:underline"
                          >
                            @
                            {post.createdBy.instagram
                              .split("/")
                              .pop()
                              ?.replace(/\/$/, "")}
                          </a>
                        )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  {session && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleFavorite(post.id)}
                      className={`${
                        post.isFavorited
                          ? "text-accent"
                          : "text-muted-foreground"
                      } relative z-50 h-9 w-9 hover:text-accent`}
                    >
                      <Star
                        className="h-5 w-5"
                        fill={post.isFavorited ? "currentColor" : "none"}
                      />
                    </Button>
                  )}
                  <span className="text-xs text-muted-foreground">
                    {post.favoriteCount}{" "}
                    {post.favoriteCount === 1 ? "favorite" : "favorites"}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="max-h-[200px] overflow-y-auto">
              <div className="space-y-2">
                <h3 className="line-clamp-2 break-words text-lg font-semibold">
                  {post.title}
                </h3>
                <p className="break-words text-sm text-gray-600">{post.body}</p>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-gray-500">
                Posted on {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </CardFooter>

            {session && session.user.id === post.createdById && (
              <div className="absolute bottom-2 right-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:bg-red-100 hover:text-red-600"
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Delete Thought</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to delete this thought? This
                        action cannot be undone.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button
                        variant="ghost"
                        onClick={() => {
                          const dialogElement =
                            document.querySelector('[role="dialog"]');
                          if (dialogElement) {
                            const closeButton = dialogElement.querySelector(
                              '[data-state="closed"]',
                            );
                            if (closeButton instanceof HTMLElement) {
                              closeButton.click();
                            }
                          }
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => {
                          void deletePost(post.id);
                          const dialogElement =
                            document.querySelector('[role="dialog"]');
                          if (dialogElement) {
                            const closeButton = dialogElement.querySelector(
                              '[data-state="closed"]',
                            );
                            if (closeButton instanceof HTMLElement) {
                              closeButton.click();
                            }
                          }
                        }}
                      >
                        Delete
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </Card>
        ))}
      </div>
      {session && (
        <FavoritesDrawer
          favorites={favorites}
          onUnfavorite={toggleFavorite}
          deletePost={deletePost}
        />
      )}
    </>
  );
}
