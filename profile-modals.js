// Modais funcionais para o perfil
function showProgressModal() {
    const modal = document.createElement('div');
    modal.className = 'profile-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3><i class="fas fa-chart-line"></i> Meu Progresso</h3>
                <button class="modal-close" id="closeProgressModal">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <p><strong>Cursos Concluídos:</strong> 12</p>
                <p><strong>Tempo de Estudo:</strong> 48 horas</p>
                <p><strong>Sequência Atual:</strong> 15 dias</p>
                <p><strong>Certificados:</strong> 8</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 10);
    
    const closeModal = () => {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    };
    
    modal.querySelector('#closeProgressModal').onclick = closeModal;
    modal.onclick = (e) => e.target === modal && closeModal();
}

function showCertificatesModal() {
    const modal = document.createElement('div');
    modal.className = 'profile-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3><i class="fas fa-certificate"></i> Meus Certificados</h3>
                <button class="modal-close" id="closeCertificatesModal">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div style="margin-bottom: 1rem; padding: 1rem; background: var(--bg-secondary); border-radius: 8px;">
                    <h4>JavaScript Avançado</h4>
                    <p>Concluído em 15/12/2024</p>
                    <button class="btn btn-primary" style="padding: 0.5rem 1rem; font-size: 0.9rem;">Download</button>
                </div>
                <div style="margin-bottom: 1rem; padding: 1rem; background: var(--bg-secondary); border-radius: 8px;">
                    <h4>React Fundamentals</h4>
                    <p>Concluído em 10/12/2024</p>
                    <button class="btn btn-primary" style="padding: 0.5rem 1rem; font-size: 0.9rem;">Download</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 10);
    
    const closeModal = () => {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    };
    
    modal.querySelector('#closeCertificatesModal').onclick = closeModal;
    modal.onclick = (e) => e.target === modal && closeModal();
}

function showFavoritesModal() {
    const modal = document.createElement('div');
    modal.className = 'profile-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3><i class="fas fa-heart"></i> Meus Favoritos</h3>
                <button class="modal-close" id="closeFavoritesModal">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div style="margin-bottom: 1rem; padding: 1rem; background: var(--bg-secondary); border-radius: 8px;">
                    <h4>Front-End Moderno</h4>
                    <p>HTML5, CSS3, JavaScript</p>
                    <small>Salvo em 20/12/2024</small>
                    <br><button class="btn btn-primary" style="padding: 0.5rem 1rem; font-size: 0.9rem; margin-top: 0.5rem;">Acessar</button>
                </div>
                <div style="margin-bottom: 1rem; padding: 1rem; background: var(--bg-secondary); border-radius: 8px;">
                    <h4>Back-End Avançado</h4>
                    <p>Node.js, MongoDB</p>
                    <small>Salvo em 18/12/2024</small>
                    <br><button class="btn btn-primary" style="padding: 0.5rem 1rem; font-size: 0.9rem; margin-top: 0.5rem;">Acessar</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 10);
    
    const closeModal = () => {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    };
    
    modal.querySelector('#closeFavoritesModal').onclick = closeModal;
    modal.onclick = (e) => e.target === modal && closeModal();
}

function showConfigModal() {
    const modal = document.createElement('div');
    modal.className = 'profile-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3><i class="fas fa-cog"></i> Configurações</h3>
                <button class="modal-close" id="closeConfigModal">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="settings-container">
                    <div class="settings-section">
                        <div class="section-header">
                            <i class="fas fa-palette"></i>
                            <h4>Aparência</h4>
                        </div>
                        <div class="setting-item">
                            <div class="setting-info">
                                <div class="setting-label">Tema Escuro</div>
                                <div class="setting-desc">Alternar entre tema claro e escuro</div>
                            </div>
                            <div class="theme-toggle" id="modalThemeToggle">
                                <div class="theme-slider">
                                    <i class="fas fa-sun"></i>
                                    <i class="fas fa-moon"></i>
                                </div>
                            </div>
                        </div>
                        <div class="setting-item">
                            <div class="setting-info">
                                <div class="setting-label">Idioma do Sistema</div>
                                <div class="setting-desc">Escolha o idioma de exibição da plataforma</div>
                            </div>
                            <select class="setting-select" id="languageSelect">
                                <option value="pt-BR">🇧🇷 Português (Brasil)</option>
                                <option value="en-US">🇺🇸 English (US)</option>
                                <option value="es-ES">🇪🇸 Español (España)</option>
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
                                <div class="setting-desc">Receber notificações sobre novos cursos e atualizações</div>
                            </div>
                            <label class="toggle-switch">
                                <input type="checkbox" id="pushNotifications" checked>
                                <span class="toggle-slider"></span>
                            </label>
                        </div>
                        <div class="setting-item">
                            <div class="setting-info">
                                <div class="setting-label">Email Marketing</div>
                                <div class="setting-desc">Receber emails sobre promoções e novidades</div>
                            </div>
                            <label class="toggle-switch">
                                <input type="checkbox" id="emailMarketing">
                                <span class="toggle-slider"></span>
                            </label>
                        </div>
                    </div>
                    
                    <div class="settings-section">
                        <div class="section-header">
                            <i class="fas fa-user-cog"></i>
                            <h4>Conta</h4>
                        </div>
                        <div class="setting-item">
                            <div class="setting-info">
                                <div class="setting-label">Excluir Conta</div>
                                <div class="setting-desc">Remover permanentemente sua conta e todos os dados associados</div>
                            </div>
                            <button class="btn-setting" id="deleteAccountBtn">
                                <i class="fas fa-trash-alt"></i> Excluir
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 10);
    
    const closeModal = () => {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    };
    
    modal.querySelector('#closeConfigModal').onclick = closeModal;
    modal.onclick = (e) => e.target === modal && closeModal();
    
    // Funcionalidade do botão excluir
    modal.querySelector('#deleteAccountBtn').onclick = () => {
        showDeleteAccountConfirmation();
    };
    
    // Funcionalidade do toggle de tema
    const themeToggle = modal.querySelector('#modalThemeToggle');
    const isDarkMode = document.body.classList.contains('dark-mode');
    if (isDarkMode) {
        themeToggle.classList.add('dark');
    }
    
    themeToggle.onclick = () => {
        document.body.classList.toggle('dark-mode');
        themeToggle.classList.toggle('dark');
        
        const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
        
        showAlert('Tema alterado com sucesso!', 'success');
    };
    
    // Funcionalidade do seletor de idioma
    const languageSelect = modal.querySelector('#languageSelect');
    const savedLanguage = localStorage.getItem('userLanguage') || 'pt-BR';
    languageSelect.value = savedLanguage;
    
    languageSelect.addEventListener('change', () => {
        const selectedLanguage = languageSelect.value;
        localStorage.setItem('userLanguage', selectedLanguage);
        showAlert('Idioma alterado com sucesso!', 'success');
    });
    
    // Funcionalidade dos toggles de notificação
    const pushToggle = modal.querySelector('#pushNotifications');
    const emailToggle = modal.querySelector('#emailMarketing');
    
    // Carregar configurações salvas
    const savedSettings = JSON.parse(localStorage.getItem('userSettings') || '{}');
    pushToggle.checked = savedSettings.pushNotifications !== false;
    emailToggle.checked = savedSettings.emailMarketing === true;
    
    // Salvar configurações quando alteradas
    [pushToggle, emailToggle].forEach(toggle => {
        toggle.addEventListener('change', () => {
            const settings = {
                pushNotifications: pushToggle.checked,
                emailMarketing: emailToggle.checked
            };
            localStorage.setItem('userSettings', JSON.stringify(settings));
            showAlert('Configurações salvas!', 'success');
        });
    });
    
    // Função para mostrar alertas
    function showAlert(message, type) {
        const alert = document.createElement('div');
        alert.className = `custom-alert ${type} show`;
        alert.textContent = message;
        document.body.appendChild(alert);
        
        setTimeout(() => {
            alert.classList.remove('show');
            setTimeout(() => alert.remove(), 300);
        }, 2000);
    }
}

