# Job API Decisions

This note captures the current MVP decisions for the job aggregation/proxy API.

## Product Goal

Build a small engineering-focused job discovery experiment, starting with Greenhouse public job boards.

The first hypothesis is that company-provided departments can reduce the search space before inspecting every job. Departments are useful as a signal, not as a canonical taxonomy across companies.

## Scope

In scope for the MVP:

- Greenhouse only.
- API proxy routes inside the Next.js app.
- Zod validation for route params, query params, and Greenhouse payloads.
- Normalization into a small internal shape.
- Native `fetch`.
- Next fetch caching.
- Server-side filtering heuristics.

Out of scope for now:

- Database.
- Prisma.
- Sync jobs.
- Background cron.
- Redis.
- Algolia or a dedicated search engine.
- User auth for the public app experience.

## Route Shape

Use provider-specific proxy routes:

```txt
app/api/v1/departments/[provider]/[identifier]
app/api/v1/jobs/[provider]/[identifier]
```

For Greenhouse, `identifier` is the Greenhouse board token.

Examples:

```txt
/api/v1/departments/greenhouse/vercel
/api/v1/jobs/greenhouse/vercel
```

The route structure intentionally leaves room for future providers such as Lever and Ashby without pretending their identifiers or payloads will match Greenhouse.

## Endpoint Split

Keep departments and jobs as separate proxy endpoints.

The departments endpoint is the first-class discovery endpoint for this experiment. It fetches Greenhouse `/departments`, validates the response, normalizes departments, and preserves nested jobs returned by Greenhouse.

The jobs endpoint fetches Greenhouse `/jobs` or `/jobs?content=true`, validates the response, normalizes jobs, and can apply server-side query filtering.

Do not combine departments and jobs into one route yet. They have different cache profiles and different product jobs.

## Greenhouse Findings

Greenhouse exposes these public Job Board API endpoints:

```txt
/v1/boards/{boardToken}/jobs
/v1/boards/{boardToken}/jobs?content=true
/v1/boards/{boardToken}/departments
/v1/boards/{boardToken}/offices
/v1/boards/{boardToken}/jobs/{jobId}
```

For the department-first MVP, `/departments` is the cleanest starting point because it returns department groupings and nested jobs. That lets us ask, "which departments look engineering-related?" before fetching or rendering a larger flat job list.

`/jobs?content=true` is useful when we need full job descriptions or a richer job detail/filter view, but it should not be the first request for the department-first exploration.

## Normalization

Greenhouse payloads are external contracts, so validate them with Zod before using them.

Normalize Greenhouse data into internal shapes before returning from the API. The normalized response should preserve enough Greenhouse identifiers to debug and link back to the source, while giving the app stable field names.

When normalizing nested jobs from `/departments`, inject the containing department only when it is not already present on the job. Dedupe department references by Greenhouse department id so the same department does not appear twice.

Department engineering detection is heuristic-only:

- Match department names against engineering-ish terms.
- Store matched terms as signals.
- Do not treat department names as canonical across companies.
- Do not assume "Engineering" means the same thing everywhere.

The heuristic is allowed to be imperfect because the product question is whether it reduces the search space enough to be useful.

## Department Taxonomy Signals

Company department names are company-specific labels, not a shared taxonomy. Stripe-style labels such as `1133 EMEA Sales Development Reps` include internal cost-center numbers, regions, abbreviations, and org naming conventions that are useful as source data but noisy as product categories.

Add a second signal layer on normalized departments instead of replacing the original Greenhouse department name:

```txt
name
signals.normalizedName
signals.category
signals.categoryConfidence
signals.categoryMatchedTerms
```

Keep `name` as the untouched upstream label. Use `signals.normalizedName` for cleaned matching and display experiments after stripping obvious internal prefixes/suffixes, such as leading numeric department codes or bracketed annotations.

Use a small app-owned taxonomy for coarse product categories:

```txt
engineering
product
design
data
security
sales
customerSuccess
marketing
people
finance
legal
operations
unspecified
```

The taxonomy is intentionally coarse. It should help the app group, filter, and prioritize departments without claiming that every company organizes work the same way.

Use Fuse.js for fuzzy term matching against the app-owned taxonomy terms. This gives typo-tolerant and noisy-label matching while keeping the taxonomy explicit and reviewable in code. Do not use Fuse.js as a semantic classifier; low-confidence or unmatched labels should remain `unspecified`.

Do not treat broad technical words as engineering by themselves. Terms such as `platform`, `data`, and `security` can indicate engineering work in some companies, but Stripe also uses them in sales, product, analytics, and security-specific department names. Prefer explicit engineering terms like `engineering`, `engineer`, `eng`, `software`, `infrastructure`, or `r&d` for the engineering category.

Continue to derive `signals.likelyEngineering` from this signal layer for now. It remains a heuristic shortcut for the MVP, not a canonical truth about the company.

## Filtering

Filtering belongs server-side in our API for now.

For example:

```txt
/api/v1/jobs/greenhouse/vercel?term=engineer
```

The API can inspect normalized job titles and return matching jobs. This keeps the browser UI simple and gives us one place to evolve the matching logic.

This is not a full search engine. It is a small filtering layer for the MVP.

## Caching

Use Next fetch caching at the Greenhouse client layer:

```ts
fetch(url, { next: { revalidate: seconds } });
```

Current cache policy:

- Departments: long-lived cache, currently `86400` seconds.
- Jobs: shorter cache, currently `900` seconds.

The departments route also exports route-level `revalidate = 86400` because its response is public and only depends on the provider identifier. It also sends an explicit CDN cache header:

