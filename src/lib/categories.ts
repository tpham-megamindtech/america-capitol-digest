import type { CategorySlug } from "@/types/article";

export interface Category {
  slug: CategorySlug;
  name: string;
  /** Short blurb used in the footer and category headers */
  tagline: string;
  /** Tailwind utility classes used for the category's accent badge */
  badgeClass: string;
}

/**
 * Order here is intentional and drives the homepage section order and nav.
 * Government & Politics and Taxes & IRS use the crimson accent to signal weight;
 * the remaining sections each get a distinct, harmonious hue for scannability.
 */
export const CATEGORIES: Category[] = [
  {
    slug: "government-politics",
    name: "Government & Politics",
    tagline: "Federal policy, Congress, and the agencies that shape the nation.",
    badgeClass: "bg-[#e0555f]/15 text-[#ef8087]",
  },
  {
    slug: "taxes-irs",
    name: "Taxes & IRS",
    tagline: "Filing guidance, rule changes, and what they mean for your wallet.",
    badgeClass: "bg-[#e0555f]/15 text-[#ef8087]",
  },
  {
    slug: "finance-economy",
    name: "Finance & Economy",
    tagline: "Markets, rates, jobs, and the forces moving the U.S. economy.",
    badgeClass: "bg-emerald-500/15 text-emerald-300",
  },
  {
    slug: "beauty-wellness",
    name: "Beauty & Wellness",
    tagline: "Skincare, self-care, and the rituals Americans are trying now.",
    badgeClass: "bg-pink-500/15 text-pink-300",
  },
  {
    slug: "health-medicine",
    name: "Health & Medicine",
    tagline: "Research, hospitals, nutrition, and the science of staying well.",
    badgeClass: "bg-teal-500/15 text-teal-300",
  },
  {
    slug: "sports",
    name: "Sports",
    tagline: "The NFL, NBA, MLB, NHL, and the athletes defining the season.",
    badgeClass: "bg-amber-500/15 text-amber-300",
  },
];

export function getCategoryName(slug: string): string {
  return CATEGORIES.find((c) => c.slug === slug)?.name ?? slug;
}

export function getCategoryBadgeClass(slug: string): string {
  return (
    CATEGORIES.find((c) => c.slug === slug)?.badgeClass ??
    "bg-slate-500/15 text-slate-300"
  );
}
