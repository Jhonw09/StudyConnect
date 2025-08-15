// ===== SINCRONIZAÇÃO DE TEMA ENTRE PÁGINAS =====

// Aplicar tema ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Atualizar toggle se existir
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        if (savedTheme === 'dark') {
            darkModeToggle.classList.add('active');
        }
        
        darkModeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            this.classList.toggle('active');
            
            // Animação suave
            document.body.style.transition = 'all 0.3s ease';
            setTimeout(() => {
                document.body.style.transition = '';
            }, 300);
        });
    }
});

// Redirecionamento interativo com loading
function navigateWithLoading(url, element) {
    // Adicionar loading ao elemento clicado
    const originalContent = element.innerHTML;
    element.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Carregando...';
    element.style.pointerEvents = 'none';
    
    // Simular loading e redirecionar
    setTimeout(() => {
        window.location.href = url;
    }, 800);
}

// Melhorar cliques nas aulas
document.addEventListener('click', function(e) {
    const lesson = e.target.closest('.lesson[onclick]');
    if (lesson && !lesson.onclick.toString().includes('alert')) {
        e.preventDefault();
        
        // Efeito visual
        lesson.style.transform = 'scale(0.98)';
        lesson.style.transition = 'all 0.2s ease';
        
        setTimeout(() => {
            lesson.style.transform = 'scale(1)';
            
            // Extrair URL do onclick
            const onclickStr = lesson.getAttribute('onclick');
            const urlMatch = onclickStr.match(/window\.location\.href='([^']+)'/);
            
            if (urlMatch) {
                navigateWithLoading(urlMatch[1], lesson);
            }
        }, 100);
    }
});

// Animação de entrada para elementos
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
        }
    });
}, observerOptions);

// Observar elementos quando a página carregar
window.addEventListener('load', () => {
    const elementsToAnimate = document.querySelectorAll('.module, .course-card, .lesson-content');
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
});