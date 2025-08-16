// ===========================
//   CONFIGURAÇÃO DE ANIMAÇÕES
// ===========================

const AnimationConfig = {
    // Configurações gerais
    enabled: true,
    duration: {
        fast: 200,
        normal: 300,
        slow: 500
    },
    
    // Configurações por tipo de dispositivo
    mobile: {
        enabled: true,
        reducedMotion: true,
        duration: {
            fast: 150,
            normal: 200,
            slow: 300
        }
    },
    
    lowEnd: {
        enabled: true,
        reducedMotion: true,
        duration: {
            fast: 100,
            normal: 150,
            slow: 200
        }
    },
    
    // Configurações de easing
    easing: {
        default: 'cubic-bezier(0.4, 0, 0.2, 1)',
        bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    },
    
    // Configurações de threshold para Intersection Observer
    observer: {
        threshold: [0.1, 0.3, 0.5],
        rootMargin: '0px 0px -50px 0px'
    },
    
    // Configurações específicas por seção
    sections: {
        hero: {
            staggerDelay: 100,
            duration: 800
        },
        courses: {
            staggerDelay: 150,
            duration: 600
        },
        teachers: {
            staggerDelay: 150,
            duration: 600
        },
        contact: {
            staggerDelay: 100,
            duration: 500
        }
    },
    
    // Configurações de hover
    hover: {
        enabled: true,
        duration: 300,
        scale: 1.02,
        translateY: -8
    },
    
    // Configurações de loading
    loading: {
        duration: 800,
        fadeOut: 500
    }
};

// Função para aplicar configurações baseadas no dispositivo
function applyDeviceConfig() {
    const isMobile = window.innerWidth <= 768;
    const isLowEnd = navigator.hardwareConcurrency <= 2 || navigator.deviceMemory <= 2;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    let config = AnimationConfig;
    
    if (prefersReducedMotion) {
        config.enabled = false;
        return config;
    }
    
    if (isLowEnd) {
        config = { ...config, ...AnimationConfig.lowEnd };
    } else if (isMobile) {
        config = { ...config, ...AnimationConfig.mobile };
    }
    
    return config;
}

// Função para criar CSS dinâmico baseado na configuração
function createDynamicCSS(config) {
    const css = `
        :root {
            --animation-duration-fast: ${config.duration.fast}ms;
            --animation-duration-normal: ${config.duration.normal}ms;
            --animation-duration-slow: ${config.duration.slow}ms;
            --animation-easing: ${config.easing.default};
        }
        
        .fade-in-up {
            animation-duration: var(--animation-duration-normal);
            animation-timing-function: var(--animation-easing);
        }
        
        .card-entrance {
            transition-duration: var(--animation-duration-normal);
            transition-timing-function: var(--animation-easing);
        }
        
        .hover-lift:hover {
            transform: translateY(${-config.hover.translateY}px) scale(${config.hover.scale});
            transition-duration: ${config.hover.duration}ms;
        }
        
        ${!config.enabled ? `
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                transition-duration: 0.01ms !important;
            }
        ` : ''}
    `;
    
    const style = document.createElement('style');
    style.id = 'dynamic-animation-config';
    style.textContent = css;
    
    // Remover configuração anterior se existir
    const existing = document.getElementById('dynamic-animation-config');
    if (existing) {
        existing.remove();
    }
    
    document.head.appendChild(style);
}

// Função para inicializar configurações
function initAnimationConfig() {
    const config = applyDeviceConfig();
    createDynamicCSS(config);
    
    // Salvar configuração globalmente
    window.animationConfig = config;
    
    return config;
}

// Função para atualizar configurações em tempo real
function updateAnimationConfig(newConfig) {
    const config = { ...window.animationConfig, ...newConfig };
    createDynamicCSS(config);
    window.animationConfig = config;
}

// Função para desabilitar animações
function disableAnimations() {
    updateAnimationConfig({ enabled: false });
}

// Função para habilitar animações
function enableAnimations() {
    updateAnimationConfig({ enabled: true });
}

// Função para alternar animações
function toggleAnimations() {
    const enabled = !window.animationConfig.enabled;
    updateAnimationConfig({ enabled });
    return enabled;
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    initAnimationConfig();
    
    // Reagir a mudanças de tamanho da tela
    window.addEventListener('resize', () => {
        setTimeout(() => {
            initAnimationConfig();
        }, 100);
    });
    
    // Reagir a mudanças de preferência de movimento
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    mediaQuery.addListener(() => {
        initAnimationConfig();
    });
});

// Exportar para uso global
window.AnimationConfig = AnimationConfig;
window.initAnimationConfig = initAnimationConfig;
window.updateAnimationConfig = updateAnimationConfig;
window.disableAnimations = disableAnimations;
window.enableAnimations = enableAnimations;
window.toggleAnimations = toggleAnimations;