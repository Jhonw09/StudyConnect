import React, { useState } from 'react';

const coursesData = [
  {
    id: 1,
    title: "Frontend Moderno",
    description: "Domine React, Vue.js e as mais modernas tecnologias frontend",
    image: "images/capa-front-end.jpg",
    category: "programacao",
    level: "Intermediário",
    rating: 4.9,
    students: 1250,
    price: "Gratuito",
    technologies: ["React", "Vue.js", "TypeScript"],
    popular: true
  },
  {
    id: 2,
    title: "Backend Avançado",
    description: "Construa APIs robustas com Node.js, Python e bancos de dados",
    image: "images/17f7d622-3a54-480e-be53-5dd7296bddce_desenvolvedor+backend.avif",
    category: "programacao",
    level: "Avançado",
    rating: 4.8,
    students: 980,
    price: "Gratuito",
    technologies: ["Node.js", "Python", "MongoDB"],
    popular: false
  },
  {
    id: 3,
    title: "Matemática Fundamental",
    description: "Base sólida em matemática para programação e ciências",
    image: "images/capa-matematicawebp.webp",
    category: "matematica",
    level: "Básico",
    rating: 4.7,
    students: 2100,
    price: "Gratuito",
    technologies: ["Álgebra", "Geometria", "Estatística"],
    popular: true
  },
  {
    id: 4,
    title: "Português Avançado",
    description: "Comunicação profissional e redação técnica",
    image: "images/dia-mundial-da-lingua-portuguesa-momento-para-se-aperfeicoar-no-idioma.jpeg",
    category: "portugues",
    level: "Intermediário",
    rating: 4.6,
    students: 1800,
    price: "Gratuito",
    technologies: ["Redação", "Gramática", "Comunicação"],
    popular: false
  }
];

export default function CoursesSection() {
  const [activeFilter, setActiveFilter] = useState('todos');
  const [filteredCourses, setFilteredCourses] = useState(coursesData);

  const filterCourses = (category) => {
    setActiveFilter(category);
    if (category === 'todos') {
      setFilteredCourses(coursesData);
    } else {
      setFilteredCourses(coursesData.filter(course => course.category === category));
    }
  };

  return (
    <section id="cursos" className="courses-section">
      <div className="section-header">
        <h2 className="section-title">
          <span className="title-accent"></span> Nossos Cursos
        </h2>
        <p className="section-subtitle">
          Cursos gratuitos desenvolvidos por especialistas para acelerar sua carreira
        </p>
      </div>

      <div className="course-filters">
        <button 
          className={`filter-btn ${activeFilter === 'todos' ? 'active' : ''}`}
          onClick={() => filterCourses('todos')}
        >
          <i className="fas fa-th"></i> Todos
        </button>
        <button 
          className={`filter-btn ${activeFilter === 'programacao' ? 'active' : ''}`}
          onClick={() => filterCourses('programacao')}
        >
          <i className="fas fa-code"></i> Programação
        </button>
        <button 
          className={`filter-btn ${activeFilter === 'matematica' ? 'active' : ''}`}
          onClick={() => filterCourses('matematica')}
        >
          <i className="fas fa-calculator"></i> Matemática
        </button>
        <button 
          className={`filter-btn ${activeFilter === 'portugues' ? 'active' : ''}`}
          onClick={() => filterCourses('portugues')}
        >
          <i className="fas fa-book-open"></i> Português
        </button>
      </div>

      <div className="courses-grid">
        {filteredCourses.map(course => (
          <div key={course.id} className="course-card">
            {course.popular && <div className="course-badge">Popular</div>}
            <div className="course-image">
              <img src={course.image} alt={course.title} />
              <div className="course-overlay">
                <button className="btn-preview">
                  <i className="fas fa-play"></i> Preview
                </button>
              </div>
            </div>
            <div className="course-content">
              <div className="course-header">
                <h3 className="course-title">{course.title}</h3>
                <span className="course-level">{course.level}</span>
              </div>
              <p className="course-description">{course.description}</p>
              <div className="course-technologies">
                {course.technologies.map((tech, index) => (
                  <span key={index} className="tech-tag">{tech}</span>
                ))}
              </div>
              <div className="course-stats">
                <div className="course-rating">
                  <i className="fas fa-star"></i>
                  <span>{course.rating}</span>
                </div>
                <div className="course-students">
                  <i className="fas fa-users"></i>
                  <span>{course.students}</span>
                </div>
                <div className="course-price">
                  <span className="price">{course.price}</span>
                </div>
              </div>
              <button className="btn btn-primary course-btn">
                <i className="fas fa-play"></i> Começar Curso
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}