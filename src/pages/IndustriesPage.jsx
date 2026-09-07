import React, { useEffect } from 'react';
import Industries from '../components/Industries';
import ContactCTA from '../components/ContactCTA';

export default function IndustriesPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="industries-page-wrapper" style={{ backgroundColor: '#ffffff', color: '#111827' }}>
      
      {/* 5-Stage Smooth Scroll Exploded CAD Engineering System */}
      <Industries />

      {/* Bottom Call to Action */}
      <ContactCTA />
    </div>
  );
}
