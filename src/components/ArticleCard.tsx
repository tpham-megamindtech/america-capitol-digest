import Image from "next/image";
import Link from "next/link";
import type { ArticleMeta } from "@/types/article";
import { getCategoryBadgeClass, getCategoryName } from "@/lib/categories";

/**
 * Grid card used on category pages and related-article lists.
 * Deliberately shows NO publish date (dates live only on the article page).
 */
export default function ArticleCard({ article }: { article: ArticleMeta }) {
  return (
    <Link
      href={`/article/${article.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-border bg-surface transition-colors hover:bg-surface-hover"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <Image
          src={article.coverImage}
          alt={article.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <span
          className={`w-fit rounded-full px-2.5 py-1 text-xs font-semibold ${getCategoryBadgeClass(
            article.category,
          )}`}
        >
          {getCategoryName(article.category)}
        </span>

        <h3 className="font-display text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-accent">
          {article.title}
        </h3>

        <p className="line-clamp-3 text-sm text-muted">{article.excerpt}</p>
      </div>
    </Link>
  );
}
