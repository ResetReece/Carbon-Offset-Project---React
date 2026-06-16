/**
 * Get cart from localStorage
 * @returns {array} - Cart items array
 */
export function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

/**
 * Save cart to localStorage
 * @param {array} cart - Cart items array
 */
export function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

/**
 * Add item to cart
 * @param {object} item - Item to add (name, price, quantity)
 */
export function addToCart(item) {
  const cart = getCart();
  const existingItem = cart.find(cartItem => cartItem.name === item.name);
  
  if (existingItem) {
    existingItem.quantity += item.quantity || 1;
  } else {
    cart.push({ ...item, quantity: item.quantity || 1 });
  }
  
  saveCart(cart);
  return cart;
}

/**
 * Remove item from cart by index
 * @param {number} index - Item index
 */
export function removeFromCart(index) {
  const cart = getCart();
  if (index >= 0 && index < cart.length) {
    cart.splice(index, 1);
    saveCart(cart);
  }
  return cart;
}

/**
 * Clear entire cart
 */
export function clearCart() {
  localStorage.setItem('cart', JSON.stringify([]));
}

/**
 * Get cart total
 * @returns {number} - Total price
 */
export function getCartTotal() {
  const cart = getCart();
  return cart.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0);
}

/**
 * Get cart item count
 * @returns {number} - Total items in cart
 */
export function getCartCount() {
  const cart = getCart();
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

/**
 * Update cart item quantity
 * @param {number} index - Item index
 * @param {number} quantity - New quantity
 */
export function updateCartItemQuantity(index, quantity) {
  const cart = getCart();
  if (index >= 0 && index < cart.length) {
    cart[index].quantity = Math.max(1, quantity);
    saveCart(cart);
  }
  return cart;
}
