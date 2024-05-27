/**
 * Checks if every field in the object has a falsy value.
 * @param obj - The object to check.
 * @returns True if every field has a falsy value, false otherwise.
 */
export const hasOnlyFalsyValues = (obj: Record<string, any>): boolean => {
  return Object.values(obj).every((value) => !value);
};
