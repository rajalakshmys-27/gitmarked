import { config } from '../config/config';

/**
 * Utility to get GitHub token from configuration
 * @returns {string|null} GitHub token or null if not set
 */
export function getGithubToken() {
  return config.github.token;
}
