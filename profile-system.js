// Sistema de Perfil Completo
class ProfileSystem {
    constructor() {
        this.initializeUserData();
        this.init();
    }
    
    initializeUserData() {
        if (!localStorage.getItem('userName')) {
            localStorage.setItem('userName', 'Jonas');
        }
        if (!localStorage.getItem('userEmail')) {
            localStorage.setItem('userEmail', 'jonas@studyconnect.com');
        }
        if (!localStorage.getItem('joinDate')) {
            localStorage.setItem('joinDate', new Date().toLocaleDateString('pt-BR'));
        }
        if (!localStorage.getItem('coursesCompleted')) {
            localStorage.setItem('coursesCompleted', '8');
        }
        if (!localStorage.getItem('studyHours')) {
            localStorage.setItem('studyHours', '124');
        }
        if (!localStorage.getItem('streak')) {
            localStorage.setItem('streak', '23');
        }
        if (!localStorage.getItem('certificates')) {
            localStorage.setItem('certificates', JSON.stringify([
                { name: 'Desenvolvimento Front-End Completo', date: '15/12/2024', icon: 'fab fa-js-square', description: 'HTML5, CSS3, JavaScript ES6+ e React' },
                { name: 'Programação Back-End Avançada', date: '10/12/2024', icon: 'fab fa-node-js', description: 'Node.js, Express, MongoDB e APIs REST' },
                { name: 'Língua Portuguesa Avançada', date: '05/12/2024', icon: 'fas fa-book-open', description: 'Gramática, redação e interpretação de texto' },
                { name: 'Matemática Aplicada', date: '28/11/2024', icon: 'fas fa-calculator', description: 'Álgebra, geometria, cálculo e estatística' }
            ]));
        }
        if (!localStorage.getItem('favorites')) {
            localStorage.setItem('favorites', JSON.stringify([
                { name: 'Front-End Moderno', tech: 'HTML5, CSS3, JavaScript', image: 'images/capa-front-end.jpg', date: '20/12/2024' },
                { name: 'Back-End Avançado', tech: 'Node.js, MongoDB', image: 'images/17f7d622-3a54-480e-be53-5dd7296bddce_desenvolvedor+backend.avif', date: '18/12/2024' }
            ]));
        }
        
        this.userData = {
            name: localStorage.getItem('userName'),
            email: localStorage.getItem('userEmail'),
            joinDate: localStorage.getItem('joinDate'),
            coursesCompleted: parseInt(localStorage.getItem('coursesCompleted')),
            studyHours: parseInt(localStorage.getItem('studyHours')),
            streak: parseInt(localStorage.getItem('streak')),
            certificates: JSON.parse(localStorage.getItem('certificates')),
            favorites: JSON.parse(localStorage.getItem('favorites'))
        };
    }

    init() {
        this.setupEventListeners();
        this.updateProfileDisplay();
        this.checkLoginStatus();
        this.setupFavoriteButtons();
    }

    setupEventListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            const editBtn = document.getElementById('editProfileBtn');
            const progressBtn = document.getElementById('progressBtn');
            const certificatesBtn = document.getElementById('certificatesBtn');
            const favoritesBtn = document.getElementById('favoritesBtn');
            const configBtn = document.getElementById('configBtn');
            const logoutBtn = document.getElementById('logoutBtn');
            const profileBtn = document.getElementById('profileBtn');
            const profileDropdown = document.getElementById('profileDropdown');

            if (editBtn) editBtn.onclick = (e) => { e.preventDefault(); this.showEditModal(); };
            if (progressBtn) progressBtn.onclick = (e) => { e.preventDefault(); this.showProgressModal(); };
            if (certificatesBtn) certificatesBtn.onclick = (e) => { e.preventDefault(); this.showCertificatesModal(); };
            if (favoritesBtn) favoritesBtn.onclick = (e) => { e.preventDefault(); this.showFavoritesModal(); };
            if (configBtn) configBtn.onclick = (e) => { e.preventDefault(); this.showConfigModal(); };
            if (logoutBtn) logoutBtn.onclick = (e) => { e.preventDefault(); this.logout(); };
            
