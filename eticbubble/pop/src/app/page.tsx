import Navbar from "@/components/Navbar";
import Pool from "@/components/Pool";
import PostButton from "@/components/PostButton";
import Hero from "@/components/Hero";
import { api } from "@/trpc/server";
import { HydrateClient } from "@/trpc/server";
import { auth } from "@/server/auth";
import { PostProvider } from "@/contexts/PostContext";

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  return (
    <HydrateClient>
      <PostProvider>
        <div>
          <Navbar />
          <Hero />
          <main className="container mx-auto px-4 py-8">
            {session && <PostButton />}
            <Pool />
          </main>
        </div>
      </PostProvider>
    </HydrateClient>
  );
}
