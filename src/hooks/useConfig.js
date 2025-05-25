import { config } from '../config/config';

/**
 * Hook to access Firebase configuration
 * @returns {object} Firebase configuration object
 */
export function useFirebaseConfig() {
  return config.firebase;
}

/**
 * Hook to access GitHub configuration
 * @returns {object} GitHub configuration object
 */
export function useGithubConfig() {
  return config.github;
}

/**
 * Hook to access any environment-specific configuration
 * @returns {object} Complete configuration object
 */
export function useConfig() {
  return config;
}
