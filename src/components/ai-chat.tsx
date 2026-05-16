import { useEffect, useRef, useState } from "react";
import { Sparkles, Send, X, ShoppingBag } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { PRODUCTS, findProduct } from "@/lib/products";
import { cart } from "@/lib/cart-store";
import { formatINR } from "@/lib/format";
import { toast } from "sonner";

type Msg = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-concierge`;
const ANON = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const STARTERS = [
  "Recommend a bold scent for evenings",
  "I want a fresh everyday perfume",
  "Build me a gift bundle under ₹35,000",
];

export function AiChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Welcome to **Elvior**. I'm your fragrance concierge — tell me the mood, the occasion, or who it's for, and I'll curate the right scent.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggested, setSuggested] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, suggested]);

  async function send(text: string) {
    if (!text.trim() || loading) return;
    const userMsg: Msg = { role: "user", content: text };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);
    setSuggested([]);

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ANON}`,
        },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({ role: m.role, content: m.content })),
          catalog: PRODUCTS.map((p) => ({
            id: p.id,
            name: p.name,
            category: p.category,
            notes: p.notes,
            price: p.price,
            tagline: p.tagline,
          })),
        }),
      });

      if (resp.status === 429) throw new Error("Too many requests — please wait a moment.");
      if (resp.status === 402) throw new Error("AI credits exhausted. Add funds in workspace.");
      if (!resp.body) throw new Error("No response from concierge.");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let assistantText = "";
      let added = false;
      const recIds = new Set<string>();

      const upsert = () => {
        setMessages((m) => {
          if (!added) {
            added = true;
            return [...m, { role: "assistant", content: assistantText }];
          }
          const copy = [...m];
          copy[copy.length - 1] = { role: "assistant", content: assistantText };
          return copy;
        });
      };

      let done = false;
      while (!done) {
        const { done: d, value } = await reader.read();
        if (d) break;
        buffer += decoder.decode(value, { stream: true });
        let nl: number;
        while ((nl = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, nl);
          buffer = buffer.slice(nl + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6).trim();
          if (json === "[DONE]") { done = true; break; }
          try {
            const parsed = JSON.parse(json);
            const choice = parsed.choices?.[0];
            const delta = choice?.delta;
            const content = delta?.content as string | undefined;
            if (content) { assistantText += content; upsert(); }
            const calls = delta?.tool_calls as any[] | undefined;
            if (calls) {
              for (const c of calls) {
                const fnName = c.function?.name;
                const args = c.function?.arguments;
                if (fnName === "add_to_cart" && args) {
                  try {
                    const parsed2 = JSON.parse(args);
                    const items = parsed2.items as { product_id: string; qty?: number }[];
                    for (const it of items ?? []) {
                      const p = findProduct(it.product_id);
                      if (p) {
                        cart.add(p.id, it.qty ?? 1);
                        recIds.add(p.id);
                      }
                    }
                    if (recIds.size) toast.success("Added to your cart by concierge");
                  } catch {}
                }
                if (fnName === "recommend" && args) {
                  try {
                    const parsed2 = JSON.parse(args);
                    (parsed2.product_ids as string[] ?? []).forEach((id) => recIds.add(id));
                  } catch {}
                }
              }
            }
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }
      if (recIds.size) setSuggested(Array.from(recIds));
    } catch (e: any) {
      setMessages((m) => [...m, { role: "assistant", content: `*${e.message ?? "Something went wrong."}*` }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 btn-gold rounded-full px-5 py-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest shadow-[var(--shadow-gold)] hover:scale-105 transition-transform"
          aria-label="Open AI concierge"
        >
          <Sparkles className="h-4 w-4" /> Concierge
        </button>
      )}

      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[min(420px,calc(100vw-2rem))] h-[min(640px,calc(100vh-3rem))] card-luxe flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-surface-elevated">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-gold" />
              <div>
                <div className="font-serif text-base">Elvior Concierge</div>
                <div className="text-[0.65rem] text-muted-foreground uppercase tracking-widest">
                  AI fragrance advisor
                </div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`text-sm leading-relaxed ${
                  m.role === "user"
                    ? "ml-8 bg-gold/10 border border-gold/30 rounded-2xl rounded-tr-sm px-4 py-3"
                    : "mr-8 prose prose-sm prose-invert max-w-none [&_p]:my-1 [&_strong]:text-gold"
                }`}
              >
                <ReactMarkdown>{m.content}</ReactMarkdown>
              </div>
            ))}

            {suggested.length > 0 && (
              <div className="mr-8 space-y-2">
                <div className="eyebrow">Suggested for you</div>
                {suggested.map((id) => {
                  const p = findProduct(id);
                  if (!p) return null;
                  return (
                    <div key={id} className="card-luxe p-3 flex gap-3 items-center">
                      <img src={p.image} alt="" className="h-14 w-14 object-cover rounded-md" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-serif truncate">{p.name}</div>
                        <div className="text-xs text-muted-foreground truncate">{p.tagline}</div>
                        <div className="text-xs text-gold mt-0.5">{formatINR(p.price)}</div>
                      </div>
                      <button
                        onClick={() => { cart.add(p.id); toast.success(`${p.name} added`); }}
                        className="btn-gold rounded-full p-2"
                        aria-label="Add to cart"
                      >
                        <ShoppingBag className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

            {loading && (
              <div className="mr-8 text-xs text-muted-foreground italic">Concierge is composing…</div>
            )}

            {messages.length === 1 && !loading && (
              <div className="flex flex-wrap gap-2 pt-2">
                {STARTERS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="text-xs px-3 py-1.5 rounded-full border border-gold/30 text-muted-foreground hover:text-gold hover:border-gold transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); send(input); }}
            className="border-t border-border p-3 flex gap-2 bg-surface-elevated"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe a mood, occasion, or person…"
              className="flex-1 bg-transparent border border-border rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-gold"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="btn-gold rounded-full p-2.5 disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
