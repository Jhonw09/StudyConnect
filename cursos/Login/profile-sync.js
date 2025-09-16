// Sistema de sincronização de perfil para login
class LoginProfileSync {
    constructor() {
        this.init();
    }
    
    init() {
        // Escutar mudanças no localStorage para sincronizar dados
        window.addEventListener('storage', (e) => {
            if (e.key === 'userLoggedIn' || e.key === 'userName') {
                this.syncLoginStatus();
            }
        });
        
        // Sincronizar status inicial
        this.syncLoginStatus();
    }
    
    syncLoginStatus() {
        const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
        const userName = localStorage.getItem('userName');
        
        // Se usuário está logado, redirecionar para página principal
        if (isLoggedIn && userName) {
            window.location.href = '../../index.html';
        }
    }
    
    // Método para ser chamado após login bem-sucedido
    handleSuccessfulLogin(userData) {
        // Salvar dados do usuário
        localStorage.setItem('userLoggedIn', 'true');
        localStorage.setItem('userName', userData.name);
        localStorage.setItem('userEmail', userData.email);
        localStorage.setItem('joinDate', userData.joinDate);
        
        // Salvar dados completos do perfil
        const profileData = {
            name: userData.name,
            email: userData.email,
            phone: userData.phone || '(11) 99999-9999',
            location: userData.location || 'São Paulo, Brasil',
            bio: userData.bio || 'Estudante na StudyConnect+',
            joinDate: userData.joinDate,
            avatar: userData.avatar || null,
            stats: {
                courses: 0,
                progress: 0,
                lessons: 0,
                hours: 0
            }
        };
        
        localStorage.setItem('studyconnect_profile', JSON.stringify(profileData));
        
        // Redirecionar para página principal
        setTimeout(() => {
            window.location.href = '../../index.html';
        }, 1500);
    }
}

// Inicializar quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    window.loginProfileSync = new LoginProfileSync();
});