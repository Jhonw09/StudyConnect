// StudyConnect API Integration
const API_BASE_URL = 'http://localhost:8080/api';

class StudyConnectAPI {
    
    // Buscar todos os cursos
    static async getCursos() {
        try {
            const response = await fetch(`${API_BASE_URL}/cursos`);
            return await response.json();
        } catch (error) {
            console.error('Erro ao buscar cursos:', error);
            return [];
        }
    }
    
    // Buscar cursos populares
    static async getCursosPopulares() {
        try {
            const response = await fetch(`${API_BASE_URL}/cursos/populares`);
            return await response.json();
        } catch (error) {
            console.error('Erro ao buscar cursos populares:', error);
            return [];
        }
    }
    
    // Buscar cursos por categoria
    static async getCursosPorCategoria(categoriaId) {
        try {
            const response = await fetch(`${API_BASE_URL}/cursos/categoria/${categoriaId}`);
            return await response.json();
        } catch (error) {
            console.error('Erro ao buscar cursos por categoria:', error);
            return [];
        }
    }
    
    // Buscar professores
    static async getProfessores() {
        try {
            const response = await fetch(`${API_BASE_URL}/professores`);
            return await response.json();
        } catch (error) {
            console.error('Erro ao buscar professores:', error);
            return [];
        }
    }
    
    // Enviar contato
    static async enviarContato(dados) {
        try {
            const response = await fetch(`${API_BASE_URL}/contatos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            });
            return await response.json();
        } catch (error) {
            console.error('Erro ao enviar contato:', error);
            throw error;
        }
    }
}

// Exemplo de uso no seu site atual
document.addEventListener('DOMContentLoaded', async function() {
    
    // Carregar cursos na seção de cursos
    const cursosContainer = document.querySelector('.courses-grid');
    if (cursosContainer) {
        const cursos = await StudyConnectAPI.getCursos();
        renderizarCursos(cursos, cursosContainer);
    }
    
    // Carregar professores
    const professoresContainer = document.querySelector('.teachers-grid');
    if (professoresContainer) {
        const professores = await StudyConnectAPI.getProfessores();
        renderizarProfessores(professores, professoresContainer);
    }
    
    // Configurar formulário de contato
    const formContato = document.querySelector('#contact-form');
    if (formContato) {
        formContato.addEventListener('submit', handleContatoSubmit);
    }
});

// Renderizar cursos dinamicamente
function renderizarCursos(cursos, container) {
    container.innerHTML = '';
    
    cursos.forEach(curso => {
        const cursoCard = `
            <div class="course-card" data-category="${curso.categoria?.nome?.toLowerCase()}">
                <div class="course-image">
                    <img src="${curso.imagemUrl || 'images/course-placeholder.jpg'}" alt="${curso.titulo}">
                    ${curso.popular ? '<span class="badge popular">Popular</span>' : ''}
                    <span class="badge level">${curso.nivel}</span>
                </div>
                <div class="course-content">
                    <h3>${curso.titulo}</h3>
                    <p>${curso.descricao}</p>
                    <div class="course-meta">
                        <span class="rating">
                            <i class="fas fa-star"></i>
                            ${curso.avaliacao}
                        </span>
                        <span class="students">
                            <i class="fas fa-users"></i>
                            ${curso.totalAlunos} alunos
                        </span>
                        <span class="duration">
                            <i class="fas fa-clock"></i>
                            ${curso.duracaoHoras}h
                        </span>
                    </div>
                    <div class="course-footer">
                        <span class="price">R$ ${curso.preco}</span>
                        <button class="btn-primary">Matricular</button>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += cursoCard;
    });
}

// Renderizar professores dinamicamente
function renderizarProfessores(professores, container) {
    container.innerHTML = '';
    
    professores.forEach(professor => {
        const professorCard = `
            <div class="teacher-card">
                <div class="teacher-image">
                    <img src="images/teacher-placeholder.jpg" alt="${professor.usuario?.nome}">
                    <div class="status ${professor.statusOnline ? 'online' : 'offline'}"></div>
                </div>
                <div class="teacher-info">
                    <h3>${professor.usuario?.nome}</h3>
                    <p class="specialty">${professor.especialidade}</p>
                    <p class="bio">${professor.biografia}</p>
                    <div class="teacher-stats">
                        <span class="rating">
                            <i class="fas fa-star"></i>
                            ${professor.avaliacao}
                        </span>
                        <span class="students">
                            <i class="fas fa-users"></i>
                            ${professor.totalAlunos} alunos
                        </span>
                    </div>
                    <div class="social-links">
                        ${professor.linkedin ? `<a href="${professor.linkedin}"><i class="fab fa-linkedin"></i></a>` : ''}
                        ${professor.github ? `<a href="${professor.github}"><i class="fab fa-github"></i></a>` : ''}
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += professorCard;
    });
}

// Handle do formulário de contato
async function handleContatoSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const dados = {
        nome: formData.get('name'),
        email: formData.get('email'),
        assunto: formData.get('subject'),
        mensagem: formData.get('message')
    };
    
    try {
        await StudyConnectAPI.enviarContato(dados);
        
        // Mostrar sucesso
        showNotification('Mensagem enviada com sucesso!', 'success');
        event.target.reset();
        
    } catch (error) {
        showNotification('Erro ao enviar mensagem. Tente novamente.', 'error');
    }
}

// Sistema de notificações
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Filtros de curso integrados com API
function setupCourseFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', async function() {
            const categoria = this.dataset.category;
            
            // Remover classe active de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const cursosContainer = document.querySelector('.courses-grid');
            
            if (categoria === 'all') {
                const cursos = await StudyConnectAPI.getCursos();
                renderizarCursos(cursos, cursosContainer);
            } else {
                // Aqui você precisaria mapear o nome da categoria para o ID
                // Por exemplo, buscar categorias primeiro e fazer o match
                const cursos = await StudyConnectAPI.getCursos();
                const cursosFiltrados = cursos.filter(curso => 
                    curso.categoria?.nome?.toLowerCase() === categoria
                );
                renderizarCursos(cursosFiltrados, cursosContainer);
            }
        });
    });
}

// Inicializar filtros quando a página carregar
document.addEventListener('DOMContentLoaded', setupCourseFilters);