<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Store-wide brand values (name, currency, contact) live in `src/lib/brand.ts`; product catalogue in `src/data/products.ts` — single sources so rebranding/restocking touches one file.
- Cart, wishlist and compare use one persisted zustand store (`src/lib/store.ts`) with `skipHydration`, rehydrated client-side in `SmoothScroll` to avoid SSR mismatches.
- GSAP effects live in hooks (`src/hooks/use-motion.ts`) wrapped in `gsap.context()` with cleanup and skip under prefers-reduced-motion.
- ThemeProvider manages the shared appearance and saves the choice client-side; light overrides use semantic CSS tokens so every page follows the selected theme without SSR mismatches.
