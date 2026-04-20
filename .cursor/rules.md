# Project rules — React, TypeScript, Ant Design

These rules apply to this codebase. Follow them when adding or changing code.

---

## 1. Code style

- **TypeScript:** Use strict mode (`strict: true` in `tsconfig`). Prefer explicit types on public APIs; avoid `any` unless justified.
- **Components:** Use **functional components only**. Do not use class components.
- **State and lifecycle:** Use **React hooks** (`useState`, `useEffect`, custom hooks, etc.). No legacy lifecycle patterns.
- **Naming:**
  - Components: `PascalCase` (e.g. `UserCard`, `ProjectList`).
  - Files/folders for components: match the component name (e.g. `UserCard/UserCard.tsx`).
  - Hooks: prefix with `use` (`useAuth`, `useProjects`).
  - Booleans: `is`, `has`, `should` prefixes where it aids clarity (`isLoading`, `hasError`).
  - Handlers: `handle` + event (`handleSubmit`, `handleClick`).
  - Constants: `UPPER_SNAKE` for true module-level constants; otherwise `camelCase`.

---

## 2. Project structure

- **`pages/`** — Route-level screens and page composition only.
- **`components/`** — Reusable UI and domain building blocks shared across pages.
- **One component per folder:** Each component lives in its own folder (e.g. `components/UserCard/UserCard.tsx`), with colocated tests, styles, or small helpers next to it when needed.
- **Keep files small and modular:** Prefer several focused files over large monoliths. Extract subcomponents or hooks when a file grows hard to scan.

---

## 3. UI rules

- **Ant Design:** Prefer **Ant Design** primitives (`Button`, `Layout`, `Form`, `Table`, `Typography`, `Space`, `Row`/`Col`, etc.) over ad-hoc markup unless a design requires otherwise.
- **No inline styles:** Do not use the `style={{ ... }}` prop for layout or theming. Use Ant Design props, CSS Modules, or a single agreed styling approach (e.g. global/less variables aligned with Ant Design).
- **Spacing and layout:** Use Ant Design layout and spacing utilities (`Space`, `Row`/`Col`, padding/margin props where supported) for consistent rhythm.
- **Look and feel:** Keep the UI **clean and minimal** — avoid visual noise, redundant borders, and inconsistent typography scales.

---

## 4. AI usage guidelines

- **Prefer AI-assisted generation** for boilerplate and repetitive patterns; review and align output with these rules before merging.
- **Keep solutions simple and production-ready:** Favor straightforward implementations over clever abstractions unless complexity is clearly needed.
- **Avoid unnecessary complexity:** No extra layers, dependencies, or patterns that the project does not already use.
- **Respect the repo:** Follow **existing** folder layout, naming, and patterns; extend them rather than inventing parallel structures.

---

## 5. Ant Design usage

- Always use Ant Design components for UI (Button, Card, Layout, Typography, etc.)
- Do not build custom UI if Ant Design already provides a component
- Use Ant Design layout system (Row, Col, Space)
- Use Typography components instead of raw HTML text
- Keep UI minimal and consistent with Ant Design design system

When in doubt, match the closest existing page or component in this repository.
