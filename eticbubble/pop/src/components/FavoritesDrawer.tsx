"use client";

import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Star, Trash2 } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import type { Post } from "./model";
import { useSession } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface FavoritesDrawerProps {
  favorites: Post[];
  onUnfavorite: (postId: number) => Promise<void>;
  deletePost: (postId: number) => Promise<void>;
}

export default function FavoritesDrawer({
  favorites,
  onUnfavorite,
  deletePost,
}: FavoritesDrawerProps) {
  const { data: session } = useSession();

  return (
    <div className="fixed bottom-4 right-4">
      <Drawer>
        <DrawerTrigger asChild>
          <Button
            variant="outline"
            className="gap-2 bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <Star className="h-4 w-4" fill="currentColor" />
            Favorites ({favorites.length}/5)
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full">
            <DrawerHeader>
              <DrawerTitle>Your Favorite Thoughts</DrawerTitle>
              <DrawerDescription>
                You can favorite up to 5 thoughts. Currently using{" "}
                {favorites.length}/5 slots.
              </DrawerDescription>
            </DrawerHeader>
            <div className="overflow-x-auto p-4">
              <div className="flex min-w-full gap-4">
                {favorites.length === 0 ? (
                  <p className="w-full text-center text-muted-foreground">
                    No favorites yet
                  </p>
                ) : (
                  favorites.map((post) => (
                    <Card
                      key={post.id}
                      className="relative w-[300px] flex-shrink-0"
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="line-clamp-1">
                              {post.title}
                            </CardTitle>
                            <CardDescription>
                              By {post.createdBy.name || "Anonymous"}
                            </CardDescription>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => onUnfavorite(post.id)}
                              className="text-accent hover:text-accent/90"
                            >
                              <Star className="h-5 w-5" fill="currentColor" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="line-clamp-3">{post.body}</p>
                      </CardContent>

                      {session && session.user.id === post.createdById && (
                        <div className="absolute bottom-2 right-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                              >
                                <Trash2 className="h-5 w-5" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Delete Thought</DialogTitle>
                                <DialogDescription>
                                  Are you sure you want to delete this thought?
                                  This action cannot be undone.
                                </DialogDescription>
                              </DialogHeader>
                              <DialogFooter>
                                <Button variant="ghost">Cancel</Button>
                                <Button
                                  variant="destructive"
                                  onClick={() => deletePost(post.id)}
                                >
                                  Delete
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      )}
                    </Card>
                  ))
                )}
              </div>
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button
                  variant="outline"
                  className="bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  Close
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
