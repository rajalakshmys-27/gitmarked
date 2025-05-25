// Utility to get GitHub token from Vite env
export function getGithubToken() {
  return import.meta.env.VITE_GITHUB_TOKEN || null;
}
