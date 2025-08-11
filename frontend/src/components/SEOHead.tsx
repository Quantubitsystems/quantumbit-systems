import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEOHead = ({
  title = "QuantumBit Systems and Services | Professional Tech Solutions in Nairobi",
  description = "Professional tech solutions in Nairobi: Web/Mobile Development, WiFi Installation, Printer Repairs & Consumables. Expert IT services for businesses & individuals.",
  keywords = "web development, mobile apps, WiFi installation, printer repair, toner cartridges, IT support, Nairobi, Kenya",
  image = "/og-image.jpg",
  url = "https://quantumsystems.com",
  type = "website"
}: SEOHeadProps) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="QuantumBit Systems and Services" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "QuantumBit Systems and Services",
          "description": description,
          "url": url,
          "telephone": "+254742107450",
          "email": "info@quantumsystems.com",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Nairobi",
            "addressCountry": "Kenya"
          },
          "serviceArea": "Nairobi, Kenya",
          "priceRange": "$$",
          "openingHours": "Mo-Fr 08:00-18:00, Sa 09:00-16:00"
        })}
      </script>
    </Helmet>
  );
};

export { SEOHead };