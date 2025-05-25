// Helper to extract username from suggestion object
export function getUsernameFromSuggestion(suggestion) {
  if (!suggestion) return null;
  if (suggestion.type === "user") return suggestion.login;
  if (suggestion.type === "repo") return suggestion.owner;
  return null;
}
