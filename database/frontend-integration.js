// Integração do frontend com a API
class StudyConnectAPI {
    constructor() {
        this.baseURL = 'http://localhost:3000/api';
        this.currentUser = null;
    }

    async login(email, senha) {
        try {
            const response = await fetch(`${this.baseURL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, senha })
            });
            const data = await response.json();
            
            if (data.success) {
                this.currentUser = data.user;
                localStorage.setItem('user', JSON.stringify(data.user));
            }
            return data;
        } catch (error) {
            console.error('Erro no login:', error);
            return { success: false, message: 'Erro de conexão' };
        }
    }

    async getCursos(categoria = null) {
        try {
            const url = categoria ? `${this.baseURL}/cursos?categoria=${categoria}` : `${this.baseURL}/cursos`;
            const response = await fetch(url);
            return await response.json();
        } catch (error) {
            console.error('Erro ao buscar cursos:', error);
            return [];
        }
    }

    async getCategorias() {
        try {
            const response = await fetch(`${this.baseURL}/categorias`);
            return await response.json();
        } catch (error) {
            console.error('Erro ao buscar categorias:', error);
            return [];
        }
    }

    async getProfessores() {
        try {
            const response = await fetch(`${this.baseURL}/professores`);
            return await response.json();
        } catch (error) {
            console.error('Erro ao buscar professores:', error);
            return [];
        }
    }

    async matricular(curso_id) {
        if (!this.currentUser) {
            return { success: false, message: 'Usuário não logado' };
        }

        try {
            const response = await fetch(`${this.baseURL}/matricular`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    aluno_id: this.currentUser.id, 
                    curso_id 
                })
            });
            return await response.json();
        } catch (error) {
            console.error('Erro na matrícula:', error);
            return { success: false, message: 'Erro de conexão' };
        }
    }

    loadUser() {
        const user = localStorage.getItem('user');
        if (user) {
            this.currentUser = JSON.parse(user);
        }
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('user');
    }
}

// Instância global da API
const api = new StudyConnectAPI();
api.loadUser();

// Atualizar cursos dinamicamente
async function loadCursos(categoria = null) {
    const cursos = await api.getCursos(categoria);
    const container = document.querySelector('.courses-grid');
    
    if (container) {
        container.innerHTML = cursos.map(curso => `
            <div class="course-card" data-category="${curso.categoria_nome.toLowerCase()}">
                <div class="course-image">
                    <img src="${curso.imagem_url || 'images/default-course.jpg'}" alt="${curso.titulo}">
                    ${curso.popular ? '<span class="badge popular">Popular</span>' : ''}
                    <span class="badge level">${curso.nivel}</span>
                </div>
                <div class="course-content">
                    <h3>${curso.titulo}</h3>
                    <p class="course-description">${curso.descricao}</p>
                    <div class="course-meta">
                        <span class="instructor">👨‍🏫 ${curso.professor_nome}</span>
                        <span class="rating">⭐ ${curso.avaliacao}</span>
                        <span class="students">👥 ${curso.total_alunos}</span>
                    </div>
                    <div class="course-footer">
                        <span class="price">R$ ${curso.preco}</span>
                        <button class="btn-enroll" onclick="matricularCurso(${curso.id})">
                            Matricular
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// Função para matrícula
async function matricularCurso(cursoId) {
    if (!api.currentUser) {
        alert('Faça login para se matricular!');
        return;
    }

    const result = await api.matricular(cursoId);
    alert(result.mensagem || result.message);
    
    if (result.success !== false) {
        loadCursos(); // Recarregar cursos
    }
}

// Carregar dados ao inicializar
document.addEventListener('DOMContentLoaded', () => {
    loadCursos();
    
    // Adicionar eventos aos filtros
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const categoria = btn.dataset.category;
            loadCursos(categoria === 'all' ? null : categoria);
        });
    });
});