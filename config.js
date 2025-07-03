// ===========================
//   CONFIGURAÇÕES AVANÇADAS DO STUDYCONECT+
// ===========================

// Configurações de Performance
const PERFORMANCE_CONFIG = {
    // Lazy loading para imagens
    lazyLoadOffset: 100,
    
    // Debounce para eventos de scroll
    scrollDebounce: 16,
    
    // Throttle para resize
    resizeThrottle: 250,
    
    // Cache de elementos DOM
    enableDOMCache: true,
    
    // Preload de recursos críticos
    preloadCriticalResources: true
};

// Configurações de Animações
const ANIMATION_CONFIG = {
    // Duração padrão das animações
    defaultDuration: 300,
    
    // Easing functions
    easing: {
        smooth: 'cubic-bezier(0.25, 0.8, 0.25, 1)',
        bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        elastic: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    },
    
    // Delays para animações staggered
    staggerDelay: 100,
    
    // Configurações do Intersection Observer
    observerOptions: {
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: '0px 0px -50px 0px'
    }
};

// Configurações de Tema
const THEME_CONFIG = {
    // Cores personalizáveis
    colors: {
        light: {
            primary: '#667eea',
            secondary: '#764ba2',
            accent: '#4facfe',
            success: '#43e97b',
            warning: '#feca57',
            danger: '#ff6b6b',
            background: '#ffffff',
            surface: '#f8f9fa',
            text: '#2c3e50'
        },
        dark: {
            primary: '#667eea',
            secondary: '#764ba2',
            accent: '#4facfe',
            success: '#43e97b',
            warning: '#feca57',
            danger: '#ff6b6b',
            background: '#1a1a2e',
            surface: '#0f3460',
            text: '#ffffff'
        }
    },
    
    // Transições de tema
    transitionDuration: 300,
    
    // Persistência
    savePreference: true,
    storageKey: 'studyconnect-theme'
};

// Configurações de Formulário
const FORM_CONFIG = {
    // Validação em tempo real
    realTimeValidation: true,
    
    // Debounce para validação
    validationDebounce: 300,
    
    // Mensagens de erro personalizadas
    errorMessages: {
        required: 'Este campo é obrigatório',
        email: 'Digite um email válido',
        minLength: 'Mínimo de {min} caracteres',
        maxLength: 'Máximo de {max} caracteres'
    },
    
    // Configurações de envio
    submission: {
        timeout: 10000,
        retryAttempts: 3,
        showLoadingState: true
    }
};

// Configurações de Notificações
const NOTIFICATION_CONFIG = {
    // Posição das notificações
    position: 'top-right',
    
    // Duração padrão
    duration: 5000,
    
    // Máximo de notificações simultâneas
    maxNotifications: 3,
    
    // Tipos de notificação
    types: {
        success: {
            icon: 'fas fa-check-circle',
            color: '#43e97b'
        },
        error: {
            icon: 'fas fa-exclamation-circle',
            color: '#ff6b6b'
        },
        warning: {
            icon: 'fas fa-exclamation-triangle',
            color: '#feca57'
        },
        info: {
            icon: 'fas fa-info-circle',
            color: '#667eea'
        }
    }
};

// Configurações de Particles.js
const PARTICLES_CONFIG = {
    light: {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#667eea" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: false },
            size: { value: 3, random: true },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#667eea",
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out",
                bounce: false
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "repulse" },
                onclick: { enable: true, mode: "push" },
                resize: true
            }
        },
        retina_detect: true
    },
    dark: {
        particles: {
            number: { value: 60, density: { enable: true, value_area: 800 } },
            color: { value: "#764ba2" },
            shape: { type: "circle" },
            opacity: { value: 0.7, random: false },
            size: { value: 4, random: true },
            line_linked: {
                enable: true,
                distance: 120,
                color: "#764ba2",
                opacity: 0.6,
                width: 1.5
            },
            move: {
                enable: true,
                speed: 1.5,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out",
                bounce: false
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "grab" },
                onclick: { enable: true, mode: "push" },
                resize: true
            }
        },
        retina_detect: true
    }
};

