import Link from 'next/link';

type BreadcrumbItem = {
  name: string;
  url?: string;
};

export default function SeoBreadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  if (items.length < 2) return null;

  return (
    <nav aria-label="Breadcrumb" className="relative z-20 w-full border-b border-uz-graphite/60">
      <ol className="max-w-[1440px] mx-auto px-6 md:px-20 py-4 flex items-center gap-2 flex-wrap">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.name}-${index}`} className="flex items-center gap-2">
              {isLast || !item.url ? (
                <span aria-current="page" className="font-mono text-[10px] tracking-[0.18em] uppercase text-uz-white">
                  {item.name}
                </span>
              ) : (
                <Link href={item.url} className="font-mono text-[10px] tracking-[0.18em] uppercase text-uz-slate hover:text-uz-indigo transition-colors">
                  {item.name}
                </Link>
              )}
              {!isLast ? <span className="text-uz-slate/70 text-[10px]">›</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
