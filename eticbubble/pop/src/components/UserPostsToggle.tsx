"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function UserPostsToggle() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const showUserPostsOnly = searchParams.get("userPosts") === "true";

  const handleToggleChange = (checked: boolean) => {
    const params = new URLSearchParams(searchParams.toString());
    if (checked) {
      params.set("userPosts", "true");
    } else {
      params.delete("userPosts");
    }
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="mt-4 flex items-center space-x-2">
      <Switch
        id="user-posts"
        checked={showUserPostsOnly}
        onCheckedChange={handleToggleChange}
      />
      <Label htmlFor="user-posts">Show my thoughts only</Label>
    </div>
  );
}
