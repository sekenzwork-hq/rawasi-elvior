import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Mail, Phone } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Rawasi Elvior" },
      { name: "description", content: "Reach the Elvior boutique, or message us — we reply within one business day." },
      { property: "og:title", content: "Contact — Rawasi Elvior" },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section className="max-w-7xl mx-auto px-6 pt-12 pb-20">
      <div className="card-luxe p-10 mb-10">
        <div className="eyebrow">— Contact</div>
        <h1 className="text-4xl md:text-6xl font-serif mt-3">We'd love to <span className="gradient-gold-text italic">hear</span> from you.</h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {[
          { Icon: MapPin, title: "Flagship boutique", body: "Marina Mall, Chennai\nLower Ground, Wing 2" },
          { Icon: Mail, title: "Email", body: "concierge@elvior.com\nReply within 24 hrs" },
          { Icon: Phone, title: "Phone", body: "+91 (44) 4502 8201\nMon–Sat · 10am–9pm" },
        ].map(({ Icon, title, body }) => (
          <div key={title} className="card-luxe p-7">
            <Icon className="h-5 w-5 text-gold" />
            <h3 className="font-serif text-xl mt-3">{title}</h3>
            <p className="text-sm text-muted-foreground mt-2 whitespace-pre-line">{body}</p>
          </div>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSent(true);
          toast.success("Message sent — we'll be in touch shortly.");
        }}
        className="card-luxe p-8 md:p-12 mt-10 max-w-3xl mx-auto"
      >
        <h2 className="font-serif text-3xl">Write to us</h2>
        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <input required placeholder="Name" className="bg-transparent border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-gold" />
          <input required type="email" placeholder="Email" className="bg-transparent border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-gold" />
        </div>
        <input placeholder="Subject" className="bg-transparent border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-gold w-full mt-4" />
        <textarea required rows={5} placeholder="Your message" className="bg-transparent border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-gold w-full mt-4 resize-none" />
        <button type="submit" disabled={sent} className="btn-gold mt-6 px-8 py-3.5 rounded-full text-xs uppercase tracking-widest font-semibold disabled:opacity-60">
          {sent ? "Sent" : "Send message"}
        </button>
      </form>
    </section>
  );
}
