// ===========================
//   INTEGRAÇÃO DE RECURSOS AVANÇADOS
// ===========================

class EnhancedFeatures {
    constructor() {
        this.features = {
            search: null,
            notifications: null,
            performance: null,
            gestures: null
        };
        this.init();
    }

    init() {
        this.loadFeatures();
        this.setupGlobalEnhancements();
        this.initializeAccessibility();
        this.setupAnalytics();
    }

    loadFeatures() {
        // Carregar recursos de forma assíncrona
        this.loadScript('advanced-search.js');
        this.loadScript('notification-system.js');
        this.loadScript('performance-optimizer.js');
        this.loadScript('touch-gestures.js');
    }

    loadScript(src) {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        document.head.appendChild(script);
    }

    setupGlobalEnhancements() {
        // Melhorias globais de UX
        this.addGlobalKeyboardShortcuts();
        this.enhanceFormValidation();
        this.addContextMenus();
        this.setupProgressIndicators();
    }

    addGlobalKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + K para busca
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                const searchInput = document.getElementById('searchInput');
                if (searchInput) {
                    searchInput.focus();
                    this.showShortcutFeedback('Busca ativada');
                }
            }

            // Esc para fechar modais
            if (e.key === 'Escape') {
                const modal = document.querySelector('.modal.show');
                const dropdown = document.querySelector('.dropdown.show');
                if (modal) {
                    modal.classList.remove('show');
                    this.showShortcutFeedback('Modal fechado');
                } else if (dropdown) {
                    dropdown.classList.remove('show');
                    this.showShortcutFeedback('Menu fechado');
                }
            }

            // Setas para navegação
            if (e.key === 'ArrowDown' && e.altKey) {
                e.preventDefault();
                this.scrollToNextSection();
                this.showShortcutFeedback('↓ Próxima seção');
            }

            if (e.key === 'ArrowUp' && e.altKey) {
                e.preventDefault();
                this.scrollToPrevSection();
                this.showShortcutFeedback('↑ Seção anterior');
            }

            // ? para ajuda
            if (e.key === '?' && !e.target.matches('input, textarea')) {
                e.preventDefault();
                this.showKeyboardShortcuts();
            }
        });
    }

    showKeyboardShortcuts() {
        const modal = document.createElement('div');
        modal.className = 'modal keyboard-shortcuts-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>⌨️ Atalhos de Teclado</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="shortcuts-grid">
                        <div class="shortcut-item">
                            <kbd>Ctrl</kbd> + <kbd>K</kbd>
                            <span>Abrir busca</span>
                        </div>
                        <div class="shortcut-item">
                            <kbd>Esc</kbd>
                            <span>Fechar modal/menu</span>
                        </div>
                        <div class="shortcut-item">
                            <kbd>Alt</kbd> + <kbd>↓</kbd>
                            <span>Próxima seção</span>
                        </div>
                        <div class="shortcut-item">
                            <kbd>Alt</kbd> + <kbd>↑</kbd>
                            <span>Seção anterior</span>
                        </div>
                        <div class="shortcut-item">
                            <kbd>?</kbd>
                            <span>Mostrar esta ajuda</span>
                        </div>
                        <div class="shortcut-item">
                            <kbd>Tab</kbd>
                            <span>Navegar elementos</span>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        setTimeout(() => modal.classList.add('show'), 10);

        modal.querySelector('.modal-close').addEventListener('click', () => {
            modal.classList.remove('show');
            setTimeout(() => modal.remove(), 300);
        });
    }

    enhanceFormValidation() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            const inputs = form.querySelectorAll('input, textarea, select');
            
            inputs.forEach(input => {
                // Validação em tempo real
                input.addEventListener('input', () => {
                    this.validateField(input);
                });

                // Feedback visual melhorado
                input.addEventListener('focus', () => {
                    input.parentElement.classList.add('focused');
                });

                input.addEventListener('blur', () => {
                    input.parentElement.classList.remove('focused');
                    this.validateField(input);
                });
            });
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const type = field.type;
        let isValid = true;
        let message = '';

        // Validações básicas
        if (field.required && !value) {
            isValid = false;
            message = 'Este campo é obrigatório';
        } else if (type === 'email' && value && !this.isValidEmail(value)) {
            isValid = false;
            message = 'Email inválido';
        } else if (type === 'password' && value && value.length < 6) {
            isValid = false;
            message = 'Senha deve ter pelo menos 6 caracteres';
        }

        // Aplicar feedback visual
        field.classList.toggle('invalid', !isValid);
        field.classList.toggle('valid', isValid && value);

        // Mostrar/esconder mensagem
        let errorMsg = field.parentElement.querySelector('.error-message');
        if (!isValid && message) {
            if (!errorMsg) {
                errorMsg = document.createElement('div');
                errorMsg.className = 'error-message';
                field.parentElement.appendChild(errorMsg);
            }
            errorMsg.textContent = message;
        } else if (errorMsg) {
            errorMsg.remove();
        }

        return isValid;
    }

    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    addContextMenus() {
        // Menu de contexto personalizado para elementos específicos
        document.addEventListener('contextmenu', (e) => {
            const target = e.target;
            
            if (target.matches('.course-card')) {
                e.preventDefault();
                this.showContextMenu(e.clientX, e.clientY, [
                    { label: '⭐ Adicionar aos favoritos', action: () => this.addToFavorites(target) },
                    { label: '📤 Compartilhar', action: () => this.shareCourse(target) },
                    { label: '📋 Copiar link', action: () => this.copyLink(target) },
                    { label: '🔗 Abrir em nova aba', action: () => this.openInNewTab(target) }
                ]);
            }
        });
    }

    showContextMenu(x, y, items) {
        // Remover menu existente
        const existingMenu = document.querySelector('.context-menu');
        if (existingMenu) existingMenu.remove();

        const menu = document.createElement('div');
        menu.className = 'context-menu';
        menu.style.left = x + 'px';
        menu.style.top = y + 'px';

        menu.innerHTML = items.map(item => 
            `<div class="context-menu-item" data-action="${item.label}">${item.label}</div>`
        ).join('');

        document.body.appendChild(menu);

        // Event listeners
        menu.addEventListener('click', (e) => {
            const item = items.find(i => i.label === e.target.dataset.action);
            if (item) item.action();
            menu.remove();
        });

        // Fechar ao clicar fora
        setTimeout(() => {
            document.addEventListener('click', () => menu.remove(), { once: true });
        }, 10);
    }

    setupProgressIndicators() {
        // Indicador de progresso de leitura
        const progressBar = document.createElement('div');
        progressBar.className = 'reading-progress';
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }

    initializeAccessibility() {
        // Melhorias de acessibilidade
        this.addSkipLinks();
        this.enhanceKeyboardNavigation();
        this.addAriaLabels();
        this.setupHighContrast();
    }

    addSkipLinks() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.className = 'skip-link';
        skipLink.textContent = 'Pular para o conteúdo principal';
        document.body.insertBefore(skipLink, document.body.firstChild);
    }

    enhanceKeyboardNavigation() {
        // Melhorar navegação por Tab
        const focusableElements = document.querySelectorAll(
            'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );

        focusableElements.forEach(element => {
            element.addEventListener('focus', () => {
                element.classList.add('keyboard-focused');
            });

            element.addEventListener('blur', () => {
                element.classList.remove('keyboard-focused');
            });
        });
    }

    addAriaLabels() {
        // Adicionar labels ARIA onde necessário
        const buttons = document.querySelectorAll('button:not([aria-label])');
        buttons.forEach(button => {
            if (!button.textContent.trim()) {
                const icon = button.querySelector('i');
                if (icon) {
                    const iconClass = icon.className;
                    let label = 'Botão';
                    
                    if (iconClass.includes('search')) label = 'Buscar';
                    else if (iconClass.includes('menu')) label = 'Menu';
                    else if (iconClass.includes('close')) label = 'Fechar';
                    else if (iconClass.includes('play')) label = 'Reproduzir';
                    
                    button.setAttribute('aria-label', label);
                }
            }
        });
    }

    setupHighContrast() {
        // Alto contraste agora é gerenciado pelo sistema de acessibilidade
        // Restaurar preferência
        if (localStorage.getItem('highContrast') === 'true') {
            document.body.classList.add('high-contrast');
        }
    }
    
    showTemporaryContrastButton() {
        const tempButton = document.createElement('button');
        tempButton.className = 'contrast-toggle temporary';
        tempButton.innerHTML = '<i class="fas fa-adjust"></i>';
        tempButton.title = 'Alto contraste (disponível em configurações)';
        
        document.body.appendChild(tempButton);
        
        tempButton.addEventListener('click', () => {
            this.toggleHighContrast();
        });
        
        // Remover após 5 segundos
        setTimeout(() => {
            tempButton.classList.add('fade-out');
            setTimeout(() => tempButton.remove(), 300);
        }, 5000);
    }
    
    addContrastToSettings() {
        // Aguardar modal de configurações ser criado
        setTimeout(() => {
            const configModal = document.getElementById('configModal');
            if (configModal) {
                const contrastOption = document.createElement('div');
                contrastOption.className = 'config-option';
                contrastOption.innerHTML = `
                    <div class="config-label">
                        <i class="fas fa-adjust"></i>
                        <span>Alto Contraste</span>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox" id="contrastToggle" ${localStorage.getItem('highContrast') === 'true' ? 'checked' : ''}>
                        <span class="toggle-slider"></span>
                    </label>
                `;
                
                const configBody = configModal.querySelector('.modal-body');
                if (configBody) {
                    configBody.appendChild(contrastOption);
                    
                    const toggle = contrastOption.querySelector('#contrastToggle');
                    toggle.addEventListener('change', () => {
                        this.toggleHighContrast();
                    });
                }
            }
        }, 1000);
    }
    
    toggleHighContrast() {
        document.body.classList.toggle('high-contrast');
        const isHighContrast = document.body.classList.contains('high-contrast');
        localStorage.setItem('highContrast', isHighContrast);
        this.showShortcutFeedback(isHighContrast ? 'Alto contraste ativado' : 'Alto contraste desativado');
        
        // Atualizar toggle nas configurações
        const configToggle = document.getElementById('contrastToggle');
        if (configToggle) {
            configToggle.checked = isHighContrast;
        }
    }

    setupAnalytics() {
        // Analytics básico (sem bibliotecas externas)
        this.trackPageView();
        this.trackUserInteractions();
        this.trackPerformance();
    }

    trackPageView() {
        const pageData = {
            url: window.location.href,
            title: document.title,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            referrer: document.referrer
        };

        this.saveAnalyticsData('pageview', pageData);
    }

    trackUserInteractions() {
        // Track clicks em elementos importantes
        document.addEventListener('click', (e) => {
            const target = e.target.closest('a, button, .course-card');
            if (target) {
                const interactionData = {
                    element: target.tagName.toLowerCase(),
                    text: target.textContent.trim().substring(0, 50),
                    href: target.href || null,
                    timestamp: new Date().toISOString()
                };

                this.saveAnalyticsData('interaction', interactionData);
            }
        });
    }

    trackPerformance() {
        // Métricas de performance
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                const performanceData = {
                    loadTime: perfData.loadEventEnd - perfData.loadEventStart,
                    domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
                    firstPaint: performance.getEntriesByType('paint')[0]?.startTime || 0,
                    timestamp: new Date().toISOString()
                };

                this.saveAnalyticsData('performance', performanceData);
            }, 1000);
        });
    }

    saveAnalyticsData(type, data) {
        const analytics = JSON.parse(localStorage.getItem('analytics') || '[]');
        analytics.push({ type, data });
        
        // Manter apenas os últimos 100 registros
        if (analytics.length > 100) {
            analytics.splice(0, analytics.length - 100);
        }
        
        localStorage.setItem('analytics', JSON.stringify(analytics));
    }

    // Métodos utilitários
    scrollToNextSection() {
        const sections = document.querySelectorAll('section');
        const currentScroll = window.scrollY;
        
        for (let section of sections) {
            if (section.offsetTop > currentScroll + 100) {
                section.scrollIntoView({ behavior: 'smooth' });
                break;
            }
        }
    }

    scrollToPrevSection() {
        const sections = Array.from(document.querySelectorAll('section')).reverse();
        const currentScroll = window.scrollY;
        
        for (let section of sections) {
            if (section.offsetTop < currentScroll - 100) {
                section.scrollIntoView({ behavior: 'smooth' });
                break;
            }
        }
    }

    showShortcutFeedback(message) {
        const feedback = document.createElement('div');
        feedback.className = 'shortcut-feedback';
        feedback.textContent = message;
        
        document.body.appendChild(feedback);
        
        setTimeout(() => feedback.classList.add('show'), 10);
        setTimeout(() => {
            feedback.classList.remove('show');
            setTimeout(() => feedback.remove(), 300);
        }, 2000);
    }

    addToFavorites(element) {
        // Implementar lógica de favoritos
        this.showShortcutFeedback('Adicionado aos favoritos!');
    }

    shareCourse(element) {
        if (navigator.share) {
            navigator.share({
                title: element.querySelector('h3')?.textContent || 'Curso',
                url: window.location.href
            });
        } else {
            this.copyLink(element);
        }
    }

    copyLink(element) {
        navigator.clipboard.writeText(window.location.href);
        this.showShortcutFeedback('Link copiado!');
    }

    openInNewTab(element) {
        const link = element.querySelector('a')?.href || window.location.href;
        window.open(link, '_blank');
    }
}

