# TanStack Better UI Platform

A premium, secure, and fully type-safe authentication dashboard platform built on the modern web stack.

---

## 🚀 Tech Stack

- **Framework**: [TanStack Start](https://tanstack.com/router/latest/docs/framework/react/start/overview) (React-powered full-stack framework with SSR support)
- **Authentication**: [Better Auth](https://www.better-auth.com/) + `@better-auth-ui/heroui` (Passkey, Multi-session, & API keys integration)
- **UI Components**: [HeroUI v3](https://heroui.com/) (Based on React Aria Components for premier accessibility)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (Vibrant colors, dark/light theme integration, glassmorphism)
- **Database**: [Drizzle ORM](https://orm.drizzle.team/) + [Neon / PostgreSQL](https://neon.tech/)
- **Tooling**: [Biome](https://biomejs.dev/) (Linting & Formatting) and [Vitest](https://vitest.dev/) (Testing)

---

## ✨ Features

- **Auth Portal**: Fully styled auth gateway at `/auth` (Sign-in, registration, passwordless sign-ins).
- **Fullscreen Dashboard**: Custom `AppLayout` at `/dashboard` bypassing public headers and footers.
- **Collapsible Sidebar**:
  - Desktop responsive collapsible modes: full-expanded and a rail icon-only mode.
  - Smoothly transitioning `UserButton` profile popover (persists mount status, eliminating layout flashes).
  - Quick Search filtering, active route indicators, and shortcut badging (`⌘K`).
- **Responsive Navigation Drawer**: Slide-out navigation menu for mobile viewports using a backdrop-blurred hamburger panel.
- **Console Analytics**: Metrics statistics, system capacity logs with custom progress bars, and security audit tables.

---

## 🛠️ Getting Started

### 1. Installation
Install project dependencies using `bun`:

```bash
bun install
```

### 2. Environment Variables
Configure your database and Better Auth details. Create a `.env.local` file in the root directory:

```env
DATABASE_URL="your-postgresql-connection-string"
BETTER_AUTH_SECRET="your-generated-better-auth-secret"
BETTER_AUTH_URL="http://localhost:3000" # URL of your client
```

To generate a `BETTER_AUTH_SECRET` on the fly:
```bash
bunx --bun @better-auth/cli secret
```

### 3. Database Migration
Apply schema definitions to your database:

```bash
bun run db:push
```

### 4. Running the Development Server
Launch the local hot-reloaded development environment on port `3000`:

```bash
bun run dev
```

---

## 📦 Building for Production

Compile codebases, generate static routes, and package the Nitro server bundle:

```bash
bun run build
```

To preview the production bundle locally:
```bash
bun run preview
```

---

## 🧹 Code Quality & Testing

### Linting & Formatting
Run Biome checklist suites to clean or lint the codebase:

```bash
bun run check     # Biome check, format, and lint
bun run format    # Format codebase files
```

### Testing
Run unit and integration suites using Vitest:

```bash
bun run test
```
