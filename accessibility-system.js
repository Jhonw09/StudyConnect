// ===========================
//   SISTEMA DE ACESSIBILIDADE
// ===========================

class AccessibilitySystem {
    constructor() {
        this.isReaderActive = false;
        this.isTranslatorActive = false;
        this.currentLanguage = 'pt';
        this.speechSynthesis = window.speechSynthesis;
        this.init();
    }

    init() {
        this.createAccessibilityPanel();
        this.setupEventListeners();
        this.loadSettings();
    }

    createAccessibilityPanel() {
        const panel = document.createElement('div');
        panel.className = 'accessibility-panel';
        panel.innerHTML = `
            <button class="accessibility-toggle" id="accessibilityToggle" title="Acessibilidade">
                <i class="fas fa-universal-access"></i>
            </button>
            <div class="accessibility-menu" id="accessibilityMenu">
                <div class="accessibility-header">
                    <h3>Acessibilidade</h3>
                    <button class="close-panel" id="closeAccessibility">×</button>
                </div>
                <div class="accessibility-options">
                    <div class="option-group">
                        <label class="option-label">
                            <input type="checkbox" id="screenReader">
                            <span class="checkmark"></span>
                            <div class="option-info">
                                <strong>Leitor de Tela</strong>
                                <small>Lê o conteúdo em voz alta</small>
                            </div>
                        </label>
                    </div>
                    
                    <div class="option-group">
                        <label class="option-label">
                            <input type="checkbox" id="highContrast">
                            <span class="checkmark"></span>
                            <div class="option-info">
                                <strong>Alto Contraste</strong>
                                <small>Melhora a visibilidade</small>
                            </div>
                        </label>
                    </div>
                    
                    <div class="option-group">
                        <label class="option-label">
                            <input type="checkbox" id="translator">
                            <span class="checkmark"></span>
                            <div class="option-info">
                                <strong>Tradutor</strong>
                                <small>Traduz conteúdo para outros idiomas</small>
                            </div>
                        </label>
                    </div>
                    
                    <div class="language-selector" id="languageSelector" style="display: none;">
                        <select id="targetLanguage">
                            <option value="en">Inglês</option>
                            <option value="es">Espanhol</option>
                            <option value="fr">Francês</option>
                            <option value="de">Alemão</option>
                            <option value="it">Italiano</option>
                        </select>
                    </div>
                    
                    <div class="voice-controls" id="voiceControls" style="display: none;">
                        <label>Velocidade da Voz:</label>
                        <input type="range" id="speechRate" min="0.5" max="2" step="0.1" value="1">
                        <label>Volume:</label>
                        <input type="range" id="speechVolume" min="0" max="1" step="0.1" value="0.8">
                    </div>
                    
                    <div class="panel-actions">
                        <button class="cancel-btn" id="cancelAccessibility">
                            <i class="fas fa-times"></i> Cancelar
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(panel);
    }

    setupEventListeners() {
        const toggle = document.getElementById('accessibilityToggle');
        const menu = document.getElementById('accessibilityMenu');
        const close = document.getElementById('closeAccessibility');
        const screenReader = document.getElementById('screenReader');
        const highContrast = document.getElementById('highContrast');
        const translator = document.getElementById('translator');
        const languageSelector = document.getElementById('languageSelector');
        const targetLanguage = document.getElementById('targetLanguage');
        const cancelBtn = document.getElementById('cancelAccessibility');

        toggle.addEventListener('click', () => {
            menu.classList.toggle('show');
        });

        close.addEventListener('click', () => {
            menu.classList.remove('show');
        });

        screenReader.addEventListener('change', (e) => {
            this.toggleScreenReader(e.target.checked);
        });

        highContrast.addEventListener('change', (e) => {
            this.toggleHighContrast(e.target.checked);
        });

        translator.addEventListener('change', (e) => {
            this.toggleTranslator(e.target.checked);
            languageSelector.style.display = e.target.checked ? 'block' : 'none';
        });

        targetLanguage.addEventListener('change', (e) => {
            this.currentLanguage = e.target.value;
            this.saveSettings();
        });

        cancelBtn.addEventListener('click', () => {
            this.cancelAllSettings();
        });

        // Fechar ao clicar fora
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.accessibility-panel')) {
                menu.classList.remove('show');
            }
        });

        // Atalho de teclado Alt + A
        document.addEventListener('keydown', (e) => {
            if (e.altKey && e.key === 'a') {
                e.preventDefault();
                menu.classList.toggle('show');
            }
        });
    }

    toggleScreenReader(enabled) {
        this.isReaderActive = enabled;
        const voiceControls = document.getElementById('voiceControls');
        voiceControls.style.display = enabled ? 'block' : 'none';

        if (enabled) {
            this.setupScreenReader();
            this.speak('Leitor de tela ativado. Passe o mouse sobre os elementos para ouvi-los.');
        } else {
            this.removeScreenReader();
            this.speechSynthesis.cancel();
        }

        this.saveSettings();
    }

    setupScreenReader() {
        // Adicionar eventos de hover para leitura
        document.addEventListener('mouseover', this.handleMouseOver.bind(this));
        document.addEventListener('focus', this.handleFocus.bind(this), true);
        
        // Ler títulos de seções automaticamente
        const sections = document.querySelectorAll('h1, h2, h3');
        sections.forEach(section => {
            section.setAttribute('tabindex', '0');
        });
    }

    removeScreenReader() {
        document.removeEventListener('mouseover', this.handleMouseOver.bind(this));
        document.removeEventListener('focus', this.handleFocus.bind(this), true);
    }

    handleMouseOver(e) {
        if (!this.isReaderActive) return;

        const element = e.target;
        let textToRead = '';

        if (element.matches('h1, h2, h3, h4, h5, h6')) {
            textToRead = `Título: ${element.textContent}`;
        } else if (element.matches('p')) {
            textToRead = element.textContent.substring(0, 100);
        } else if (element.matches('a')) {
            textToRead = `Link: ${element.textContent}`;
        } else if (element.matches('button')) {
            textToRead = `Botão: ${element.textContent || element.getAttribute('aria-label') || 'sem texto'}`;
        } else if (element.matches('input')) {
            const label = element.previousElementSibling?.textContent || element.placeholder;
            textToRead = `Campo: ${label}`;
        }

        if (textToRead) {
            this.speak(textToRead);
        }
    }

    handleFocus(e) {
        if (!this.isReaderActive) return;
        this.handleMouseOver(e);
    }

    speak(text) {
        if (!this.speechSynthesis) return;

        this.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'pt-BR';
        utterance.rate = parseFloat(document.getElementById('speechRate')?.value || 1);
        utterance.volume = parseFloat(document.getElementById('speechVolume')?.value || 0.8);
        
        this.speechSynthesis.speak(utterance);
    }

    toggleHighContrast(enabled) {
        document.body.classList.toggle('high-contrast', enabled);
        localStorage.setItem('highContrast', enabled);
        this.saveSettings();
    }

    toggleTranslator(enabled) {
        this.isTranslatorActive = enabled;
        
        if (enabled) {
            this.setupTranslator();
        } else {
            this.removeTranslator();
        }
        
        this.saveSettings();
    }

    setupTranslator() {
        // Adicionar botões de tradução em elementos de texto
        const textElements = document.querySelectorAll('h1, h2, h3, p, span:not(.no-translate)');
        
        textElements.forEach(element => {
            if (!element.querySelector('.translate-btn')) {
                const translateBtn = document.createElement('button');
                translateBtn.className = 'translate-btn';
                translateBtn.innerHTML = '<i class="fas fa-language"></i>';
                translateBtn.title = 'Traduzir este texto';
                
                translateBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.translateElement(element);
                });
                
                element.style.position = 'relative';
                element.appendChild(translateBtn);
            }
        });
    }

    removeTranslator() {
        document.querySelectorAll('.translate-btn').forEach(btn => btn.remove());
        document.querySelectorAll('[data-original-text]').forEach(element => {
            element.textContent = element.dataset.originalText;
            delete element.dataset.originalText;
        });
    }

    async translateElement(element) {
        const originalText = element.textContent.replace(/\s*Traduzir este texto\s*/, '').trim();
        
        if (!originalText || element.dataset.originalText) return;
        
        element.dataset.originalText = originalText;
        
        try {
            // Simulação de tradução (em produção, usar API real como Google Translate)
            const translatedText = await this.simulateTranslation(originalText, this.currentLanguage);
            element.textContent = translatedText;
            
            // Re-adicionar botão de tradução
            const translateBtn = document.createElement('button');
            translateBtn.className = 'translate-btn';
            translateBtn.innerHTML = '<i class="fas fa-undo"></i>';
            translateBtn.title = 'Voltar ao original';
            
            translateBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                element.textContent = element.dataset.originalText;
                delete element.dataset.originalText;
                translateBtn.remove();
                this.setupTranslator(); // Re-adicionar botão de tradução
            });
            
            element.appendChild(translateBtn);
            
        } catch (error) {
            console.error('Erro na tradução:', error);
            element.textContent = originalText;
        }
    }

    async simulateTranslation(text, targetLang) {
        // Simulação básica de tradução
        const translations = {
            'en': {
                'Transforme seu Futuro': 'Transform your Future',
                'com Educação': 'with Education',
                'Nossos Cursos': 'Our Courses',
                'Nossos Professores': 'Our Teachers',
                'Entre em Contato': 'Contact Us',
                'Jogos Educativos': 'Educational Games'
            },
            'es': {
                'Transforme seu Futuro': 'Transforma tu Futuro',
                'com Educação': 'con Educación',
                'Nossos Cursos': 'Nuestros Cursos',
                'Nossos Professores': 'Nuestros Profesores',
                'Entre em Contato': 'Contáctanos',
                'Jogos Educativos': 'Juegos Educativos'
            }
        };

        return translations[targetLang]?.[text] || `[${targetLang.toUpperCase()}] ${text}`;
    }

    saveSettings() {
        const settings = {
            screenReader: this.isReaderActive,
            translator: this.isTranslatorActive,
            language: this.currentLanguage,
            highContrast: document.body.classList.contains('high-contrast')
        };
        
        localStorage.setItem('accessibilitySettings', JSON.stringify(settings));
    }

    loadSettings() {
        const settings = JSON.parse(localStorage.getItem('accessibilitySettings') || '{}');
        
        if (settings.screenReader) {
            document.getElementById('screenReader').checked = true;
            this.toggleScreenReader(true);
        }
        
        if (settings.translator) {
            document.getElementById('translator').checked = true;
            document.getElementById('targetLanguage').value = settings.language || 'en';
            this.currentLanguage = settings.language || 'en';
            this.toggleTranslator(true);
        }
        
        if (settings.highContrast) {
            document.getElementById('highContrast').checked = true;
            this.toggleHighContrast(true);
        }
    }

    cancelAllSettings() {
        // Desativar todas as opções
        document.getElementById('screenReader').checked = false;
        document.getElementById('highContrast').checked = false;
        document.getElementById('translator').checked = false;
        
        // Aplicar mudanças
        this.toggleScreenReader(false);
        this.toggleHighContrast(false);
        this.toggleTranslator(false);
        
        // Limpar configurações salvas
        localStorage.removeItem('accessibilitySettings');
        
        // Fechar painel
        document.getElementById('accessibilityMenu').classList.remove('show');
        
        // Feedback visual
        this.showFeedback('Todas as configurações de acessibilidade foram canceladas');
    }

    showFeedback(message) {
        const feedback = document.createElement('div');
        feedback.className = 'accessibility-feedback';
        feedback.textContent = message;
        
        document.body.appendChild(feedback);
        
        setTimeout(() => {
            feedback.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            feedback.classList.remove('show');
            setTimeout(() => feedback.remove(), 300);
        }, 3000);
    }
}

// CSS para sistema de acessibilidade
const accessibilityStyles = `
<style>
.accessibility-panel {
    position: fixed;
    bottom: 20px;
    left: 20px;
    z-index: 10000;
}

.accessibility-toggle {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea, #764ba2);
    border: none;
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
    transition: all 0.3s ease;
    animation: pulse 2s infinite;
}

.accessibility-toggle:hover {
    transform: scale(1.1);
    box-shadow: 0 15px 40px rgba(102, 126, 234, 0.4);
}

.accessibility-menu {
    position: absolute;
    bottom: 70px;
    left: 0;
    width: 320px;
    background: rgba(26, 26, 46, 0.95);
    backdrop-filter: blur(20px);
    border-radius: 15px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    opacity: 0;
    visibility: hidden;
    transform: translateY(20px);
    transition: all 0.3s ease;
}

.accessibility-menu.show {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
}

.accessibility-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.accessibility-header h3 {
    color: white;
    margin: 0;
    font-size: 1.1rem;
}

.close-panel {
    background: none;
    border: none;
    color: rgba(255, 255, 255, 0.7);
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    transition: all 0.3s ease;
}

.close-panel:hover {
    background: rgba(255, 255, 255, 0.1);
    color: white;
}

.accessibility-options {
    padding: 1rem;
}

.option-group {
    margin-bottom: 1rem;
}

.option-label {
    display: flex;
    align-items: center;
    gap: 1rem;
    cursor: pointer;
    padding: 0.8rem;
    border-radius: 8px;
    transition: all 0.3s ease;
}

.option-label:hover {
    background: rgba(255, 255, 255, 0.05);
}

.option-label input[type="checkbox"] {
    display: none;
}

.checkmark {
    width: 20px;
    height: 20px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 4px;
    position: relative;
    transition: all 0.3s ease;
}

.option-label input:checked + .checkmark {
    background: #43e97b;
    border-color: #43e97b;
}

.option-label input:checked + .checkmark::after {
    content: '✓';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-weight: bold;
    font-size: 0.8rem;
}

.option-info {
    flex: 1;
}

.option-info strong {
    display: block;
    color: white;
    margin-bottom: 0.2rem;
}

.option-info small {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.8rem;
}

.language-selector,
.voice-controls {
    margin-top: 1rem;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
}

.language-selector select,
.voice-controls input {
    width: 100%;
    padding: 0.5rem;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 6px;
    color: white;
    margin-bottom: 0.5rem;
}

.voice-controls label {
    color: white;
    font-size: 0.9rem;
    margin-bottom: 0.3rem;
    display: block;
}

.translate-btn {
    position: absolute;
    top: -5px;
    right: -5px;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: rgba(67, 233, 123, 0.9);
    border: none;
    color: white;
    font-size: 0.7rem;
    cursor: pointer;
    opacity: 0;
    transition: all 0.3s ease;
    z-index: 1000;
}

*:hover .translate-btn {
    opacity: 1;
}

.translate-btn:hover {
    background: #43e97b;
    transform: scale(1.1);
}

.panel-actions {
    padding: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    justify-content: center;
}

.cancel-btn {
    background: rgba(255, 107, 107, 0.2);
    border: 1px solid rgba(255, 107, 107, 0.3);
    color: white;
    padding: 0.6rem 1rem;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 500;
    font-size: 0.85rem;
    display: flex;
    align-items: center;
    gap: 0.4rem;
}

.cancel-btn:hover {
    background: rgba(255, 107, 107, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(255, 107, 107, 0.3);
}

.accessibility-feedback {
    position: fixed;
    top: 20px;
    right: 20px;
    background: rgba(26, 26, 46, 0.95);
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
    z-index: 10001;
    transform: translateX(100%);
    opacity: 0;
    transition: all 0.3s ease;
    max-width: 300px;
    font-size: 0.9rem;
}

.accessibility-feedback.show {
    transform: translateX(0);
    opacity: 1;
}

@keyframes pulse {
    0%, 100% {
        box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
    }
    50% {
        box-shadow: 0 10px 30px rgba(102, 126, 234, 0.6);
    }
}

@media (max-width: 768px) {
    .accessibility-menu {
        width: 280px;
        left: -10px;
    }
    
    .accessibility-toggle {
        width: 45px;
        height: 45px;
        font-size: 1.1rem;
    }
    
    .cancel-btn {
        padding: 0.5rem 0.8rem;
        font-size: 0.8rem;
        gap: 0.3rem;
    }
    
    .panel-actions {
        padding: 0.8rem;
    }
}

@media (max-width: 480px) {
    .accessibility-menu {
        width: 260px;
        left: -20px;
    }
    
    .cancel-btn {
        padding: 0.4rem 0.7rem;
        font-size: 0.75rem;
        border-radius: 5px;
    }
    
    .panel-actions {
        padding: 0.8rem;
    }
    
    .accessibility-feedback {
        right: 10px;
        left: 10px;
        max-width: none;
        font-size: 0.8rem;
    }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', accessibilityStyles);

// Inicializar sistema de acessibilidade
document.addEventListener('DOMContentLoaded', () => {
    window.accessibilitySystem = new AccessibilitySystem();
});