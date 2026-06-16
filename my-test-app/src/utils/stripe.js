import { STRIPE_PUBLIC_KEY } from './constants';

let stripe;
let elements;
let paymentElement;

/**
 * Initialize Stripe
 * @returns {object} - Stripe instance
 */
export function initializeStripe() {
  if (typeof window !== 'undefined' && typeof Stripe !== 'undefined') {
    stripe = Stripe(STRIPE_PUBLIC_KEY);
    return stripe;
  }
  return null;
}

/**
 * Get Stripe instance
 * @returns {object|null} - Stripe instance or null
 */
export function getStripe() {
  if (!stripe && typeof Stripe !== 'undefined') {
    stripe = Stripe(STRIPE_PUBLIC_KEY);
  }
  return stripe;
}

/**
 * Initialize payment elements
 * @param {string} clientSecret - Stripe client secret
 */
export function initializePaymentElements(clientSecret) {
  const stripInstance = getStripe();
  
  if (!stripInstance) {
    console.error('Stripe not loaded');
    return;
  }
  
  if (!elements && clientSecret) {
    elements = stripInstance.elements({ clientSecret });
    
    const paymentElementContainer = document.getElementById('payment-element');
    if (paymentElementContainer) {
      paymentElement = elements.create('payment');
      paymentElement.mount('#payment-element');
    }
  }
}

/**
 * Create payment intent
 * @param {number} amount - Amount in cents
 * @param {object} billingDetails - Billing details
 * @returns {Promise<object>} - Payment intent response
 */
export async function createPaymentIntent(amount, billingDetails) {
  const authToken = localStorage.getItem('authToken');
  
  if (!authToken) {
    throw new Error('User not authenticated');
  }
  
  const response = await fetch('/api/create-payment-intent', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      amount,
      billingDetails
    })
  });
  
  return await response.json();
}

/**
 * Handle payment submission
 * @param {string} clientSecret - Stripe client secret
 * @returns {Promise<object>} - Confirmation result
 */
export async function submitPayment(clientSecret) {
  const stripInstance = getStripe();
  
  if (!stripInstance) {
    throw new Error('Stripe not initialized');
  }
  
  const result = await stripInstance.confirmPayment({
    elements,
    clientSecret,
    confirmParams: {
      return_url: window.location.origin + '/success'
    }
  });
  
  return result;
}

/**
 * Retrieve payment status
 * @param {string} clientSecret - Stripe client secret
 * @returns {Promise<object>} - Payment intent details
 */
export async function retrievePaymentStatus(clientSecret) {
  const stripInstance = getStripe();
  
  if (!stripInstance) {
    throw new Error('Stripe not initialized');
  }
  
  const response = await stripInstance.retrievePaymentIntent(clientSecret);
  
  return response.paymentIntent;
}
