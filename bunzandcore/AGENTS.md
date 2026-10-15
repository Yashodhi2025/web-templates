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

- Brand text lives in src/lib/brand.ts and menu/content in src/data/*; cart uses a persisted zustand store in src/lib/cart.ts — single source of truth for edits.
- GSAP/Lenis are dynamically imported inside effects (useGsap helper) — keeps SSR safe and initial bundle small.
