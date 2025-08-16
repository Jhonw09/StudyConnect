// Sistema de sincronização de perfil entre páginas
class ProfileSync {
    constructor() {
        // Primeiro tenta carregar dados existentes do localStorage
        const savedData = localStorage.getItem('studyconnect_profile');
        
        this.profileData = savedData ? JSON.parse(savedData) : {
            name: 'Jonas Arruda',
            email: 'jonas.arruda@email.com',
            phone: '(11) 99999-9999',
            location: 'São Paulo, Brasil',
            bio: 'Desenvolvedor apaixonado por tecnologia e educação.',
            joinDate: 'Janeiro 2024',
            avatar: null,
            stats: {
                courses: 4,
                progress: 73,
                lessons: 32,
                hours: 187
            }
        };
        
        this.init();
    }
    
    init() {
        // Carregar dados salvos
        this.loadProfile();
        
        // Sincronizar dados na página atual
        this.syncCurrentPage();
        
        // Escutar mudanças no localStorage
        window.addEventListener('storage', (e) => {
            if (e.key === 'studyconnect_profile') {
                this.loadProfile();
                this.syncCurrentPage();
            }
        });
    }
    
    loadProfile() {
        const saved = localStorage.getItem('studyconnect_profile');
        if (saved) {
            try {
                this.profileData = { ...this.profileData, ...JSON.parse(saved) };
            } catch (e) {
                console.log('Erro ao carregar perfil:', e);
            }
        }
    }
    
    saveProfile() {
        try {
            localStorage.setItem('studyconnect_profile', JSON.stringify(this.profileData));
            console.log('Dados salvos:', this.profileData); // Debug
            
            // Disparar evento de atualização
            window.dispatchEvent(new CustomEvent('profileUpdated', {
                detail: this.profileData
            }));
        } catch (error) {
            console.error('Erro ao salvar no localStorage:', error);
        }
    }
    
    updateProfile(data) {
        this.profileData = { ...this.profileData, ...data };
        this.saveProfile();
        this.syncCurrentPage();
    }
    
    syncCurrentPage() {
        // Sincronizar página principal (index.html)
        if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
            this.syncMainPage();
        }
        
