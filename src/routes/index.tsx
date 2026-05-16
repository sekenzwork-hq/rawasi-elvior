import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, ArrowRight } from "lucide-react";
import hero from "@/assets/hero-perfume.jpg";
import { PRODUCTS } from "@/lib/products";
import { ProductCard } from "@/components/product-card";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const featured = PRODUCTS.slice(0, 3);
  return (
    <>
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 pt-12 pb-20 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="eyebrow mb-6">— Niche Indian Maison · Est. 2024</div>
          <h1 className="text-5xl md:text-7xl font-serif leading-[1.05]">
            Crafted for a<br />
            <span className="gradient-gold-text italic">bold first</span> impression.
          </h1>
          <p className="mt-6 text-muted-foreground max-w-md leading-relaxed">
            Rawasi Elvior is a niche fragrance house in the tradition of Chanel and Creed —
            small batches, rare materials, and a personal AI concierge to compose your signature.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/shop"
              className="btn-gold px-7 py-3.5 rounded-full text-xs uppercase tracking-widest font-semibold flex items-center gap-2"
            >
              Shop the collection <ArrowRight className="h-4 w-4" />
            </Link>
            <button
              onClick={() => document.querySelector<HTMLButtonElement>('[aria-label="Open AI concierge"]')?.click()}
              className="px-7 py-3.5 rounded-full text-xs uppercase tracking-widest border border-gold/50 text-gold hover:bg-gold/10 transition-colors flex items-center gap-2"
            >
              <Sparkles className="h-4 w-4" /> Ask the concierge
            </button>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-10 bg-gold/10 blur-3xl rounded-full" aria-hidden />
          <img
            src={hero}
            alt="Signature Elvior perfume bottle in golden lighting"
            width={1024}
            height={1280}
            className="relative card-luxe w-full object-cover aspect-[4/5]"
          />
        </div>
      </section>

      {/* CATEGORY STRIP */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <div className="eyebrow">— The collection</div>
          <h2 className="text-4xl md:text-5xl font-serif mt-2">A scent for every chapter.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/shop" className="text-gold text-xs uppercase tracking-widest border-b border-gold pb-1">
            View all fragrances
          </Link>
        </div>
      </section>

      {/* AI CONCIERGE PITCH */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="card-luxe p-10 md:p-16 text-center">
          <Sparkles className="h-8 w-8 text-gold mx-auto" />
          <h2 className="text-3xl md:text-5xl font-serif mt-4">
            Meet your <span className="gradient-gold-text italic">personal concierge</span>.
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4 leading-relaxed">
            Describe a mood, an occasion, or a person. Our AI advisor will compose a recommendation,
            build a bundle within your budget, and add it to your cart in one tap.
          </p>
          <button
            onClick={() => document.querySelector<HTMLButtonElement>('[aria-label="Open AI concierge"]')?.click()}
            className="btn-gold mt-8 px-7 py-3.5 rounded-full text-xs uppercase tracking-widest font-semibold inline-flex items-center gap-2"
          >
            Start the conversation <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>
    </>
  );
}
