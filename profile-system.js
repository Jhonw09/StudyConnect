// Sistema de perfil simplificado
document.addEventListener('DOMContentLoaded', function() {
    const profileBtn = document.getElementById('profileBtn');
    const profileDropdown = document.getElementById('profileDropdown');
    const configBtn = document.getElementById('configBtn');
    
    if (profileBtn && profileDropdown) {
        // Toggle dropdown
        profileBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            profileDropdown.classList.toggle('show');
        });
        
        // Fechar dropdown ao clicar fora
        document.addEventListener('click', function(e) {
            if (!profileBtn.contains(e.target) && !profileDropdown.contains(e.target)) {
                profileDropdown.classList.remove('show');
            }
        });
        
        // Permitir navegação nos links do dropdown
        const dropdownLinks = profileDropdown.querySelectorAll('a');
        dropdownLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Se for um link válido (não #), permitir navegação
                if (this.getAttribute('href') !== '#' && this.getAttribute('href') !== '') {
                    profileDropdown.classList.remove('show');
                    return true;
                }
            });
        });
    }
    
    // Conectar botão de configurações
    if (configBtn) {
        configBtn.addEventListener('click', function(e) {
            e.preventDefault();
            profileDropdown.classList.remove('show');
            showConfigModal();
