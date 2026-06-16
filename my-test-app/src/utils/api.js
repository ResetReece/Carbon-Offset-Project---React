import { API_URL, FETCH_TIMEOUT } from './constants';

/**
 * Wrapper function for fetch with timeout and retry logic
 * @param {string} url - URL to fetch
 * @param {object} options - Fetch options
 * @param {number} retries - Number of retries (default 3)
 * @returns {Promise} - Fetch response promise
 */
export async function fetchWithTimeout(url, options = {}, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT);
      
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      return response;
    } catch (error) {
      if (attempt === retries) {
        throw error;
      }
      console.warn(`Fetch attempt ${attempt} failed, retrying...`, error);
      await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
    }
  }
}

/**
 * Keep-alive mechanism to prevent backend from sleeping
 * Pings the server every 15 minutes
 */
export function startKeepAlive() {
  setInterval(async () => {
    try {
      await fetchWithTimeout(API_URL + '/keep-alive', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      console.warn('Keep-alive ping failed:', error);
    }
  }, 15 * 60 * 1000); // 15 minutes
}

/**
 * Load current global CO2 levels from NOAA API
 * Displays CO2 data and calculates emissions for top emitting countries
 */
export async function loadCarbonData() {
  try {
    const response = await fetchWithTimeout(
      'https://api.gml.noaa.gov/webservices/rest/v1/data',
      { method: 'GET' }
    );
    const data = await response.json();
    
    if (data && data.result && data.result.data) {
      const latestCO2 = data.result.data[data.result.data.length - 1].average;
      const carbonDataDiv = document.getElementById('carbon-data');
      
      if (carbonDataDiv) {
        carbonDataDiv.innerHTML = `
          <h3>Current Global CO₂ Level</h3>
          <p>${latestCO2.toFixed(2)} ppm</p>
          <p class="subtitle">Rapidly Increasing Since Pre-Industrial Times</p>
        `;
      }
    }
  } catch (error) {
    console.error('Failed to load carbon data:', error);
  }
}