// CSS para recursos avançados
const enhancedStyles = `
<style>
.skip-link {
    position: absolute;
    top: -40px;
    left: 6px;
    background: #000;
    color: #fff;
    padding: 8px;
    text-decoration: none;
    border-radius: 4px;
    z-index: 10000;
    transition: top 0.3s;
}

.skip-link:focus {
    top: 6px;
}

.keyboard-focused {
    outline: 3px solid #43e97b !important;
    outline-offset: 2px;
}

.reading-progress {
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 4px;
    background: linear-gradient(90deg, #43e97b, #38f9d7);
    z-index: 9999;
    transition: width 0.3s ease;
}

.context-menu {
    position: fixed;
    background: rgba(26, 26, 46, 0.95);
    backdrop-filter: blur(20px);
    border-radius: 8px;
    padding: 0.5rem 0;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.1);
    z-index: 10000;
    min-width: 200px;
}

.context-menu-item {
    padding: 0.8rem 1rem;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 0.9rem;
}

.context-menu-item:hover {
    background: rgba(67, 233, 123, 0.2);
}

.contrast-toggle {
    position: fixed;
    bottom: 20px;
    left: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: rgba(26, 26, 46, 0.9);
    border: 2px solid rgba(255, 255, 255, 0.2);
    color: white;
    cursor: pointer;
    z-index: 1000;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
    animation: slideInLeft 0.5s ease;
}

.contrast-toggle:hover {
    background: rgba(67, 233, 123, 0.9);
    transform: scale(1.1);
}

.contrast-toggle.temporary {
    animation: slideInLeft 0.5s ease, pulse 2s ease-in-out infinite;
}

.contrast-toggle.temporary::after {
    content: 'Configurações';
    position: absolute;
    left: 60px;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(26, 26, 46, 0.9);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.8rem;
    white-space: nowrap;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.config-option {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.config-label {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    color: white;
}

.config-label i {
    color: #43e97b;
    width: 20px;
}

.toggle-switch {
    position: relative;
    width: 50px;
    height: 24px;
}

.toggle-switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.toggle-slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.2);
    transition: 0.3s;
    border-radius: 24px;
}

.toggle-slider:before {
    position: absolute;
    content: '';
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: 0.3s;
    border-radius: 50%;
}

input:checked + .toggle-slider {
    background-color: #43e97b;
}

input:checked + .toggle-slider:before {
    transform: translateX(26px);
}

@keyframes slideInLeft {
    from {
        transform: translateX(-100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes pulse {
    0%, 100% {
        box-shadow: 0 0 0 0 rgba(67, 233, 123, 0.7);
    }
    50% {
        box-shadow: 0 0 0 10px rgba(67, 233, 123, 0);
    }
}

.high-contrast {
    filter: contrast(150%) brightness(120%);
}

.high-contrast .course-card,
.high-contrast .btn,
.high-contrast .modal-content {
    border: 2px solid #fff !important;
}

.shortcut-feedback {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%) translateY(-50px);
    background: rgba(26, 26, 46, 0.9);
    color: white;
    padding: 0.8rem 1.5rem;
    border-radius: 25px;
    font-weight: 600;
    z-index: 1001;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.shortcut-feedback.show {
    transform: translateX(-50%) translateY(0);
}

.shortcuts-grid {
    display: grid;
    gap: 1rem;
}

.shortcut-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
}

.shortcut-item kbd {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 4px;
    padding: 0.3rem 0.6rem;
    font-family: monospace;
    font-size: 0.8rem;
    margin: 0 0.2rem;
}

.error-message {
    color: #ff6b6b;
    font-size: 0.8rem;
    margin-top: 0.3rem;
    animation: slideInDown 0.3s ease;
}

.focused {
    transform: scale(1.02);
    transition: transform 0.3s ease;
}

input.valid,
textarea.valid {
    border-color: #43e97b !important;
    box-shadow: 0 0 0 2px rgba(67, 233, 123, 0.2) !important;
}

input.invalid,
textarea.invalid {
    border-color: #ff6b6b !important;
    box-shadow: 0 0 0 2px rgba(255, 107, 107, 0.2) !important;
}

@keyframes slideInDown {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@media (max-width: 768px) {
    .contrast-toggle {
        bottom: 80px;
        left: 15px;
        width: 45px;
        height: 45px;
    }
    
    .contrast-toggle.temporary::after {
        left: 55px;
        font-size: 0.7rem;
        padding: 0.4rem 0.8rem;
    }
}
    
    .context-menu {
        min-width: 180px;
    }
    
    .shortcut-feedback {
        left: 10px;
        right: 10px;
        transform: translateY(-50px);
    }
    
    .shortcut-feedback.show {
        transform: translateY(0);
    }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', enhancedStyles);

// Inicializar recursos avançados
document.addEventListener('DOMContentLoaded', () => {
    window.enhancedFeatures = new EnhancedFeatures();
});