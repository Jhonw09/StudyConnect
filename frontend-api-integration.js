// =============================================
// StudyConnect+ - Integração Frontend com API
// =============================================

class StudyConnectAPI {
    constructor() {
        this.baseURL = 'http://localhost:8080/api';
        this.token = localStorage.getItem('authToken');
    }

    // Headers padrão
    getHeaders() {
        const headers = {
            'Content-Type': 'application/json',
        };
        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }
        return headers;
    }

    // Método genérico para requisições
    async request(endpoint, options = {}) {
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                headers: this.getHeaders(),
                ...options
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    // ========== CURSOS ==========
    async getCursos(page = 0, size = 12) {
        return this.request(`/cursos?page=${page}&size=${size}`);
    }

    async getCursoById(id) {
        return this.request(`/cursos/${id}`);
    }

    async getCursosPorCategoria(categoriaId, page = 0, size = 12) {
        return this.request(`/cursos/categoria/${categoriaId}?page=${page}&size=${size}`);
    }

    async getCursosPopulares() {
        return this.request('/cursos/populares');
    }

    async getCursosDestaques() {
        return this.request('/cursos/destaques');
    }

    async buscarCursos(termo, page = 0, size = 12) {
        return this.request(`/cursos/buscar?termo=${encodeURIComponent(termo)}&page=${page}&size=${size}`);
    }

    // ========== CATEGORIAS ==========
    async getCategorias() {
        return this.request('/categorias');
    }

    // ========== PROFESSORES ==========
    async getProfessores() {
        return this.request('/professores');
    }

    async getProfessorById(id) {
        return this.request(`/professores/${id}`);
    }

    // ========== CONTATO ==========
    async enviarContato(dados) {
        return this.request('/contatos', {
            method: 'POST',
            body: JSON.stringify(dados)
        });
    }

    // ========== ESTATÍSTICAS ==========
    async getEstatisticas() {
        const [cursos, usuarios, professores] = await Promise.all([
            this.request('/cursos/estatisticas'),
            this.request('/usuarios/estatisticas/alunos'),
            this.request('/usuarios/estatisticas/professores')
        ]);

        return {
            totalCursos: cursos,
            totalAlunos: usuarios,
            totalProfessores: professores
        };
    }
}

// Instância global da API
const api = new StudyConnectAPI();

// =============================================
// Integração com o Frontend Existente
// =============================================

// Atualizar seção de cursos
async function carregarCursos() {
    try {
        const response = await api.getCursos();
        const cursosContainer = document.querySelector('.courses-grid');
        
        if (!cursosContainer) return;

        cursosContainer.innerHTML = response.content.map(curso => `
            <div class="course-card" data-category="${curso.categoria.nome.toLowerCase()}">
                <div class="course-image">
                    <img src="${curso.imagemUrl || '/images/default-course.jpg'}" alt="${curso.titulo}">
                    <div class="course-overlay">
                        <button class="btn-preview">Ver Prévia</button>
                    </div>
                </div>
                <div class="course-content">
                    <div class="course-header">
                        <span class="course-category">${curso.categoria.nome}</span>
                        <span class="course-level ${curso.nivel.toLowerCase()}">${curso.nivel}</span>
                    </div>
                    <h3>${curso.titulo}</h3>
                    <p>${curso.descricao.substring(0, 100)}...</p>
                    <div class="course-meta">
                        <div class="course-rating">
                            <i class="fas fa-star"></i>
                            <span>${curso.avaliacao}</span>
                            <span>(${curso.totalAvaliacoes})</span>
                        </div>
                        <div class="course-students">
                            <i class="fas fa-users"></i>
                            <span>${curso.totalAlunos} alunos</span>
                        </div>
                    </div>
                    <div class="course-footer">
                        <div class="course-price">
                            ${curso.precoPromocional ? 
                                `<span class="price-old">R$ ${curso.preco}</span>
                                 <span class="price-new">R$ ${curso.precoPromocional}</span>` :
                                `<span class="price">R$ ${curso.preco}</span>`
                            }
                        </div>
                        <button class="btn-enroll" onclick="matricularCurso(${curso.id})">
                            Matricular-se
                        </button>
                    </div>
                    <div class="course-technologies">
                        ${curso.tecnologias.map(tech => 
                            `<span class="tech-badge" style="color: ${tech.cor}">
                                <i class="${tech.icone}"></i> ${tech.nome}
                            </span>`
                        ).join('')}
                    </div>
                </div>
            </div>
        `).join('');

        // Aplicar animações
        animateOnScroll();
        
    } catch (error) {
        console.error('Erro ao carregar cursos:', error);
        showNotification('Erro ao carregar cursos', 'error');
    }
}

