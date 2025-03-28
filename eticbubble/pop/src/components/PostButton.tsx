"use client";

import React, { useState, useEffect } from "react";
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
import { Button } from "./ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { usePostContext } from "@/contexts/PostContext";
import { useSession } from "next-auth/react";

export default function PostButton() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [postCount, setPostCount] = useState(0);
  const router = useRouter();
  const { refreshPosts, setRefreshPostCount } = usePostContext();
  const { data: session } = useSession();

  const fetchPostCount = async () => {
    if (!session?.user) return;
    try {
      const response = await fetch("/api/posts");
      const posts = await response.json();
      const userPosts = posts.filter(
        (post: Post) => post.createdById === session.user.id,
      );
      setPostCount(userPosts.length);
    } catch (error) {
      console.error("Error fetching post count:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchPostCount();
    };
    void fetchData();
    setRefreshPostCount(() => fetchPostCount);
  }, [session, setRefreshPostCount]);

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, body }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error);
        return;
      }

      setTitle("");
      setBody("");
      setIsOpen(false);

      // Update post count and refresh posts
      await fetchPostCount();
      if (refreshPosts) {
        void refreshPosts();
      }
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post");
    }
  };

  return (
    <div className="mb-8">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {postCount}/10 posts created
        </p>
      </div>
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <Button className="w-full" size="lg" disabled={postCount >= 10}>
            {postCount >= 10 ? "Post limit reached" : "Share your thought"}
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Create a new thought</DrawerTitle>
              <DrawerDescription>
                Share your shower thought with the world.
              </DrawerDescription>
            </DrawerHeader>
            <div className="px-4">
              <div className="flex flex-col gap-4">
                <Input
                  placeholder="Title (max 60 characters)"
                  value={title}
                  onChange={(e) => {
                    if (e.target.value.length <= 60) {
                      setTitle(e.target.value);
                    }
                  }}
                  maxLength={60}
                />
                <div className="space-y-1">
                  <Textarea
                    placeholder="What's on your mind? (max 200 characters)"
                    className="min-h-[100px]"
                    value={body}
                    onChange={(e) => {
                      if (e.target.value.length <= 200) {
                        setBody(e.target.value);
                      }
                    }}
                    maxLength={200}
                  />
                  <p className="text-xs text-muted-foreground text-right">
                    {body.length}/200 characters
                  </p>
                </div>
              </div>
            </div>
            <DrawerFooter>
              <Button
                onClick={handleSubmit}
                disabled={postCount >= 10 || !title.trim() || !body.trim()}
              >
                {postCount >= 10 ? "Post limit reached" : "Post"}
              </Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
