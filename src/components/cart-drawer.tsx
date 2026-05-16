import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ShoppingBag, X, Minus, Plus, Trash2, ArrowRight, Sparkles } from "lucide-react";
import { useCart, cart } from "@/lib/cart-store";
import { formatINR } from "@/lib/format";

export function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, subtotal, count } = useCart();
  const shipping = subtotal > 15000 || subtotal === 0 ? 0 : 499;
  const total = subtotal + shipping;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden
      />
      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-[min(440px,100vw)] flex flex-col bg-surface-elevated border-l border-border shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Shopping cart"
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <div className="flex items-center gap-3">
            <ShoppingBag className="h-4 w-4 text-gold" />
            <div>
              <div className="font-serif text-lg leading-none">Your Cart</div>
              <div className="text-[0.65rem] uppercase tracking-widest text-muted-foreground mt-1">
                {count} {count === 1 ? "item" : "items"}
              </div>
            </div>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground" aria-label="Close cart">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <Sparkles className="h-7 w-7 text-gold mx-auto" />
              <h3 className="font-serif text-xl mt-4">Your cart is empty.</h3>
              <p className="text-sm text-muted-foreground mt-2">Discover a scent that becomes your signature.</p>
              <Link
                to="/shop"
                onClick={onClose}
                className="btn-gold inline-block mt-6 px-6 py-3 rounded-full text-xs uppercase tracking-widest font-semibold"
              >
                Browse fragrances
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map(({ product, qty }) => (
                <div key={product.id} className="card-luxe p-3 flex gap-3 items-center">
                  <Link to="/shop/$id" params={{ id: product.id }} onClick={onClose}>
                    <img src={product.image} alt={product.name} className="h-20 w-20 object-cover rounded-md" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link
                      to="/shop/$id"
                      params={{ id: product.id }}
                      onClick={onClose}
                      className="font-serif text-base block truncate hover:text-gold"
                    >
                      {product.name}
                    </Link>
                    <div className="text-[0.65rem] uppercase tracking-widest text-muted-foreground mt-0.5">
                      {product.size}
                    </div>
                    <div className="text-gold text-sm mt-1">{formatINR(product.price * qty)}</div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2 border border-border rounded-full px-1.5 py-0.5">
                        <button
                          onClick={() => cart.setQty(product.id, qty - 1)}
                          className="p-1 hover:text-gold"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-5 text-center text-xs">{qty}</span>
                        <button
                          onClick={() => cart.setQty(product.id, qty + 1)}
                          className="p-1 hover:text-gold"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => cart.remove(product.id)}
                        className="text-muted-foreground hover:text-destructive p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-border px-6 py-5 space-y-3 bg-background/40">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatINR(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span>{shipping === 0 ? <span className="text-gold">Free</span> : formatINR(shipping)}</span>
            </div>
            <div className="flex justify-between font-serif text-lg pt-2 border-t border-border">
              <span>Total</span>
              <span className="text-gold">{formatINR(total)}</span>
            </div>
            <Link
              to="/cart"
              onClick={onClose}
              className="btn-gold w-full mt-3 py-3.5 rounded-full text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2"
            >
              View cart & checkout <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}

// Hook + global trigger so any component can open the drawer
let openSetter: ((v: boolean) => void) | null = null;
export function openCartDrawer() {
  openSetter?.(true);
}
export function useDrawerState() {
  const [open, setOpen] = useState(false);
  openSetter = setOpen;
  return { open, setOpen };
}
