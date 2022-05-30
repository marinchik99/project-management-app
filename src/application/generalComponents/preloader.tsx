import React from 'react';
import '../../css/preloader.css';

export default function Preloader() {
  return (
    <div className="preloader" data-testid="preloader">
      <div className="loader"></div>
      <div className="loader-section section-left"></div>
      <div className="loader-section section-right"></div>
    </div>
  );
}
