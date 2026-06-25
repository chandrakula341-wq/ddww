/**
 * SEO Utilities for Dhading Hospital Website
 * Manages meta tags, Open Graph, Twitter cards, and structured data
 */

export const SEO_CONFIG = {
  site: {
    name: 'Dhading Hospital Pvt. Ltd.',
    url: 'https://dhadinghospital.com.np',
    title: 'Dhading Hospital | Leading Healthcare in Dhading, Nepal',
    description: 'ISO 9001:2015 certified multi-specialty hospital with 24/7 emergency services, expert doctors, and modern facilities in Dhading, Nepal.',
    keywords: 'Dhading Hospital, hospital in Dhading, healthcare Nepal, emergency services, doctors, medical services, appointment booking',
    image: 'https://dhadinghospital.com.np/og-image.jpg',
    phone: '+977-10-4040014',
    email: 'info@dhadinghospital.com.np',
  },
  pages: {
    home: {
      title: 'Dhading Hospital | 24/7 Healthcare Services in Dhading, Nepal',
      description: 'Leading multi-specialty hospital offering emergency services, specialist consultations, advanced diagnostics, and comprehensive healthcare.',
      keywords: 'Dhading Hospital, emergency hospital, healthcare services, doctors appointment, medical services',
    },
    services: {
      title: 'Medical Services | Dhading Hospital - 24/7 Care',
      description: 'Comprehensive medical services including emergency care, surgery, pediatrics, radiology, laboratory, and specialized treatments.',
      keywords: 'hospital services, emergency care, surgery, pediatrics, radiology, laboratory tests, medical treatments',
    },
    doctors: {
      title: 'Our Expert Doctors | Dhading Hospital - Medical Team',
      description: 'Meet our experienced and qualified medical professionals providing expert healthcare across multiple specialties.',
      keywords: 'doctors, medical team, specialists, consultants, healthcare professionals, medical expertise',
    },
    about: {
      title: 'About Dhading Hospital | Our Mission & Team',
      description: 'Dhading Hospital is committed to providing quality healthcare services to the community with modern facilities and experienced staff.',
      keywords: 'about hospital, mission, vision, hospital history, certified hospital, ISO certified',
    },
    appointments: {
      title: 'Book Appointment | Dhading Hospital - Online Scheduling',
      description: 'Schedule your medical appointment online at Dhading Hospital. Quick and easy booking system for patients.',
      keywords: 'book appointment, schedule doctor visit, online booking, appointment scheduling, medical consultation',
    },
    contact: {
      title: 'Contact Dhading Hospital | Location & Phone Numbers',
      description: 'Get in touch with Dhading Hospital. Find our contact information, location, phone numbers, and operating hours.',
      keywords: 'contact hospital, phone number, hospital location, directions, operating hours, contact information',
    },
  },
};

/**
 * Update meta tag dynamically
 */
export const updateMetaTag = (name: string, content: string) => {
  let tag = document.querySelector(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('name', name);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
};

/**
 * Update Open Graph tags
 */
export const updateOGTag = (property: string, content: string) => {
  let tag = document.querySelector(`meta[property="${property}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('property', property);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
};

/**
 * Update page title and meta tags based on current page/section
 */
export const updatePageSEO = (pageKey: keyof typeof SEO_CONFIG.pages) => {
  const page = SEO_CONFIG.pages[pageKey];
  if (!page) return;

  // Update page title
  document.title = page.title;

  // Update meta tags
  updateMetaTag('description', page.description);
  updateMetaTag('keywords', page.keywords);

  // Update Open Graph tags
  updateOGTag('og:title', page.title);
  updateOGTag('og:description', page.description);
  updateOGTag('og:url', `${SEO_CONFIG.site.url}#${pageKey}`);

  // Update Twitter tags
  updateMetaTag('twitter:title', page.title);
  updateMetaTag('twitter:description', page.description);
};

/**
 * Add Schema.org structured data for healthcare provider
 */
export const addHealthcareSchema = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    '@id': SEO_CONFIG.site.url,
    name: SEO_CONFIG.site.name,
    description: SEO_CONFIG.site.description,
    url: SEO_CONFIG.site.url,
    telephone: SEO_CONFIG.site.phone,
    email: SEO_CONFIG.site.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Dhading, Nepal',
      addressLocality: 'Dhading',
      addressRegion: 'Dhading',
      postalCode: '44200',
      addressCountry: 'NP',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '27.8333',
      longitude: '84.9333',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '06:00',
      closes: '22:00',
    },
    medicalSpecialty: [
      'Emergency Medicine',
      'Internal Medicine',
      'Surgery',
      'Pediatrics',
      'Radiology',
      'Laboratory Services',
    ],
    knowsAbout: [
      'Emergency Care',
      'Acute Illness',
      'Chronic Disease Management',
      'Surgery',
      'Diagnostics',
    ],
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
};

/**
 * Generate breadcrumb schema for better SERP appearance
 */
export const addBreadcrumbSchema = (breadcrumbs: Array<{ name: string; url: string }>) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
};

/**
 * Add FAQ Schema for better SERP features
 */
export const addFAQSchema = (faqs: Array<{ question: string; answer: string }>) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
};

/**
 * Performance optimization for SEO
 * Lazy load images, optimize Core Web Vitals
 */
export const optimizePagePerformance = () => {
  // Enable lazy loading for images
  const images = document.querySelectorAll('img');
  images.forEach((img) => {
    if (!img.loading) {
      img.loading = 'lazy';
    }
  });

  // Prefetch critical resources
  const prefetchLinks = [
    { rel: 'prefetch', href: '/fonts/' },
    { rel: 'preload', href: '/src/main.tsx', as: 'script' },
  ];

  prefetchLinks.forEach((link) => {
    const element = document.createElement('link');
    element.rel = link.rel;
    element.href = link.href;
    if (link.as) element.as = link.as;
    document.head.appendChild(element);
  });
};

/**
 * Track page views in Google Analytics
 */
export const trackPageView = (pageName: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'page_view', {
      page_path: `/${pageName}`,
      page_title: document.title,
    });
  }
};

/**
 * Track user interactions for better analytics
 */
export const trackEvent = (category: string, action: string, label?: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
    });
  }
};
