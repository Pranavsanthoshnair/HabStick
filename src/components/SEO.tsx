import React from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  article?: boolean;
  children?: React.ReactNode;
}

// This is a simpler SEO component that doesn't require react-helmet-async
// It updates the document title directly
export default function SEO({
  title = 'HabStick | Revolutionary Smart Blind Stick with AI Navigation',
  description = 'HabStick: The #1 Smart Blind Stick with AI-powered navigation. Features real-time obstacle detection, voice assistance, GPS tracking, and emergency alerts.',
  keywords = 'HabStick, smart blind stick, AI navigation aid, electronic walking stick for blind, smart cane',
  image = 'https://www.habstick.com/og-image.jpg',
  article = false,
}: SEOProps) {
  const { pathname } = useLocation();
  
  // Update document title
  React.useEffect(() => {
    document.title = title;
    
    // Update meta tags
    const metaTags = {
      description: description,
      keywords: keywords,
      'og:title': title,
      'og:description': description,
      'og:image': image,
      'og:type': article ? 'article' : 'website',
      'twitter:title': title,
      'twitter:description': description,
      'twitter:image': image
    };
    
    // Update existing meta tags or create new ones
    Object.entries(metaTags).forEach(([name, content]) => {
      let meta = document.querySelector(`meta[name="${name}"]`) || 
                 document.querySelector(`meta[property="${name}"]`);
      
      if (!meta) {
        meta = document.createElement('meta');
        if (name.startsWith('og:')) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    });
    
    return () => {
      // Cleanup function if needed
    };
  }, [title, description, keywords, image, article, pathname]);

  // This component doesn't render anything visible
  return null;
}
