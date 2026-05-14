# CRUD Angular + NgRx with Signals

A full-featured CRUD application built with **Angular 20** and **NgRx 20**, showcasing real-world usage of Signals, reactive state management, authentication, and testing — designed as practical documentation for both junior and senior developers.

**[Live Demo](https://juanmamunoz.github.io/crud-ngrx-signals/)**

---

## Features

- **CRUD operations** — list, create, edit and delete users with paginated results and real-time search
- **Angular 20** — latest features including `@defer`, `@if`, `@for` control flow and Signals
- **NgRx 20** — Store, Effects and DevTools with full Actions/Reducers/Effects architecture
- **State with Signals** — NgRx state consumed via `toSignal` throughout all components
- **Authentication** — JWT mock tokens, `localStorage` persistence, HTTP interceptor and route guards (`authGuard` / `loginGuard`)
- **User statistics** — per-user performance chart (productivity, hard working, coworker, knowledge, proactivity) rendered with Chart.js
- **Unit testing** — Jasmine + Karma, **99.5% code coverage**, runs headless in CI
- **E2E testing** — Cypress test suite
- **Lazy loading** — `login` and `users` feature modules loaded on demand

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Angular 20 |
| State management | NgRx 20 (Store · Effects · DevTools) |
| Styling | Bootstrap 5.3.3 · Bootstrap Icons 1.11 |
| Charts | Chart.js 4 |
| Input masks | ngx-mask |
| Reactive | RxJS 7.8 |
| Language | TypeScript 5.9 |
| Unit tests | Jasmine · Karma · karma-coverage |
| E2E tests | Cypress 15 |
| Linting | ESLint · angular-eslint · Prettier |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Install & run

```bash
npm install
npm start
```

Open `http://localhost:4200`.

### Login credentials

```
Email:    user@test
Password: ajk38jkÑ
```

---

## Application Structure

```
/login              Login page — info panel, login form, about section
/users              Paginated user list with search and delete
/users/create       Create new user
/users/detail/:id   User detail — view, edit and statistics chart
```

### State slices (NgRx)

| Slice | Responsibility |
|---|---|
| `auth` | Login / logout flow and session state |
| `token` | JWT storage and decoding |
| `message` | Global error messaging |
| `users` | User list, pagination and search |
| `userDetail` | Single user fetch, edit and create |
| `userDelete` | Delete confirmation and execution |

---

## Scripts

| Command | Description |
|---|---|
| `npm start` | Development server at `http://localhost:4200` |
| `npm test` | Unit tests with coverage (ChromeHeadless) |
| `npm run test:dev` | Unit tests in watch mode |
| `npm run e2e:ci` | E2E tests with Cypress |
| `npm run lint` | ESLint |
| `npm run build` | Production build + deploy to GitHub Pages |

> `npm run build` runs lint → unit tests → E2E before building.

---

## Author

**Juan Manuel Muñoz González** — Front-End Architect

- [Portfolio / Resume](https://juanmamunoz.github.io/resume)
- [GitHub](https://github.com/JuanmaMunoz/crud-ngrx-signals)