function showDeleteAccountConfirmation() {
    const modal = document.createElement('div');
    modal.className = 'profile-modal';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 500px;">
            <div class="modal-header">
                <h3><i class="fas fa-exclamation-triangle" style="color: #ff6b6b;"></i> Excluir Conta</h3>
                <button class="modal-close" id="closeDeleteModal">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div style="text-align: center; margin-bottom: 2rem;">
                    <div style="font-size: 4rem; color: #ff6b6b; margin-bottom: 1rem;">
                        <i class="fas fa-user-times"></i>
                    </div>
                    <h4 style="color: var(--text-primary); margin-bottom: 1rem;">Tem certeza?</h4>
                    <p style="color: var(--text-secondary); line-height: 1.6;">Esta ação não pode ser desfeita. Todos os seus dados, progresso e certificados serão permanentemente removidos.</p>
                </div>
                
                <div style="margin-bottom: 1.5rem;">
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: var(--text-primary);">Digite "EXCLUIR" para confirmar:</label>
                    <input type="text" id="confirmDeleteInput" placeholder="Digite EXCLUIR" style="width: 100%; padding: 1rem; border: 2px solid rgba(255, 107, 107, 0.3); border-radius: 8px; background: rgba(255, 255, 255, 0.05); color: var(--text-primary); font-size: 1rem;">
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn-secondary-modal" id="cancelDeleteBtn">Cancelar</button>
                <button class="btn-setting" id="confirmDeleteBtn" disabled style="opacity: 0.5;">Excluir Conta</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 10);
    
    const closeModal = () => {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    };
    
    const confirmInput = modal.querySelector('#confirmDeleteInput');
    const confirmBtn = modal.querySelector('#confirmDeleteBtn');
    
    confirmInput.addEventListener('input', () => {
        if (confirmInput.value === 'EXCLUIR') {
            confirmBtn.disabled = false;
            confirmBtn.style.opacity = '1';
        } else {
            confirmBtn.disabled = true;
            confirmBtn.style.opacity = '0.5';
        }
    });
    
    modal.querySelector('#closeDeleteModal').onclick = closeModal;
    modal.querySelector('#cancelDeleteBtn').onclick = closeModal;
    modal.onclick = (e) => e.target === modal && closeModal();
    
    confirmBtn.onclick = () => {
        if (confirmInput.value === 'EXCLUIR') {
            deleteUserAccount();
            closeModal();
        }
    };
}

function deleteUserAccount() {
    const userEmail = localStorage.getItem('userEmail');
    
    if (userEmail) {
        const users = JSON.parse(localStorage.getItem('studyconnect_users') || '[]');
        const updatedUsers = users.filter(user => user.email !== userEmail);
        localStorage.setItem('studyconnect_users', JSON.stringify(updatedUsers));
    }
    
    localStorage.removeItem('userLoggedIn');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('joinDate');
    
    const alert = document.createElement('div');
    alert.className = 'custom-alert success show';
    alert.textContent = 'Conta excluída com sucesso!';
    alert.style.position = 'fixed';
    alert.style.top = '20px';
    alert.style.left = '50%';
    alert.style.transform = 'translateX(-50%)';
    alert.style.zIndex = '10001';
    document.body.appendChild(alert);
    
    setTimeout(() => {
        window.location.href = 'Login/Login.html';
    }, 2000);
}