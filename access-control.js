// Sistema de Controle de Acesso
class AccessControl {
    static checkUserType() {
        const userType = localStorage.getItem('userType');
        const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
        
        return {
            isLoggedIn,
            userType: userType || 'student',
            isProfessor: userType === 'professor',
            isStudent: userType === 'student' || !userType
        };
    }

    static requireProfessor() {
        const access = this.checkUserType();
        
        if (!access.isLoggedIn) {
            window.location.href = 'cursos/Login/Login.html';
            return false;
        }
        
        if (!access.isProfessor) {
            this.showAccessDenied();
            return false;
        }
        
        return true;
    }

    static requireStudent() {
        const access = this.checkUserType();
        
        if (!access.isLoggedIn) {
            window.location.href = 'cursos/Login/Login.html';
            return false;
        }
        
        if (!access.isStudent) {
            this.showAccessDenied();
            return false;
        }
        
        return true;
    }

    static showAccessDenied() {
        const modal = document.createElement('div');
        modal.className = 'access-denied-modal';
        modal.innerHTML = `
            <div class="access-denied-content">
                <div class="access-denied-icon">
                    <i class="fas fa-lock"></i>
                </div>
                <h3>Acesso Negado</h3>
                <p>Você não tem permissão para acessar esta área.</p>
                <div class="access-denied-buttons">
                    <button onclick="history.back()" class="btn-back">
                        <i class="fas fa-arrow-left"></i> Voltar
                    </button>
                    <button onclick="AccessControl.logout()" class="btn-logout">
                        <i class="fas fa-sign-out-alt"></i> Sair
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Adicionar estilos
        if (!document.getElementById('access-control-styles')) {
            const styles = document.createElement('style');
            styles.id = 'access-control-styles';
            styles.textContent = `
                .access-denied-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.8);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 10000;
                }
                
                .access-denied-content {
                    background: white;
                    padding: 2rem;
                    border-radius: 15px;
                    text-align: center;
                    max-width: 400px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                }
                
                .access-denied-icon {
                    width: 60px;
                    height: 60px;
                    background: #e74c3c;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 1rem;
                    font-size: 1.5rem;
                    color: white;
                }
                
                .access-denied-content h3 {
                    color: #2c3e50;
                    margin-bottom: 1rem;
                }
                
                .access-denied-content p {
                    color: #6c757d;
                    margin-bottom: 2rem;
                }
                
                .access-denied-buttons {
                    display: flex;
                    gap: 10px;
                    justify-content: center;
                }
                
                .btn-back, .btn-logout {
                    padding: 10px 20px;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    gap: 5px;
                }
                
                .btn-back {
                    background: #6c757d;
                    color: white;
                }
                
                .btn-logout {
                    background: #e74c3c;
                    color: white;
                }
                
                .btn-back:hover, .btn-logout:hover {
                    opacity: 0.9;
                }
                
                .user-type-indicator {
                    display: block;
                    padding: 5px 10px;
                    margin: 5px 0;
                    border-radius: 15px;
                    font-size: 11px;
                    font-weight: bold;
                    text-align: center;
                    text-transform: uppercase;
                }
                
                .user-type-indicator.professor {
                    background: linear-gradient(135deg, #43e97b, #38f9d7);
                    color: white;
                }
                
                .user-type-indicator.student {
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    color: white;
                }
            `;
            document.head.appendChild(styles);
        }
    }

    static logout() {
        localStorage.removeItem('userLoggedIn');
        localStorage.removeItem('userType');
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('currentUserId');
        localStorage.removeItem('studyconnect_profile');
        window.location.href = 'cursos/Login/Login.html';
    }

    static initializeUI() {
        const access = this.checkUserType();
        
        if (!access.isLoggedIn) {
            // Se não estiver logado, mostrar tudo (modo público)
            return;
        }
        
        // Mostrar/ocultar elementos baseado no tipo de usuário
        document.querySelectorAll('[data-professor-only]').forEach(element => {
            element.style.display = access.isProfessor ? '' : 'none';
        });
        
        document.querySelectorAll('[data-student-only]').forEach(element => {
            element.style.display = access.isStudent ? '' : 'none';
        });
        
        // Adicionar indicador de tipo de usuário
        const userTypeIndicator = document.querySelector('.user-type-indicator');
        if (userTypeIndicator) {
            userTypeIndicator.textContent = access.isProfessor ? 'Professor' : 'Estudante';
            userTypeIndicator.className = `user-type-indicator ${access.userType}`;
        }
        
        console.log('UI inicializada para:', access.userType);
    }

    static protectProfessorPages() {
        // Lista de páginas que só professores podem acessar
        const professorPages = [
            'admin-cursos.html',
            'gerenciar-alunos.html',
            'certificados.html',
            'dashboard-professor.html'
        ];
        
        const currentPage = window.location.pathname.split('/').pop();
        
        if (professorPages.includes(currentPage)) {
            return this.requireProfessor();
        }
        
        return true;
    }
}

// Inicializar controle de acesso quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    // Delay para garantir que outros scripts carreguem primeiro
    setTimeout(() => {
        AccessControl.initializeUI();
        AccessControl.protectProfessorPages();
    }, 100);
});

// Atualizar UI quando houver mudanças no localStorage
window.addEventListener('storage', () => {
    AccessControl.initializeUI();
});

// Função para forçar atualização da UI
window.updateUserInterface = () => {
    AccessControl.initializeUI();
};

// Exportar para uso global
window.AccessControl = AccessControl;