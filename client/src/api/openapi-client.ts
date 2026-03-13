import createClient, { type Middleware } from 'openapi-fetch';
import type { paths } from '../types/generated/backend';
import { config } from '../config';
import { toast } from '../components/use-toast';

// The generated paths already include the "/api" prefix (e.g., "/api/auth/login").
// Our env baseURL also ends with "/api". To avoid "/api/api/...", strip the trailing "/api" here.
const baseUrl = config.apiUrl.replace(/\/api\/?$/, '');

const client = createClient<paths>({ baseUrl });

const middleware: Middleware = {
  onRequest({ request }: Parameters<NonNullable<Middleware['onRequest']>>[0]) {
    // Ensure JSON Content-Type without directly assigning to options.headers
    // Prefer updating the Request headers or returning a new Request

    const headers = new Headers(request.headers);
    if (!headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json');
    }
    // Set API Key from config if it exists
    if (config.apiKey) {
      headers.set('x-api-key', config.apiKey);
    }
    return new Request(request, { headers, credentials: 'include' });
  },
  onResponse({ response }: Parameters<NonNullable<Middleware['onResponse']>>[0]) {
    if (!response.ok) {
      response.clone().json().then((data) => {
        const message = data?.error || data?.message || `Error ${response.status}`;
        toast({
          title: `Request failed (${response.status})`,
          description: message,
          variant: 'destructive',
        });
      }).catch(() => {
        toast({
          title: 'Request failed',
          description: `${response.status} ${response.statusText}`,
          variant: 'destructive',
        });
      });

      if (response.status === 401 && typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    return response;
  },
};

client.use(middleware);

export default client;