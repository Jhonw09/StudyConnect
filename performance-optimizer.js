// ===========================
//   OTIMIZADOR DE PERFORMANCE
// ===========================

class PerformanceOptimizer {
    constructor() {
        this.isLowEndDevice = this.detectLowEndDevice();
        this.prefersReducedMotion = this.checkReducedMotion();
        this.init();
    }

    init() {
        this.optimizeForDevice();
        this.setupPerformanceMonitoring();
        this.optimizeImages();
        this.optimizeAnimations();
        this.setupIntersectionObserver();
    }

    // ===========================
    //   DETECÇÃO DE DISPOSITIVO
    // ===========================
    detectLowEndDevice() {
        // Verificar hardware
        const hardwareConcurrency = navigator.hardwareConcurrency || 2;
        const deviceMemory = navigator.deviceMemory || 2;
        
        // Verificar conexão
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        const slowConnection = connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g');
        
        // Verificar user agent para dispositivos móveis antigos
        const isOldMobile = /Android [1-4]|iPhone OS [1-9]_|iPad.*OS [1-9]_/.test(navigator.userAgent);
        
        return hardwareConcurrency <= 2 || deviceMemory <= 2 || slowConnection || isOldMobile;
    }

    checkReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    // ===========================
    //   OTIMIZAÇÕES POR DISPOSITIVO
    // ===========================
    optimizeForDevice() {
        if (this.isLowEndDevice || this.prefersReducedMotion) {
            this.applyLowEndOptimizations();
        }

        // Otimizações específicas para mobile
        if (window.innerWidth <= 768) {
            this.applyMobileOptimizations();
        }
    }

    applyLowEndOptimizations() {
        const style = document.createElement('style');
        style.textContent = `
            /* Reduzir animações para dispositivos lentos */
            *, *::before, *::after {
                animation-duration: 0.2s !important;
                transition-duration: 0.2s !important;
            }
            
            /* Desabilitar efeitos pesados */
            .floating-cards,
            #particles-js,
            .logo-glow,
            .image-glow {
                display: none !important;
            }
            
            /* Simplificar sombras */
            .course-card,
            .teacher-card {
                box-shadow: 0 2px 8px rgba(0,0,0,0.1) !important;
            }
            
            /* Desabilitar transformações 3D */
            .course-card:hover,
            .teacher-card:hover {
                transform: translateY(-3px) !important;
            }
        `;
        document.head.appendChild(style);
    }

    applyMobileOptimizations() {
        const style = document.createElement('style');
        style.textContent = `
            /* Otimizações para mobile */
            .course-card,
            .teacher-card {
                will-change: auto;
                backface-visibility: visible;
            }
            
            /* Reduzir blur effects */
            header {
                backdrop-filter: none !important;
                background: rgba(255, 255, 255, 0.95) !important;
            }
            
            body.dark-mode header {
                background: rgba(26, 26, 46, 0.95) !important;
            }
        `;
        document.head.appendChild(style);
    }

    // ===========================
    //   MONITORAMENTO DE PERFORMANCE
    // ===========================
    setupPerformanceMonitoring() {
        // Monitorar FPS
        this.monitorFPS();
        
        // Monitorar uso de memória
        if ('memory' in performance) {
            this.monitorMemory();
        }
        
        // Monitorar long tasks
        if ('PerformanceObserver' in window) {
            this.monitorLongTasks();
        }
    }

    monitorFPS() {
        let lastTime = performance.now();
        let frames = 0;
        let fps = 60;

        const measureFPS = (currentTime) => {
            frames++;
            if (currentTime >= lastTime + 1000) {
                fps = Math.round((frames * 1000) / (currentTime - lastTime));
                frames = 0;
                lastTime = currentTime;
                
                // Se FPS baixo, aplicar otimizações
                if (fps < 30 && !this.isLowEndDevice) {
                    this.applyLowEndOptimizations();
                    this.isLowEndDevice = true;
                }
            }
            requestAnimationFrame(measureFPS);
        };

        requestAnimationFrame(measureFPS);
    }

    monitorMemory() {
        setInterval(() => {
            const memory = performance.memory;
            const usedMB = memory.usedJSHeapSize / 1048576;
            const limitMB = memory.jsHeapSizeLimit / 1048576;
            
            // Se uso de memória alto, limpar recursos
            if (usedMB / limitMB > 0.8) {
                this.cleanupResources();
            }
        }, 10000);
    }

