// import LoginBtn from "@/components/login-btn";
import Navbar from "@/components/Navbar";
import Pool from "@/components/Pool";
import PostButton from "@/components/PostButton";
// import { api } from "@/trpc/server";
// import type { Session } from "next-auth";
import { HydrateClient } from "@/trpc/server";

export default async function Home() {

  // if (session?.user) {
  //   void api.post.getLatest.prefetch();
  // }

  return (
    <HydrateClient>
      <div>
        {/* {session ? (
          <h1>Welcome, {session.user.name}</h1>
        ) : (
          <div>
            <h1>Please log in</h1>
            <LoginBtn />
          </div>
        )} */}
        <Pool />
        <Navbar />
        <PostButton />
      </div>
    </HydrateClient>
  );
}