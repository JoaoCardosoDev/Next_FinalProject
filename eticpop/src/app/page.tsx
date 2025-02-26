'use client'
import LoginBtn from "@/components/login-btn";
import Navbar from "@/components/Navbar";
import Pool from "@/components/Pool";
import PostButton from "@/components/PostButton";
import { SessionProvider, useSession } from "next-auth/react";

export default function Home() {
  return (
    <SessionProvider>
      <HomeContent />
    </SessionProvider>
  );
}

function HomeContent() {
  const { data: session } = useSession();

  return (
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
  );
}