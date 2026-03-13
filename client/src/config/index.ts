/**
 * Learning Point: Centralizing environment variables.
 * If a variable is missing, we can throw an error here early 
 * rather than having the app fail silently later.
 */

const _config = {
  port: import.meta.env.VITE_PORT || 5173,
  apiUrl: import.meta.env.VITE_API_BASE_URL,
  apiKey: import.meta.env.VITE_API_KEY, // Prepared for future use
};

// Validation (Optional but recommended for Senior roles)
if (!_config.apiUrl) {
  throw new Error("VITE_API_BASE_URL is required in .env file");
}

export const config = Object.freeze(_config);