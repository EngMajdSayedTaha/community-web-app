// HTTP Client for API communications
// Base configuration for all API requests to majdst.codes

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.majdst.codes/v1';
const API_TIMEOUT = 30000; // 30 seconds

interface RequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: unknown;
  params?: Record<string, string | number | boolean>;
}

interface HttpResponse<T> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
}

/**
 * HttpClient - Utility class for making HTTP requests
 * Handles request/response transformation, error handling, and timeout management
 */
class HttpClient {
  private baseUrl: string;
  private timeout: number;
  private defaultHeaders: Record<string, string>;

  constructor(baseUrl: string = API_BASE_URL, timeout: number = API_TIMEOUT) {
    this.baseUrl = baseUrl;
    this.timeout = timeout;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
  }

  /**
   * Performs an HTTP request with timeout and error handling
   */
  private async request<T>(
    endpoint: string,
    config: RequestConfig = {}
  ): Promise<HttpResponse<T>> {
    const {
      method = 'GET',
      headers = {},
      body,
      params = {},
    } = config;

    // Build URL with query parameters
    const url = this.buildUrl(endpoint, params);

    // Merge headers
    const mergedHeaders = {
      ...this.defaultHeaders,
      ...headers,
    };

    // Setup abort controller for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        method,
        headers: mergedHeaders,
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data = await this.parseResponse<T>(response);

      return {
        data,
        status: response.status,
        statusText: response.statusText,
        headers: this.parseHeaders(response.headers),
      };
    } catch (error) {
      clearTimeout(timeoutId);
      throw this.handleError(error);
    }
  }

  /**
   * GET request
   */
  async get<T>(endpoint: string, params?: Record<string, unknown>): Promise<T> {
    const response = await this.request<T>(endpoint, {
      method: 'GET',
      params: params as Record<string, string | number | boolean>,
    });
    return response.data;
  }

  /**
   * POST request
   */
  async post<T>(endpoint: string, body?: unknown): Promise<T> {
    const response = await this.request<T>(endpoint, {
      method: 'POST',
      body,
    });
    return response.data;
  }

  /**
   * PUT request
   */
  async put<T>(endpoint: string, body?: unknown): Promise<T> {
    const response = await this.request<T>(endpoint, {
      method: 'PUT',
      body,
    });
    return response.data;
  }

  /**
   * DELETE request
   */
  async delete<T>(endpoint: string): Promise<T> {
    const response = await this.request<T>(endpoint, {
      method: 'DELETE',
    });
    return response.data;
  }

  /**
   * PATCH request
   */
  async patch<T>(endpoint: string, body?: unknown): Promise<T> {
    const response = await this.request<T>(endpoint, {
      method: 'PATCH',
      body,
    });
    return response.data;
  }

  /**
   * Build URL with query parameters
   */
  private buildUrl(endpoint: string, params: Record<string, string | number | boolean>): string {
    const url = new URL(`${this.baseUrl}${endpoint}`);

    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });

    return url.toString();
  }

  /**
   * Parse response based on content type
   */
  private async parseResponse<T>(response: Response): Promise<T> {
    const contentType = response.headers.get('content-type');

    if (!response.ok) {
      const error = contentType?.includes('application/json')
        ? await response.json()
        : { message: response.statusText };
      throw {
        status: response.status,
        data: error,
      };
    }

    if (contentType?.includes('application/json')) {
      return response.json();
    }

    if (contentType?.includes('text')) {
      return (await response.text()) as T;
    }

    return response.blob() as Promise<T>;
  }

  /**
   * Parse response headers
   */
  private parseHeaders(headers: Headers): Record<string, string> {
    const parsed: Record<string, string> = {};
    headers.forEach((value, key) => {
      parsed[key] = value;
    });
    return parsed;
  }

  /**
   * Handle errors
   */
  private handleError(error: unknown): Error {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        return new Error('Request timeout - the server took too long to respond');
      }
      return error;
    }

    if (typeof error === 'object' && error !== null) {
      const errorObj = error as Record<string, unknown>;
      if (errorObj.status && errorObj.data) {
        return new Error(
          String(errorObj.data?.message || `HTTP Error ${errorObj.status}`)
        );
      }
    }

    return new Error('An unexpected error occurred');
  }

  /**
   * Set authorization header
   */
  setAuthToken(token: string): void {
    this.defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  /**
   * Clear authorization header
   */
  clearAuthToken(): void {
    delete this.defaultHeaders['Authorization'];
  }
}

export const httpClient = new HttpClient();
export default HttpClient;