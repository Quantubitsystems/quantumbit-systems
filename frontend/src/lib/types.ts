// Type definitions to fix 'any' usage
export interface Product {
  id: number;
  brand: string;
  model: string;
  price: number;
  stock: number;
  category: string;
  image_url?: string;
}

export interface FilterState {
  category: string;
  brand: string;
  priceRange: [number, number];
  inStock: boolean;
}

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export interface TestimonialData {
  customer_name: string;
  customer_email: string;
  company?: string;
  rating: number;
  message: string;
}