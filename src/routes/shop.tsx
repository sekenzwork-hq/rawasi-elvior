import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { PRODUCTS } from "@/lib/products";
import { ProductCard } from "@/components/product-card";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — Rawasi Elvior" },
      { name: "description", content: "The full Elvior collection: oud, rose, citrus and woody fragrances for him, her and unisex." },
      { property: "og:title", content: "Shop — Rawasi Elvior" },
    ],
  }),
  component: Shop,
});

const FILTERS = ["All", "Him", "Her", "Unisex"] as const;

function Shop() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [query, setQuery] = useState("");

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      const matchCat = filter === "All" || p.category === filter;
      if (!matchCat) return false;
      if (!q) return true;
      const haystack = [p.name, p.tagline, p.description, p.category, ...p.notes]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [filter, query]);

  return (
    <section className="max-w-7xl mx-auto px-6 pt-12 pb-20">
      <div className="card-luxe p-10 mb-12">
        <div className="eyebrow">— Shop</div>
        <h1 className="text-4xl md:text-6xl font-serif mt-3 max-w-3xl">
          The <span className="gradient-gold-text italic">complete</span> Elvior collection.
        </h1>
        <p className="text-muted-foreground mt-4 max-w-xl">
          Each bottle is hand-finished and aged to maturity. Find the scent that becomes part of you.
        </p>
      </div>

      {/* Search + filters */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-10">
        <div className="relative flex-1 max-w-md">
          <Search className="h-4 w-4 text-gold absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, note, or mood…"
            className="w-full bg-surface-elevated border border-border rounded-full pl-11 pr-10 py-3 text-sm focus:outline-none focus:border-gold transition-colors"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2 md:ml-auto">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2 rounded-full text-xs uppercase tracking-widest transition-colors ${
                filter === f
                  ? "btn-gold font-semibold"
                  : "border border-border text-muted-foreground hover:text-gold hover:border-gold"
              }`}
            >
              {f === "All" ? "All" : `For ${f}`}
            </button>
          ))}
        </div>
      </div>

      {list.length === 0 ? (
        <div className="card-luxe p-16 text-center">
          <h3 className="font-serif text-2xl">No fragrances match your search.</h3>
          <p className="text-muted-foreground mt-2 text-sm">
            Try a different note or clear your filters.
          </p>
          <button
            onClick={() => { setQuery(""); setFilter("All"); }}
            className="btn-gold mt-6 px-6 py-3 rounded-full text-xs uppercase tracking-widest font-semibold"
          >
            Reset
          </button>
        </div>
      ) : (
        <>
          <div className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
            Showing {list.length} {list.length === 1 ? "fragrance" : "fragrances"}
            {query && <> for "<span className="text-gold">{query}</span>"</>}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.map((p, i) => (
              <ProductCard key={p.id} product={p} eager={i < 3} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
