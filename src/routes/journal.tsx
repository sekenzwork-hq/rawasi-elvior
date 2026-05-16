import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "Journal — Rawasi Elvior" },
      { name: "description", content: "Notes on craft, fragrance families, and the rituals behind a great scent." },
      { property: "og:title", content: "Journal — Rawasi Elvior" },
    ],
  }),
  component: Journal,
});

const POSTS = [
  { tag: "Craft", title: "What makes Cambodian oud the rarest of woods", read: "5 min read" },
  { tag: "Ritual", title: "Layering: how to compose your own signature scent", read: "4 min read" },
  { tag: "Story", title: "Inside the Marina Mall flagship: a conversation with our nose", read: "8 min read" },
  { tag: "Notes", title: "Saffron, rose, and the alchemy of warmth", read: "6 min read" },
];

function Journal() {
  return (
    <section className="max-w-7xl mx-auto px-6 pt-12 pb-20">
      <div className="card-luxe p-10 mb-12">
        <div className="eyebrow">— Journal</div>
        <h1 className="text-4xl md:text-6xl font-serif mt-3">Notes from the <span className="gradient-gold-text italic">atelier</span>.</h1>
        <p className="text-muted-foreground mt-4 max-w-xl">
          Slow reads on craft, ingredients, and the people behind every bottle.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {POSTS.map((p) => (
          <article key={p.title} className="card-luxe p-8 hover:shadow-[var(--shadow-gold)] transition-shadow cursor-pointer">
            <div className="flex justify-between text-[0.65rem] uppercase tracking-widest">
              <span className="text-gold">{p.tag}</span>
              <span className="text-muted-foreground">{p.read}</span>
            </div>
            <h2 className="text-2xl font-serif mt-4">{p.title}</h2>
            <p className="text-sm text-muted-foreground mt-3">
              Continue reading the full essay in the Elvior journal — for those who appreciate the
              quieter side of fragrance.
            </p>
            <span className="inline-block mt-5 text-xs uppercase tracking-widest text-gold border-b border-gold pb-0.5">
              Read essay →
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}
