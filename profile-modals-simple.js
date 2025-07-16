// Sistema de modais do perfil
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar tema
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);
    
    // Elementos do perfil
    const editProfileBtn = document.getElementById('editProfileBtn');
    const progressBtn = document.getElementById('progressBtn');
    const configBtn = document.getElementById('configBtn');

    // Funcionalidade dos modais ativada
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showEditProfileModal();
        });
    }

    if (progressBtn) {
        progressBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showProgressModal();
        });
    }

    if (configBtn) {
        configBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showConfigModal();
        });
    }
});

function showEditProfileModal() {
    const userData = {
        name: localStorage.getItem('userName') || 'Jonas',
        email: localStorage.getItem('userEmail') || 'Rm95197@estudante.fieb.edu.br',
        phone: localStorage.getItem('userPhone') || '',
        avatar: localStorage.getItem('userAvatar') || 'images/favicon.png'
    };
    
    const modal = createModal('Editar Perfil', 'fas fa-user-edit', `
        <div class="profile-edit-container">
            <div class="profile-avatar-section">
                <div class="avatar-preview">
                    <img src="${userData.avatar}" alt="Avatar" id="avatarPreview">
                    <div class="avatar-overlay">
                        <i class="fas fa-camera"></i>
                        <span>Alterar Foto</span>
                    </div>
                </div>
                <input type="file" id="avatarInput" accept="image/*" style="display: none;">
                <div style="text-align: center; color: var(--text-secondary); font-size: 0.9rem; margin-top: 0.5rem;">
                  
                </div>
            </div>
            <form class="profile-form" id="editProfileForm">
                <div class="form-row">
                    <div class="form-group">
                        <label><i class="fas fa-user"></i> Nome </label>
                        <input type="text" id="editName" value="${userData.name}" placeholder="Seu nome completo" required>
                    </div>
                
                    <div class="form-group">
                        <label><i class="fas fa-envelope"></i> Email</label>
                        <input type="email" id="editEmail" value="${userData.email}" placeholder="seu@email.com" required>
                    </div>
                </div>
                <div class="form-row-contact">
                    <div class="form-group">
                        <label><i class="fas fa-phone"></i> Telefone</label>
                        <input type="tel" id="editPhone" value="${userData.phone}" placeholder="(11) 99999-9999">
                    </div>
                    <div class="form-group">
                        <label><i class="fas fa-calendar"></i> Data de Nascimento</label>
                        <input type="date" id="editBirthdate" value="${localStorage.getItem('userBirthdate') || ''}">
                    </div>
                </div>
                <div class="form-row-full">
                    <div class="form-group">
                        <label><i class="fas fa-map-marker-alt"></i> Localização</label>
                        <input type="text" id="editLocation" value="${localStorage.getItem('userLocation') || ''}" placeholder="Cidade, Estado">
                    </div>
                </div>
            </form>
        </div>
    `, `
        <button class="btn-modal btn-secondary-modal" onclick="closeModal()">Cancelar</button>
        <button class="btn-modal btn-primary-modal" onclick="saveProfile()">Salvar Alterações</button>
    `);
    showModal(modal);
    
    // Avatar upload functionality
    const avatarOverlay = document.querySelector('.avatar-overlay');
    const avatarInput = document.getElementById('avatarInput');
    const avatarPreview = document.getElementById('avatarPreview');
    
    avatarOverlay.addEventListener('click', () => avatarInput.click());
    
    avatarInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                avatarPreview.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
}

function showProgressModal() {
    const modal = createModal('Meu Progresso', 'fas fa-chart-line', `
        <div class="progress-grid">
            <div class="progress-card">
                <span class="progress-number">12</span>
                <span class="progress-label">Cursos Concluídos</span>
            </div>
            <div class="progress-card">
                <span class="progress-number">48h</span>
                <span class="progress-label">Tempo de Estudo</span>
            </div>
            <div class="progress-card">
                <span class="progress-number">15</span>
                <span class="progress-label">Dias Consecutivos</span>
            </div>
            <div class="progress-card">
                <span class="progress-number">8</span>
                <span class="progress-label">Certificados</span>
            </div>
        </div>
        <div style="margin-top: 2rem;">
            <h4>Últimas Atividades</h4>
            <div class="activity-list">
                <div class="activity-item">
                    <i class="fas fa-check-circle" style="color: var(--color-success);"></i>
                    <span>Concluiu: JavaScript Avançado</span>
                    <small>Hoje</small>
                </div>
                <div class="activity-item">
                    <i class="fas fa-play-circle" style="color: var(--color-primary);"></i>
                    <span>Iniciou: React Fundamentals</span>
                    <small>Ontem</small>
                </div>
            </div>
        </div>
    `);
    showModal(modal);
}