        // Sincronizar página de perfil completo
        if (window.location.pathname.includes('perfil-completo.html')) {
            this.syncProfilePage();
        }
    }
    
    syncMainPage() {
        // Atualizar nome no dropdown
        const profileNameEl = document.getElementById('profileName');
        if (profileNameEl) {
            profileNameEl.textContent = this.profileData.name.split(' ')[0];
        }
        
        // Atualizar avatar se existir
        const profileAvatar = document.querySelector('.profile-avatar');
        if (profileAvatar && this.profileData.avatar) {
            profileAvatar.src = this.profileData.avatar;
        }
    }
    
    syncProfilePage() {
        // Atualizar informações básicas
        const elements = {
            profileName: document.getElementById('profileName'),
            profileEmail: document.getElementById('profileEmail'),
            profilePhone: document.getElementById('profilePhone'),
            profileLocation: document.getElementById('profileLocation'),
            profileJoinDate: document.getElementById('profileJoinDate'),
            avatarText: document.getElementById('avatarText')
        };
        
        if (elements.profileName) elements.profileName.textContent = this.profileData.name;
        if (elements.profileEmail) elements.profileEmail.textContent = this.profileData.email;
        if (elements.profilePhone) elements.profilePhone.textContent = this.profileData.phone;
        if (elements.profileLocation) elements.profileLocation.textContent = this.profileData.location;
        if (elements.profileJoinDate) elements.profileJoinDate.textContent = this.profileData.joinDate;
        
        // Atualizar iniciais do avatar
        if (elements.avatarText) {
            const initials = this.profileData.name.split(' ').map(n => n[0]).join('').toUpperCase();
            elements.avatarText.textContent = initials;
        }
        
        // Atualizar avatar se existir
        if (this.profileData.avatar) {
            const avatar = document.querySelector('.profile-avatar');
            if (avatar) {
                avatar.style.backgroundImage = `url(${this.profileData.avatar})`;
                avatar.style.backgroundSize = 'cover';
                avatar.style.backgroundPosition = 'center';
                if (elements.avatarText) elements.avatarText.style.display = 'none';
            }
        }
        
        // Atualizar campos do formulário de edição
        const formElements = {
            editName: document.getElementById('editName'),
            editEmail: document.getElementById('editEmail'),
            editPhone: document.getElementById('editPhone'),
            editLocation: document.getElementById('editLocation'),
            editBio: document.getElementById('editBio')
        };
        
        if (formElements.editName) formElements.editName.value = this.profileData.name;
        if (formElements.editEmail) formElements.editEmail.value = this.profileData.email;
        if (formElements.editPhone) formElements.editPhone.value = this.profileData.phone;
        if (formElements.editLocation) formElements.editLocation.value = this.profileData.location;
        if (formElements.editBio) formElements.editBio.value = this.profileData.bio;
    }
    
    // Método para ser chamado quando o formulário for submetido
    handleFormSubmit(formData) {
        const updatedData = {
            name: document.getElementById('editName').value,
            email: document.getElementById('editEmail').value,
            phone: document.getElementById('editPhone').value,
            location: document.getElementById('editLocation').value,
            bio: document.getElementById('editBio').value
        };

        // Manter dados existentes e atualizar apenas os campos modificados
        this.profileData = {
            ...this.profileData,
            ...updatedData
        };
        
        // Salvar no localStorage
        this.saveProfile();
        
        // Atualizar UI
        this.syncCurrentPage();
        
        // Feedback visual
        this.showSaveConfirmation();
    }

    showSaveConfirmation() {
        const saveBtn = document.querySelector('.btn-save');
        if (saveBtn) {
            const originalText = saveBtn.innerHTML;
            saveBtn.innerHTML = '<i class="fas fa-check"></i> Salvo!';
            saveBtn.style.backgroundColor = '#4CAF50';
            
            // Criar notificação
            const notification = document.createElement('div');
            notification.className = 'save-notification';
            notification.textContent = 'Dados salvos com sucesso!';
            document.body.appendChild(notification);
            
            setTimeout(() => {
                saveBtn.innerHTML = originalText;
                saveBtn.style.backgroundColor = '';
                notification.remove();
                
                // Fechar modal de edição
                const editSection = document.querySelector('.edit-section');
                if (editSection) {
                    editSection.style.display = 'none';
                }
            }, 2000);
        }
    }
    
    syncMainPage() {
        // Atualizar nome no dropdown
        const profileNameEl = document.getElementById('profileName');
        if (profileNameEl) {
            profileNameEl.textContent = this.profileData.name.split(' ')[0];
        }
        
        // Atualizar avatar se existir
        const profileAvatar = document.querySelector('.profile-avatar');
        if (profileAvatar && this.profileData.avatar) {
            profileAvatar.src = this.profileData.avatar;
        }
    }
    
    syncProfilePage() {
        // Atualizar informações básicas
        const elements = {
            profileName: document.getElementById('profileName'),
            profileEmail: document.getElementById('profileEmail'),
            profilePhone: document.getElementById('profilePhone'),
            profileLocation: document.getElementById('profileLocation'),
            profileJoinDate: document.getElementById('profileJoinDate'),
            avatarText: document.getElementById('avatarText')
        };
        
        if (elements.profileName) elements.profileName.textContent = this.profileData.name;
        if (elements.profileEmail) elements.profileEmail.textContent = this.profileData.email;
        if (elements.profilePhone) elements.profilePhone.textContent = this.profileData.phone;
        if (elements.profileLocation) elements.profileLocation.textContent = this.profileData.location;
        if (elements.profileJoinDate) elements.profileJoinDate.textContent = this.profileData.joinDate;
        
        // Atualizar iniciais do avatar
        if (elements.avatarText) {
            const initials = this.profileData.name.split(' ').map(n => n[0]).join('').toUpperCase();
            elements.avatarText.textContent = initials;
        }
        
        // Atualizar avatar se existir
        if (this.profileData.avatar) {
            const avatar = document.querySelector('.profile-avatar');
            if (avatar) {
                avatar.style.backgroundImage = `url(${this.profileData.avatar})`;
                avatar.style.backgroundSize = 'cover';
                avatar.style.backgroundPosition = 'center';
                if (elements.avatarText) elements.avatarText.style.display = 'none';
            }
        }
        
        // Atualizar campos do formulário de edição
        const formElements = {
            editName: document.getElementById('editName'),
            editEmail: document.getElementById('editEmail'),
            editPhone: document.getElementById('editPhone'),
            editLocation: document.getElementById('editLocation'),
            editBio: document.getElementById('editBio')
        };
        
        if (formElements.editName) formElements.editName.value = this.profileData.name;
        if (formElements.editEmail) formElements.editEmail.value = this.profileData.email;
        if (formElements.editPhone) formElements.editPhone.value = this.profileData.phone;
        if (formElements.editLocation) formElements.editLocation.value = this.profileData.location;
        if (formElements.editBio) formElements.editBio.value = this.profileData.bio;
    }
    
    // Método para atualizar avatar
    updateAvatar(avatarDataUrl) {
        this.updateProfile({ avatar: avatarDataUrl });
    }
    
    // Método para obter dados do perfil
    getProfile() {
        return this.profileData;
    }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    window.profileSync = new ProfileSync();
    
    // Adicionar listener para o formulário
    const editForm = document.getElementById('editForm');
    if (editForm) {
        editForm.addEventListener('submit', function(e) {
            e.preventDefault();
            window.profileSync.handleFormSubmit();
        });
    }

    // Adicionar listener para upload de avatar
    const avatarInput = document.getElementById('avatarInput');
    if (avatarInput) {
        avatarInput.addEventListener('change', async function(e) {
            const file = e.target.files[0];
            if (file) {
                try {
                    const dataUrl = await handleProfileImage(file);
                    window.profileSync.updateAvatar(dataUrl);
                } catch (error) {
                    console.error('Erro ao processar imagem:', error);
                    alert('Erro ao processar imagem. Tente novamente.');
                }
            }
        });
    }
});

