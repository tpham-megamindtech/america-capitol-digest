import { notFound } from "next/navigation";
import ArticleCard from "@/components/ArticleCard";
import Pagination from "@/components/Pagination";
import { CATEGORIES, getCategoryName } from "@/lib/categories";
import { getArticlesByCategory } from "@/lib/articles";
import type { CategorySlug } from "@/types/article";

const PAGE_SIZE = 9;

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ slug: category.slug }));
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug);
  if (!category) notFound();

  const { page } = await searchParams;
  const articles = getArticlesByCategory(slug as CategorySlug);

  const totalPages = Math.max(1, Math.ceil(articles.length / PAGE_SIZE));
  const requested = Number.parseInt(page ?? "1", 10);
  const currentPage = Number.isNaN(requested)
    ? 1
    : Math.min(Math.max(requested, 1), totalPages);

  const start = (currentPage - 1) * PAGE_SIZE;
  const pageArticles = articles.slice(start, start + PAGE_SIZE);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="mb-8 border-b border-border pb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Section
        </p>
        <h1 className="font-display mt-2 text-3xl font-black text-foreground sm:text-4xl">
          {getCategoryName(slug)}
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-muted">{category.tagline}</p>
      </header>

      {pageArticles.length === 0 ? (
        <p className="text-muted">No articles in this section yet.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pageArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>

          <Pagination
            basePath={`/category/${slug}`}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </>
      )}
    </div>
  );
}