function showConfigModal() {
    const settings = {
        theme: localStorage.getItem('theme') || 'light',
        notifications: localStorage.getItem('notifications') !== 'false',
        emailNews: localStorage.getItem('emailNews') !== 'false',
        sounds: localStorage.getItem('sounds') !== 'false',
        language: localStorage.getItem('language') || 'pt-BR',
        autoSave: localStorage.getItem('autoSave') !== 'false'
    };
    
    const modal = createModal('Configurações', 'fas fa-cog', `
        <div class="settings-container">
            <div class="settings-section">
                <div class="section-header">
                    <i class="fas fa-palette"></i>
                    <h4>Aparência</h4>
                </div>
                <div class="setting-item">
                    <div class="setting-info">
                        <div class="setting-label">Tema</div>
                        <div class="setting-desc">Escolha entre modo claro ou escuro</div>
                    </div>
                    <div class="theme-toggle ${settings.theme === 'dark' ? 'dark' : ''}" id="themeToggleModal">
                        <div class="theme-slider">
                            <i class="fas fa-sun"></i>
                            <i class="fas fa-moon"></i>
                        </div>
                    </div>
                </div>
                <div class="setting-item">
                    <div class="setting-info">
                        <div class="setting-label">Idioma</div>
                        <div class="setting-desc">Idioma da interface</div>
                    </div>
                    <select id="languageSelect" class="setting-select">
                        <option value="pt-BR" ${settings.language === 'pt-BR' ? 'selected' : ''}>Português (BR)</option>
                        <option value="en-US" ${settings.language === 'en-US' ? 'selected' : ''}>English (US)</option>
                        <option value="es-ES" ${settings.language === 'es-ES' ? 'selected' : ''}>Español</option>
                    </select>
                </div>
            </div>
            
            <div class="settings-section">
                <div class="section-header">
                    <i class="fas fa-bell"></i>
                    <h4>Notificações</h4>
                </div>
                <div class="setting-item">
                    <div class="setting-info">
                        <div class="setting-label">Notificações Push</div>
                        <div class="setting-desc">Receber notificações no navegador</div>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox" id="notificationsToggle" ${settings.notifications ? 'checked' : ''}>
                        <span class="toggle-slider"></span>
                    </label>
                </div>
                <div class="setting-item">
                    <div class="setting-info">
                        <div class="setting-label">Email de Novidades</div>
                        <div class="setting-desc">Receber atualizações por email</div>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox" id="emailNewsToggle" ${settings.emailNews ? 'checked' : ''}>
                        <span class="toggle-slider"></span>
                    </label>
                </div>
                <div class="setting-item">
                    <div class="setting-info">
                        <div class="setting-label">Sons do Sistema</div>
                        <div class="setting-desc">Reproduzir sons de notificação</div>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox" id="soundsToggle" ${settings.sounds ? 'checked' : ''}>
                        <span class="toggle-slider"></span>
                    </label>
                </div>
            </div>
            
            <div class="settings-section">
                <div class="section-header">
                    <i class="fas fa-cog"></i>
                    <h4>Sistema</h4>
                </div>
                <div class="setting-item">
                    <div class="setting-info">
                        <div class="setting-label">Salvamento Automático</div>
                        <div class="setting-desc">Salvar progresso automaticamente</div>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox" id="autoSaveToggle" ${settings.autoSave ? 'checked' : ''}>
                        <span class="toggle-slider"></span>
                    </label>
                </div>
                <div class="setting-item">
                    <div class="setting-info">
                        <div class="setting-label">Limpar Cache</div>
                        <div class="setting-desc">Limpar dados temporários</div>
                    </div>
                    <button class="btn-setting" onclick="clearCache()">Limpar</button>
                </div>
            </div>
        </div>
    `, `
        <button class="btn-modal btn-secondary-modal" onclick="closeModal()">Cancelar</button>
        <button class="btn-modal btn-primary-modal" onclick="saveSettings()">Salvar Configurações</button>
    `);
    showModal(modal);
    
    // Theme toggle functionality
    const themeToggle = document.getElementById('themeToggleModal');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            this.classList.toggle('dark');
            
            // Aplicar tema imediatamente para preview
            const isDark = this.classList.contains('dark');
            if (isDark) {
                document.body.classList.add('dark-mode');
            } else {
                document.body.classList.remove('dark-mode');
            }
        });
    }
}

