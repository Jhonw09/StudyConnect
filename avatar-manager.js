// Gerenciador simples de avatar
class AvatarManager {
    constructor() {
        this.init();
    }

    init() {
        this.loadSavedAvatar();
        this.setupAvatarUpload();
    }

    loadSavedAvatar() {
        const savedAvatar = localStorage.getItem('userAvatar');
        if (savedAvatar) {
            const avatarElements = document.querySelectorAll('.profile-avatar');
            avatarElements.forEach(avatar => {
                avatar.src = savedAvatar;
            });
        }
    }

    setupAvatarUpload() {
        // Escutar por mudanças no input de avatar
        document.addEventListener('change', (e) => {
            if (e.target.id === 'avatarInput' || e.target.type === 'file') {
                this.handleAvatarUpload(e.target);
            }
        });
    }

    handleAvatarUpload(input) {
        const file = input.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const avatarData = e.target.result;
                this.saveAvatar(avatarData);
                this.updateAvatarDisplay(avatarData);
            };
            reader.readAsDataURL(file);
        }
    }

    saveAvatar(avatarData) {
        // Salvar no localStorage principal
        localStorage.setItem('userAvatar', avatarData);
        
        // Salvar no perfil também
        const profile = JSON.parse(localStorage.getItem('studyconnect_profile') || '{}');
        profile.avatar = avatarData;
        localStorage.setItem('studyconnect_profile', JSON.stringify(profile));
    }

    updateAvatarDisplay(avatarData) {
        const avatarElements = document.querySelectorAll('.profile-avatar, .avatar-preview, .profile-image');
        avatarElements.forEach(avatar => {
            if (avatar.tagName === 'IMG') {
                avatar.src = avatarData;
            } else {
                avatar.style.backgroundImage = `url(${avatarData})`;
                avatar.style.backgroundSize = 'cover';
                avatar.style.backgroundPosition = 'center';
            }
        });
    }
}

// Inicializar quando DOM carregar
document.addEventListener('DOMContentLoaded', () => {
    window.avatarManager = new AvatarManager();
});

// Função global para salvar avatar
window.saveUserAvatar = function(avatarData) {
    localStorage.setItem('userAvatar', avatarData);
    const profile = JSON.parse(localStorage.getItem('studyconnect_profile') || '{}');
    profile.avatar = avatarData;
    localStorage.setItem('studyconnect_profile', JSON.stringify(profile));
};