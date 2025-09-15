// Integração completa com banco SQL Server
class StudyConnectDB {
    constructor() {
        this.apiURL = 'http://localhost:3000/api';
        this.user = JSON.parse(localStorage.getItem('user')) || null;
    }

    // Login
    async login(email, senha) {
        try {
            const response = await fetch(`${this.apiURL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, senha })
            });
            const data = await response.json();
            
            if (data.success) {
                this.user = data.user;
                localStorage.setItem('user', JSON.stringify(data.user));
                this.updateLoginUI();
            }
            return data;
        } catch (error) {
            console.error('Erro no login:', error);
            return { success: false, message: 'Erro de conexão com servidor' };
        }
    }

    // Carregar cursos do banco
    async loadCursos(categoria = null) {
        try {
            const url = categoria ? `${this.apiURL}/cursos?categoria=${categoria}` : `${this.apiURL}/cursos`;
            const cursos = await fetch(url).then(r => r.json());
            
            const container = document.querySelector('.courses-grid');
            if (!container) return;

            container.innerHTML = cursos.map(curso => `
                <div class="course-card animate-on-scroll" data-category="${curso.categoria_nome.toLowerCase()}">
                    <div class="course-image">
                        <img src="${curso.imagem_url || 'images/default-course.jpg'}" alt="${curso.titulo}">
                        ${curso.popular ? '<span class="badge popular">🔥 Popular</span>' : ''}
                        <span class="badge level">${curso.nivel}</span>
                    </div>
                    <div class="course-content">
                        <h3>${curso.titulo}</h3>
                        <p class="course-description">${curso.descricao}</p>
                        <div class="course-meta">
                            <span class="instructor">👨🏫 ${curso.professor_nome}</span>
                            <span class="rating">⭐ ${curso.avaliacao}</span>
                            <span class="students">👥 ${curso.total_alunos}</span>
                        </div>
                        <div class="course-footer">
                            <span class="price">R$ ${curso.preco.toFixed(2)}</span>
                            <button class="btn-enroll" onclick="db.matricular(${curso.id})">
                                Matricular-se
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');

            this.initScrollAnimations();
        } catch (error) {
            console.error('Erro ao carregar cursos:', error);
        }
    }

    // Carregar professores do banco
    async loadProfessores() {
        try {
            const professores = await fetch(`${this.apiURL}/professores`).then(r => r.json());
            const container = document.querySelector('.teachers-grid');
            if (!container) return;

            container.innerHTML = professores.map(prof => `
                <div class="teacher-card animate-on-scroll">
                    <div class="teacher-image">
                        <img src="images/${prof.nome.toLowerCase().replace(' ', '-')}.jpg" alt="${prof.nome}">
                        <div class="status ${prof.status_online ? 'online' : 'offline'}"></div>
                    </div>
                    <div class="teacher-info">
                        <h3>${prof.nome}</h3>
                        <p class="specialty">${prof.especialidade}</p>
                        <p class="bio">${prof.biografia}</p>
                        <div class="teacher-stats">
                            <span class="rating">⭐ ${prof.avaliacao}</span>
                            <span class="students">👥 ${prof.total_alunos}</span>
                        </div>
                    </div>
                </div>
            `).join('');

            this.initScrollAnimations();
        } catch (error) {
            console.error('Erro ao carregar professores:', error);
        }
    }

    // Matrícula
    async matricular(cursoId) {
        if (!this.user) {
            alert('Faça login para se matricular!');
            return;
        }

        try {
            const response = await fetch(`${this.apiURL}/matricular`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    aluno_id: this.user.id, 
                    curso_id: cursoId 
                })
            });
            const result = await response.json();
            
            alert(result.mensagem || 'Matrícula realizada!');
            this.loadCursos();
        } catch (error) {
            alert('Erro na matrícula');
        }
    }

    // Atualizar UI do login
    updateLoginUI() {
        const loginBtn = document.querySelector('.login-btn');
        
        if (this.user && loginBtn) {
            loginBtn.innerHTML = `👋 ${this.user.nome}`;
            loginBtn.onclick = () => this.logout();
        }
    }

    // Logout
    logout() {
        this.user = null;
        localStorage.removeItem('user');
        location.reload();
    }

    // Reativar animações de scroll
    initScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        });

        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    }

    // Inicializar sistema
    async init() {
        console.log('🚀 Inicializando StudyConnect+ Database...');
        
        await this.loadCursos();
        await this.loadProfessores();
        this.setupFilters();
        this.updateLoginUI();
        
        console.log('✅ Sistema inicializado!');
    }

    // Configurar filtros
    setupFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const categoria = btn.dataset.category;
                if (categoria === 'all') {
                    this.loadCursos();
                } else {
                    this.loadCursos(categoria);
                }
            });
        });
    }
}

// Instância global
const db = new StudyConnectDB();

// Inicializar quando DOM carregar
document.addEventListener('DOMContentLoaded', () => {
    db.init();
});

// Função global para login
async function loginUser(email, senha) {
    return await db.login(email, senha);
}