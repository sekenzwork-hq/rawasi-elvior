import { Link, useLocation } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import crest from "@/assets/crest.png";
import { useCart } from "@/lib/cart-store";
import { openCartDrawer } from "@/components/cart-drawer";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" },
  { to: "/journal", label: "Journal" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const { count } = useCart();
  const { pathname } = useLocation();
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/70 border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-3">
          <img src={crest} alt="Elvior crest" className="h-9 w-9 object-contain" />
          <div className="leading-tight">
            <div className="font-serif text-xl tracking-wider gradient-gold-text">RAWASI ELVIOR</div>
            <div className="eyebrow text-[0.6rem]">Luxury Perfumes</div>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm">
          {NAV.map((n) => {
            const active = pathname === n.to;
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`uppercase tracking-widest text-xs transition-colors ${
                  active ? "text-gold" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {n.label}
                {active && <div className="h-px w-6 mx-auto mt-1 bg-gold" />}
              </Link>
            );
          })}
        </nav>
        <button
          onClick={openCartDrawer}
          className="card-luxe px-4 py-2 flex items-center gap-2 text-xs uppercase tracking-widest hover:shadow-[var(--shadow-gold)] transition-shadow"
          aria-label="Open cart"
        >
          <ShoppingBag className="h-4 w-4 text-gold" />
          <span>Cart</span>
          <span className="bg-gold text-primary-foreground rounded-full h-5 min-w-5 px-1.5 flex items-center justify-center text-[0.65rem] font-semibold">
            {count}
          </span>
        </button>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-32 border-t border-border bg-background/50">
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-1">
          <img src={crest} alt="" className="h-10 w-10 mb-4" />
          <div className="font-serif text-lg gradient-gold-text">RAWASI ELVIOR</div>
          <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
            Contemporary fragrance house redefining luxury with thoughtfully crafted, high-quality
            perfumes for every personality and occasion.
          </p>
        </div>
        {[
          { title: "Shop", links: ["All Fragrances", "For Him", "For Her", "Unisex"] },
          { title: "Brand", links: ["About Us", "Journal", "Store Locator", "Signature Bottle"] },
          { title: "Support", links: ["Cart", "Checkout", "Order Help", "Contact"] },
        ].map((c) => (
          <div key={c.title}>
            <h4 className="text-gold text-sm uppercase tracking-widest mb-4">{c.title}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {c.links.map((l) => (
                <li key={l} className="hover:text-foreground cursor-pointer">{l}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-wrap justify-between items-center text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Rawasi Elvior. Crafted for a bold first impression.</span>
          <span>Buy 2 Get 1 Free with code <span className="text-gold">B2G1</span></span>
        </div>
      </div>
    </footer>
  );
}
