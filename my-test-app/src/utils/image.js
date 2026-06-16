import { MAX_FILE_SIZE, API_URL } from './constants';

let cropper = null;
let currentFile = null;

/**
 * Validate image file
 * @param {File} file - File to validate
 * @returns {object} - Validation result
 */
export function validateImageFile(file) {
  const errors = [];
  
  if (!file) {
    errors.push('No file selected');
    return { isValid: false, errors };
  }
  
  if (!file.type.startsWith('image/')) {
    errors.push('File must be an image');
  }
  
  if (file.size > MAX_FILE_SIZE) {
    errors.push(`File size must be less than ${MAX_FILE_SIZE / (1024 * 1024)}MB`);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Read file as data URL
 * @param {File} file - File to read
 * @returns {Promise<string>} - Data URL
 */
export function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Read file as blob
 * @param {File} file - File to read
 * @returns {Promise<Blob>} - Blob data
 */
export function readFileAsBlob(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(new Blob([e.target.result]));
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}

/**
 * Upload image to server
 * @param {Blob} blob - Image blob
 * @param {string} token - Auth token
 * @returns {Promise<object>} - Upload response
 */
export async function uploadProfileImage(blob, token) {
  const formData = new FormData();
  formData.append('image', blob, 'profile.jpg');
  
  const response = await fetch(API_URL + '/upload-profile-image', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  });
  
  return await response.json();
}

/**
 * Delete profile image from server
 * @param {string} token - Auth token
 * @returns {Promise<object>} - Delete response
 */
export async function deleteProfileImage(token) {
  const response = await fetch(API_URL + '/delete-profile-image', {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  
  return await response.json();
}

/**
 * Initialize image cropper (requires cropperjs library)
 * @param {HTMLImageElement} imageElement - Image element
 * @param {object} options - Cropper options
 */
export function initializeCropper(imageElement, options = {}) {
  if (typeof Cropper === 'undefined') {
    console.error('Cropper library not loaded');
    return null;
  }
  
  if (cropper) {
    cropper.destroy();
  }
  
  cropper = new Cropper(imageElement, {
    aspectRatio: 1 / 1,
    viewMode: 1,
    autoCropArea: 1,
    responsive: true,
    restore: true,
    guides: true,
    center: true,
    highlight: true,
    cropBoxMovable: true,
    cropBoxResizable: true,
    toggleDragModeOnDblclick: true,
    ...options
  });
  
  return cropper;
}

/**
 * Get cropped canvas
 * @param {number} maxWidth - Max width
 * @param {number} maxHeight - Max height
 * @returns {HTMLCanvasElement|null} - Cropped canvas
 */
export function getCroppedCanvas(maxWidth = 180, maxHeight = 180) {
  if (!cropper) {
    console.error('Cropper not initialized');
    return null;
  }
  
  return cropper.getCroppedCanvas({
    maxWidth,
    maxHeight,
    fillColor: '#fff',
    imageSmoothingEnabled: true,
    imageSmoothingQuality: 'high'
  });
}

/**
 * Destroy cropper instance
 */
export function destroyCropper() {
  if (cropper) {
    cropper.destroy();
    cropper = null;
  }
}

/**
 * Set current file for cropping
 * @param {File} file - File to set
 */
export function setCurrentFile(file) {
  currentFile = file;
}

/**
 * Get current file
 * @returns {File|null} - Current file
 */
export function getCurrentFile() {
  return currentFile;
}

/**
 * Clear current file
 */
export function clearCurrentFile() {
  currentFile = null;
}
