// Barra de Progresso de Scroll
function initScrollProgress() {
    const scrollProgressBar = document.getElementById('scrollProgressBar');
    
    function updateScrollProgress() {
        if (scrollProgressBar) {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            scrollProgressBar.style.width = Math.min(scrollPercent, 100) + '%';
        }
    }
    
    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress(); // Inicializar
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', initScrollProgress);