import { test as baseTest, request, type APIRequestContext, type APIResponse, type TestInfo } from '@playwright/test';

// ============= TYPES =============
type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete' | 'head';

interface RequestData {
  method: string;
  url: string;
  headers: Record<string, string>;
  query: Record<string, any>;
  body?: any;
  timestamp: string;
}

interface ApiCallDetails {
  request: RequestData;
  response?: {
    status: number;
    statusText: string;
    headers: Record<string, string>;
    url: string;
    ok: boolean;
    data: any;
  };
  error?: {
    message: string;
    name: string;
    stack?: string;
    timestamp: string;
  };
}

// ============= CONSTANTS =============
const BINARY_DATA_TRUNCATE_LENGTH = 100;
const HTTP_METHODS: readonly HttpMethod[] = ['get', 'post', 'put', 'patch', 'delete', 'head'];

// ============= HELPER FUNCTIONS =============

/**
 * Safely extracts response body data based on content type
 */
async function extractResponseData(response: APIResponse): Promise<any> {
  try {
    const contentType = response.headers()['content-type'] || '';
    
    if (contentType.includes('application/json')) {
      return await response.json();
    } else if (contentType.includes('text/')) {
      return await response.text();
    } else {
      const body = await response.body();
      return body.toString('base64').substring(0, BINARY_DATA_TRUNCATE_LENGTH) + '...';
    }
  } catch (error) {
    return `<Failed to extract response data: ${error instanceof Error ? error.message : 'Unknown error'}>`;
  }
}

/**
 * Creates a unified attachment for API calls (both success and error cases)
 */
async function attachApiCallDetails(
  testInfo: TestInfo,
  callNumber: number,
  method: string,
  url: string,
  requestData: RequestData,
  response?: APIResponse,
  error?: unknown
): Promise<void> {
  const details: ApiCallDetails = {
    request: requestData
  };

  const status = error ? '[FAILED]' : '';
  const title = `API Call #${callNumber}: ${method} ${url} ${status}`.trim();

  if (error) {
    details.error = {
      message: error instanceof Error ? error.message : 'Unknown error',
      name: error instanceof Error ? error.name : 'Error',
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString()
    };
  } else if (response) {
    details.response = {
      status: response.status(),
      statusText: response.statusText(),
      headers: response.headers(),
      url: response.url(),
      ok: response.ok(),
      data: await extractResponseData(response)
    };
  }

  await testInfo.attach(title, {
    body: JSON.stringify(details, null, 2),
    contentType: 'application/json'
  });
}

/**
 * Creates request data object from API call parameters
 */
function createRequestData(method: string, url: string, options?: any): RequestData {
  return {
    method,
    url,
    headers: options?.headers || {},
    query: options?.params || {},
    body: options?.data || options?.body,
    timestamp: new Date().toISOString()
  };
}

// ============= TEST FIXTURE =============

export const test = baseTest.extend<{ apiRequest: APIRequestContext }>({
  apiRequest: async ({}, use, testInfo) => {
    const req = await request.newContext();
    let apiCallCounter = 0;

    // Wrap HTTP methods with logging and error handling
    HTTP_METHODS.forEach((method) => {
      const originalMethod = req[method].bind(req);

      req[method] = async function (url: string, options?: any): Promise<APIResponse> {
        const methodUpper = method.toUpperCase();
        const callNumber = ++apiCallCounter;
        
        const requestData = createRequestData(methodUpper, url, options);

        try {
          const response = await originalMethod(url, options);
          
          // Single consolidated log
          console.log(`[API #${callNumber}] ${methodUpper} ${url} → ${response.status()} ${response.statusText()}`);

          // Attach success details (non-blocking)
          attachApiCallDetails(testInfo, callNumber, methodUpper, url, requestData, response)
            .catch((err: Error) => console.error('Failed to attach API call details:', err.message));

          return response;
        } catch (error) {
          // Single consolidated error log
          console.error(`[API #${callNumber}] ${methodUpper} ${url} → FAILED: ${error instanceof Error ? error.message : String(error)}`);

          // Attach error details (non-blocking)
          attachApiCallDetails(testInfo, callNumber, methodUpper, url, requestData, undefined, error)
            .catch((err: Error) => console.error('Failed to attach API call details:', err.message));

          throw error;
        }
      } as any;
    });

    await use(req);
  }
});

export { expect } from '@playwright/test';