function createModal(title, icon, body, footer = '') {
    return `
        <div class="profile-modal" id="profileModal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class="${icon}"></i> ${title}</h3>
                    <button class="modal-close" onclick="closeModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    ${body}
                </div>
                ${footer ? `<div class="modal-footer">${footer}</div>` : ''}
            </div>
        </div>
    `;
}

function showModal(modalHTML) {
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    const modal = document.getElementById('profileModal');
    setTimeout(() => modal.classList.add('show'), 10);
    
    // Fechar ao clicar fora
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModal();
    });
}

function closeModal() {
    const modal = document.getElementById('profileModal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    }
}

function saveProfile() {
    const name = document.getElementById('editName').value;
    const email = document.getElementById('editEmail').value;
    const phone = document.getElementById('editPhone').value;
    const location = document.getElementById('editLocation').value;
    const birthdate = document.getElementById('editBirthdate').value;
    const avatar = document.getElementById('avatarPreview').src;
    
    // Salvar no localStorage
    localStorage.setItem('userName', name);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userPhone', phone);
    localStorage.setItem('userLocation', location);
    localStorage.setItem('userBirthdate', birthdate);
    localStorage.setItem('userAvatar', avatar);
    
    // Atualizar interface
    const profileName = document.getElementById('profileName');
    const profileAvatar = document.querySelector('.profile-avatar');
    
    if (profileName) profileName.textContent = name;
    if (profileAvatar) profileAvatar.src = avatar;
    
    // Mostrar notificação de sucesso
    showNotification('Perfil atualizado com sucesso!', 'success');
    closeModal();
}

function saveSettings() {
    const themeToggle = document.getElementById('themeToggleModal');
    const theme = themeToggle && themeToggle.classList.contains('dark') ? 'dark' : 'light';
    const notifications = document.getElementById('notificationsToggle')?.checked || false;
    const emailNews = document.getElementById('emailNewsToggle')?.checked || false;
    const sounds = document.getElementById('soundsToggle')?.checked || false;
    const language = document.getElementById('languageSelect')?.value || 'pt-BR';
    const autoSave = document.getElementById('autoSaveToggle')?.checked || false;
    
    // Salvar configurações
    localStorage.setItem('theme', theme);
    localStorage.setItem('notifications', notifications.toString());
    localStorage.setItem('emailNews', emailNews.toString());
    localStorage.setItem('sounds', sounds.toString());
    localStorage.setItem('language', language);
    localStorage.setItem('autoSave', autoSave.toString());
    
    // Aplicar tema
    applyTheme(theme);
    
    showNotification('Configurações salvas com sucesso!', 'success');
    closeModal();
}

function applyTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.body.classList.remove('dark-mode');
        document.documentElement.setAttribute('data-theme', 'light');
    }
}

function clearCache() {
    if (confirm('Tem certeza que deseja limpar o cache? Isso pode afetar sua experiência.')) {
        // Limpar apenas dados de cache, manter dados do usuário
        const userKeys = ['userName', 'userEmail', 'userPhone', 'userBio', 'userLocation', 'userBirthdate', 'userAvatar', 'userLoggedIn'];
        const userData = {};
        
        userKeys.forEach(key => {
            userData[key] = localStorage.getItem(key);
        });
        
        localStorage.clear();
        
        userKeys.forEach(key => {
            if (userData[key]) localStorage.setItem(key, userData[key]);
        });
        
        showNotification('Cache limpo com sucesso!', 'success');
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
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
        max-width: 400px;
        font-weight: 500;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}
