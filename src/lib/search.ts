import { getAllArticlesForSearch } from "@/lib/articles";
import type { CategorySlug } from "@/types/article";

export interface SearchItem {
  slug: string;
  title: string;
  excerpt: string;
  category: CategorySlug;
  coverImage: string;
  /** Plain-text article body, so search covers full content, not just metadata. */
  body: string;
}

/**
 * Client-safe full-text index used to power the header search.
 * Matches run against title, excerpt, and body (see SearchBar ranking).
 */
export function getSearchIndex(): SearchItem[] {
  // Default every text field so an article with incomplete frontmatter
  // (e.g. a missing excerpt) can never break the client-side search.
  return getAllArticlesForSearch().map((a) => ({
    slug: a.slug,
    title: a.title ?? "",
    excerpt: a.excerpt ?? "",
    category: a.category,
    coverImage: a.coverImage ?? "",
    body: a.body ?? "",
  }));
}
