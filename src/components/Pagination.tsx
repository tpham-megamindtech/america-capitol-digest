import Link from "next/link";

/**
 * Simple numbered pagination driven by a `?page=` query param.
 * Renders nothing when there is only a single page.
 */
export default function Pagination({
  basePath,
  currentPage,
  totalPages,
}: {
  basePath: string;
  currentPage: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const href = (page: number) =>
    page === 1 ? basePath : `${basePath}?page=${page}`;

  const arrowClass =
    "rounded-md border border-border px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface-hover hover:text-foreground";
  const disabledClass =
    "cursor-not-allowed rounded-md border border-border px-3 py-2 text-sm font-medium text-border";

  return (
    <nav
      className="mt-12 flex items-center justify-center gap-2"
      aria-label="Pagination"
    >
      {currentPage > 1 ? (
        <Link href={href(currentPage - 1)} className={arrowClass}>
          &larr; Prev
        </Link>
      ) : (
        <span className={disabledClass}>&larr; Prev</span>
      )}

      {pages.map((page) => (
        <Link
          key={page}
          href={href(page)}
          aria-current={page === currentPage ? "page" : undefined}
          className={
            page === currentPage
              ? "rounded-md border border-accent bg-accent/10 px-4 py-2 text-sm font-semibold text-accent"
              : "rounded-md border border-border px-4 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface-hover hover:text-foreground"
          }
        >
          {page}
        </Link>
      ))}

      {currentPage < totalPages ? (
        <Link href={href(currentPage + 1)} className={arrowClass}>
          Next &rarr;
        </Link>
      ) : (
        <span className={disabledClass}>Next &rarr;</span>
      )}
    </nav>
  );
}
