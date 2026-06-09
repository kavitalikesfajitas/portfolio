import {
  validSources,
  validSourcesList,
  validCompanies,
  validCompaniesList,
} from "./constants";

export function assertAuthorized(request: Request) {
  const apiKey = request.headers.get("x-api-key");

  // This is a runtime variable
  // eslint-disable-next-line turbo/no-undeclared-env-vars
  if (!apiKey || apiKey !== process.env.JOBS_API_KEY) {
    return false;
  }

  return true;
}

// URLs are conventionally lowercase, so match the enum values case-insensitively
// (e.g. /greenhouse/vercel resolves to Greenhouse/Vercel).
export function isValidSource(source: string): source is validSources {
  return validSourcesList.some((s) => s.toLowerCase() === source.toLowerCase());
}

export function isValidCompany(company: string): company is validCompanies {
  return validCompaniesList.some(
    (c) => c.toLowerCase() === company.toLowerCase(),
  );
}
