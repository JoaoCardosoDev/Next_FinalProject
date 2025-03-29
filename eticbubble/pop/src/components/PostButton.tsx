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
import UserPostsToggle from "./UserPostsToggle";

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
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            {postCount}/10 posts created
          </span>
        </div>
        <UserPostsToggle />
      </div>
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <Button
            className="w-full dark:bg-accent dark:text-accent-foreground dark:hover:bg-accent/90"
            size="lg"
            disabled={postCount >= 10}
          >
            {postCount >= 10 ? "Post limit reached" : "Share your thought"}
          </Button>
        </DrawerTrigger>
        <DrawerContent className="bg-background">
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle className="text-foreground">
                Create a new thought
              </DrawerTitle>
              <DrawerDescription className="text-muted-foreground">
                Share your shower thought with the world.
              </DrawerDescription>
            </DrawerHeader>
            <div className="px-4">
              <div className="flex flex-col gap-4">
                <Input
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-background text-foreground"
                />
                <Textarea
                  placeholder="What's on your mind?"
                  className="min-h-[100px] bg-background text-foreground"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                />
              </div>
            </div>
            <DrawerFooter>
              <Button
                onClick={handleSubmit}
                disabled={postCount >= 10 || !title.trim() || !body.trim()}
                className="dark:bg-accent dark:text-accent-foreground dark:hover:bg-accent/90"
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
