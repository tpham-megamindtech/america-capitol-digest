import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-8 border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 md:flex-row md:justify-between">
        <div className="max-w-sm">
          <span className="font-display text-xl font-black text-foreground">
            Capitol <span className="text-accent">Digest</span>
          </span>
          <p className="mt-3 text-sm text-muted">
            A national desk covering American government, taxes, the economy,
            wellness, health, and sports — reported plainly, without the noise.
          </p>
        </div>

        <nav className="grid grid-cols-2 gap-x-8 gap-y-2 sm:grid-cols-3">
          {CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              {category.name}
            </Link>
          ))}
        </nav>
      </div>

      <div className="border-t border-border px-4 py-5 sm:px-6">
        <p className="mx-auto max-w-6xl text-xs text-muted">
          &copy; {year} Capitol Digest. All rights reserved. A sample
          publication for demonstration purposes.
        </p>
      </div>
    </footer>
  );
}
