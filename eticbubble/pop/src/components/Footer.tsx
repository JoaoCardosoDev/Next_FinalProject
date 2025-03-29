"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/40">
      <div className="mx-auto w-full max-w-screen-xl px-4 py-3">
        <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
          <Link href="/" className="transition-colors hover:text-foreground">
            Home
          </Link>
          <span>•</span>
          <Link
            href="/about"
            className="transition-colors hover:text-foreground"
          >
            About
          </Link>
          <span>•</span>
          <Link
            href="/terms"
            className="transition-colors hover:text-foreground"
          >
            Terms
          </Link>
          <span>•</span>
          <Link
            href="/privacy"
            className="transition-colors hover:text-foreground"
          >
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}
