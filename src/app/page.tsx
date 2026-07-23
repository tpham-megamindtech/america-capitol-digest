import Hero from "@/components/Hero";
import CategoryBlock from "@/components/CategoryBlock";
import { CATEGORIES } from "@/lib/categories";
import { getFeaturedArticle, getArticlesByCategory } from "@/lib/articles";

export default function Home() {
  const featured = getFeaturedArticle();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <Hero article={featured} />

      <div className="divide-y divide-border">
        {CATEGORIES.map((category) => (
          <CategoryBlock
            key={category.slug}
            title={category.name}
            categorySlug={category.slug}
            articles={getArticlesByCategory(category.slug)
              .filter((article) => article.slug !== featured.slug)
              .slice(0, 5)}
          />
        ))}
      </div>
    </div>
  );
}
