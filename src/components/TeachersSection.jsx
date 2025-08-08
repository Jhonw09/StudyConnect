import React from 'react';

const teachersData = [
  {
    id: 1,
    name: "Carlos Souza",
    specialty: "Desenvolvedor Backend",
    image: "images/Carlos.jpg",
    rating: 4.9,
    students: 1250,
    courses: 8,
    experience: "5+ anos",
    skills: ["Node.js", "Python", "MongoDB", "AWS"],
    online: true,
    social: {
      linkedin: "#",
      github: "#",
      twitter: "#"
    }
  },
  {
    id: 2,
    name: "Maria Silva",
    specialty: "Frontend Specialist",
    image: "images/profa.jpg",
    rating: 4.8,
    students: 980,
    courses: 6,
    experience: "4+ anos",
    skills: ["React", "Vue.js", "TypeScript", "CSS"],
    online: false,
    social: {
      linkedin: "#",
      github: "#",
      twitter: "#"
    }
  },
  {
    id: 3,
    name: "Prof. João Santos",
    specialty: "Matemática Aplicada",
    image: "images/profmat.jpg",
    rating: 4.7,
    students: 2100,
    courses: 12,
    experience: "10+ anos",
    skills: ["Álgebra", "Cálculo", "Estatística", "Geometria"],
    online: true,
    social: {
      linkedin: "#",
      github: "#",
      twitter: "#"
    }
  }
];

export default function TeachersSection() {
  return (
    <section id="professores" className="teachers-section">
      <div className="section-header">
        <h2 className="section-title">
          <span className="title-accent"></span> Nossos Professores
        </h2>
        <p className="section-subtitle">
          Especialistas dedicados ao seu sucesso profissional
        </p>
      </div>

      <div className="teachers-grid">
        {teachersData.map(teacher => (
          <div key={teacher.id} className="teacher-card">
            <div className="teacher-image">
              <img src={teacher.image} alt={teacher.name} />
              <div className={`status-indicator ${teacher.online ? 'online' : 'offline'}`}>
                <i className={`fas ${teacher.online ? 'fa-circle' : 'fa-circle'}`}></i>
                <span>{teacher.online ? 'Online' : 'Offline'}</span>
              </div>
            </div>
            
            <div className="teacher-content">
              <h3 className="teacher-name">{teacher.name}</h3>
              <p className="teacher-specialty">{teacher.specialty}</p>
              
              <div className="teacher-stats">
                <div className="stat">
                  <i className="fas fa-star"></i>
                  <span>{teacher.rating}</span>
                </div>
                <div className="stat">
                  <i className="fas fa-users"></i>
                  <span>{teacher.students}</span>
                </div>
                <div className="stat">
                  <i className="fas fa-book"></i>
                  <span>{teacher.courses} cursos</span>
                </div>
                <div className="stat">
                  <i className="fas fa-clock"></i>
                  <span>{teacher.experience}</span>
                </div>
              </div>

              <div className="teacher-skills">
                {teacher.skills.map((skill, index) => (
                  <span key={index} className="skill-tag">{skill}</span>
                ))}
              </div>

              <div className="teacher-actions">
                <button className="btn btn-primary">
                  <i className="fas fa-envelope"></i> Contatar
                </button>
                <div className="social-links">
                  <a href={teacher.social.linkedin} className="social-link">
                    <i className="fab fa-linkedin"></i>
                  </a>
                  <a href={teacher.social.github} className="social-link">
                    <i className="fab fa-github"></i>
                  </a>
                  <a href={teacher.social.twitter} className="social-link">
                    <i className="fab fa-twitter"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}