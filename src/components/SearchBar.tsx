"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getCategoryBadgeClass, getCategoryName } from "@/lib/categories";
import type { SearchItem } from "@/lib/search";

const MAX_RESULTS = 8;

function rank(items: SearchItem[], query: string): SearchItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const terms = q.split(/\s+/).filter(Boolean);

  return items
    .map((item) => {
      const title = (item.title ?? "").toLowerCase();
      const excerpt = (item.excerpt ?? "").toLowerCase();
      const body = (item.body ?? "").toLowerCase();
      let score = 0;
      for (const term of terms) {
        // Every term must appear somewhere; title > excerpt > body.
        if (title.includes(term)) score += 3;
        else if (excerpt.includes(term)) score += 2;
        else if (body.includes(term)) score += 1;
        else return { item, score: -1 };
      }
      return { item, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, MAX_RESULTS)
    .map((entry) => entry.item);
}

export default function SearchBar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<SearchItem[] | null>(null);

  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fetchedRef = useRef(false);

  // Lazily load the index the first time the panel opens.
  useEffect(() => {
    if (!open || fetchedRef.current) return;
    fetchedRef.current = true;
    fetch("/api/search", { cache: "no-store" })
      .then((res) => res.json())
      .then((data: SearchItem[]) => setItems(data))
      .catch(() => setItems([]));
  }, [open]);

  // Focus the input when the panel opens.
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // Close on outside click or Escape.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const results = useMemo(
    () => (items ? rank(items, query) : []),
    [items, query],
  );

  const hasQuery = query.trim().length > 0;

  function handleSelect() {
    setOpen(false);
    setQuery("");
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-label="Search articles"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center gap-2 rounded-md border border-border px-2.5 py-1.5 text-muted transition-colors hover:bg-surface-hover hover:text-foreground"
      >
        <SearchIcon className="h-4 w-4" />
        <span className="hidden text-sm font-medium sm:inline">Search</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-3 w-[min(92vw,24rem)] overflow-hidden rounded-lg border border-border bg-surface shadow-2xl shadow-black/40">
          <div className="flex items-center gap-2 border-b border-border px-3 py-2.5">
            <SearchIcon className="h-4 w-4 shrink-0 text-muted" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search articles…"
              className="w-full bg-transparent text-sm text-foreground placeholder:text-muted focus:outline-none"
              aria-label="Search articles"
            />
            {hasQuery && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => {
                  setQuery("");
                  inputRef.current?.focus();
                }}
                className="shrink-0 text-muted transition-colors hover:text-foreground"
              >
                <CloseIcon className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="max-h-[70vh] overflow-y-auto">
            {!hasQuery ? (
              <p className="px-3 py-4 text-sm text-muted">
                Type to search across every section.
              </p>
            ) : results.length === 0 ? (
              <p className="px-3 py-4 text-sm text-muted">No results found.</p>
            ) : (
              <ul>
                {results.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/article/${item.slug}`}
                      onClick={handleSelect}
                      className="flex items-center gap-3 px-3 py-2.5 transition-colors hover:bg-surface-hover"
                    >
                      <div className="relative aspect-[16/10] w-16 shrink-0 overflow-hidden rounded">
                        <Image
                          src={item.coverImage}
                          alt=""
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="line-clamp-2 text-sm font-semibold leading-snug text-foreground">
                          {item.title}
                        </p>
                        <span
                          className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[11px] font-semibold ${getCategoryBadgeClass(
                            item.category,
                          )}`}
                        >
                          {getCategoryName(item.category)}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
