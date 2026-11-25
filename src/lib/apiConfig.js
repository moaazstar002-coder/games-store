const LOCAL_API_BASE_URL = 'http://localhost:8000/api/v1';

/**
 * @param {string | undefined} configuredURL
 * @param {boolean} isDevelopment
 * @returns {string | null}
 */
export function resolveApiBaseURL(configuredURL, isDevelopment) {
  const normalizedURL = configuredURL?.trim();
  if (normalizedURL) {
    return normalizedURL.replace(/\/+$/, '');
  }

  return isDevelopment ? LOCAL_API_BASE_URL : null;
}
