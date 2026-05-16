import { useEffect, useState, useSyncExternalStore } from "react";
import { findProduct, type Product } from "./products";

export type CartLine = { productId: string; qty: number };
type CartState = { lines: CartLine[] };

const KEY = "elvior-cart-v1";
let state: CartState = { lines: [] };
const listeners = new Set<() => void>();

function load() {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) state = JSON.parse(raw);
  } catch {}
}
function persist() {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(state));
}
function emit() {
  persist();
  listeners.forEach((l) => l());
}

load();

export const cart = {
  get: () => state,
  add(productId: string, qty = 1) {
    const existing = state.lines.find((l) => l.productId === productId);
    if (existing) existing.qty += qty;
    else state.lines = [...state.lines, { productId, qty }];
    state = { ...state };
    emit();
  },
  setQty(productId: string, qty: number) {
    if (qty <= 0) return cart.remove(productId);
    state.lines = state.lines.map((l) => (l.productId === productId ? { ...l, qty } : l));
    state = { ...state };
    emit();
  },
  remove(productId: string) {
    state.lines = state.lines.filter((l) => l.productId !== productId);
    state = { ...state };
    emit();
  },
  clear() {
    state = { lines: [] };
    emit();
  },
  subscribe(fn: () => void) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },
};

export function useCart() {
  // SSR-safe: start empty, hydrate on client
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  const snap = useSyncExternalStore(
    (cb) => {
      const u = cart.subscribe(cb);
      return () => u;
    },
    () => state,
    () => ({ lines: [] as CartLine[] })
  );
  const lines = hydrated ? snap.lines : [];
  const items = lines
    .map((l) => {
      const p = findProduct(l.productId);
      return p ? { product: p, qty: l.qty } : null;
    })
    .filter(Boolean) as { product: Product; qty: number }[];
  const subtotal = items.reduce((s, i) => s + i.product.price * i.qty, 0);
  const count = items.reduce((s, i) => s + i.qty, 0);
  return { items, subtotal, count };
}