            // Profile dropdown
            if (profileBtn && profileDropdown) {
                const profileDropdownClose = document.getElementById('profileDropdownClose');
                
                profileBtn.onclick = (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    profileDropdown.classList.toggle('show');
                };
                
                if (profileDropdownClose) {
                    profileDropdownClose.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        profileDropdown.classList.remove('show');
                    });
                }
                
                profileDropdown.onclick = (e) => {
                    if (e.target === profileDropdown) {
                        profileDropdown.classList.remove('show');
                    }
                };
                
                const dropdownItems = profileDropdown.querySelectorAll('.dropdown-item');
                dropdownItems.forEach(item => {
                    item.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        profileDropdown.classList.remove('show');
                    });
                });
            }
        });
    }

    checkLoginStatus() {
        const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
        const userName = localStorage.getItem('userName') || 'Jonas';
        
        if (!localStorage.getItem('userName')) {
            localStorage.setItem('userName', 'Jonas');
        }
        
        const loginBtn = document.querySelector('.login-btn');
        const profileMenu = document.getElementById('profileMenu');
        const profileName = document.getElementById('profileName');
        
        if (isLoggedIn) {
            if (loginBtn) loginBtn.parentElement.style.display = 'none';
            if (profileMenu) profileMenu.style.display = 'block';
            if (profileName) profileName.textContent = userName;
        } else {
            if (loginBtn) loginBtn.parentElement.style.display = 'block';
            if (profileMenu) profileMenu.style.display = 'none';
        }
    }

    updateProfileDisplay() {
        const profileName = document.getElementById('profileName');
        if (profileName) profileName.textContent = this.userData.name;
    }

    createModal(content, className = '') {
        const modal = document.createElement('div');
        modal.className = `profile-modal ${className}`;
        modal.innerHTML = content;
        document.body.appendChild(modal);
        
        setTimeout(() => modal.classList.add('show'), 10);
        
        const closeModal = () => {
            modal.classList.remove('show');
            setTimeout(() => modal.remove(), 300);
        };

        modal.onclick = (e) => {
            if (e.target === modal) closeModal();
        };
        
        const closeBtn = modal.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                closeModal();
            };
        }

        return { modal, closeModal };
    }

    showEditModal() {
        const content = `
            <div class="modal-content edit-modal">
                <div class="modal-header">
                    <h3><i class="fas fa-user-edit"></i> Editar Perfil</h3>
                    <button class="modal-close"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-body">
                    <div class="profile-avatar-section">
                        <div class="avatar-container">
                            <img src="images/favicon.png" alt="Avatar" class="edit-avatar">
                            <div class="avatar-overlay">
                                <i class="fas fa-camera"></i>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label><i class="fas fa-user"></i> Nome Completo</label>
                        <input type="text" id="editName" value="${this.userData.name}" maxlength="50" onclick="event.stopPropagation()" onkeydown="event.stopPropagation()" onkeyup="event.stopPropagation()">
                    </div>
                    <div class="form-group">
                        <label><i class="fas fa-envelope"></i> Email</label>
                        <input type="email" id="editEmail" value="${this.userData.email}" onclick="event.stopPropagation()" onkeydown="event.stopPropagation()" onkeyup="event.stopPropagation()">
                    </div>
                    <div class="profile-stats-mini">
                        <div class="stat-mini">
                            <i class="fas fa-calendar-alt"></i>
                            <span>Membro desde ${this.userData.joinDate}</span>
                        </div>
                        <div class="stat-mini">
                            <i class="fas fa-trophy"></i>
                            <span>${this.userData.coursesCompleted} cursos concluídos</span>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary cancel-btn">Cancelar</button>
                    <button class="btn btn-primary save-btn">Salvar Alterações</button>
                </div>
            </div>
        `;

        const { modal, closeModal } = this.createModal(content, 'edit-profile-modal');

        modal.querySelector('.cancel-btn').onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            closeModal();
        };
        
        modal.querySelector('.save-btn').onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const newName = modal.querySelector('#editName').value.trim();
            const newEmail = modal.querySelector('#editEmail').value.trim();
            
            if (newName && newEmail && this.validateEmail(newEmail)) {
                this.userData.name = newName;
                this.userData.email = newEmail;
                localStorage.setItem('userName', newName);
                localStorage.setItem('userEmail', newEmail);
                this.updateProfileDisplay();
                this.showNotification('Perfil atualizado com sucesso!', 'success');
                closeModal();
            } else {
                this.showNotification('Por favor, preencha todos os campos corretamente!', 'error');
            }
        };
    }
    
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showProgressModal() {
        const progressPercentage = Math.min((this.userData.coursesCompleted / 12) * 100, 100);
        
        const content = `
            <div class="modal-content progress-modal">
                <div class="modal-header">
                    <h3><i class="fas fa-chart-line"></i> Meu Progresso</h3>
                    <button class="modal-close"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-body">
                    <div class="progress-overview">
                        <div class="progress-circle">
                            <svg viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="45" class="progress-bg"></circle>
                                <circle cx="50" cy="50" r="45" class="progress-fill" 
                                        style="stroke-dasharray: ${progressPercentage * 2.83}, 283;"></circle>
                            </svg>
                            <div class="progress-text">
                                <span class="progress-number">${Math.round(progressPercentage)}%</span>
                                <span class="progress-label">Completo</span>
                            </div>
                        </div>
                    </div>
                    <div class="stats-grid">
                        <div class="stat-card">
                            <div class="stat-icon"><i class="fas fa-graduation-cap"></i></div>
                            <div class="stat-info">
                                <span class="stat-number">${this.userData.coursesCompleted}</span>
                                <span class="stat-label">Cursos Concluídos</span>
                            </div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-icon"><i class="fas fa-clock"></i></div>
                            <div class="stat-info">
                                <span class="stat-number">${this.userData.studyHours}h</span>
                                <span class="stat-label">Horas de Estudo</span>
                            </div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-icon"><i class="fas fa-fire"></i></div>
                            <div class="stat-info">
                                <span class="stat-number">${this.userData.streak}</span>
                                <span class="stat-label">Dias Consecutivos</span>
                            </div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-icon"><i class="fas fa-certificate"></i></div>
                            <div class="stat-info">
                                <span class="stat-number">${this.userData.certificates.length}</span>
                                <span class="stat-label">Certificados</span>
                            </div>
                        </div>
                    </div>
                    <div class="activity-chart">
                        <h4>Atividade dos Últimos 7 Dias</h4>
                        <div class="chart-bars">
                            ${[65, 80, 45, 90, 70, 35, 55].map((height, index) => `
                                <div class="chart-bar" style="height: ${height}%">
                                    <span class="bar-label">${['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'][index]}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.createModal(content, 'progress-modal-enhanced');
    }

    showCertificatesModal() {
        const content = `
            <div class="modal-content certificates-modal">
                <div class="modal-header">
                    <h3><i class="fas fa-certificate"></i> Meus Certificados</h3>
                    <button class="modal-close"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-body">
                    <div class="certificates-grid">
                        ${this.userData.certificates.map((cert, index) => `
                            <div class="certificate-card">
                                <div class="cert-icon">
                                    <i class="${cert.icon}"></i>
                                </div>
                                <div class="cert-content">
                                    <div class="cert-info">
                                        <h4>${cert.name}</h4>
                                        <p class="cert-description">${cert.description || 'Certificado de conclusão do curso'}</p>
                                        <p class="cert-date">Concluído em ${cert.date}</p>
                                    </div>
                                    <div class="cert-actions">
                                        <button class="btn btn-primary download-btn" data-index="${index}">
                                            <i class="fas fa-download"></i> Baixar Certificado
                                        </button>
                                        <button class="btn btn-secondary share-btn" data-index="${index}">
                                            <i class="fas fa-share-alt"></i> Compartilhar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        const { modal } = this.createModal(content, 'certificates-modal-enhanced');
        
        modal.querySelectorAll('.download-btn').forEach(btn => {
            btn.onclick = () => {
                const index = btn.dataset.index;
                this.showNotification(`Baixando certificado: ${this.userData.certificates[index].name}`, 'success');
            };
        });
        
        modal.querySelectorAll('.share-btn').forEach(btn => {
            btn.onclick = () => {
                const index = btn.dataset.index;
                this.showNotification(`Compartilhando certificado: ${this.userData.certificates[index].name}`, 'success');
            };
        });
    }

    showFavoritesModal() {
        const content = `
            <div class="modal-content favorites-modal">
                <div class="modal-header">
                    <h3><i class="fas fa-heart"></i> Meus Favoritos</h3>
                    <button class="modal-close"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-body">
                    <div class="favorites-list">
                        ${this.userData.favorites.map((fav, index) => `
                            <div class="favorite-item">
                                <div class="favorite-image">
                                    <img src="${fav.image}" alt="${fav.name}">
                                </div>
                                <div class="favorite-content">
                                    <h4>${fav.name}</h4>
                                    <p>${fav.tech}</p>
                                    <small>Salvo em ${fav.date}</small>
                                </div>
                                <div class="favorite-actions">
                                    <button class="btn btn-primary btn-sm access-btn" data-index="${index}">
                                        <i class="fas fa-play"></i> Acessar
                                    </button>
                                    <button class="btn btn-danger btn-sm remove-favorite" data-index="${index}">
                                        <i class="fas fa-trash"></i> Excluir
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        const { modal } = this.createModal(content, 'favorites-modal-enhanced');
        
        modal.querySelectorAll('.access-btn').forEach(btn => {
            btn.onclick = () => {
                const index = btn.dataset.index;
                this.showNotification(`Acessando curso: ${this.userData.favorites[index].name}`, 'success');
            };
        });
        
        modal.querySelectorAll('.remove-favorite').forEach(btn => {
            btn.onclick = () => {
                const index = btn.dataset.index;
                this.removeFavorite(index);
                modal.remove();
                setTimeout(() => this.showFavoritesModal(), 100);
            };
        });
    }

    showConfigModal() {
        const isDark = document.body.classList.contains('dark-mode');
        
        const content = `
            <div class="modal-content config-modal">
                <div class="modal-header">
                    <h3><i class="fas fa-cog"></i> Configurações</h3>
                    <button class="modal-close"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-body">
                    <div class="config-section">
                        <h4><i class="fas fa-palette"></i> Aparência</h4>
                        <div class="theme-selector">
                            <div class="theme-option ${!isDark ? 'active' : ''}" data-theme="light">
                                <div class="theme-preview light-preview">
                                    <div class="preview-header"></div>
                                    <div class="preview-content"></div>
                                </div>
                                <span>Tema Claro</span>
                            </div>
                            <div class="theme-option ${isDark ? 'active' : ''}" data-theme="dark">
                                <div class="theme-preview dark-preview">
                                    <div class="preview-header"></div>
                                    <div class="preview-content"></div>
                                </div>
                                <span>Tema Escuro</span>
                            </div>
                        </div>
                    </div>
                    <div class="config-section">
                        <h4><i class="fas fa-bell"></i> Notificações</h4>
                        <div class="config-item">
                            <div class="config-info">
                                <span class="config-title">Novos Cursos</span>
                                <span class="config-desc">Receba alertas sobre novos cursos</span>
                            </div>
                            <div class="toggle-switch active">
                                <div class="switch-slider"></div>
                            </div>
                        </div>
                        <div class="config-item">
                            <div class="config-info">
                                <span class="config-title">Lembretes de Estudo</span>
                                <span class="config-desc">Notificações diárias para estudar</span>
                            </div>
                            <div class="toggle-switch">
                                <div class="switch-slider"></div>
                            </div>
                        </div>
                    </div>
                    <div class="config-section">
                        <h4><i class="fas fa-shield-alt"></i> Privacidade</h4>
                        <div class="config-item">
                            <div class="config-info">
                                <span class="config-title">Perfil Público</span>
                                <span class="config-desc">Permitir que outros vejam seu progresso</span>
                            </div>
                            <div class="toggle-switch">
                                <div class="switch-slider"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        const { modal } = this.createModal(content, 'config-modal-enhanced');

        modal.querySelectorAll('.theme-option').forEach(option => {
            option.onclick = () => {
                const theme = option.dataset.theme;
                modal.querySelectorAll('.theme-option').forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');
                
                if (theme === 'dark' && !document.body.classList.contains('dark-mode')) {
                    document.body.classList.add('dark-mode');
                    localStorage.setItem('theme', 'dark');
                } else if (theme === 'light' && document.body.classList.contains('dark-mode')) {
                    document.body.classList.remove('dark-mode');
                    localStorage.setItem('theme', 'light');
                }
                this.showNotification('Tema alterado!', 'success');
            };
        });

        modal.querySelectorAll('.toggle-switch').forEach(toggle => {
            toggle.onclick = () => {
                toggle.classList.toggle('active');
                this.showNotification('Configuração salva!', 'success');
            };
        });
    }

    logout() {
        localStorage.removeItem('userLoggedIn');
        this.showNotification('Logout realizado com sucesso!', 'success');
        setTimeout(() => {
            window.location.href = 'Login/Login.html';
        }, 1000);
    }

    removeFavorite(index) {
        this.userData.favorites.splice(index, 1);
        localStorage.setItem('favorites', JSON.stringify(this.userData.favorites));
        this.showNotification('Removido dos favoritos!', 'success');
    }

    setupFavoriteButtons() {
        document.addEventListener('DOMContentLoaded', () => {
            const likeButtons = document.querySelectorAll('.like-btn');
            likeButtons.forEach(btn => {
                btn.onclick = (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.toggleFavorite(btn);
                };
            });
        });
    }
    
    toggleFavorite(button) {
        const courseCard = button.closest('.course-card');
        const courseName = courseCard.querySelector('h3').textContent;
        const courseImage = courseCard.querySelector('img').src;
        const courseTech = Array.from(courseCard.querySelectorAll('.tech-tag')).map(tag => tag.textContent).join(', ');
        
        const courseData = {
            name: courseName,
            tech: courseTech,
            image: courseImage,
            date: new Date().toLocaleDateString('pt-BR')
        };
        
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        const existingIndex = favorites.findIndex(fav => fav.name === courseName);
        
        if (existingIndex > -1) {
            favorites.splice(existingIndex, 1);
            button.classList.remove('favorited');
            button.querySelector('i').classList.remove('fas');
            button.querySelector('i').classList.add('far');
            this.showNotification('Removido dos favoritos!', 'info');
        } else {
            favorites.push(courseData);
            button.classList.add('favorited');
            button.querySelector('i').classList.remove('far');
            button.querySelector('i').classList.add('fas');
            this.showNotification('Adicionado aos favoritos!', 'success');
        }
        
        localStorage.setItem('favorites', JSON.stringify(favorites));
        this.userData.favorites = favorites;
    }
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;

        notification.style.cssText = `
            position: fixed;
            top: 2rem;
            right: 2rem;
            background: ${type === 'success' ? '#43e97b' : type === 'error' ? '#ff6b6b' : '#667eea'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.15);
            z-index: 10001;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;

        document.body.appendChild(notification);
        setTimeout(() => notification.style.transform = 'translateX(0)', 100);
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Função global para login
window.handleSuccessfulLogin = function() {
    localStorage.setItem('userLoggedIn', 'true');
    if (!localStorage.getItem('userName')) {
        localStorage.setItem('userName', 'Jonas');
    }
};

// Inicializar sistema
const profileSystem = new ProfileSystem();