import { config } from './config';

const API_BASE = `${config.api.baseUrl}/api`;

export interface Product {
  id: number;
  brand: string;
  model: string;
  price: number;
  stock: number;
  category: string;
  image_url?: string;
}

export interface Order {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  product_id: number;
  quantity?: number;
}

export const api = {
  // Products
  getProducts: async (): Promise<Product[]> => {
    const response = await fetch(`${API_BASE}/products`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  },

  getProduct: async (id: number): Promise<Product> => {
    const response = await fetch(`${API_BASE}/products/${id}`);
    if (!response.ok) throw new Error('Failed to fetch product');
    return response.json();
  },

  // Orders
  createOrder: async (order: Order) => {
    const response = await fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      body: JSON.stringify(order)
    });
    if (!response.ok) throw new Error('Failed to create order');
    return response.json();
  },

  // Contact
  sendContact: async (data: any) => {
    const response = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to send message');
    }
    return response.json();
  },

  // Projects
  getProjects: async () => {
    const response = await fetch(`${API_BASE}/projects`);
    if (!response.ok) throw new Error('Failed to fetch projects');
    return response.json();
  },

  // Testimonials
  getTestimonials: async () => {
    const response = await fetch(`${API_BASE}/testimonials`);
    if (!response.ok) throw new Error('Failed to fetch testimonials');
    return response.json();
  },

  submitTestimonial: async (data: any) => {
    const response = await fetch(`${API_BASE}/testimonials`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to submit testimonial');
    return response.json();
  }
};