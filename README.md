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
- Floating search-history dropdown with keyboard support (Arrow keys, Enter, Escape).
- Client-side filters for repository name, language, and sort order.
- Client-side pagination for repository results (6 repos per page).

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

6. Client-side pagination after filtering/sorting
   - Pagination is applied to the filtered/sorted result so each page reflects the current view correctly.
   - Page resets are handled when search/filter/sort changes to avoid out-of-range pages.

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

4. Client-side pagination only
   - Fast and simple for small datasets.
   - Trade-off: it paginates only the already-fetched repos, not the full account repository set.

5. Local storage for recent history
   - No backend required and improves convenience.
   - Trade-off: history is browser/device specific and not shareable.

6. Route scope intentionally minimal
   - Single functional explorer route keeps the app easy to reason about for a take-home style project.
   - Trade-off: no deep links for specific users or filter state.