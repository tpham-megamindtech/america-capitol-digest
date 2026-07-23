import Image from "next/image";
import Link from "next/link";
import type { ArticleMeta } from "@/types/article";
import { getCategoryBadgeClass, getCategoryName } from "@/lib/categories";

/**
 * Homepage section for a single category: one large lead item on the left,
 * a compact column of headlines on the right. Both columns stretch to the
 * same height so neither side looks lopsided. No dates are shown here.
 */
export default function CategoryBlock({
  title,
  categorySlug,
  articles,
}: {
  title: string;
  categorySlug: string;
  articles: ArticleMeta[];
}) {
  if (articles.length === 0) return null;

  const [lead, ...rest] = articles;
  const secondary = rest.slice(0, 4);

  return (
    <section className="py-10">
      <div className="mb-5 flex items-end justify-between border-b border-border pb-3">
        <h2 className="font-display text-2xl font-bold text-foreground">
          {title}
        </h2>
        <Link
          href={`/category/${categorySlug}`}
          className="text-sm font-medium text-accent transition-colors hover:text-accent-hover"
        >
          View all &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2">
        {/* Lead story */}
        <Link
          href={`/article/${lead.slug}`}
          className="group flex flex-col overflow-hidden rounded-lg border border-border bg-surface transition-colors hover:bg-surface-hover"
        >
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            <Image
              src={lead.coverImage}
              alt={lead.title}
              fill
              sizes="(min-width: 1024px) 560px, 100vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-1 flex-col gap-3 p-5">
            <span
              className={`w-fit rounded-full px-2.5 py-1 text-xs font-semibold ${getCategoryBadgeClass(
                lead.category,
              )}`}
            >
              {getCategoryName(lead.category)}
            </span>
            <h3 className="font-display text-xl font-bold leading-snug text-foreground transition-colors group-hover:text-accent sm:text-2xl">
              {lead.title}
            </h3>
            <p className="line-clamp-3 text-sm text-muted">{lead.excerpt}</p>
          </div>
        </Link>

        {/* Secondary headlines */}
        <div className="flex flex-col divide-y divide-border rounded-lg border border-border bg-surface">
          {secondary.map((article) => (
            <Link
              key={article.slug}
              href={`/article/${article.slug}`}
              className="group flex flex-1 items-center gap-4 p-4 transition-colors hover:bg-surface-hover"
            >
              <div className="relative aspect-[16/9] w-28 shrink-0 overflow-hidden rounded-md sm:w-32">
                <Image
                  src={article.coverImage}
                  alt={article.title}
                  fill
                  sizes="128px"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="min-w-0">
                <h4 className="font-display line-clamp-2 text-base font-semibold leading-snug text-foreground transition-colors group-hover:text-accent">
                  {article.title}
                </h4>
                <p className="mt-1 line-clamp-1 text-xs text-muted">
                  {article.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
