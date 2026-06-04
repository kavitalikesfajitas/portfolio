# Discovery 001: Job Aggregation MVP

**Status:** Discovery  
**Last Updated:** 2026-06-04

---

## Original Thought

The initial idea is intentionally small:

> Explore whether we can support one company using Greenhouse, then proxy/cache the Greenhouse response through a Next.js API endpoint.

This is not a database project yet.  
This is not a full ingestion pipeline yet.  
This is not a job tracking platform yet.

The first version should answer:

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
Cache by query / board token
        ↓
Return jobs to UI
```

For MVP, the app does **not** need:

- Postgres
- Prisma
- sync runs
- saved companies
- application tracking
- job history
- notifications

Those can come later if the product needs them.

---

## Why Start With Greenhouse?

Greenhouse appears to expose public job board data through a documented Job Board API.

Official docs:

https://developers.greenhouse.io/job-board.html

The docs describe access to a JSON representation of a company's offices, departments, and published jobs.

---

## Greenhouse API Endpoints to Explore

### List Jobs

```http
GET https://boards-api.greenhouse.io/v1/boards/{boardToken}/jobs
```

Example:

```http
GET https://boards-api.greenhouse.io/v1/boards/vercel/jobs
```

Purpose:

- Fetch published jobs for one Greenhouse board
- Use this as the first proof-of-concept endpoint

---

### List Jobs With Content

```http
GET https://boards-api.greenhouse.io/v1/boards/{boardToken}/jobs?content=true
```

Example:

```http
GET https://boards-api.greenhouse.io/v1/boards/vercel/jobs?content=true
```

Purpose:

- Determine whether the list endpoint can include job descriptions
- Avoid making one request per job if this provides enough detail

---

### Retrieve a Single Job

```http
GET https://boards-api.greenhouse.io/v1/boards/{boardToken}/jobs/{jobId}
```

Example:

```http
GET https://boards-api.greenhouse.io/v1/boards/vercel/jobs/123456
```

Purpose:

- Fetch richer job-level data if the list endpoint is not enough
- Validate whether this is needed for MVP

---

## Questions to Answer During Greenhouse Spike

### 1. Can Greenhouse support multiple companies in one request?

Current assumption:

No.

The endpoint appears to be scoped to a single board token:

```txt
/boards/{boardToken}/jobs
```

That means multiple companies likely require multiple requests:

```txt
Discord   → GET /boards/discord/jobs
Vercel    → GET /boards/vercel/jobs
Company X → GET /boards/company-x/jobs
```

Potential implementation:

```ts
const results = await Promise.all(
  companies.map((company) => fetchGreenhouseJobs(company.boardToken)),
);

const jobs = results.flat();
```

Spike question:

- Is this fast enough for 5-10 companies?
- At what point does this require caching or background sync?

---

### 2. Can we get rate limited?

Unknown.

Need to verify:

- Does Greenhouse document rate limits for the Job Board API?
- What happens if we request many board tokens concurrently?
- Are there response headers indicating rate limit state?
- Should we cap concurrency?

Potential safe MVP behavior:

```txt
- Cache responses by board token
- Add a TTL
- Avoid fetching the same company repeatedly
- Limit concurrent Greenhouse requests
```

---

### 3. Is there a way to know all companies using Greenhouse?

Current assumption:

Not directly through Greenhouse's public Job Board API.

Possible discovery strategies:

#### Search Engine Discovery

Search for known Greenhouse URL patterns:

```txt
site:boards.greenhouse.io "Software Engineer"
site:job-boards.greenhouse.io "Frontend Engineer"
```

Then extract company board tokens from URLs.

#### Career Page Detection

Given a company careers URL:

```txt
https://careers.company.com
```

Fetch the page HTML and look for known ATS indicators:

```txt
boards.greenhouse.io
job-boards.greenhouse.io
boards-api.greenhouse.io
```

#### Guess and Validate

Given a known company slug:

```txt
company-slug
```

Try:

```http
GET https://boards-api.greenhouse.io/v1/boards/{company-slug}/jobs
```

If the response is valid, store it as a discovered Greenhouse board.

Spike question:

- Is discovery reliable enough to become part of the product?
- Or should MVP start with manually entered board tokens?

---

## What We Learned / Current Thinking

### Greenhouse Is Board-Token Based

The Greenhouse API is organized around a company-specific board token.

This means the smallest useful request is:

```txt
board token → jobs
```

Not:

```txt
query → all matching Greenhouse jobs
```

So if the product wants jobs across multiple companies, the app needs to know the relevant board tokens first.

---

### Greenhouse Does Not Appear To Be a Search API

The public Job Board API is useful for retrieving published jobs for a known company board.

It does not appear to be designed as a global job search API across all Greenhouse customers.

That changes the product shape.

The app likely needs one of these:

```txt
Option A: User provides company / careers URL
Option B: App maintains a registry of company board tokens
Option C: App discovers board tokens from the web
```

---

### MVP Should Be a Proxy, Not a Database

The first version should be a Next.js proxy endpoint.

Example:

```txt
GET /api/jobs/greenhouse?boardToken=vercel
```

Flow:

```txt
Next.js API route
      ↓