// Configurações de Responsividade
const RESPONSIVE_CONFIG = {
    breakpoints: {
        mobile: 480,
        tablet: 768,
        laptop: 1024,
        desktop: 1200,
        wide: 1400
    },
    
    // Configurações específicas por dispositivo
    mobile: {
        particlesCount: 30,
        animationDuration: 200,
        reducedMotion: true
    },
    
    tablet: {
        particlesCount: 50,
        animationDuration: 250,
        reducedMotion: false
    },
    
    desktop: {
        particlesCount: 80,
        animationDuration: 300,
        reducedMotion: false
    }
};

// Configurações de Acessibilidade
const ACCESSIBILITY_CONFIG = {
    // Respeitar preferências do usuário
    respectReducedMotion: true,
    
    // Contraste mínimo
    minContrast: 4.5,
    
    // Tamanho mínimo de toque
    minTouchTarget: 44,
    
    // Foco visível
    focusVisible: true,
    
    // Navegação por teclado
    keyboardNavigation: true,
    
    // Screen reader support
    screenReaderSupport: true
};

// Configurações de SEO
const SEO_CONFIG = {
    // Meta tags dinâmicas
    dynamicMeta: true,
    
    // Structured data
    structuredData: true,
    
    // Open Graph
    openGraph: {
        title: 'StudyConect+ | Plataforma de Estudos Profissional',
        description: 'Transforme seu futuro com educação digital de qualidade',
        image: 'images/og-image.jpg',
        url: 'https://studyconnect.com'
    },
    
    // Twitter Card
    twitterCard: {
        card: 'summary_large_image',
        site: '@studyconnect',
        title: 'StudyConect+ | Educação Digital',
        description: 'Cursos profissionais para acelerar sua carreira'
    }
};

// Configurações de Analytics
const ANALYTICS_CONFIG = {
    // Google Analytics
    googleAnalytics: {
        enabled: false,
        trackingId: 'GA_TRACKING_ID'
    },
    
    // Eventos personalizados
    customEvents: {
        courseView: 'course_view',
        teacherView: 'teacher_view',
        contactForm: 'contact_form_submit',
        themeToggle: 'theme_toggle'
    },
    
    // Heatmaps
    heatmaps: {
        enabled: false,
        provider: 'hotjar'
    }
};

// Configurações de Cache
const CACHE_CONFIG = {
    // Service Worker
    serviceWorker: {
        enabled: false,
        cacheName: 'studyconnect-v1',
        cacheFirst: ['images/', 'fonts/', 'icons/'],
        networkFirst: ['api/', 'data/']
    },
    
    // Local Storage
    localStorage: {
        maxSize: 5 * 1024 * 1024, // 5MB
        compression: true,
        encryption: false
    },
    
    // Session Storage
    sessionStorage: {
        enabled: true,
        prefix: 'sc_'
    }
};

// Configurações de Desenvolvimento
const DEV_CONFIG = {
    // Debug mode
    debug: false,
    
    // Console logs
    enableLogs: false,
    
    // Performance monitoring
    performanceMonitoring: false,
    
    // Error tracking
    errorTracking: {
        enabled: false,
        service: 'sentry'
    }
};

// Exportar configurações
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        PERFORMANCE_CONFIG,
        ANIMATION_CONFIG,
        THEME_CONFIG,
        FORM_CONFIG,
        NOTIFICATION_CONFIG,
        PARTICLES_CONFIG,
        RESPONSIVE_CONFIG,
        ACCESSIBILITY_CONFIG,
        SEO_CONFIG,
        ANALYTICS_CONFIG,
        CACHE_CONFIG,
        DEV_CONFIG
    };
} else {
    // Browser environment
    window.StudyConnectConfig = {
        PERFORMANCE_CONFIG,
        ANIMATION_CONFIG,
        THEME_CONFIG,
        FORM_CONFIG,
        NOTIFICATION_CONFIG,
        PARTICLES_CONFIG,
        RESPONSIVE_CONFIG,
        ACCESSIBILITY_CONFIG,
        SEO_CONFIG,
        ANALYTICS_CONFIG,
        CACHE_CONFIG,
        DEV_CONFIG
    };
}

