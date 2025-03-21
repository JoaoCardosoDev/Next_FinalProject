import Navbar from "@/components/Navbar";
import Pool from "@/components/Pool";
import PostButton from "@/components/PostButton";
import { api } from "@/trpc/server";
import { HydrateClient } from "@/trpc/server";
import { auth } from "@/server/auth";

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  return (
    <HydrateClient>
      <div>
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Pool />
          <PostButton />
        </main>
      </div>
    </HydrateClient>
  );
}
