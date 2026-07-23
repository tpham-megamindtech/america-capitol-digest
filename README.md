# Capitol Digest

A national U.S. news aggregator built with **Next.js (App Router) + TypeScript + Tailwind CSS v4**.
Article content is stored as Markdown files (parsed with `gray-matter` + `remark`) — no database or CMS.

## Sections

Government & Politics · Taxes & IRS · Finance & Economy · Beauty & Wellness · Health & Medicine · Sports

## Content

Articles live in `content/articles/*.md`. Each file's frontmatter must include:

```yaml
title: "…"
slug: "matches-the-filename"   # without .md
excerpt: "…"
category: "government-politics" # one of the six category slugs
date: "2026-07-18"
coverImage: "https://images.unsplash.com/…"
featured: false                 # exactly one article is true (homepage hero)
imageCredit: "Photo: Unsplash/Name"
```

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
```

## Production build

```bash
npm run build
npm run start
```

## Notes

- Publish dates appear only on the article detail page — never on the homepage or category listings.
- Category pages are paginated (9 per page) via a `?page=` query param.
- Cover images are served from Unsplash through `next/image` (see `next.config.ts`).
