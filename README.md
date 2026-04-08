# GitHub Repo Explorer

A React + TypeScript single-page app that lets you search for a GitHub user, inspect profile details, and browse repositories with client-side filtering and sorting.

## Setup Instructions

### Prerequisites

- Node.js 20+
- npm 10+

### Install and Run

```bash
npm install
npm run dev
```

Open the app in your browser at the local Vite URL shown in the terminal (usually `http://localhost:5173`).

### Build and Preview

```bash
npm run build
npm run preview
```

### Lint

```bash
npm run lint
```

## Project Highlights

- Search GitHub users and fetch both profile + repositories in parallel.
- Debounced search input (550ms) with immediate submit support.
- Loading skeletons for user and repository sections.
- Clear empty/error states for first load, no repos, and no filter matches.
- Recent searches persisted to local storage (up to 5 usernames).
- Client-side filters for repository name, language, and sort order.

## Key Design Decisions

1. Dedicated data hook (`useGitHubUser`)
   - API orchestration, loading state, error handling, and cancellation live in one hook.
   - UI components stay focused on rendering and interaction.

2. Abort stale requests
   - New searches cancel in-flight requests to prevent race conditions and stale UI updates.

3. Small service layer (`services/http.ts`, `services/githubApi.ts`)
   - Axios instance centralizes base URL and headers.
   - GitHub-specific endpoints stay isolated from view logic.

4. Thin, composable UI components
   - `ExplorerPage` manages page-level state.
   - Presentational components (`UserProfile`, `RepoList`, `Filters`, etc.) keep concerns separated.

5. Client-first filtering and sorting
   - Repos are fetched once per user search (up to 30 items), then filtered/sorted in-memory for snappy interactions.

## Conscious Trade-offs

1. Unauthenticated GitHub API requests
   - Chosen to keep setup simple with zero required secrets.
   - Trade-off: stricter GitHub rate limits for heavy usage.

2. `per_page=30` repository cap
   - Keeps payloads lightweight and UI responsive.
   - Trade-off: users with many repositories do not see a complete list.

3. Client-side filtering only
   - Reduces API calls and complexity.
   - Trade-off: filter scope is limited to the fetched repository subset.

4. Local storage for recent history
   - No backend required and improves convenience.
   - Trade-off: history is browser/device specific and not shareable.

5. Route scope intentionally minimal
   - Single functional explorer route keeps the app easy to reason about for a take-home style project.
   - Trade-off: no deep links for specific users or filter state.

## Potential Next Improvements

- Optional token-based auth via environment variables to improve rate limits.
- Pagination/infinite scroll for large repository lists.
- URL query param sync for username and filters.
- Automated tests for hook logic and key UI states.
