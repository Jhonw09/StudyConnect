// StudyConnect+ API Integration
class StudyAPI {
    constructor() {
        this.baseURL = 'http://localhost:8080/api';
        this.isOnline = false;
        this.checkConnection();
    }

    async checkConnection() {
        try {
            const response = await fetch(`${this.baseURL}/health`, { 
                method: 'GET',
                timeout: 5000 
            });
            this.isOnline = response.ok;
        } catch (error) {
            this.isOnline = false;
            console.warn('API offline - usando dados estáticos');
        }
    }

    async get(endpoint) {
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            return this.getFallbackData(endpoint);
        }
    }

    async post(endpoint, data) {
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            return { success: false, message: 'Erro de conexão' };
        }
    }

    getFallbackData(endpoint) {
        const fallbackData = {
            '/cursos': [
                { id: 1, titulo: 'Front-End Moderno', categoriaId: 1, nivel: 'Iniciante', duracaoHoras: 40, totalAlunos: 250, popular: true, imagem: 'images/capa-front-end.jpg', descricao: 'Domine HTML5, CSS3, JavaScript ES6+ e frameworks como React.' },
                { id: 2, titulo: 'Back-End Avançado', categoriaId: 2, nivel: 'Avançado', duracaoHoras: 60, totalAlunos: 180, popular: false, imagem: 'images/17f7d622-3a54-480e-be53-5dd7296bddce_desenvolvedor+backend.avif', descricao: 'Desenvolva APIs robustas com Node.js e bancos de dados.' },
                { id: 3, titulo: 'Português', categoriaId: 4, nivel: 'Básico', duracaoHoras: 40, totalAlunos: 280, popular: false, imagem: 'images/dia-mundial-da-lingua-portuguesa-momento-para-se-aperfeicoar-no-idioma.jpeg', descricao: 'Domine gramática, redação e interpretação de texto.' },
                { id: 4, titulo: 'Matemática', categoriaId: 3, nivel: 'Intermediário', duracaoHoras: 45, totalAlunos: 320, popular: false, imagem: 'images/capa-matematicawebp.webp', descricao: 'Álgebra, geometria, cálculo e estatística aplicada.' }
            ],
            '/professores': [
                { id: 1, nome: 'Maria Silva', especialidade: 'Front-End & UI/UX', biografia: '8 anos de experiência em desenvolvimento front-end', totalAlunos: 450, avaliacao: 4.9, online: true },
                { id: 2, nome: 'Carlos Souza', especialidade: 'Back-End & DevOps', biografia: '10 anos desenvolvendo sistemas escaláveis', totalAlunos: 320, avaliacao: 4.8, online: true },
                { id: 3, nome: 'Ana Lima', especialidade: 'Português & Literatura', biografia: 'Mestre em Letras pela USP', totalAlunos: 580, avaliacao: 4.9, online: false },
                { id: 4, nome: 'João Pereira', especialidade: 'Matemática Aplicada', biografia: 'PhD em Matemática pela UNICAMP', totalAlunos: 290, avaliacao: 4.7, online: true }
            ],
            '/stats': { cursos: 50, alunos: 1000, professores: 25 }
        };
        return fallbackData[endpoint] || null;
    }

    // Métodos específicos
    async getCursos() { return await this.get('/cursos'); }
    async getCursosPorCategoria(id) { 
        const cursos = await this.get('/cursos');
        return cursos ? cursos.filter(curso => curso.categoriaId == id) : null;
    }
    async getCursosPopulares() { 
        const cursos = await this.get('/cursos');
        return cursos ? cursos.filter(curso => curso.popular) : null;
    }
    async getProfessores() { return await this.get('/professores'); }
    async getStats() { return await this.get('/stats'); }
    async enviarContato(dados) { return await this.post('/contatos', dados); }
}

const api = new StudyAPI();

