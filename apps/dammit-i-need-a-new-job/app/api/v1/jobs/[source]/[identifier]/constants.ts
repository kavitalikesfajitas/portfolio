export enum validSources {
  GREENHOUSE = "Greenhouse",
}

export enum validCompanies {
  VERCEL = "Vercel",
}
// TODO: make a bit more efficient
export const validSourcesList = Object.values(validSources);
export const validCompaniesList = Object.values(validCompanies);
