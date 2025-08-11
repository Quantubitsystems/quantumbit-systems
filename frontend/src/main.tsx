import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { initGA } from './lib/analytics'

// Initialize Google Analytics
initGA();

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(<App />);
