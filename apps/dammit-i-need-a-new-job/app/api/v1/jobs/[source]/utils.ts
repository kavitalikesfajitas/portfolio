export function assertAuthorized(request: Request) {
  const apiKey = request.headers.get("x-api-key");

  // This is a runtime variable
  // eslint-disable-next-line turbo/no-undeclared-env-vars
  if (!apiKey || apiKey !== process.env.JOBS_API_KEY) {
    return false;
  }

  return true;
}