// Função para aplicar configurações dinamicamente
function applyConfig(configName, newConfig) {
    if (window.StudyConnectConfig && window.StudyConnectConfig[configName]) {
        Object.assign(window.StudyConnectConfig[configName], newConfig);
        
        // Disparar evento de configuração atualizada
        window.dispatchEvent(new CustomEvent('configUpdated', {
            detail: { configName, newConfig }
        }));
    }
}

// Função para obter configuração atual
function getConfig(configName) {
    return window.StudyConnectConfig ? window.StudyConnectConfig[configName] : null;
}

// Função para detectar capacidades do dispositivo
function detectDeviceCapabilities() {
    const capabilities = {
        // Suporte a animações
        supportsAnimations: !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        
        // Suporte a hover
        supportsHover: window.matchMedia('(hover: hover)').matches,
        
        // Tipo de dispositivo
        isMobile: window.innerWidth <= RESPONSIVE_CONFIG.breakpoints.mobile,
        isTablet: window.innerWidth <= RESPONSIVE_CONFIG.breakpoints.tablet,
        isDesktop: window.innerWidth > RESPONSIVE_CONFIG.breakpoints.tablet,
        
        // Capacidades de performance
        hasHighPerformance: navigator.hardwareConcurrency >= 4,
        hasGoodConnection: navigator.connection ? navigator.connection.effectiveType === '4g' : true,
        
        // Suporte a recursos modernos
        supportsIntersectionObserver: 'IntersectionObserver' in window,
        supportsWebP: false, // Será detectado dinamicamente
        supportsBackdropFilter: CSS.supports('backdrop-filter', 'blur(10px)'),
        
        // Preferências do usuário
        prefersDarkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
        prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
    };
    
    // Detectar suporte a WebP
    const webpTest = new Image();
    webpTest.onload = webpTest.onerror = function() {
        capabilities.supportsWebP = webpTest.height === 2;
    };
    webpTest.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    
    return capabilities;
}

// Função para otimizar configurações baseado no dispositivo
function optimizeForDevice() {
    const capabilities = detectDeviceCapabilities();
    
    // Ajustar configurações de performance
    if (!capabilities.hasHighPerformance) {
        PARTICLES_CONFIG.light.particles.number.value = 40;
        PARTICLES_CONFIG.dark.particles.number.value = 30;
        ANIMATION_CONFIG.defaultDuration = 200;
    }
    
    // Ajustar para dispositivos móveis
    if (capabilities.isMobile) {
        Object.assign(PARTICLES_CONFIG.light.particles.number, { value: 20 });
        Object.assign(PARTICLES_CONFIG.dark.particles.number, { value: 15 });
        ANIMATION_CONFIG.defaultDuration = 150;
    }
    
    // Respeitar preferências de movimento reduzido
    if (capabilities.prefersReducedMotion) {
        ANIMATION_CONFIG.defaultDuration = 0;
        PARTICLES_CONFIG.light.particles.move.enable = false;
        PARTICLES_CONFIG.dark.particles.move.enable = false;
    }
    
    // Aplicar tema preferido
    if (capabilities.prefersDarkMode && !localStorage.getItem(THEME_CONFIG.storageKey)) {
        document.body.classList.add('dark-mode');
        localStorage.setItem(THEME_CONFIG.storageKey, 'dark');
    }
}

// Inicializar otimizações quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', optimizeForDevice);
} else {
    optimizeForDevice();
}

// Exportar funções utilitárias
window.StudyConnectUtils = {
    applyConfig,
    getConfig,
    detectDeviceCapabilities,
    optimizeForDevice
};