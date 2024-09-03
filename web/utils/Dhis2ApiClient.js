// Dhis2ApiClient.js

/**
 * A client for interacting with the DHIS2 API from custom forms / reports.
 * Provides methods for CRUD operations, paging, and query parameter handling.
 */
class Dhis2ApiClient {
    /**
     * Creates an instance of Dhis2ApiClient.
     * @param {string} [baseUrl='../../../api'] - The base URL for the DHIS2 API.
     */
    constructor(baseUrl) {
      this.baseUrl = baseUrl || '../../../api';
      this.defaultParams = {
        paging: 'false'
      };
    }

    /**
     * Extracts a query parameter from the current URL.
     * @param {string} name - name of the query parameter to extract.
     * @returns {string|null} - value of the query parameter, or null if not found.
     */
    getQueryParam(name) {
      const urlParams = new URLSearchParams(window.location.hash.split('?')[1]);
      return urlParams.get(name);
    }

    /**
     * Sends a request to the DHIS2 API.
     * @param {string} endpoint - The API endpoint to request.
     * @param {string} [method='GET'] - The HTTP method to use.
     * @param {Object} [params={}] - Query parameters to include in the request.
     * @param {Object} [data=null] - Data to send in the request body (for POST/PUT requests).
     * @returns {Promise<Object>} The response data from the API.
     * @throws {Error} If the request fails.
     */
    async request(endpoint, method = 'GET', params = {}, data = null) {

      const url = new URL(`${this.baseUrl}/${endpoint}`);
      const mergedParams = { ...this.defaultParams, ...params };
      Object.keys(mergedParams).forEach(key => url.searchParams.append(key, mergedParams[key]));

      const options = {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      };

      if (data) {
        options.body = JSON.stringify(data);
      }

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`HTTP error. Status: ${response.status}`);
        }
        return await response.json();
      } catch (error) {
        console.error('Error in API request:', error);
        throw error;
      }
    }

    /**
     * Sends a GET request to the DHIS2 API.
     * @param {string} endpoint - The API endpoint to request.
     * @param {Object} [params={}] - Query parameters to include in the request.
     * @returns {Promise<Object>} The response data from the API.
     */
    async get(endpoint, params = {}) {
      return this.request(endpoint, 'GET', params);
    }

    /**
     * Sends a POST request to the DHIS2 API.
     * @param {string} endpoint - The API endpoint to request.
     * @param {Object} data - Data to send in the request body.
     * @param {Object} [params={}] - Query parameters to include in the request.
     * @returns {Promise<Object>} The response data from the API.
     */
    async post(endpoint, data, params = {}) {
      return this.request(endpoint, 'POST', params, data);
    }

    /**
     * Sends a PUT request to the DHIS2 API.
     * @param {string} endpoint - The API endpoint to request.
     * @param {Object} data - Data to send in the request body.
     * @param {Object} [params={}] - Query parameters to include in the request.
     * @returns {Promise<Object>} The response data from the API.
     */
    async put(endpoint, data, params = {}) {
      return this.request(endpoint, 'PUT', params, data);
    }

    /**
     * Sends a DELETE request to the DHIS2 API.
     * @param {string} endpoint - The API endpoint to request.
     * @param {Object} [params={}] - Query parameters to include in the request.
     * @returns {Promise<Object>} The response data from the API.
     */
    async delete(endpoint, params = {}) {
      return this.request(endpoint, 'DELETE', params);
    }
}


// Usage example - getting organisation units
const apiClient = new Dhis2ApiClient();

try {
  // Extract query parameters
  const tei = apiClient.getQueryParam('tei');
  const program = apiClient.getQueryParam('program');
  const ou = apiClient.getQueryParam('ou');

  console.log('Query params:', { tei, program, ou });

  const defaultFields = 'id,code,name,level,description,path,organisationUnitGroups,parent[id,name]';
  const params = { filter: 'level:eq:2' };
  const mergedParams = { fields: defaultFields, ...params };

  const orgUnits = await apiClient.get('organisationUnits.json', mergedParams);
  console.log('Organisation Units:', orgUnits);

} catch (error) {
  console.error('Error fetching data:', error);
}