import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, Sparkles, ArrowRight } from "lucide-react";
import { useCart, cart } from "@/lib/cart-store";
import { formatINR } from "@/lib/format";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — Rawasi Elvior" },
      { name: "description", content: "Review your selected fragrances and continue to checkout." },
    ],
  }),
  component: Cart,
});

function Cart() {
  const { items, subtotal, count } = useCart();
  const shipping = subtotal > 15000 ? 0 : 499;
  const total = subtotal + shipping;

  return (
    <section className="max-w-7xl mx-auto px-6 pt-12 pb-20">
      <div className="card-luxe p-10 mb-10">
        <div className="eyebrow">— Your cart</div>
        <h1 className="text-4xl md:text-5xl font-serif mt-3 max-w-3xl">
          The buying path now feels like a <span className="gradient-gold-text italic">complete journey</span>.
        </h1>
        <p className="text-muted-foreground mt-4 max-w-xl">
          Review quantities, apply codes, and continue to a clean, confident checkout.
        </p>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20 card-luxe">
          <Sparkles className="h-8 w-8 text-gold mx-auto" />
          <h2 className="text-2xl font-serif mt-4">Your cart is empty.</h2>
          <p className="text-muted-foreground mt-2">Let our concierge help you choose, or browse the collection.</p>
          <div className="mt-6 flex justify-center gap-3">
            <Link to="/shop" className="btn-gold px-6 py-3 rounded-full text-xs uppercase tracking-widest font-semibold">
              Browse fragrances
            </Link>
            <button
              onClick={() => document.querySelector<HTMLButtonElement>('[aria-label="Open AI concierge"]')?.click()}
              className="px-6 py-3 rounded-full text-xs uppercase tracking-widest border border-gold/50 text-gold hover:bg-gold/10"
            >
              Ask concierge
            </button>
          </div>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map(({ product, qty }) => (
              <div key={product.id} className="card-luxe p-5 flex gap-5 items-center">
                <img src={product.image} alt={product.name} className="h-24 w-24 object-cover rounded-lg" />
                <div className="flex-1">
                  <div className="font-serif text-xl">{product.name}</div>
                  <div className="text-xs text-muted-foreground">For {product.category} · {product.size}</div>
                  <div className="text-gold mt-1">{formatINR(product.price)}</div>
                </div>
                <div className="flex items-center gap-3 border border-border rounded-full px-2 py-1">
                  <button onClick={() => cart.setQty(product.id, qty - 1)} className="p-1 hover:text-gold">
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-6 text-center text-sm">{qty}</span>
                  <button onClick={() => cart.setQty(product.id, qty + 1)} className="p-1 hover:text-gold">
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
                <button
                  onClick={() => cart.remove(product.id)}
                  className="text-muted-foreground hover:text-destructive p-2"
                  aria-label="Remove"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
          <aside className="card-luxe p-7 h-fit lg:sticky lg:top-24">
            <h2 className="font-serif text-2xl">Order Summary</h2>
            <div className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Items</span><span>{count}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatINR(subtotal)}</span></div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>{shipping === 0 ? <span className="text-gold">Free</span> : formatINR(shipping)}</span>
              </div>
              <div className="border-t border-border pt-3 mt-3 flex justify-between font-serif text-xl">
                <span>Total</span><span className="text-gold">{formatINR(total)}</span>
              </div>
            </div>
            <button className="btn-gold w-full mt-6 py-3.5 rounded-full text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2">
              Continue to checkout <ArrowRight className="h-4 w-4" />
            </button>
            <p className="text-[0.65rem] text-muted-foreground mt-3 text-center uppercase tracking-widest">
              Secure transaction · Complimentary samples
            </p>
          </aside>
        </div>
      )}
    </section>
  );
}
