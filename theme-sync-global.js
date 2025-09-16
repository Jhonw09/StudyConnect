// Sincronização global de tema escuro
class GlobalThemeSync {
    constructor() {
        this.init();
    }

    init() {
        // Aplicar tema escuro por padrão
        document.body.classList.add('dark-mode');
        
        // Sincronizar com todas as páginas
        this.syncAllPages();
        
        // Escutar mudanças de tema
        window.addEventListener('storage', (e) => {
            if (e.key === 'theme') {
                this.syncAllPages();
            }
        });
    }

    syncAllPages() {
        const theme = localStorage.getItem('theme') || 'dark';
        
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }

        // Sincronizar páginas específicas
        this.syncLoginPage();
        this.syncCoursesPages();
        this.syncQuizPages();
    }

    syncLoginPage() {
        // Se estiver na página de login
        if (window.location.pathname.includes('Login.html')) {
            const theme = localStorage.getItem('theme') || 'dark';
            if (theme === 'dark') {
                document.body.classList.add('dark-mode');
            }
        }
    }

    syncCoursesPages() {
        // Sincronizar páginas de cursos
        const coursePages = ['frontend-moderno.html', 'backend-avancado.html', 'Port.html', 'Matematica.html'];
        const currentPage = window.location.pathname.split('/').pop();
        
        if (coursePages.includes(currentPage)) {
            const theme = localStorage.getItem('theme') || 'dark';
            if (theme === 'dark') {
                document.body.classList.add('dark-mode');
            }
        }
    }

    syncQuizPages() {
        // Sincronizar páginas de quiz
        const quizPages = ['quiz-misto.html', 'quiz-portugues.html', 'typing-game.html'];
        const currentPage = window.location.pathname.split('/').pop();
        
        if (quizPages.includes(currentPage)) {
            const theme = localStorage.getItem('theme') || 'dark';
            if (theme === 'dark') {
                document.body.classList.add('dark-mode');
            }
        }
    }
}

// Inicializar imediatamente
document.addEventListener('DOMContentLoaded', () => {
    new GlobalThemeSync();
});

// Aplicar tema escuro imediatamente (antes do DOM carregar)
if (localStorage.getItem('theme') !== 'light') {
    document.documentElement.classList.add('dark-mode');
}