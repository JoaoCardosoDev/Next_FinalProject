import { auth } from "@/server/auth";
import Hero from "@/components/Hero";
import Pool from "@/components/Pool";
import PostButton from "@/components/PostButton";
import UserPostsToggle from "@/components/UserPostsToggle";
import { PostProvider } from "@/contexts/PostContext";
import { UserPostsProvider } from "@/contexts/UserPostsContext";
import { HydrateClient } from "@/trpc/server";

export default async function Home() {
  const session = await auth();

  return (
    <HydrateClient>
      <PostProvider>
        <UserPostsProvider>
          <div>
            <Hero />
            <main className="container mx-auto px-4 py-8">
              {session && (
                <>
                  <PostButton />
                  <UserPostsToggle />
                </>
              )}
              <Pool />
            </main>
          </div>
        </UserPostsProvider>
      </PostProvider>
    </HydrateClient>
  );
}
