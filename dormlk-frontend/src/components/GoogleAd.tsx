import React from 'react';
import { useGoogleAds } from '../hooks/useGoogleAds.ts';

interface GoogleAdProps {
  slot: string;
  format?: string;
  style?: React.CSSProperties;
  className?: string;
}

const GoogleAd: React.FC<GoogleAdProps> = ({ 
  slot, 
  format = 'auto', 
  style = { display: 'block' },
  className 
}) => {
  useGoogleAds();

  // Don't render ad container in development
  if (process.env.NODE_ENV !== 'production') {
    return (
      <div className={className} style={{ ...style, background: '#f0f0f0', padding: '20px', textAlign: 'center' }}>
        [Ad Slot: {slot}] - Ads are disabled in development mode
      </div>
    );
  }

  return (
    <ins
      className={`adsbygoogle ${className}`}
      style={style}
      data-ad-client="ca-pub-7741658003653293"
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive="true"
    />
  );
};

export default GoogleAd;
