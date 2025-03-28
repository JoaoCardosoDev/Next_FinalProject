"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Star, User, Instagram, Trash2 } from "lucide-react";
import type { Post } from "./model";

interface UserPostsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userPosts: Post[];
  userProfile: {
    id: string;
    name: string | null;
    image: string | null;
    instagram: string | null;
    showInstagram: boolean;
  };
  onFavorite: (postId: number) => void;
  onDelete?: (postId: number) => void;
  currentUserId?: string;
}

export default function UserPostsModal({
  isOpen,
  onClose,
  userPosts,
  userProfile,
  onFavorite,
  onDelete,
  currentUserId,
}: UserPostsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader className="border-b pb-4">
          <DialogTitle className="sr-only">User Profile</DialogTitle>
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16">
              {userProfile.image ? (
                <AvatarImage
                  src={userProfile.image}
                  alt={userProfile.name || ""}
                />
              ) : (
                <AvatarFallback>
                  <User className="h-8 w-8" />
                </AvatarFallback>
              )}
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">
                {userProfile.name || "Anonymous"}
              </h2>
              <div className="mt-2 flex items-center gap-2">
                <p className="text-muted-foreground">
                  {userPosts.length} thought{userPosts.length !== 1 ? "s" : ""}{" "}
                  shared
                </p>
                {userProfile.showInstagram && userProfile.instagram && (
                  <div className="flex items-center gap-1 text-blue-500">
                    <span>•</span>
                    <Instagram className="h-4 w-4" />
                    <a
                      href={userProfile.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm hover:underline"
                    >
                      Instagram Profile
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="mt-4 flex flex-col gap-4 overflow-hidden">
          {userPosts.length === 0 ? (
            <p className="py-8 text-center text-muted-foreground">
              No thoughts shared yet
            </p>
          ) : (
            userPosts.map((post) => (
              <Card key={post.id} className="max-w-full">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="min-w-0 flex-1">
                      <CardTitle className="line-clamp-1 break-words">
                        {post.title}
                      </CardTitle>
                      <CardDescription>
                        {new Date(post.createdAt).toLocaleDateString(
                          undefined,
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          },
                        )}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onFavorite(post.id)}
                        className={post.isFavorited ? "text-yellow-500" : ""}
                      >
                        <Star
                          className="h-5 w-5"
                          fill={post.isFavorited ? "currentColor" : "none"}
                        />
                      </Button>
                      {currentUserId === post.createdById && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onDelete(post.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="break-words text-sm text-gray-600">
                    {post.body}
                  </p>
                  {post.favoriteCount > 0 && (
                    <p className="mt-2 text-sm text-muted-foreground">
                      ★ {post.favoriteCount} favorite
                      {post.favoriteCount !== 1 ? "s" : ""}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
