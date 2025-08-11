// Simple API endpoint obfuscation
const API_ENDPOINTS = {
  products: '/api/p',
  orders: '/api/o', 
  contact: '/api/c',
  testimonials: '/api/t',
  admin: '/api/a'
};

export const getEndpoint = (key: keyof typeof API_ENDPOINTS): string => {
  return API_ENDPOINTS[key] || '/api/unknown';
};