    monitorLongTasks() {
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.duration > 50) {
                    console.warn('Long task detected:', entry.duration + 'ms');
                    // Aplicar otimizações se muitas long tasks
                    this.longTaskCount = (this.longTaskCount || 0) + 1;
                    if (this.longTaskCount > 5) {
                        this.applyLowEndOptimizations();
                    }
                }
            }
        });
        
        observer.observe({ entryTypes: ['longtask'] });
    }

    // ===========================
    //   OTIMIZAÇÃO DE IMAGENS
    // ===========================
    optimizeImages() {
        // Lazy loading para imagens
        if ('IntersectionObserver' in window) {
            this.setupLazyLoading();
        }
        
        // Otimizar qualidade baseado na conexão
        this.optimizeImageQuality();
    }

    setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px'
        });

        images.forEach(img => imageObserver.observe(img));
    }

    optimizeImageQuality() {
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        
        if (connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g')) {
            // Reduzir qualidade das imagens para conexões lentas
            const images = document.querySelectorAll('img');
            images.forEach(img => {
                if (img.src && !img.dataset.optimized) {
                    // Adicionar parâmetros de otimização se usando um CDN
                    img.dataset.optimized = 'true';
                }
            });
        }
    }

    // ===========================
    //   OTIMIZAÇÃO DE ANIMAÇÕES
    // ===========================
    optimizeAnimations() {
        // Pausar animações quando fora da viewport
        this.setupAnimationPausing();
        
        // Reduzir animações baseado na bateria
        if ('getBattery' in navigator) {
            this.optimizeForBattery();
        }
    }

    setupAnimationPausing() {
        const animatedElements = document.querySelectorAll('[class*="animate"], [class*="animation"]');
        
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                } else {
                    entry.target.style.animationPlayState = 'paused';
                }
            });
        });

        animatedElements.forEach(el => animationObserver.observe(el));
    }

    async optimizeForBattery() {
        try {
            const battery = await navigator.getBattery();
            
            const checkBattery = () => {
                if (battery.level < 0.2 || !battery.charging) {
                    // Bateria baixa - reduzir animações
                    this.applyLowEndOptimizations();
                }
            };
            
            battery.addEventListener('levelchange', checkBattery);
            battery.addEventListener('chargingchange', checkBattery);
            checkBattery();
        } catch (error) {
            console.log('Battery API not supported');
        }
    }

    // ===========================
    //   INTERSECTION OBSERVER OTIMIZADO
    // ===========================
    setupIntersectionObserver() {
        // Observer otimizado para elementos que entram na viewport
        const observerOptions = {
            threshold: [0, 0.1, 0.5],
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const element = entry.target;
                
                if (entry.isIntersecting) {
                    // Elemento visível - ativar animações
                    element.classList.add('in-viewport');
                    
                    // Aplicar animação baseada na classe
                    if (element.classList.contains('fade-in-up')) {
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                    }
                    
                    if (element.classList.contains('scale-in')) {
                        element.style.opacity = '1';
                        element.style.transform = 'scale(1)';
                    }
                    
                    // Desconectar após animar (performance)
                    observer.unobserve(element);
                } else {
                    element.classList.remove('in-viewport');
                }
            });
        }, observerOptions);

        // Observar elementos com classes de animação
        const elementsToObserve = document.querySelectorAll(`
            .fade-in-up,
            .fade-in-down,
            .fade-in-left,
            .fade-in-right,
            .scale-in,
            .section-transition,
            .card-entrance,
            .scroll-reveal
        `);

        elementsToObserve.forEach(el => {
            // Preparar elemento para animação
            if (el.classList.contains('fade-in-up')) {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            }
            
            if (el.classList.contains('scale-in')) {
                el.style.opacity = '0';
                el.style.transform = 'scale(0.8)';
                el.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            }
            
            observer.observe(el);
        });
    }

    // ===========================
    //   LIMPEZA DE RECURSOS
    // ===========================
    cleanupResources() {
        // Limpar event listeners não utilizados
        this.cleanupEventListeners();
        
        // Limpar elementos DOM desnecessários
        this.cleanupDOM();
        
        // Forçar garbage collection se disponível
        if (window.gc) {
            window.gc();
        }
    }

    cleanupEventListeners() {
        // Remover listeners de elementos que não estão mais visíveis
        const hiddenElements = document.querySelectorAll('[style*="display: none"]');
        hiddenElements.forEach(el => {
            const newEl = el.cloneNode(true);
            el.parentNode.replaceChild(newEl, el);
        });
    }

    cleanupDOM() {
        // Remover elementos temporários
        const tempElements = document.querySelectorAll('.temp, .temporary, [data-temp="true"]');
        tempElements.forEach(el => el.remove());
        
        // Limpar cache de imagens não utilizadas
        const unusedImages = document.querySelectorAll('img[data-loaded="false"]');
        unusedImages.forEach(img => {
            if (!this.isElementVisible(img)) {
                img.src = '';
            }
        });
    }

    isElementVisible(element) {
        const rect = element.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
    }

    // ===========================
    //   MÉTODOS PÚBLICOS
    // ===========================
    enableHighPerformanceMode() {
        this.applyLowEndOptimizations();
        this.applyMobileOptimizations();
    }

    disableAnimations() {
        const style = document.createElement('style');
        style.id = 'disable-animations';
        style.textContent = `
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `;
        document.head.appendChild(style);
    }

    enableAnimations() {
        const disableStyle = document.getElementById('disable-animations');
        if (disableStyle) {
            disableStyle.remove();
        }
    }

    getPerformanceMetrics() {
        return {
            isLowEndDevice: this.isLowEndDevice,
            prefersReducedMotion: this.prefersReducedMotion,
            memory: performance.memory ? {
                used: Math.round(performance.memory.usedJSHeapSize / 1048576),
                total: Math.round(performance.memory.totalJSHeapSize / 1048576),
                limit: Math.round(performance.memory.jsHeapSizeLimit / 1048576)
            } : null,
            connection: navigator.connection ? {
                effectiveType: navigator.connection.effectiveType,
                downlink: navigator.connection.downlink
            } : null
        };
    }
}

// ===========================
//   INICIALIZAÇÃO
// ===========================
let performanceOptimizer;

document.addEventListener('DOMContentLoaded', () => {
    performanceOptimizer = new PerformanceOptimizer();
});

// Export para uso global
window.PerformanceOptimizer = PerformanceOptimizer;
window.performanceOptimizer = performanceOptimizer;