Check cache
      ↓
Fetch Greenhouse if needed
      ↓
Normalize response
      ↓
Return JSON
```

Potential cache key:

```txt
greenhouse:jobs:{boardToken}:{contentFlag}
```

Example:

```txt
greenhouse:jobs:vercel:content-true
```

---

## Proposed Initial MVP

### Route

```http
GET /api/jobs/greenhouse?boardToken={boardToken}
```

Optional:

```http
GET /api/jobs/greenhouse?boardToken={boardToken}&content=true
```

---

### Responsibilities

The route should:

1. Validate the board token (based on our list)
2. Build the Greenhouse API URL
3. Check cache
4. Fetch from Greenhouse on cache miss
5. Normalize the response
6. Cache the normalized response
7. Return jobs to the UI

---

## Important Discovery: Greenhouse Is Not A Search Engine

One of the initial assumptions was that Greenhouse might provide a way to search jobs across all companies using Greenhouse.

For example:

```txt
Software Engineer
      ↓
Greenhouse
      ↓
Results
```

Current understanding suggests this is not how the Job Board API works.

Greenhouse appears to be organized around individual company board tokens.

Example:

```http
GET /boards/vercel/jobs
GET /boards/discord/jobs
GET /boards/company/jobs
```

This means Greenhouse provides:

```txt
Known Company
      ↓
Known Board Token
      ↓
Jobs
```

Not:

```txt
Search Term
      ↓
All Greenhouse Companies
      ↓
Results
```

As a result, Greenhouse should be viewed as a company-specific job retrieval API rather than a global search API.

### Architectural Impact

This changes the shape of the product.

If we want functionality like:

```txt
Show me all Staff Frontend Engineer jobs
```

the application must:

1. Know which companies to search
2. Fetch jobs from each company individually
3. Normalize responses
4. Build its own search layer

Example:

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

### Product Implications

The project may ultimately require solving three separate problems:

1. ATS Discovery
   - How do we identify companies using Greenhouse, Lever, or Ashby?

2. Job Retrieval
   - How do we fetch jobs from those providers?

3. Search & Aggregation
   - How do we provide a unified search experience across providers?

The MVP intentionally focuses only on Problem #2:

```txt
boardToken
      ↓
Fetch Jobs
      ↓
Normalize
      ↓
Cache
      ↓
UI
```

Search and aggregation remain future concerns.

### Example Normalized Job Shape

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
- Are rate limits documented?
- Are response headers useful for caching?

### Product

- Should users enter a board token directly?
- Should users paste a careers URL instead?
- Should we support one company at a time first?
- Should multi-company search happen through `Promise.all`?
- Should we build provider discovery before supporting multiple providers?

### Caching

- Should cache use Next.js fetch caching first?
- Should cache use Vercel KV / Redis later?
- What TTL makes sense?
- Should content responses have a longer TTL than basic job list responses?

---

## MVP Definition of Done

- A Next.js API endpoint can fetch jobs from one Greenhouse board
- The endpoint supports a board token query param
- The response is normalized into a stable internal shape
- Results are cached by board token
- The UI can render job cards from the proxy endpoint
- No database is required

---

## Future Work

- Detect Greenhouse board token from careers URL
- Support multiple Greenhouse board tokens
- Add Lever adapter
- Add Ashby adapter
- Build company/provider registry
- Add background refresh only if live fetching becomes too slow
- Add persistence only if saved companies, alerts, or history become necessary
