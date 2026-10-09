# nog_139 — Portfólio do Vinícius Nogueira

https://nog139.com.br

React 19 · TanStack Router (file-based) · Tailwind CSS v4 · HeroUI v3 · Motion

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
```

## Estrutura

- `src/lib/content.ts` — todo o conteúdo (PT/EN): experiências, projetos, skills, textos.
- `src/components/Avatar.tsx` — avatar SVG em camadas que segue o cursor (cabeça + olhos), pisca e reage ao humor (`src/lib/mood.ts`).
- `src/components/CommandPalette.tsx` — paleta de comandos (Ctrl/⌘ + K).
- `src/routes/` — `/` (home) e `/work/$slug` (detalhe de cada experiência).
- `src/styles.css` — tokens de tema (sobrescrevem os do HeroUI) e cores do avatar (`--skin`, `--hair`, `--shirt`).
