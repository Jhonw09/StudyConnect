// StudyConnect+ API Integration
class StudyAPI {
    constructor() {
        this.baseURL = 'http://localhost:8080/api';
    }

    async get(endpoint) {
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`);
            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
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
            console.error('API Error:', error);
            return null;
        }
    }

    // Métodos específicos
    async getCursos() { return await this.get('/cursos'); }
    async getCursosPorCategoria(id) { return await this.get(`/cursos/categoria/${id}`); }
    async getCursosPopulares() { return await this.get('/cursos/populares'); }
    async getProfessores() { return await this.get('/professores'); }
    async getStats() { return await this.get('/stats'); }
    async enviarContato(dados) { return await this.post('/contatos', dados); }
}

const api = new StudyAPI();

// Carregar cursos
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

// Carregar professores
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
                </div>
                <a href="#" class="btn btn-teacher">
                    <i class="fas fa-user"></i> Ver Perfil
                </a>
            </div>
        </div>
    `).join('');
}

// Carregar estatísticas
async function carregarStats() {
    const stats = await api.getStats();
    if (!stats) return;

    animarContador('.stat-number[data-target="50"]', stats.cursos);
    animarContador('.stat-number[data-target="1000"]', stats.alunos);
    animarContador('.stat-number[data-target="25"]', stats.professores);
}

// Filtrar cursos
async function filtrarCursos(categoriaId) {
    let cursos;
    if (categoriaId === 'all') {
        cursos = await api.getCursos();
    } else {
        cursos = await api.getCursosPorCategoria(categoriaId);
    }
    
    if (!cursos) return;
    
    const container = document.querySelector('.courses-grid');
    if (container) {
        const cards = container.querySelectorAll('.course-card');
        cards.forEach(card => {
            const cardCategory = card.dataset.category;
            card.style.display = (categoriaId === 'all' || cardCategory === categoriaId) ? 'block' : 'none';
        });
    }
}

// Enviar contato
async function enviarContato(event) {
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
        alert('Erro ao enviar mensagem.');
    }
}

// Animar contador
function animarContador(selector, valorFinal) {
    const elemento = document.querySelector(selector);
    if (!elemento) return;
    
    let valorAtual = 0;
    const incremento = valorFinal / 100;
    
    const timer = setInterval(() => {
        valorAtual += incremento;
        if (valorAtual >= valorFinal) {
            valorAtual = valorFinal;
            clearInterval(timer);
        }
        elemento.textContent = Math.floor(valorAtual);
    }, 20);
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    carregarCursos();
    carregarProfessores();
    carregarStats();
    
    // Filtros
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filtrarCursos(btn.dataset.category);
        });
    });
    
    // Formulário
    const form = document.querySelector('#contact-form');
    if (form) form.addEventListener('submit', enviarContato);
});

console.log('StudyConnect+ API carregada!');