```txt
Cache-Control: public, s-maxage=86400, stale-while-revalidate=3600
```

The jobs route does not export route-level revalidation because it depends on request-time headers and query params.

Departments change less often than jobs and are useful as the first narrowing step, so they can be cached more aggressively.

Jobs should refresh more often because listings open, close, and update more frequently.

The protected jobs proxy returns:

```txt
Cache-Control: private, no-store
Vary: x-api-key
```

This avoids browser/CDN caching keyed job responses while still allowing the server-side Greenhouse fetch underneath to revalidate for `900` seconds.

## Upstream Requests

Greenhouse board tokens are percent-encoded before they are placed in request paths. This prevents reserved URL characters in provider identifiers from breaking the upstream request path.

Greenhouse fetches use an abort timeout. If the upstream API does not respond in time, the client throws a timeout error instead of letting the proxy hang indefinitely.

## Page Rendering

Use ISR for company-facing pages instead of making React Query the primary data source.

Current page policy:

- `/companies`: server-rendered and revalidated every `86400` seconds.
- `/companies/[identifier]`: statically generated for the known companies in `COMPANY_BOARD_TOKENS` (currently `vercel`, `stripe`, `discord`, `figma`, `datadog`) with `generateStaticParams`, and revalidated every `900` seconds.
- Unknown company identifiers return 404 for now (`dynamicParams = false`).

React Query can still be used for browser-owned interactive API islands, but page generation should use server data and ISR. This keeps the page shell cacheable while leaving room for richer client-side filters later.

## Static Generation Strategy and Scaling

`COMPANY_BOARD_TOKENS` is the single source of truth: each token doubles as the route identifier and feeds `generateStaticParams`. Adding a token there both lists the company under `/companies` and prebuilds a static detail page.

This strategy is deliberately matched to a small, curated, code-owned company list. Its load-bearing assumption is that the list stays small. The trade-offs that follow from it:

- The build scales linearly with the list. Every company prerenders at build time, each doing two Greenhouse fetches (departments and jobs), plus a logo fetch in `next.config.ts`. At a handful of companies this is free; at hundreds it makes builds slow and couples deploy success to Greenhouse being healthy at build time. A slow upstream throws past the `10s` timeout, which fails the page build.
- Adding a company requires a code change and a redeploy. `dynamicParams = false` means a new token 404s until the next build. This is correct while the list is curated in code, and a dealbreaker the moment companies should be added from a database, CMS, or admin UI.

Pivot point: when the company set becomes large or dynamically sourced, switch to `dynamicParams = true` and generate pages on demand (lazy ISR) instead of all-at-build. Until then, keep prebuilding the curated set — it is the right fit for the current scale.

We considered enabling Cache Components (the Next.js 16 `cacheComponents` flag) and decided against it for now. It would replace the route-segment `revalidate`/`dynamicParams` configs with `use cache` and `cacheLife` for the same caching behavior, while its main new wins — Partial Prerendering and Activity-based navigation state — do not meaningfully apply to these static-with-ISR pages. Revisit if the data model moves toward per-user or personalized content.

## `force-static`

Do not use `force-static` on both endpoints by default.

`force-static` is only a reasonable fit for a route that does not depend on request-time data such as headers or search params.

Departments may be a candidate for `force-static` if the endpoint stays public and only depends on route params. Jobs should not use `force-static` while it supports query params such as `content` and `term`.

If an endpoint requires `x-api-key` or reads headers, do not make that route `force-static`. Header-based checks are request-time behavior.

For now, fetch-level revalidation is the safer default because it caches upstream Greenhouse requests without changing route semantics.

## API Keys

An `x-api-key` is not a replacement for caching.

Use an API key only where the endpoint is meant to behave like a protected proxy.

Current policy:

- Departments endpoint: public.
- Jobs endpoint: requires `x-api-key` outside development.

The departments endpoint stays public because it is the cheap discovery request and it can be cached for longer. The jobs endpoint is more expensive and can support richer query options, so it is reasonable to protect it when it is called from server-side code.

Local development bypasses the key check when `NODE_ENV=development` so the app remains easy to run on `https://localhost:3002`.

Do not send this key from browser/client components:

- Greenhouse job board data is public.
- The browser would expose any key sent from client-side requests.
- Caching solves the immediate performance concern more directly.

Keep the key server-only through `JOBS_API_KEY`. If the browser needs jobs later, use a public page/server component path or another server-owned boundary rather than exposing the key.

## Current MVP Response Shape

Use a department-first response for the department endpoint:

```txt
provider
identifier
resource
endpoint
departments
meta
```

Use a flat job response for the jobs endpoint:

```txt
provider
identifier
resource
endpoint
jobs
meta
```

The `meta` object should stay lightweight and operational:

- result counts
- applied filter description
- upstream total
- cache revalidation value

Avoid putting product logic into `meta`.

## Decision Summary

- Start with Greenhouse only.
- Treat departments as the first discovery request.
- Keep departments and jobs as separate proxy endpoints.
- Validate external payloads with Zod.
- Normalize before returning data to the app.
- Keep engineering detection heuristic-only.
- Add coarse department taxonomy signals without replacing source department names.
- Use Fuse.js for fuzzy taxonomy term matching.
- Cache departments longer than jobs.
- Use fetch-level caching as the default.
- Percent-encode Greenhouse board tokens before upstream requests.
- Time out slow upstream Greenhouse requests.
- Dedupe nested job department references by department id.
- Use ISR for company pages.
- Do not force-static the jobs endpoint.
- Keep departments public.
- Require `x-api-key` for the jobs proxy outside development.
