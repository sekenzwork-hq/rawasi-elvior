import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import type { Product } from "@/lib/products";
import { cart } from "@/lib/cart-store";
import { openCartDrawer } from "@/components/cart-drawer";
import { formatINR } from "@/lib/format";
import { toast } from "sonner";

export function ProductCard({ product, eager = false }: { product: Product; eager?: boolean }) {
  return (
    <div className="group card-luxe overflow-hidden flex flex-col">
      <Link
        to="/shop/$id"
        params={{ id: product.id }}
        className="relative block aspect-[4/5] overflow-hidden"
      >
        <img
          src={product.image}
          alt={product.name}
          loading={eager ? "eager" : "lazy"}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 eyebrow bg-background/60 backdrop-blur px-3 py-1 rounded-full">
          For {product.category}
        </div>
      </Link>
      <div className="p-6 flex flex-col gap-3 flex-1">
        <div>
          <h3 className="text-2xl font-serif">{product.name}</h3>
          <p className="text-sm text-muted-foreground mt-1">{product.tagline}</p>
        </div>
        <div className="flex items-center justify-between mt-auto pt-4">
          <span className="text-gold font-serif text-xl">{formatINR(product.price)}</span>
          <button
            onClick={() => {
              cart.add(product.id);
              openCartDrawer();
              toast.success(`${product.name} added to cart`);
            }}
            className="btn-gold px-4 py-2 rounded-full text-xs uppercase tracking-widest font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <ShoppingBag className="h-3.5 w-3.5" /> Add
          </button>
        </div>
      </div>
    </div>
  );
}
