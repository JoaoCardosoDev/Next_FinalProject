"use client";

import Image from "next/image";

export function Logo() {
  return (
    <div
      data-testid="logo-container"
      className="inline-flex h-8 w-10 items-center justify-center rounded-lg bg-sector p-2.5"
    >
      <Image
        src="/waterdrop.svg"
        alt="Water Drop Logo"
        width={22}
        height={22}
        className="h-6 w-6"
      />
    </div>
  );
}
