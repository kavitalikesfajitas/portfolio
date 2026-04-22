// Small helper function to return a value based on a condition
export function withDefaultConditionalValue<T>(
  value: T,
  defaultValue: T,
  condition: boolean,
): T {
  return condition ? value : defaultValue;
}
