import React, { useState } from 'react';

export default function Header({ isLoggedIn, user, onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header>
      <div className="header-container">
        <div className="logo">
          <i className="fas fa-graduation-cap logo-icon"></i>
          <span className="logo-text">StudyConnect+</span>
          <div className="logo-glow"></div>
        </div>
        <nav>
          <ul className={`nav-list ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            <li><a href="#home" onClick={() => scrollToSection('home')}><i className="fas fa-home"></i> Home</a></li>
            <li><a href="#cursos" onClick={() => scrollToSection('cursos')}><i className="fas fa-book"></i> Cursos</a></li>
            <li><a href="#quiz" onClick={() => scrollToSection('quiz')}><i className="fas fa-gamepad"></i> Jogos</a></li>
            <li><a href="#professores" onClick={() => scrollToSection('professores')}><i className="fas fa-chalkboard-teacher"></i> Professores</a></li>
            <li><a href="#contato" onClick={() => scrollToSection('contato')}><i className="fas fa-envelope"></i> Contato</a></li>
            
            {!isLoggedIn ? (
              <li><a href="Login/Login.html" className="login-btn"><i className="fas fa-sign-in-alt"></i> Entrar</a></li>
            ) : (
              <li className="profile-menu">
                <div 
                  className="profile-btn" 
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                >
                  <img src="images/favicon.png" alt="Perfil" className="profile-avatar" />
                  <span className="profile-name">{user?.name || 'Usuário'}</span>
                  <i className="fas fa-chevron-down"></i>
                </div>
                {profileDropdownOpen && (
                  <div className="profile-dropdown">
                    <div className="profile-dropdown-header">
                      <h3 className="profile-dropdown-title">Meu Perfil</h3>
                      <button 
                        className="profile-dropdown-close"
                        onClick={() => setProfileDropdownOpen(false)}
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                    <div className="profile-dropdown-body">
                      <a href="#" className="dropdown-item">
                        <i className="fas fa-user-edit"></i> Editar Perfil
                      </a>
                      <a href="Desempenho.html" className="dropdown-item">
                        <i className="fas fa-chart-line"></i> Desempenho
                      </a>
                      <a href="#" className="dropdown-item">
                        <i className="fas fa-cog"></i> Configurações
                      </a>
                      <div className="dropdown-divider"></div>
                      <a href="#" className="dropdown-item logout-btn" onClick={onLogout}>
                        <i className="fas fa-sign-out-alt"></i> Sair
                      </a>
                    </div>
                  </div>
                )}
              </li>
            )}
          </ul>
          <div className="header-controls">
            <div 
              className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}