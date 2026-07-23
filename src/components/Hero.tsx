import Image from "next/image";
import Link from "next/link";
import type { ArticleMeta } from "@/types/article";
import { getCategoryBadgeClass, getCategoryName } from "@/lib/categories";

/** The single lead story at the top of the homepage. No date shown. */
export default function Hero({ article }: { article: ArticleMeta }) {
  return (
    <Link
      href={`/article/${article.slug}`}
      className="group relative block overflow-hidden rounded-xl border border-border"
    >
      <div className="relative aspect-[4/5] w-full sm:aspect-[21/9]">
        <Image
          src={article.coverImage}
          alt={article.title}
          fill
          priority
          sizes="(min-width: 1152px) 1152px, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent" />
      </div>

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-5 sm:p-8 md:p-10">
        <div className="flex items-center gap-3">
          <span
            className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${getCategoryBadgeClass(
              article.category,
            )}`}
          >
            {getCategoryName(article.category)}
          </span>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-300">
            Lead Story
          </span>
        </div>

        <h1 className="font-display max-w-3xl text-2xl font-black leading-tight text-white sm:text-4xl md:text-5xl">
          {article.title}
        </h1>

        <p className="hidden max-w-2xl text-sm text-zinc-300 sm:block sm:text-base">
          {article.excerpt}
        </p>
      </div>
    </Link>
  );
}