// Função para carregar os dados do usuário do localStorage
function loadUserProfile() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
        // Atualizar informações básicas do perfil
        document.getElementById('profileName').textContent = userData.nome || 'Nome não definido';
        document.getElementById('profileEmail').textContent = userData.email || 'Email não definido';
        document.getElementById('profilePhone').textContent = userData.telefone || 'Telefone não definido';
        document.getElementById('profileLocation').textContent = userData.localizacao || 'Localização não definida';

        // Atualizar campos do formulário de edição
        document.getElementById('editName').value = userData.nome || '';
        document.getElementById('editEmail').value = userData.email || '';
        document.getElementById('editPhone').value = userData.telefone || '';
        document.getElementById('editLocation').value = userData.localizacao || '';

        // Atualizar avatar com iniciais
        const initials = userData.nome
            ? userData.nome.split(' ').map(n => n[0]).join('').toUpperCase()
            : 'US';
        document.getElementById('avatarText').textContent = initials;
    }
}

// Função para salvar as alterações do perfil
function saveProfileChanges(formData) {
    const userData = JSON.parse(localStorage.getItem('userData')) || {};
    const updatedData = {
        ...userData,
        nome: formData.nome,
        email: formData.email,
        telefone: formData.telefone,
        localizacao: formData.localizacao,
        biografia: formData.biografia
    };
    
    localStorage.setItem('userData', JSON.stringify(updatedData));
    loadUserProfile(); // Recarrega os dados atualizados
}

