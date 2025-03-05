import LoginBtn from "@/components/login-btn";
import Navbar from "@/components/Navbar";
import Pool from "@/components/Pool";
import PostButton from "@/components/PostButton";
import { auth } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  return (
    <HydrateClient>
      <div>
      {session ? (
        <h1>Welcome, {session.user.name}</h1>
      ) : (
        <div>
          <h1>Please log in</h1>
          <LoginBtn />
        </div>
      )}
      <Pool />
      <Navbar />
      <PostButton />
    </div>
    </HydrateClient>
  );
}