// Carregar cursos dinamicamente
async function carregarCursos() {
    try {
        const cursos = await api.getCursos();
        if (!cursos || cursos.length === 0) {
            console.warn('Nenhum curso encontrado');
            return;
        }

        const container = document.querySelector('.courses-grid');
        if (!container) {
            console.warn('Container .courses-grid não encontrado');
            return;
        }

        // Manter cursos existentes e adicionar novos da API
        const existingCourses = container.innerHTML;
        const apiCourses = cursos.map(curso => `
            <div class="course-card hover-lift api-course" data-category="${curso.categoriaId}">
                <div class="card-header">
                    ${curso.popular ? '<div class="course-badge">Mais Popular</div>' : ''}
                    <div class="course-level">${curso.nivel}</div>
                </div>
                <div class="card-image">
                    <img src="${curso.imagem}" alt="${curso.titulo}" onerror="this.src='images/default-course.jpg'" />
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
                            <span>${Math.floor(curso.totalAlunos * 0.8)}</span>
                        </button>
                        <a href="#" class="btn btn-course" onclick="iniciarCurso('${curso.titulo}')">
                            <i class="fas fa-play"></i> Começar Curso
                        </a>
                    </div>
                </div>
            </div>
        `).join('');

        // Adicionar cursos da API após os existentes
        container.innerHTML = existingCourses + apiCourses;
        
        // Reinicializar sistema de favoritos para novos elementos
        if (window.app && window.app.favoritesManager) {
            window.app.favoritesManager.init();
        }
        
        console.log(`${cursos.length} cursos carregados da API`);
    } catch (error) {
        console.error('Erro ao carregar cursos:', error);
    }
}

// Carregar professores dinamicamente
async function carregarProfessores() {
    try {
        const professores = await api.getProfessores();
        if (!professores || professores.length === 0) {
            console.warn('Nenhum professor encontrado');
            return;
        }

        const container = document.querySelector('.teachers-grid');
        if (!container) {
            console.warn('Container .teachers-grid não encontrado');
            return;
        }

        // Manter professores existentes e adicionar novos da API
        const existingTeachers = container.innerHTML;
        const apiTeachers = professores.map(prof => `
            <div class="teacher-card hover-lift api-teacher">
                <div class="teacher-image">
                    <img src="images/default-teacher.jpg" alt="${prof.nome}" onerror="this.src='images/favicon.png'" />
                    <div class="teacher-overlay">
                        <div class="social-links">
                            <a href="#" class="social-link">
                                <i class="fab fa-linkedin"></i>
                            </a>
                            <a href="#" class="social-link">
                                <i class="fab fa-github"></i>
                            </a>
                        </div>
                    </div>
                    <div class="teacher-status ${prof.online ? 'online' : 'offline'}"></div>
                </div>
                <div class="teacher-info">
                    <h3>${prof.nome}</h3>
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
                            <span>Especialista</span>
                        </div>
                    </div>
                    <div class="teacher-skills">
                        <span class="skill-tag">Especialista</span>
                        <span class="skill-tag">Experiente</span>
                    </div>
                    <a href="#" class="btn btn-teacher" onclick="verPerfilProfessor('${prof.nome}')">
                        <i class="fas fa-user"></i> Ver Perfil
                    </a>
                </div>
            </div>
        `).join('');

        // Adicionar professores da API após os existentes
        container.innerHTML = existingTeachers + apiTeachers;
        
        console.log(`${professores.length} professores carregados da API`);
    } catch (error) {
        console.error('Erro ao carregar professores:', error);
    }
}

// Carregar estatísticas dinamicamente
async function carregarStats() {
    try {
        const stats = await api.getStats();
        if (!stats) {
            console.warn('Estatísticas não disponíveis');
            return;
        }

        // Atualizar contadores com dados da API
        const cursosElement = document.querySelector('.stat-number[data-target="50"]');
        const alunosElement = document.querySelector('.stat-number[data-target="1000"]');
        const professoresElement = document.querySelector('.stat-number[data-target="25"]');

        if (cursosElement) {
            cursosElement.dataset.target = stats.cursos;
            animarContador(cursosElement, stats.cursos);
        }
        
        if (alunosElement) {
            alunosElement.dataset.target = stats.alunos;
            animarContador(alunosElement, stats.alunos);
        }
        
        if (professoresElement) {
            professoresElement.dataset.target = stats.professores;
            animarContador(professoresElement, stats.professores);
        }
        
        console.log('Estatísticas atualizadas:', stats);
    } catch (error) {
        console.error('Erro ao carregar estatísticas:', error);
    }
}

