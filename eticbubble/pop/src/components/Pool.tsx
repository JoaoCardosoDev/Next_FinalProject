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
import { Star } from "lucide-react";
import { useSession } from "next-auth/react";
import FavoritesDrawer from "./FavoritesDrawer";

export default function Pool() {
  const [posts, setPosts] = useState<Post[]>([]);
  const { data: session } = useSession();
  const favorites = posts.filter((post) => post.isFavorited);
  const unfavoritedPosts = posts.filter((post) => !post.isFavorited);

  useEffect(() => {
    const pool = new PostPool();
    pool.fetchPosts().then((fetchedPosts) => {
      // Sort posts by favorite count in descending order
      const sortedPosts = [...fetchedPosts].sort(
        (a, b) =>
          b.favoriteCount - a.favoriteCount ||
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
      setPosts(sortedPosts);
    });
  }, []);

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

  return (
    <>
      <div className="grid grid-cols-1 gap-4 p-32 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {unfavoritedPosts.map((post) => (
          <Card key={post.id}>
            <CardHeader className="relative">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <CardTitle>{post.title}</CardTitle>
                  <CardDescription>
                    By {post.createdBy.name || "Anonymous"}
                  </CardDescription>
                </div>
                <div className="flex flex-col items-end gap-1">
                  {session && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleFavorite(post.id)}
                      className={`${
                        post.isFavorited ? "text-yellow-500" : "text-gray-500"
                      } relative z-50 h-9 w-9`}
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
            <CardContent>
              <p>{post.body}</p>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-gray-500">
                Posted on {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </CardFooter>
          </Card>
        ))}
      </div>
      {session && (
        <FavoritesDrawer favorites={favorites} onUnfavorite={toggleFavorite} />
      )}
    </>
  );
}
