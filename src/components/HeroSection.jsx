import React, { useEffect, useState } from 'react';

export default function HeroSection() {
  const [stats, setStats] = useState({ users: 0, courses: 0, teachers: 0 });

  useEffect(() => {
    // Animação dos contadores
    const animateCounter = (target, key, duration = 2000) => {
      const start = 0;
      const increment = target / (duration / 16);
      let current = start;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setStats(prev => ({ ...prev, [key]: Math.floor(current) }));
      }, 16);
    };

    // Iniciar animações
    setTimeout(() => {
      animateCounter(1000, 'users');
      animateCounter(50, 'courses');
      animateCounter(25, 'teachers');
    }, 500);
  }, []);

  return (
    <section id="home" className="hero-section">
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            <span className="title-line">Transforme seu Futuro</span>
            <span className="title-line">com Educação</span>
          </h1>
          <p className="hero-subtitle">
            Plataforma completa de estudos com cursos profissionais <strong>gratuitos</strong>, 
            professores especializados e metodologia inovadora para acelerar sua carreira.
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <i className="fas fa-users stat-icon users"></i>
              <span className="stat-number">{stats.users}</span>
              <span className="stat-label">Alunos</span>
            </div>
            <div className="stat-item">
              <i className="fas fa-book stat-icon books"></i>
              <span className="stat-number">{stats.courses}</span>
              <span className="stat-label">Cursos</span>
            </div>
            <div className="stat-item">
              <i className="fas fa-chalkboard-teacher stat-icon teachers"></i>
              <span className="stat-number">{stats.teachers}</span>
              <span className="stat-label">Professores</span>
            </div>
          </div>
          <div className="hero-buttons">
            <a href="#cursos" className="btn btn-primary">
              <i className="fas fa-rocket"></i>
              Começar Agora
            </a>
            <a href="#professores" className="btn btn-secondary">
              <i className="fas fa-play"></i>
              Conhecer Professores
            </a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="floating-cards">
            <div className="floating-card card-1">
              <i className="fas fa-code"></i>
              <span>Programação</span>
            </div>
            <div className="floating-card card-2">
              <i className="fas fa-book-open"></i>
              <span>Português</span>
            </div>
            <div className="floating-card card-3">
              <i className="fas fa-calculator"></i>
              <span>Matemática</span>
            </div>
            <div className="floating-card card-4">
              <i className="fas fa-database"></i>
              <span>Backend</span>
            </div>
          </div>
        </div>
      </div>
      <div className="scroll-indicator">
        <div className="scroll-arrow">
          <i className="fas fa-chevron-down"></i>
        </div>
      </div>
    </section>
  );
}