// Filtrar cursos por categoria
function filtrarCursos(categoriaId) {
    const container = document.querySelector('.courses-grid');
    if (!container) return;
    
    const cards = container.querySelectorAll('.course-card');
    let visibleCount = 0;
    
    cards.forEach((card, index) => {
        const cardCategory = card.dataset.category;
        const shouldShow = (categoriaId === 'all' || cardCategory === categoriaId);
        
        if (shouldShow) {
            card.style.display = 'block';
            card.style.animation = `fadeInUp 0.5s ease ${index * 0.1}s forwards`;
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    // Mostrar mensagem se nenhum curso for encontrado
    const noResultsMsg = container.querySelector('.no-results');
    if (visibleCount === 0 && !noResultsMsg) {
        const message = document.createElement('div');
        message.className = 'no-results';
        message.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: #666;">
                <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                <h3>Nenhum curso encontrado</h3>
                <p>Tente selecionar outra categoria</p>
            </div>
        `;
        container.appendChild(message);
    } else if (visibleCount > 0 && noResultsMsg) {
        noResultsMsg.remove();
    }
    
    console.log(`${visibleCount} cursos visíveis para categoria: ${categoriaId}`);
}

// Enviar formulário de contato
async function enviarContato(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitBtn = form.querySelector('.btn-contact');
    const originalText = submitBtn.innerHTML;
    
    // Mostrar loading
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitBtn.disabled = true;
    
    try {
        const formData = new FormData(form);
        const dados = {
            nome: formData.get('name'),
            email: formData.get('email'),
            assunto: formData.get('subject'),
            mensagem: formData.get('message'),
            timestamp: new Date().toISOString()
        };
        
        const resultado = await api.enviarContato(dados);
        
        if (resultado && resultado.success !== false) {
            mostrarNotificacao('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
            form.reset();
            
            // Salvar no localStorage como backup
            const contatos = JSON.parse(localStorage.getItem('contatos_enviados') || '[]');
            contatos.push(dados);
            localStorage.setItem('contatos_enviados', JSON.stringify(contatos));
        } else {
            throw new Error(resultado?.message || 'Erro desconhecido');
        }
    } catch (error) {
        console.error('Erro ao enviar contato:', error);
        mostrarNotificacao('Erro ao enviar mensagem. Tente novamente mais tarde.', 'error');
    } finally {
        // Restaurar botão
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

// Animar contador com efeito suave
function animarContador(elemento, valorFinal) {
    if (!elemento || isNaN(valorFinal)) return;
    
    const valorInicial = 0;
    const duracao = 2000; // 2 segundos
    const incremento = valorFinal / (duracao / 16);
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

// Função para mostrar notificações
function mostrarNotificacao(mensagem, tipo = 'info') {
    // Usar o sistema de notificações existente se disponível
    if (window.app && window.app.showNotification) {
        window.app.showNotification(mensagem, tipo);
        return;
    }
    
    // Fallback para alert simples
    alert(mensagem);
}

// Funções auxiliares para interação
function iniciarCurso(titulo) {
    mostrarNotificacao(`Iniciando curso: ${titulo}`, 'info');
    console.log('Curso iniciado:', titulo);
}

function verPerfilProfessor(nome) {
    mostrarNotificacao(`Visualizando perfil de: ${nome}`, 'info');
    console.log('Perfil do professor:', nome);
}

// Inicialização da API
function inicializarAPI() {
    console.log('🚀 Inicializando StudyConnect+ API...');
    
    // Carregar dados da API
    carregarCursos();
    carregarProfessores();
    carregarStats();
    
    // Configurar filtros de curso
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remover classe active de todos os botões
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filtrar cursos
            const categoria = btn.dataset.category;
            filtrarCursos(categoria);
        });
    });
    
    // Configurar formulário de contato
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', enviarContato);
    }
    
    // Verificar status da API periodicamente
    setInterval(() => {
        api.checkConnection();
    }, 30000); // A cada 30 segundos
    
    console.log('✅ StudyConnect+ API inicializada com sucesso!');
}

// Aguardar carregamento da página
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarAPI);
} else {
    inicializarAPI();
}

// Disponibilizar API globalmente
window.StudyAPI = api;
window.carregarCursos = carregarCursos;
window.carregarProfessores = carregarProfessores;
window.carregarStats = carregarStats;
window.filtrarCursos = filtrarCursos;

console.log('📚 StudyConnect+ API carregada!');