// Carregar professores
async function carregarProfessores() {
    try {
        const professores = await api.getProfessores();
        const professoresContainer = document.querySelector('.teachers-grid');
        
        if (!professoresContainer) return;

        professoresContainer.innerHTML = professores.map(professor => `
            <div class="teacher-card">
                <div class="teacher-avatar">
                    <img src="${professor.usuario.avatarUrl || '/images/default-avatar.jpg'}" 
                         alt="${professor.usuario.nome}">
                    <div class="status-indicator ${professor.statusOnline ? 'online' : 'offline'}"></div>
                </div>
                <div class="teacher-info">
                    <h3>${professor.usuario.nome}</h3>
                    <p class="teacher-specialty">${professor.especialidade}</p>
                    <p class="teacher-bio">${professor.biografia.substring(0, 100)}...</p>
                    <div class="teacher-stats">
                        <div class="stat">
                            <i class="fas fa-star"></i>
                            <span>${professor.avaliacao}</span>
                        </div>
                        <div class="stat">
                            <i class="fas fa-users"></i>
                            <span>${professor.totalAlunos}</span>
                        </div>
                        <div class="stat">
                            <i class="fas fa-book"></i>
                            <span>${professor.totalCursos}</span>
                        </div>
                    </div>
                    <div class="teacher-social">
                        ${professor.linkedin ? `<a href="${professor.linkedin}" target="_blank"><i class="fab fa-linkedin"></i></a>` : ''}
                        ${professor.github ? `<a href="${professor.github}" target="_blank"><i class="fab fa-github"></i></a>` : ''}
                        ${professor.website ? `<a href="${professor.website}" target="_blank"><i class="fas fa-globe"></i></a>` : ''}
                    </div>
                </div>
            </div>
        `).join('');

    } catch (error) {
        console.error('Erro ao carregar professores:', error);
    }
}

// Carregar estatísticas
async function carregarEstatisticas() {
    try {
        const stats = await api.getEstatisticas();
        
        // Atualizar contadores animados
        animateCounter('.stat-courses .counter', stats.totalCursos);
        animateCounter('.stat-students .counter', stats.totalAlunos);
        animateCounter('.stat-teachers .counter', stats.totalProfessores);
        
    } catch (error) {
        console.error('Erro ao carregar estatísticas:', error);
    }
}

// Filtrar cursos por categoria
async function filtrarCursos(categoria) {
    try {
        let response;
        
        if (categoria === 'todos') {
            response = await api.getCursos();
        } else {
            // Buscar ID da categoria pelo nome
            const categorias = await api.getCategorias();
            const categoriaObj = categorias.find(cat => 
                cat.nome.toLowerCase() === categoria.toLowerCase()
            );
            
            if (categoriaObj) {
                response = await api.getCursosPorCategoria(categoriaObj.id);
            }
        }
        
        // Atualizar interface com os cursos filtrados
        if (response) {
            atualizarCursosInterface(response.content);
        }
        
    } catch (error) {
        console.error('Erro ao filtrar cursos:', error);
    }
}

// Buscar cursos
async function buscarCursos(termo) {
    try {
        const response = await api.buscarCursos(termo);
        atualizarCursosInterface(response.content);
    } catch (error) {
        console.error('Erro ao buscar cursos:', error);
    }
}

// Enviar formulário de contato
async function enviarFormularioContato(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const dados = {
        nome: formData.get('nome'),
        email: formData.get('email'),
        telefone: formData.get('telefone'),
        assunto: formData.get('assunto'),
        mensagem: formData.get('mensagem')
    };
    
    try {
        await api.enviarContato(dados);
        showNotification('Mensagem enviada com sucesso!', 'success');
        event.target.reset();
    } catch (error) {
        console.error('Erro ao enviar contato:', error);
        showNotification('Erro ao enviar mensagem', 'error');
    }
}

// =============================================
// Inicialização
// =============================================

document.addEventListener('DOMContentLoaded', function() {
    // Carregar dados da API
    carregarCursos();
    carregarProfessores();
    carregarEstatisticas();
    
    // Configurar formulário de contato
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', enviarFormularioContato);
    }
    
    // Configurar filtros de curso
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const categoria = btn.dataset.filter;
            filtrarCursos(categoria);
        });
    });
    
    // Configurar busca
    const searchInput = document.querySelector('#course-search');
    if (searchInput) {
        let searchTimeout;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                if (e.target.value.length >= 3) {
                    buscarCursos(e.target.value);
                } else if (e.target.value.length === 0) {
                    carregarCursos();
                }
            }, 500);
        });
    }
});

// Função auxiliar para animar contadores
function animateCounter(selector, target) {
    const element = document.querySelector(selector);
    if (!element) return;
    
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString();
    }, 20);
}

// Função auxiliar para atualizar interface de cursos
function atualizarCursosInterface(cursos) {
    const cursosContainer = document.querySelector('.courses-grid');
    if (!cursosContainer) return;
    
    // Implementar lógica de atualização similar à função carregarCursos
    // ... código de atualização ...
}

console.log('StudyConnect+ API Integration loaded successfully!');