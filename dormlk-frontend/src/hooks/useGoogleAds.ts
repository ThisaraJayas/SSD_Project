import { useEffect } from 'react';

export const useGoogleAds = () => {
  useEffect(() => {
    // Only load ads in production environment
    if (process.env.NODE_ENV === 'production') {
      // Check if script is already loaded to avoid duplicates
      if (!document.querySelector('script[src*="googlesyndication.com"]')) {
        const script = document.createElement('script');
        script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7741658003653293';
        script.async = true;
        script.crossOrigin = 'anonymous';
        
        // Add error handling
        script.onerror = () => {
          console.warn('Failed to load Google Ads script');
        };
        
        document.head.appendChild(script);
        
        // Initialize ads
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    }
  }, []);
};
