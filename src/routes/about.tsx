import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Rawasi Elvior" },
      { name: "description", content: "From a fragrance brochure to a full brand experience. Learn about the Elvior craft, story, and team." },
      { property: "og:title", content: "About — Rawasi Elvior" },
    ],
  }),
  component: About,
});

function About() {
  return (
    <section className="max-w-7xl mx-auto px-6 pt-12 pb-20">
      <div className="card-luxe p-10 md:p-14 mb-12">
        <div className="eyebrow">— About us</div>
        <h1 className="text-4xl md:text-6xl font-serif mt-4 leading-tight">
          From a fragrance brochure to a <span className="gradient-gold-text italic">full brand experience</span>.
        </h1>
        <p className="text-muted-foreground mt-6 max-w-2xl leading-relaxed">
          Elvior was built as a complete luxury commerce experience — richer product details,
          cleaner pages, real product visuals, a quiet cart and a measured checkout flow, paired
          with a concierge that actually understands scent.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 items-start">
        <div>
          <div className="eyebrow">— Our story</div>
          <h2 className="text-3xl md:text-4xl font-serif mt-3">Timeless elegance with a modern expression.</h2>
          <p className="text-muted-foreground mt-5 leading-relaxed">
            Rooted in the perfumery traditions of the Gulf and reinterpreted through contemporary
            craft, every Elvior bottle is a study in restraint and richness — Cambodian oud,
            Bulgarian rose, Italian bergamot — composed by master perfumers in small batches.
          </p>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            We believe a great scent is a quiet signature. It enters the room before you do.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[
            ["12+", "Master accords"],
            ["08", "Years of craft"],
            ["140K", "Loyal patrons"],
            ["100%", "Hand-finished"],
            ["50+", "Cities shipped"],
            ["02", "Flagship boutiques"],
          ].map(([n, l]) => (
            <div key={l} className="card-luxe p-5 text-center">
              <div className="font-serif text-3xl gradient-gold-text">{n}</div>
              <div className="text-[0.65rem] uppercase tracking-widest text-muted-foreground mt-2">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
