import React from "react";
import { auth } from "@/server/auth";
import { UserMenu } from "./UserMenu";
import { NavMenu } from "./NavMenu";

export default async function Navbar() {
  const session = await auth();

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <NavMenu />
        <div className="ml-auto flex items-center space-x-4">
          <UserMenu session={session} />
        </div>
      </div>
    </div>
  );
}
