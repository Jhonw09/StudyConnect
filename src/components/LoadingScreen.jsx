import React from 'react';

export default function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="loading-logo">
          <i className="fas fa-graduation-cap"></i>
          <span>StudyConnect+</span>
        </div>
        <div className="loading-spinner"></div>
        <p>Carregando experiência de aprendizado...</p>
      </div>
    </div>
  );
}