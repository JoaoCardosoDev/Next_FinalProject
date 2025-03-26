"use client";

import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import { Lightbulb, Droplets, Lock } from "lucide-react";
import { Logo } from "./Logo";
import { useCountAnimation } from "@/hooks/useCountAnimation";

export default function Hero() {
  const { data: session } = useSession();
  const thoughtCount = useCountAnimation(10, 1500);
  const favoriteCount = useCountAnimation(5, 1500);

  return (
    <section
      aria-label="Introduction"
      className="relative overflow-hidden border-b border-protocol bg-clarity py-8 sm:py-12"
    >
      <div className="mx-auto max-w-3xl px-4">
        <header className="flex items-center justify-between">
          <div className="max-w-xl">
            <h1 className="mb-3 text-3xl font-bold tracking-tight text-sector sm:text-4xl">
              Where Fleeting Thoughts Find Their Voice
            </h1>
            <p className="mb-4 text-base text-muted-foreground sm:text-lg">
              Share your most profound shower thoughts in a space where scarcity
              breeds creativity. With just 10 thoughts to share, make each one
              count.
            </p>
            <div className="flex items-center gap-4">
              {!session && (
                <Button
                  size="lg"
                  className="bg-membrane text-archive hover:bg-membrane/90"
                >
                  Start Sharing Thoughts
                </Button>
              )}
              <div className="flex items-center gap-2 text-system">
                <Lock className="h-4 w-4" />
                <span className="text-sm">10 thoughts limit</span>
              </div>
            </div>
          </div>

          <div className="hidden items-center gap-6 border-l border-protocol pl-8 sm:flex">
            <div className="text-center">
              <h3 className="mb-1 text-2xl font-semibold text-sector">
                {thoughtCount}
              </h3>
              <p className="text-sm text-system">Thoughts</p>
            </div>
            <div className="text-center">
              <h3 className="mb-1 text-2xl font-semibold text-sector">
                {favoriteCount}
              </h3>
              <p className="text-sm text-system">Favorites</p>
            </div>
          </div>
        </header>
      </div>
    </section>
  );
}
