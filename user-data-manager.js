// Gerenciador de dados do usuário
class UserDataManager {
    constructor() {
        this.currentUserId = localStorage.getItem('currentUserId');
    }

    // Salvar progresso de curso
    saveCourseProgress(courseId, progress) {
        const profile = this.getProfile();
        if (!profile.courseProgress) profile.courseProgress = {};
        profile.courseProgress[courseId] = progress;
        this.saveProfile(profile);
    }

    // Salvar lição completada
    saveCompletedLesson(lessonId) {
        const profile = this.getProfile();
        if (!profile.completedLessons.includes(lessonId)) {
            profile.completedLessons.push(lessonId);
            profile.stats.lessons = profile.completedLessons.length;
            this.saveProfile(profile);
        }
    }

    // Salvar pontuação de jogo
    saveGameScore(gameId, score) {
        const profile = this.getProfile();
        if (!profile.gameScores[gameId] || score > profile.gameScores[gameId]) {
            profile.gameScores[gameId] = score;
            this.saveProfile(profile);
        }
    }

    // Adicionar favorito
    addFavorite(courseData) {
        const profile = this.getProfile();
        const existingIndex = profile.favorites.findIndex(fav => fav.id === courseData.id);
        if (existingIndex === -1) {
            profile.favorites.push(courseData);
            this.saveProfile(profile);
        }
    }

    // Remover favorito
    removeFavorite(courseId) {
        const profile = this.getProfile();
        profile.favorites = profile.favorites.filter(fav => fav.id !== courseId);
        this.saveProfile(profile);
    }

    // Atualizar foto de perfil
    updateAvatar(avatarDataUrl) {
        const profile = this.getProfile();
        profile.avatar = avatarDataUrl;
        this.saveProfile(profile);
    }

    // Atualizar informações pessoais
    updatePersonalInfo(data) {
        const profile = this.getProfile();
        Object.assign(profile, data);
        this.saveProfile(profile);
    }

    // Obter perfil atual
    getProfile() {
        const saved = localStorage.getItem('studyconnect_profile');
        return saved ? JSON.parse(saved) : this.getDefaultProfile();
    }

    // Salvar perfil
    saveProfile(profile) {
        localStorage.setItem('studyconnect_profile', JSON.stringify(profile));
        
        // Disparar evento para sincronização
        window.dispatchEvent(new CustomEvent('profileUpdated', {
            detail: profile
        }));
    }

    // Perfil padrão
    getDefaultProfile() {
        return {
            id: null,
            name: 'Usuário',
            email: '',
            phone: '(11) 99999-9999',
            location: 'São Paulo, Brasil',
            bio: 'Estudante na StudyConnect+',
            joinDate: new Date().toLocaleDateString('pt-BR'),
            avatar: null,
            stats: {
                courses: 0,
                progress: 0,
                lessons: 0,
                hours: 0
            },
            favorites: [],
            completedLessons: [],
            gameScores: {},
            courseProgress: {},
            preferences: {
                theme: 'dark',
                notifications: true
            }
        };
    }

    // Obter estatísticas
    getStats() {
        const profile = this.getProfile();
        return {
            totalCourses: Object.keys(profile.courseProgress || {}).length,
            completedLessons: profile.completedLessons.length,
            favoriteCount: profile.favorites.length,
            bestGameScore: Math.max(...Object.values(profile.gameScores || {}), 0)
        };
    }
}

// Instância global
window.userDataManager = new UserDataManager();

// Auto-salvar dados quando usuário interage
document.addEventListener('DOMContentLoaded', () => {
    // Salvar tempo gasto na página
    let startTime = Date.now();
    
    window.addEventListener('beforeunload', () => {
        const timeSpent = Math.floor((Date.now() - startTime) / 1000 / 60); // minutos
        const profile = window.userDataManager.getProfile();
        profile.stats.hours += timeSpent;
        window.userDataManager.saveProfile(profile);
    });
});