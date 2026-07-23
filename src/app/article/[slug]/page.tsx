import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ArticleCard from "@/components/ArticleCard";
import { formatDate } from "@/lib/formatDate";
import { getCategoryBadgeClass, getCategoryName } from "@/lib/categories";
import {
  getAllArticleSlugs,
  getArticleBySlug,
  getRelatedArticles,
} from "@/lib/articles";

export function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "Not found — Capitol Digest" };
  return {
    title: `${article.title} — Capitol Digest`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const related = getRelatedArticles(article, 3);

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Link
        href={`/category/${article.category}`}
        className={`inline-block w-fit rounded-full px-3 py-1 text-xs font-semibold ${getCategoryBadgeClass(
          article.category,
        )}`}
      >
        {getCategoryName(article.category)}
      </Link>

      <h1 className="font-display mt-4 text-3xl font-black leading-tight text-foreground sm:text-4xl md:text-5xl">
        {article.title}
      </h1>

      <p className="mt-4 text-lg text-muted">{article.excerpt}</p>

      <div className="mt-5 flex flex-wrap items-center gap-3 border-y border-border py-4 text-sm text-muted">
        <time dateTime={article.date} className="font-medium text-foreground">
          {formatDate(article.date)}
        </time>
        <span aria-hidden>&middot;</span>
        <span>{article.readingTime}</span>
        <span aria-hidden>&middot;</span>
        <span>{getCategoryName(article.category)}</span>
      </div>

      <figure className="mt-8">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-border">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            priority
            sizes="(min-width: 768px) 768px, 100vw"
            className="object-cover"
          />
        </div>
        <figcaption className="mt-2 text-xs text-muted">
          {article.imageCredit}
        </figcaption>
      </figure>

      <div
        className="prose prose-invert mt-10 max-w-none prose-headings:font-display prose-a:text-accent prose-strong:text-foreground"
        dangerouslySetInnerHTML={{ __html: article.contentHtml }}
      />

      {related.length > 0 && (
        <section className="mt-16 border-t border-border pt-10">
          <h2 className="font-display mb-6 text-xl font-bold text-foreground">
            More in {getCategoryName(article.category)}
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <ArticleCard key={item.slug} article={item} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
