"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { UserMenu } from "./UserMenu";
import { NavMenu } from "./NavMenu";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUserPosts } from "@/contexts/UserPostsContext";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const showUserPostsOnly = searchParams.get("userPosts") === "true";
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [instagramLink, setInstagramLink] = useState(
    session?.user?.instagram || "",
  );
  const [showInstagram, setShowInstagram] = useState(
    session?.user?.showInstagram ?? false,
  );
  const [error, setError] = useState("");
  const { openUserPosts } = useUserPosts();

  useEffect(() => {
    if (session?.user) {
      setShowInstagram(session.user.showInstagram ?? false);
      setInstagramLink(session.user.instagram || "");
    }
  }, [session]);

  const handleToggleChange = (checked: boolean) => {
    const params = new URLSearchParams(searchParams.toString());
    if (checked) {
      params.set("userPosts", "true");
    } else {
      params.delete("userPosts");
    }
    router.push(`/?${params.toString()}`);
  };

  const validateInstagramLink = (link: string) => {
    const instagramRegex =
      /^https:\/\/(?:www\.)?instagram\.com\/[a-zA-Z0-9_]+\/?$/;
    return instagramRegex.test(link);
  };

  const handleInstagramToggle = async (checked: boolean) => {
    try {
      setShowInstagram(checked);

      // If turning on and no Instagram link exists, just open the dialog without updating yet
      if (checked && !session?.user?.instagram) {
        setIsDialogOpen(true);
        return; // Exit early - don't update the database yet
      }

      // Otherwise update the database
      const response = await fetch("/api/user/instagram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          instagram: session?.user?.instagram,
          showInstagram: checked,
        }),
      });

      if (response.ok) {
        // Only reload if we have an Instagram link already
        // or if we're turning off visibility
        window.location.reload();
      } else {
        setShowInstagram(!checked);
      }
    } catch (error) {
      console.error("Failed to update Instagram visibility:", error);
      setShowInstagram(!checked);
    }
  };

  const handleInstagramSubmit = async () => {
    if (!validateInstagramLink(instagramLink)) {
      setError("Please enter a valid Instagram profile URL");
      return;
    }

    try {
      const response = await fetch("/api/user/instagram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          instagram: instagramLink,
          showInstagram: true, // Always set to true when adding a new link
        }),
      });

      if (response.ok) {
        setIsDialogOpen(false);
        setError("");
        // Now reload the page to show the updated Instagram info
        window.location.reload();
      } else {
        setError("Failed to update Instagram link");
      }
    } catch (error) {
      setError("Failed to update Instagram link");
    }
  };

  const handleRemoveInstagram = async () => {
    try {
      const response = await fetch("/api/user/instagram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          instagram: null,
          showInstagram: false,
        }),
      });

      if (response.ok) {
        setIsDialogOpen(false);
        setError("");
        setInstagramLink("");
        setShowInstagram(false);
        // Force a full page refresh to update everything
        window.location.reload();
      } else {
        setError("Failed to remove Instagram link");
      }
    } catch (error) {
      setError("Failed to remove Instagram link");
    }
  };

  const handleProfileClick = () => {
    if (session?.user) {
      openUserPosts(session.user.id, {
        id: session.user.id,
        name: session.user.name,
        image: session.user.image,
        instagram: session.user.instagram ?? null,
        showInstagram: session.user.showInstagram ?? false,
      });
    }
  };

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <NavMenu />
        <div className="flex flex-1 items-center justify-end gap-4">
          {session && (
            <>
              <div className="flex items-center space-x-2">
                <Switch
                  id="user-posts"
                  checked={showUserPostsOnly}
                  onCheckedChange={handleToggleChange}
                />
                <Label htmlFor="user-posts">Show my thoughts only</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="instagram-sharing"
                  checked={showInstagram}
                  onCheckedChange={handleInstagramToggle}
                />
                {session.user.instagram ? (
                  <Label
                    htmlFor="instagram-sharing"
                    className="cursor-pointer text-blue-500 hover:underline"
                    onClick={() => setIsDialogOpen(true)}
                  >
                    Edit Instagram Info
                  </Label>
                ) : (
                  <Label htmlFor="instagram-sharing">
                    Do you want to share your Instagram?
                  </Label>
                )}
              </div>
            </>
          )}
          <UserMenu session={session} />
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {session?.user?.instagram
                ? "Edit Instagram Profile"
                : "Add Instagram Profile"}
            </DialogTitle>
            <DialogDescription>
              {session?.user?.instagram
                ? "Update your Instagram profile link or remove it from your account."
                : "Add your Instagram profile link to share with other users."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="instagram">Instagram Profile URL</Label>
              <Input
                id="instagram"
                placeholder="https://instagram.com/yourusername"
                value={instagramLink}
                onChange={(e) => setInstagramLink(e.target.value)}
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
          </div>
          <DialogFooter className="flex justify-between">
            {session?.user?.instagram && (
              <Button
                variant="destructive"
                onClick={handleRemoveInstagram}
                className="mr-auto"
              >
                Remove Instagram
              </Button>
            )}
            <div>
              <Button
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                className="mr-2"
              >
                Cancel
              </Button>
              <Button onClick={handleInstagramSubmit}>
                {session?.user?.instagram ? "Update" : "Add"}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
