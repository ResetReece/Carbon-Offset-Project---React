// API server URL - change this when deploying to production
export const API_URL = '/auth';

// Maximum file size for profile images (5MB)
export const MAX_FILE_SIZE = 5 * 1024 * 1024;

// Fetch timeout in milliseconds (30 seconds)
export const FETCH_TIMEOUT = 30000;

// Default placeholder image for profiles
export const defaultImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23e0e0e0' width='100' height='100'/%3E%3Ccircle cx='50' cy='35' r='20' fill='%23999'/%3E%3Cpath d='M 25 70 Q 25 55 50 55 Q 75 55 75 70 L 75 100 L 25 100 Z' fill='%23999'/%3E%3C/svg%3E";

// Stripe public key
export const STRIPE_PUBLIC_KEY = 'pk_test_51SrxPVL79gUXu5xMIJkmxtNC16IURXOGNWY5GumuwBDRXbryDcZ7WlUDjavJAaz60x3FqUC7jBjbPozX4JuOxLfM00JEj9aNbK';

// Country code mapping
export const COUNTRY_CODES = {
  'united states': 'US', 'canada': 'CA', 'mexico': 'MX', 'united kingdom': 'GB',
  'france': 'FR', 'germany': 'DE', 'italy': 'IT', 'spain': 'ES', 'netherlands': 'NL',
  'belgium': 'BE', 'switzerland': 'CH', 'austria': 'AT', 'poland': 'PL', 'sweden': 'SE',
  'norway': 'NO', 'denmark': 'DK', 'finland': 'FI', 'ireland': 'IE', 'portugal': 'PT',
  'greece': 'GR', 'hungary': 'HU', 'czech republic': 'CZ', 'romania': 'RO', 'bulgaria': 'BG',
  'croatia': 'HR', 'slovenia': 'SI', 'estonia': 'EE', 'latvia': 'LV', 'lithuania': 'LT',
  'australia': 'AU', 'new zealand': 'NZ', 'japan': 'JP', 'south korea': 'KR', 'china': 'CN',
  'india': 'IN', 'brazil': 'BR', 'south africa': 'ZA', 'singapore': 'SG', 'thailand': 'TH'
};
