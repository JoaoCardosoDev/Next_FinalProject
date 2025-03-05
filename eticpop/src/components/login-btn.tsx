'use client'

import { useSession, signIn, signOut } from "next-auth/react";

export default function LoginBtn() {
  const { data: session } = useSession();

  if (session) {
    const userEmail = session.user?.email; 

    return (
      <>
        {userEmail ? (
          <>
            Signed in as {userEmail} <br />
            <button onClick={() => signOut()}>Sign out</button>
          </>
        ) : (
          <>
            User information is not available. <br />
            <button onClick={() => signOut()}>Sign out</button>
          </>
        )}
      </>
    );
  }

  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}