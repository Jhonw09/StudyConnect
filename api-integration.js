// =============================================
// StudyConnect+ - Integração Frontend com API
// =============================================

class StudyAPI {
    constructor() {
        this.baseURL = 'http://localhost:8080/api';
    }

    async get(endpoint) {
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`);
            return await response.json();
        } catch (error) {
            console.error('Erro na API:', error);
            return null;
        }
    }

    async post(endpoint, data) {
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            return await response.json();
        } catch (error) {
            console.error('Erro na API:', error);
            return null;
        }
    }

    // ========== MÉTODOS ESPECÍFICOS ==========
    
    async getCursos() {
        return await this.get('/cursos');
    }

    async getCursosPorCategoria(categoriaId) {
        return await this.get(`/cursos/categoria/${categoriaId}`);
    }

    async getCursosPopulares() {
        return await this.get('/cursos/populares');
    }

    async getProfessores() {
        return await this.get('/professores');
    }

    async getEstatisticas() {
        return await this.get('/stats');
    }

    async enviarContato(dados) {
        return await this.post('/contatos', dados);
    }
}

// Instância global
const api = new StudyAPI();

// ========== FUNÇÕES DE INTEGRAÇÃO ==========

// Carregar cursos na página
async function carregarCursos() {
    const cursos = await api.getCursos();
    if (!cursos) return;

    const container = document.querySelector('.courses-grid');
    if (!container) return;

    container.innerHTML = cursos.map(curso => `
        <div class="course-card hover-lift" data-category="${curso.categoriaId}">
            <div class="card-header">
                ${curso.popular ? '<div class="course-badge">Mais Popular</div>' : ''}
                <div class="course-level">${curso.nivel}</div>
            </div>
            <div class="card-image">
                <img src="${curso.imagem}" alt="${curso.titulo}" />
                <div class="image-overlay">
                    <div class="course-duration">
                        <i class="fas fa-clock"></i> ${curso.duracaoHoras}h
                    </div>
                    <div class="course-students">
                        <i class="fas fa-users"></i> ${curso.totalAlunos}+
                    </div>
                </div>
            </div>
            <div class="card-content">
                <h3>${curso.titulo}</h3>
                <p>${curso.descricao}</p>
            </div>
            <div class="card-footer">
                <div class="card-actions">
                    <button class="like-btn">
                        <i class="far fa-heart"></i>
                        <span>${curso.totalAlunos}</span>
                    </button>
                    <a href="#" class="btn btn-course">
                        <i class="fas fa-play"></i> Começar Curso
                    </a>
                </div>
            </div>
        </div>
    `).join('');
}

// Carregar professores na página
async function carregarProfessores() {
    const professores = await api.getProfessores();
    if (!professores) return;

    const container = document.querySelector('.teachers-grid');
    if (!container) return;

    container.innerHTML = professores.map(prof => `
        <div class="teacher-card hover-lift">
            <div class="teacher-image">
                <img src="/images/default-teacher.jpg" alt="Professor" />
                <div class="teacher-status ${prof.online ? 'online' : 'offline'}"></div>
            </div>
            <div class="teacher-info">
                <h3>Professor ${prof.id}</h3>
                <p class="teacher-role">${prof.especialidade}</p>
                <p class="teacher-description">${prof.biografia}</p>
                <div class="teacher-stats">
                    <div class="stat">
                        <i class="fas fa-users"></i>
                        <span>${prof.totalAlunos}+ alunos</span>
                    </div>
                    <div class="stat">
                        <i class="fas fa-star"></i>
                        <span>${prof.avaliacao} rating</span>
                    </div>
                    <div class="stat">
                        <i class="fas fa-book"></i>
                        <span>${prof.totalCursos} cursos</span>
                    </div>
                </div>
                <a href="#" class="btn btn-teacher">
                    <i class="fas fa-user"></i> Ver Perfil
                </a>
            </div>
        </div>
    `).join('');
}

// Carregar estatísticas
async function carregarEstatisticas() {
    const stats = await api.getEstatisticas();
    if (!stats) return;

    // Atualizar contadores
    animarContador('.stat-number[data-target]', stats.cursos, 0);
    
    // Atualizar números específicos
    const cursosEl = document.querySelector('[data-target="50"]');
    const alunosEl = document.querySelector('[data-target="1000"]');
    const professoresEl = document.querySelector('[data-target="25"]');
    
    if (cursosEl) animarContador(cursosEl, stats.cursos);
    if (alunosEl) animarContador(alunosEl, stats.alunos);
    if (professoresEl) animarContador(professoresEl, stats.professores);
}

// Filtrar cursos por categoria
async function filtrarCursos(categoriaId) {
    let cursos;
    
    if (categoriaId === 'all') {
        cursos = await api.getCursos();
    } else {
        cursos = await api.getCursosPorCategoria(categoriaId);
    }
    
    if (!cursos) return;
    
    // Atualizar interface (reutilizar lógica do carregarCursos)
    const container = document.querySelector('.courses-grid');
    if (container) {
        // Aplicar filtro visual
        const cards = container.querySelectorAll('.course-card');
        cards.forEach(card => {
            const cardCategory = card.dataset.category;
            if (categoriaId === 'all' || cardCategory === categoriaId) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
}

// Enviar formulário de contato
async function enviarFormulario(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const dados = {
        nome: formData.get('name'),
        email: formData.get('email'),
        assunto: formData.get('subject'),
        mensagem: formData.get('message')
    };
    
    const resultado = await api.enviarContato(dados);
    
    if (resultado) {
        alert('Mensagem enviada com sucesso!');
        event.target.reset();
    } else {
        alert('Erro ao enviar mensagem. Tente novamente.');
    }
}

// Função auxiliar para animar contadores
function animarContador(elemento, valorFinal, valorInicial = 0) {
    if (typeof elemento === 'string') {
        elemento = document.querySelector(elemento);
    }
    
    if (!elemento) return;
    
    const duracao = 2000; // 2 segundos
    const incremento = (valorFinal - valorInicial) / (duracao / 16);
    let valorAtual = valorInicial;
    
    const timer = setInterval(() => {
        valorAtual += incremento;
        if (valorAtual >= valorFinal) {
            valorAtual = valorFinal;
            clearInterval(timer);
        }
        elemento.textContent = Math.floor(valorAtual);
    }, 16);
}

// ========== INICIALIZAÇÃO ==========

document.addEventListener('DOMContentLoaded', function() {
    // Carregar dados da API
    carregarCursos();
    carregarProfessores();
    carregarEstatisticas();
    
    // Configurar filtros de curso
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remover classe active de todos
            filterButtons.forEach(b => b.classList.remove('active'));
            // Adicionar classe active no clicado
            btn.classList.add('active');
            
            // Filtrar cursos
            const categoria = btn.dataset.category;
            filtrarCursos(categoria);
        });
    });
    
    // Configurar formulário de contato
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', enviarFormulario);
    }
});

// Exportar para uso global
window.StudyAPI = StudyAPI;
window.api = api;

console.log('StudyConnect+ API Integration carregada!');