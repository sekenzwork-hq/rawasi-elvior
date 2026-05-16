import { Outlet, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { Header, Footer } from "@/components/layout";
import { AiChat } from "@/components/ai-chat";
import { CartDrawer, useDrawerState } from "@/components/cart-drawer";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-7xl font-serif gradient-gold-text">404</h1>
        <h2 className="mt-4 text-xl">This bottle doesn't exist on our shelf.</h2>
        <a href="/" className="btn-gold inline-block mt-6 px-6 py-3 rounded-full text-xs uppercase tracking-widest">
          Back to home
        </a>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Rawasi Elvior — Luxury Perfumes" },
      { name: "description", content: "Crafted for a bold first impression. Discover Rawasi Elvior luxury fragrances with a personal AI concierge." },
      { property: "og:title", content: "Rawasi Elvior — Luxury Perfumes" },
      { property: "og:description", content: "Crafted for a bold first impression." },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { open, setOpen } = useDrawerState();
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <CartDrawer open={open} onClose={() => setOpen(false)} />
      <AiChat />
      <Toaster theme="dark" position="top-center" />
    </>
  );
}
