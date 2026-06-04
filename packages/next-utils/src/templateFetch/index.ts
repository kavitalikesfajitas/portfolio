export type NextFetchRevalidate = false | 0 | number;

export type NextFetchOptions = {
  revalidate?: NextFetchRevalidate;
  tags?: string[];
};

export type TemplateFetchOptions = Omit<RequestInit, "next"> & {
  next?: NextFetchOptions;
};

export class TemplateFetchError extends Error {
  constructor(
    message: string,
    public readonly response: Response,
  ) {
    super(message);
    this.name = "TemplateFetchError";
  }
}

export async function templateFetch<TResponse>(
  input: Parameters<typeof fetch>[0],
  options: TemplateFetchOptions = {},
): Promise<TResponse> {
  const { next, ...requestOptions } = options;
  const fetchOptions: RequestInit & { next?: NextFetchOptions } = {
    ...requestOptions,
    next,
  };

  const response = await fetch(input, fetchOptions);

  if (!response.ok) {
    throw new TemplateFetchError(
      `Fetch failed: ${response.status} ${response.statusText}`,
      response,
    );
  }

  return response.json() as Promise<TResponse>;
}
