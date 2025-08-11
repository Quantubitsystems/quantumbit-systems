export const config = {
  api: {
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3001',
    adminToken: import.meta.env.VITE_ADMIN_TOKEN || 'quantum2024admin'
  },
  analytics: {
    trackingId: import.meta.env.VITE_GA_TRACKING_ID
  },
  business: {
    name: "QuantumBit Systems and Services",
    email: "quantumbitsystems@outlook.com", 
    phone: "+254 742 107 450",
    whatsapp: "+254742107450",
    address: "Nairobi, Kenya"
  }
};