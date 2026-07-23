import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-center justify-between gap-4 py-5 sm:py-6">
          <Link href="/" className="flex items-baseline gap-2">
            <span className="font-display text-4xl font-black leading-none tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Capitol <span className="text-accent">Digest</span>
            </span>
          </Link>

          <span className="hidden max-w-[10rem] text-right text-xs font-medium uppercase tracking-[0.2em] text-muted lg:block">
            National news, clearly reported
          </span>
        </div>

        <nav className="flex items-center gap-5 overflow-x-auto border-t border-border py-3">
          {CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="shrink-0 text-sm font-medium text-muted transition-colors hover:text-foreground"
            >
              {category.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
