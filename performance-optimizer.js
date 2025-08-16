// ===========================
//   OTIMIZADOR DE PERFORMANCE
// ===========================

class PerformanceOptimizer {
    constructor() {
        this.imageObserver = null;
        this.init();
    }

    init() {
        this.setupLazyLoading();
        this.setupLoadingSkeletons();
        this.preloadCriticalResources();
        this.optimizeAnimations();
    }

    setupLazyLoading() {
        // Lazy loading apenas para imagens com data-src (novas imagens)
        this.imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadImage(entry.target);
                    this.imageObserver.unobserve(entry.target);
                }
            });
        }, { rootMargin: '50px' });

        // Observar apenas imagens com data-src (não afetar imagens existentes)
        document.querySelectorAll('img[data-src]').forEach(img => {
            this.imageObserver.observe(img);
        });

        // Garantir que imagens existentes estejam visíveis
        document.querySelectorAll('img:not([data-src])').forEach(img => {
            img.style.opacity = '1';
            img.classList.add('loaded');
        });

        // Lazy loading para seções
        this.setupSectionLazyLoading();
    }

    loadImage(img) {
        // Criar skeleton enquanto carrega
        const skeleton = this.createImageSkeleton(img);
        img.parentNode.insertBefore(skeleton, img);

        img.src = img.dataset.src;
        img.onload = () => {
            img.classList.add('loaded');
            skeleton.remove();
        };
        img.onerror = () => {
            skeleton.remove();
            img.src = '/images/placeholder.jpg'; // Fallback
        };
    }

    createImageSkeleton(img) {
        const skeleton = document.createElement('div');
        skeleton.className = 'image-skeleton';
        skeleton.style.cssText = `
            width: ${img.offsetWidth || 300}px;
            height: ${img.offsetHeight || 200}px;
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: shimmer 1.5s infinite;
            border-radius: 8px;
        `;
        return skeleton;
    }

    setupSectionLazyLoading() {
        const sections = document.querySelectorAll('.lazy-section');
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadSection(entry.target);
                    sectionObserver.unobserve(entry.target);
                }
            });
        }, { rootMargin: '100px' });

        sections.forEach(section => sectionObserver.observe(section));
    }

    loadSection(section) {
        const content = section.dataset.content;
        if (content) {
            // Simular carregamento de conteúdo dinâmico
            setTimeout(() => {
                section.innerHTML = this.generateSectionContent(content);
                section.classList.add('loaded');
            }, 300);
        }
    }

    setupLoadingSkeletons() {
        // Adicionar skeletons para cards de curso
        this.addSkeletonsToCards();
        
        // Skeleton para estatísticas
        this.addSkeletonsToStats();
    }

    addSkeletonsToCards() {
        const courseCards = document.querySelectorAll('.course-card');
        courseCards.forEach(card => {
            if (!card.classList.contains('skeleton-added')) {
                const skeleton = this.createCardSkeleton();
                card.appendChild(skeleton);
                card.classList.add('skeleton-added');
                
                // Remover skeleton após carregamento
                setTimeout(() => {
                    skeleton.classList.add('fade-out');
                    setTimeout(() => skeleton.remove(), 300);
                }, 1000);
            }
        });
    }

    createCardSkeleton() {
        const skeleton = document.createElement('div');
        skeleton.className = 'card-skeleton';
        skeleton.innerHTML = `
            <div class="skeleton-image"></div>
            <div class="skeleton-content">
                <div class="skeleton-title"></div>
                <div class="skeleton-text"></div>
                <div class="skeleton-text short"></div>
                <div class="skeleton-footer">
                    <div class="skeleton-price"></div>
                    <div class="skeleton-rating"></div>
                </div>
            </div>
        `;
        return skeleton;
    }

    addSkeletonsToStats() {
        const stats = document.querySelectorAll('.stat-number');
        stats.forEach(stat => {
            const skeleton = document.createElement('div');
            skeleton.className = 'stat-skeleton';
            stat.parentNode.insertBefore(skeleton, stat);
            
            setTimeout(() => {
                skeleton.remove();
                stat.style.opacity = '1';
            }, 800);
        });
    }

    preloadCriticalResources() {
        // Preload de fontes críticas
        const fonts = [
            'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap',
            'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap'
        ];

        fonts.forEach(font => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'style';
            link.href = font;
            document.head.appendChild(link);
        });

        // Preload de imagens críticas
        const criticalImages = [
            '/images/hero-bg.jpg',
            '/images/logo.png'
        ];

        criticalImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }

    optimizeAnimations() {
        // Reduzir animações se o usuário preferir
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.documentElement.style.setProperty('--animation-duration', '0.01s');
            return;
        }

        // Pausar animações quando não visível
        document.addEventListener('visibilitychange', () => {
            const animations = document.querySelectorAll('.animated');
            if (document.hidden) {
                animations.forEach(el => el.style.animationPlayState = 'paused');
            } else {
                animations.forEach(el => el.style.animationPlayState = 'running');
            }
        });
    }

    // Debounce para eventos de scroll/resize
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Throttle para eventos frequentes
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    generateSectionContent(type) {
        const templates = {
            courses: `
                <div class="course-grid">
                    ${Array(6).fill().map(() => `
                        <div class="course-card fade-in">
                            <div class="course-image">
                                <img data-src="/images/course-${Math.floor(Math.random() * 5) + 1}.jpg" alt="Curso">
                            </div>
                            <div class="course-content">
                                <h3>Curso Dinâmico</h3>
                                <p>Conteúdo carregado dinamicamente</p>
                                <div class="course-meta">
                                    <span class="price">R$ 99</span>
                                    <span class="rating">⭐ 4.8</span>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `,
            testimonials: `
                <div class="testimonial-grid">
                    ${Array(3).fill().map(() => `
                        <div class="testimonial-card fade-in">
                            <p>"Conteúdo excelente, recomendo!"</p>
                            <div class="testimonial-author">
                                <img data-src="/images/avatar-${Math.floor(Math.random() * 3) + 1}.jpg" alt="Avatar">
                                <span>Usuário Satisfeito</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `
        };
        return templates[type] || '<p>Conteúdo carregado!</p>';
    }
}

// CSS para skeletons e otimizações
const performanceStyles = `
<style>
@keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
}

.image-skeleton {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
}

.card-skeleton {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 15px;
    padding: 1rem;
    z-index: 1;
}

.skeleton-image {
    width: 100%;
    height: 150px;
    background: linear-gradient(90deg, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 10px;
    margin-bottom: 1rem;
}

.skeleton-content {
    padding: 0.5rem 0;
}

.skeleton-title {
    height: 20px;
    background: linear-gradient(90deg, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 4px;
    margin-bottom: 0.8rem;
    width: 80%;
}

.skeleton-text {
    height: 14px;
    background: linear-gradient(90deg, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 4px;
    margin-bottom: 0.5rem;
}

.skeleton-text.short {
    width: 60%;
}

.skeleton-footer {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
}

.skeleton-price,
.skeleton-rating {
    height: 16px;
    width: 60px;
    background: linear-gradient(90deg, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 4px;
}

.stat-skeleton {
    height: 40px;
    width: 80px;
    background: linear-gradient(90deg, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 8px;
    margin: 0 auto;
}

.fade-out {
    opacity: 0;
    transition: opacity 0.3s ease;
}

.fade-in {
    animation: fadeInUp 0.6s ease forwards;
}

img[data-src] {
    transition: opacity 0.3s ease;
    opacity: 0;
}

img[data-src].loaded,
img:not([data-src]) {
    opacity: 1;
}

.lazy-section {
    min-height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 15px;
    margin: 2rem 0;
}

.lazy-section:not(.loaded)::before {
    content: 'Carregando...';
    color: rgba(255, 255, 255, 0.6);
    font-style: italic;
}

/* Otimizações para animações */
.will-change-transform {
    will-change: transform;
}

.will-change-opacity {
    will-change: opacity;
}

/* GPU acceleration */
.gpu-accelerated {
    transform: translateZ(0);
    backface-visibility: hidden;
    perspective: 1000px;
}

@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', performanceStyles);

// Inicializar otimizador
document.addEventListener('DOMContentLoaded', () => {
    window.performanceOptimizer = new PerformanceOptimizer();
});