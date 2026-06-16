/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid email
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {object} - Validation result with errors array
 */
export function validatePassword(password) {
  const errors = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Validate name format
 * @param {string} name - Name to validate
 * @returns {boolean} - True if valid name
 */
export function isValidName(name) {
  return name && name.trim().length > 0 && name.length <= 100;
}

/**
 * Validate billing address
 * @param {object} address - Address object
 * @returns {boolean} - True if all fields are filled
 */
export function isValidBillingAddress(address) {
  const {
    name, email, billingAddress, city, state, zip, country
  } = address;
  
  return !!(
    name && email && billingAddress && city && state && zip && country
  );
}

/**
 * Convert country name to ISO code
 * @param {string} countryName - Country name
 * @returns {string} - ISO country code
 */
export function convertCountryToISO(countryName) {
  const countries = {
    'united states': 'US', 'canada': 'CA', 'mexico': 'MX', 'united kingdom': 'GB',
    'france': 'FR', 'germany': 'DE', 'italy': 'IT', 'spain': 'ES', 'netherlands': 'NL',
    'belgium': 'BE', 'switzerland': 'CH', 'austria': 'AT', 'poland': 'PL', 'sweden': 'SE',
    'norway': 'NO', 'denmark': 'DK', 'finland': 'FI', 'ireland': 'IE', 'portugal': 'PT',
    'greece': 'GR', 'hungary': 'HU', 'czech republic': 'CZ', 'romania': 'RO', 'bulgaria': 'BG',
    'croatia': 'HR', 'slovenia': 'SI', 'estonia': 'EE', 'latvia': 'LV', 'lithuania': 'LT',
    'australia': 'AU', 'new zealand': 'NZ', 'japan': 'JP', 'south korea': 'KR', 'china': 'CN',
    'india': 'IN', 'brazil': 'BR', 'south africa': 'ZA', 'singapore': 'SG', 'thailand': 'TH'
  };
  return countries[countryName.toLowerCase()] || countryName.toUpperCase().slice(0, 2);
}
