import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import { findProduct, PRODUCTS } from "@/lib/products";
import { cart } from "@/lib/cart-store";
import { openCartDrawer } from "@/components/cart-drawer";
import { formatINR } from "@/lib/format";
import { toast } from "sonner";

export const Route = createFileRoute("/shop/$id")({
  loader: ({ params }) => {
    const product = findProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.product.name ?? "Fragrance"} — Rawasi Elvior` },
      { name: "description", content: loaderData?.product.description ?? "" },
      { property: "og:title", content: `${loaderData?.product.name ?? ""} — Rawasi Elvior` },
      { property: "og:description", content: loaderData?.product.description ?? "" },
      { property: "og:image", content: loaderData?.product.image ?? "" },
    ],
  }),
  component: ProductPage,
  notFoundComponent: () => (
    <div className="max-w-3xl mx-auto px-6 py-24 text-center">
      <h1 className="text-3xl font-serif">Fragrance not found.</h1>
      <Link to="/shop" className="text-gold mt-4 inline-block">Back to shop</Link>
    </div>
  ),
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const related = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <section className="max-w-7xl mx-auto px-6 pt-10 pb-20">
      <Link to="/shop" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-gold mb-8">
        <ArrowLeft className="h-3 w-3" /> Back to shop
      </Link>

      <div className="grid lg:grid-cols-2 gap-12">
        <div className="card-luxe overflow-hidden">
          <img src={product.image} alt={product.name} className="w-full aspect-[4/5] object-cover" />
        </div>
        <div className="flex flex-col">
          <div className="eyebrow">— For {product.category}</div>
          <h1 className="text-5xl md:text-6xl font-serif mt-4">{product.name}</h1>
          <p className="text-muted-foreground mt-2 italic">{product.tagline}</p>
          <div className="mt-6 text-3xl font-serif text-gold">{formatINR(product.price)}</div>
          <p className="mt-2 text-sm text-muted-foreground">{product.size}</p>

          <p className="mt-8 leading-relaxed text-foreground/90">{product.description}</p>

          <div className="mt-8">
            <div className="eyebrow mb-3">— Composition</div>
            <div className="flex flex-wrap gap-2">
              {product.notes.map((n: string) => (
                <span key={n} className="px-3 py-1.5 rounded-full border border-gold/30 text-xs">
                  {n}
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={() => { cart.add(product.id); openCartDrawer(); toast.success(`${product.name} added to cart`); }}
            className="btn-gold mt-10 px-8 py-4 rounded-full text-sm uppercase tracking-widest font-semibold flex items-center justify-center gap-2 self-start"
          >
            <ShoppingBag className="h-4 w-4" /> Add to cart
          </button>
        </div>
      </div>

      <div className="mt-24">
        <h2 className="text-3xl font-serif mb-8">You may also love</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {related.map((p) => (
            <Link
              key={p.id}
              to="/shop/$id"
              params={{ id: p.id }}
              className="card-luxe overflow-hidden group block"
            >
              <img src={p.image} alt={p.name} loading="lazy" className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="p-5">
                <h3 className="font-serif text-xl">{p.name}</h3>
                <p className="text-sm text-muted-foreground">{p.tagline}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
