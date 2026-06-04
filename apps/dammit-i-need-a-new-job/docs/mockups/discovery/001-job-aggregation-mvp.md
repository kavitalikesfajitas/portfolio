# Discovery 001: Job Aggregation MVP

**Status:** Discovery
**Last Updated:** 2026-06-04

---

## Original Thought

The initial idea is intentionally small:

> Can we support one company using Greenhouse by proxying and caching its
> Job Board API response through a Next.js API route?

This is **not** (yet) a database project, an ingestion pipeline, or a job
tracking platform. The first version only needs to answer:

```txt
Can I call Greenhouse for one company,
normalize the response,
cache it,
and render usable job cards?
```

---

## MVP Hypothesis

```txt
User selects / enters company
        ↓
Next.js API route
        ↓
Greenhouse Job Board API
        ↓
Normalize response
        ↓
Cache by board token
        ↓
Return jobs to UI
```

The MVP deliberately does **not** need: Postgres, Prisma, sync runs, saved
companies, application tracking, job history, or notifications. Those can
come later if the product needs them.

---

## Why Start With Greenhouse?

Greenhouse exposes public job board data through a documented Job Board API
([docs](https://developers.greenhouse.io/job-board.html)), which provides a
JSON representation of a company's offices, departments, and published jobs.

---

## Key Finding: Greenhouse Is Company-Scoped, Not a Search Engine

The most important thing the spike clarified.

We initially assumed Greenhouse might let us search jobs across every company
using it (`"Software Engineer" → all Greenhouse jobs`). It does not work that
way. The API is organized around a per-company **board token**, so the
smallest useful request is:

```txt
board token → jobs
```

Not:

```txt
search term → all matching Greenhouse jobs
```

Greenhouse should therefore be treated as a **company-specific job retrieval
API**, not a global search API.

### Architectural Impact

To support a query like "show me all Staff Frontend Engineer jobs", the app
must own the search layer itself:

1. Know which companies to search
2. Fetch jobs from each company individually
3. Normalize the responses
4. Search across the normalized results

```txt
Discord Jobs
Vercel Jobs
Strava Jobs
AllTrails Jobs
        ↓
Normalize
        ↓
Search
        ↓
Results
```

### Three Problems This Implies

The full product ultimately splits into three separate problems:

1. **ATS Discovery** — identify companies using Greenhouse, Lever, or Ashby.
2. **Job Retrieval** — fetch jobs from those providers.
3. **Search & Aggregation** — unify search across providers.

The MVP intentionally focuses only on **Problem #2**. Discovery and search
remain future concerns.

---

## Greenhouse API Endpoints to Explore

### List Jobs

```http
GET https://boards-api.greenhouse.io/v1/boards/{boardToken}/jobs
```

Example: `GET .../v1/boards/vercel/jobs`

- Fetch published jobs for one Greenhouse board.
- The first proof-of-concept endpoint.

### List Jobs With Content

```http
GET https://boards-api.greenhouse.io/v1/boards/{boardToken}/jobs?content=true
```

- Check whether the list endpoint can include job descriptions.
- If so, we avoid one request per job.

### Retrieve a Single Job

```http
GET https://boards-api.greenhouse.io/v1/boards/{boardToken}/jobs/{jobId}
```

- Fetch richer job-level data if the list endpoint isn't enough.
- Validate whether this is even needed for MVP.

---

## Spike Questions

### 1. Can Greenhouse support multiple companies in one request?

**Assumption: No.** The endpoint is scoped to a single board token, so
multiple companies require multiple requests:

```txt
Discord   → GET /boards/discord/jobs
Vercel    → GET /boards/vercel/jobs
Company X → GET /boards/company-x/jobs
```

```ts
const results = await Promise.all(
  companies.map((company) => fetchGreenhouseJobs(company.boardToken)),
);

const jobs = results.flat();
```

- Is `Promise.all` fast enough for 5–10 companies?
- At what point does this require caching or background sync?

### 2. Can we get rate limited?

**Unknown.** Need to verify:

- Does Greenhouse document rate limits for the Job Board API?
- What happens when we request many board tokens concurrently?
- Are there response headers indicating rate limit state?
- Should we cap concurrency?

Safe default MVP behavior: cache by board token with a TTL, avoid re-fetching
the same company, and limit concurrent requests.

### 3. Is there a way to know all companies using Greenhouse?

**Assumption: Not directly** through the public Job Board API. Possible
discovery strategies:

- **Search engine** — query known URL patterns and extract board tokens:
  ```txt
  site:boards.greenhouse.io "Software Engineer"
  site:job-boards.greenhouse.io "Frontend Engineer"
  ```
- **Career page detection** — fetch a company's careers HTML and look for ATS
  indicators (`boards.greenhouse.io`, `job-boards.greenhouse.io`,
  `boards-api.greenhouse.io`).
- **Guess and validate** — try `GET /v1/boards/{company-slug}/jobs`; if valid,
  store it as a discovered board.

Question: is discovery reliable enough to ship, or should MVP start with
manually entered board tokens?

---

## Proposed Initial MVP

A Next.js proxy endpoint — not a database.

### Route

```http
GET /api/jobs/greenhouse?boardToken={boardToken}
GET /api/jobs/greenhouse?boardToken={boardToken}&content=true
```

### Responsibilities

1. Validate the board token (against our list).
2. Build the Greenhouse API URL.
3. Check cache.
4. Fetch from Greenhouse on cache miss.
5. Normalize the response.
6. Cache the normalized response.
7. Return jobs to the UI.

### Cache Key

```txt
greenhouse:jobs:{boardToken}:{contentFlag}
```

Example: `greenhouse:jobs:vercel:content-true`

### Normalized Job Shape

```ts
type NormalizedJob = {
  source: "greenhouse";
  sourceJobId: string;
  companySlug: string;
  title: string;
  location: string | null;
  remote: boolean;
  url: string;
  updatedAt?: string;
  content?: string;
  raw?: unknown;
};
```

---

## Open Questions

### Greenhouse API

- Does `content=true` reliably include descriptions?
- Are locations consistent?
- Are departments/offices useful for filtering?
- Is pagination needed?
- Are rate limits documented? Are response headers useful for caching?

### Product

- Should users enter a board token directly, or paste a careers URL?
- Should we support one company at a time first?
- Should multi-company search happen through `Promise.all`?
- Should we build provider discovery before supporting multiple providers?

### Caching

- Start with Next.js fetch caching, then move to Vercel KV / Redis later?
- What TTL makes sense?
- Should content responses have a longer TTL than basic job lists?

---

## Definition of Done

- A Next.js API endpoint fetches jobs from one Greenhouse board.
- The endpoint accepts a `boardToken` query param.
- The response is normalized into a stable internal shape.
- Results are cached by board token.
- The UI can render job cards from the proxy endpoint.
- No database is required.

---

## Future Work

- Detect a Greenhouse board token from a careers URL.
- Support multiple Greenhouse board tokens.
- Add Lever and Ashby adapters.
- Build a company/provider registry.
- Add background refresh only if live fetching becomes too slow.
- Add persistence only if saved companies, alerts, or history become necessary.