// Carregar dados quando a página carregar
document.addEventListener('DOMContentLoaded', loadUserProfile);

// Atualizar o formulário de edição
document.getElementById('editForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        nome: document.getElementById('editName').value,
        email: document.getElementById('editEmail').value,
        telefone: document.getElementById('editPhone').value,
        localizacao: document.getElementById('editLocation').value,
        biografia: document.getElementById('editBio').value
    };
    
    saveProfileChanges(formData);
    
    // Feedback visual
    const btn = this.querySelector('.btn-save');
    btn.innerHTML = '<i class="fas fa-check"></i> Salvo!';
    
    setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-save"></i> Salvar Alterações';
        toggleEditMode(); // Fecha o formulário de edição
    }, 2000);
});

// Integrar com formulário de edição se existir
document.addEventListener('DOMContentLoaded', function() {
    const editForm = document.getElementById('editForm');
    if (editForm) {
        editForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('editName').value,
                email: document.getElementById('editEmail').value,
                phone: document.getElementById('editPhone').value,
                location: document.getElementById('editLocation').value,
                bio: document.getElementById('editBio').value
            };
            
            profileSync.handleFormSubmit(formData);
            
            // Fechar modal
            const modal = document.getElementById('editModal');
            if (modal) modal.style.display = 'none';
            
            // Feedback visual
            const btn = document.querySelector('.edit-btn');
            if (btn) {
                btn.innerHTML = '<i class="fas fa-check"></i> Salvo!';
                btn.style.background = 'rgba(67, 233, 123, 0.3)';
                
                setTimeout(() => {
                    btn.innerHTML = '<i class="fas fa-edit"></i> Editar Perfil';
                    btn.style.background = 'rgba(255, 255, 255, 0.2)';
                }, 2000);
            }
        });
    }
});

// Função para tratar a imagem do perfil
function handleProfileImage(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const img = new Image();
            
            img.onload = function() {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                // Definir tamanho ideal para a imagem
                const size = 400; // Tamanho maior para melhor qualidade
                canvas.width = size;
                canvas.height = size;
                
                // Calcular dimensões para crop quadrado
                const minDimension = Math.min(img.width, img.height);
                const sourceX = (img.width - minDimension) / 2;
                const sourceY = (img.height - minDimension) / 2;
                
                // Desenhar imagem no canvas com crop
                ctx.drawImage(
                    img,
                    sourceX, sourceY, // Ponto inicial do crop
                    minDimension, minDimension, // Tamanho do crop
                    0, 0, // Posição no canvas
                    size, size // Tamanho final
                );
                
                // Converter para formato otimizado
                const optimizedImage = canvas.toDataURL('image/jpeg', 0.9);
                resolve(optimizedImage);
            };
            
            img.onerror = reject;
            img.src = e.target.result;
        };
        
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// Evento de upload de imagem
document.getElementById('avatarInput')?.addEventListener('change', async function(e) {
    const file = e.target.files[0];
    
    if (file) {
        try {
            // Verificar tipo de arquivo
            if (!file.type.startsWith('image/')) {
                throw new Error('Por favor, selecione uma imagem.');
            }
            
            // Verificar tamanho (máximo 5MB)
            if (file.size > 5 * 1024 * 1024) {
                throw new Error('A imagem deve ter menos que 5MB.');
            }
            
            const optimizedImage = await handleProfileImage(file);
            
            // Atualizar preview
            const avatar = document.querySelector('.profile-avatar img') || document.createElement('img');
            avatar.src = optimizedImage;
            
            // Salvar no localStorage
            const userData = JSON.parse(localStorage.getItem('userData')) || {};
            userData.avatar = optimizedImage;
            localStorage.setItem('userData', JSON.stringify(userData));
            
        } catch (error) {
            alert(error.message || 'Erro ao processar imagem.');
        }
    }
});