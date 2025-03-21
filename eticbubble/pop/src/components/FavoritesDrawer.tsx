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
import { Star } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import type { Post } from "./model";

interface FavoritesDrawerProps {
  favorites: Post[];
  onUnfavorite: (postId: number) => Promise<void>;
}

export default function FavoritesDrawer({
  favorites,
  onUnfavorite,
}: FavoritesDrawerProps) {
  return (
    <div className="fixed bottom-4 right-4">
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline" className="gap-2">
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
                    <Card key={post.id} className="w-[300px] flex-shrink-0">
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
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onUnfavorite(post.id)}
                            className="text-yellow-500"
                          >
                            <Star className="h-5 w-5" fill="currentColor" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="line-clamp-3">{post.body}</p>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
