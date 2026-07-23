export type CategorySlug =
  | "government-politics"
  | "taxes-irs"
  | "finance-economy"
  | "beauty-wellness"
  | "health-medicine"
  | "sports";

export interface ArticleMeta {
  slug: string;
  title: string;
  excerpt: string;
  category: CategorySlug;
  coverImage: string;
  date: string;
  imageCredit: string;
  featured?: boolean;
}

export interface Article extends ArticleMeta {
  contentHtml: string;
  readingTime: string;
}
