// Aplicar tema imediatamente antes do DOM carregar
(function() {
    const theme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.setProperty('color-scheme', theme);
})();

// Configurar toggle quando DOM carregar
document.addEventListener('DOMContentLoaded', function() {
    const theme = localStorage.getItem('theme') || 'light';
    const toggle = document.getElementById('darkModeToggle');
    
    if (toggle) {
        if (theme === 'dark') {
            toggle.classList.add('active');
        }
        
        toggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            document.documentElement.style.setProperty('color-scheme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            this.classList.toggle('active');
        });
    }
});