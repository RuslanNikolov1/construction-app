# Construction App

A Next.js application built with TypeScript, SASS (CSS modules), React Hook Form, and GSAP.

## Stack

- **Next.js 16** – App Router
- **TypeScript** – Strict typing
- **SASS + CSS Modules** – Component-scoped styles with `*.module.scss`
- **React Hook Form** – Form state management
- **GSAP** – Animations

## Getting Started

### Prerequisites

- Node.js 20.9+
- pnpm

### Install dependencies

```bash
pnpm install
```

### Run development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production

```bash
pnpm build
```

### Start production server

```bash
pnpm start
```

### Lint

```bash
pnpm lint
```

## Project Structure

```
/app              – Routes (App Router)
/components       – Shared components
  /ui             – Reusable UI components
/features         – Feature modules
/lib              – Shared logic and utilities
/styles           – Global SCSS (variables, mixins)
/types            – Shared TypeScript types
```

## Styling

- Use `*.module.scss` for component styles.
- Import variables and mixins: `@use "../styles/variables" as *;`
- Design tokens live in `styles/variables.scss` (colors, spacing, breakpoints, typography).
