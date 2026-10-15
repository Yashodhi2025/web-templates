import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartSheet } from "@/components/layout/CartSheet";
import { PageTransition } from "@/components/layout/PageTransition";
import { SmoothScroll } from "@/components/animations/SmoothScroll";
import { Cursor } from "@/components/animations/Cursor";
import { Preloader } from "@/components/animations/Preloader";
import { Button } from "@/components/ui/button";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 pt-24">
      <div className="max-w-md text-center">
        <div className="relative mx-auto mb-6 h-40 w-40">
          <span className="absolute inset-0 grid animate-float place-items-center text-[120px]">🍔</span>
          <span className="absolute -right-2 top-4 animate-bounce text-4xl">😋</span>
        </div>
        <h1 className="display-xl text-8xl text-gradient-sauce">404</h1>
        <h2 className="mt-4 font-display text-2xl font-bold">Someone ate this page.</h2>
        <p className="mt-2 text-muted-foreground">Only crumbs left here. Let's get you back to the good stuff.</p>
        <Button asChild variant="hero" size="xl" className="mt-8"><Link to="/">Back to the kitchen</Link></Button>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">Something went wrong on our end. You can try refreshing or head back home.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <Button variant="hero" onClick={() => { router.invalidate(); reset(); }}>Try again</Button>
          <Button asChild variant="glass"><a href="/">Go home</a></Button>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "BUNZ & CO. — Gourmet Burgers & Mojitos" },
      { name: "description", content: "Gourmet smash burgers, brioche buns and hand-muddled mojitos." },
      { name: "theme-color", content: "#0B0B0C" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=DM+Sans:wght@400;500;600;700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="grain">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[130] focus:rounded-full focus:bg-sauce focus:px-4 focus:py-2 focus:text-charcoal">Skip to content</a>
      <Preloader />
      <SmoothScroll />
      <PageTransition />
      <Cursor />
      <Navbar />
      <CartSheet />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <Toaster position="bottom-center" />
    </QueryClientProvider>
  );
}
