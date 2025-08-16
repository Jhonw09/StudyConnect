// ===========================
//   SISTEMA DE ANIMAÇÕES FLUIDAS
// ===========================

class SmoothAnimations {
    constructor() {
        this.observers = new Map();
        this.animationQueue = [];
        this.isAnimating = false;
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupScrollAnimations();
        this.setupHoverEffects();
        this.setupTextAnimations();
        this.setupButtonAnimations();
        this.setupFormAnimations();
        this.optimizePerformance();
    }

    // ===========================
    //   INTERSECTION OBSERVER
    // ===========================
    setupIntersectionObserver() {
        const options = {
            threshold: [0.1, 0.3, 0.5],
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target, entry.intersectionRatio);
                }
            });
        }, options);

        // Observar elementos com classes de animação
        const animatedElements = document.querySelectorAll(`
            .section-transition,
            .card-entrance,
            .scroll-reveal,
            .stagger-animation,
            .text-reveal,
            .fade-in-up,
            .fade-in-down,
            .fade-in-left,
            .fade-in-right,
            .scale-in
        `);

        animatedElements.forEach(el => {
            observer.observe(el);
        });

        this.observers.set('main', observer);
    }

    animateElement(element, ratio) {
        if (element.classList.contains('animated')) return;

        const animationType = this.getAnimationType(element);
        const delay = this.calculateDelay(element);

        setTimeout(() => {
            this.applyAnimation(element, animationType);
        }, delay);
    }

    getAnimationType(element) {
        const classes = element.classList;
        
        if (classes.contains('section-transition')) return 'section';
        if (classes.contains('card-entrance')) return 'card';
        if (classes.contains('stagger-animation')) return 'stagger';
        if (classes.contains('text-reveal')) return 'text';
        if (classes.contains('fade-in-up')) return 'fadeUp';
        if (classes.contains('fade-in-down')) return 'fadeDown';
        if (classes.contains('fade-in-left')) return 'fadeLeft';
        if (classes.contains('fade-in-right')) return 'fadeRight';
        if (classes.contains('scale-in')) return 'scale';
        
        return 'default';
    }

    calculateDelay(element) {
        const index = Array.from(element.parentNode.children).indexOf(element);
        return Math.min(index * 100, 500); // Max 500ms delay
    }

    applyAnimation(element, type) {
        element.classList.add('animated');
        
        switch (type) {
            case 'section':
                element.classList.add('visible');
                break;
            case 'card':
                element.classList.add('visible');
                this.addHoverEffects(element);
                break;
            case 'stagger':
                this.animateStaggered(element);
                break;
            case 'text':
                this.animateText(element);
                break;
            default:
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
        }
    }

    // ===========================
    //   ANIMAÇÕES ESPECÍFICAS
    // ===========================
    animateStaggered(container) {
        const children = container.children;
        container.classList.add('visible');
        
        Array.from(children).forEach((child, index) => {
            setTimeout(() => {
                child.style.opacity = '1';
                child.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    animateText(element) {
        const text = element.textContent;
        element.innerHTML = '';
        
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.opacity = '0';
            span.style.transform = 'translateY(20px)';
            span.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            span.style.transitionDelay = `${index * 50}ms`;
            element.appendChild(span);
            
            setTimeout(() => {
                span.style.opacity = '1';
                span.style.transform = 'translateY(0)';
            }, 100);
        });
    }

    // ===========================
    //   SCROLL ANIMATIONS
    // ===========================
    setupScrollAnimations() {
        let ticking = false;
        
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.updateScrollAnimations();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    updateScrollAnimations() {
        const scrollY = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        // Parallax effects
        const parallaxElements = document.querySelectorAll('.parallax');
        parallaxElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const speed = el.dataset.speed || 0.5;
            const yPos = -(scrollY * speed);
            el.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });

        // Header background opacity
        const header = document.querySelector('header');
        if (header) {
            const opacity = Math.min(scrollY / 100, 0.98);
            header.style.backgroundColor = `rgba(255, 255, 255, ${opacity})`;
            
            if (document.body.classList.contains('dark-mode')) {
                header.style.backgroundColor = `rgba(26, 26, 46, ${opacity})`;
            }
        }

        // Progress bar
        this.updateProgressBar();
    }

    updateProgressBar() {
        const progressBar = document.getElementById('scrollProgressBar');
        if (progressBar) {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = `${scrollPercent}%`;
        }
    }

    // ===========================
    //   HOVER EFFECTS
    // ===========================
    setupHoverEffects() {
        const hoverElements = document.querySelectorAll('.hover-lift, .hover-scale, .hover-glow');
        
        hoverElements.forEach(el => {
            this.addHoverEffects(el);
        });
    }

    addHoverEffects(element) {
        let isHovering = false;
        
        element.addEventListener('mouseenter', () => {
            if (!isHovering) {
                isHovering = true;
                this.animateHover(element, true);
            }
        });
        
        element.addEventListener('mouseleave', () => {
            if (isHovering) {
                isHovering = false;
                this.animateHover(element, false);
            }
        });

        // Touch support for mobile
        element.addEventListener('touchstart', () => {
            this.animateHover(element, true);
        });
        
        element.addEventListener('touchend', () => {
            setTimeout(() => this.animateHover(element, false), 150);
        });
    }

    animateHover(element, isEntering) {
        if (element.classList.contains('hover-lift')) {
            if (isEntering) {
                element.style.transform = 'translateY(-8px) scale(1.02)';
                element.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
            } else {
                element.style.transform = 'translateY(0) scale(1)';
                element.style.boxShadow = '';
            }
        }
        
        if (element.classList.contains('hover-scale')) {
            element.style.transform = isEntering ? 'scale(1.05)' : 'scale(1)';
        }
        
        if (element.classList.contains('hover-glow')) {
            element.style.boxShadow = isEntering ? 
                '0 0 30px rgba(102, 126, 234, 0.4)' : '';
        }
    }

    // ===========================
    //   BUTTON ANIMATIONS
    // ===========================
    setupButtonAnimations() {
        const buttons = document.querySelectorAll('.btn, button');
        
        buttons.forEach(btn => {
            this.addButtonEffects(btn);
        });
    }

    addButtonEffects(button) {
        // Ripple effect
        button.addEventListener('click', (e) => {
            this.createRipple(e, button);
        });

        // Loading state animation
        if (button.classList.contains('btn-contact')) {
            this.setupLoadingAnimation(button);
        }
    }

    createRipple(event, button) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    setupLoadingAnimation(button) {
        const originalText = button.innerHTML;
        
        button.addEventListener('loading-start', () => {
            button.innerHTML = `
                <i class="fas fa-spinner fa-spin"></i>
                <span>Enviando...</span>
            `;
            button.disabled = true;
        });
        
        button.addEventListener('loading-end', () => {
            button.innerHTML = originalText;
            button.disabled = false;
        });
    }

    // ===========================
    //   FORM ANIMATIONS
    // ===========================
    setupFormAnimations() {
        const formInputs = document.querySelectorAll('input, textarea, select');
        
        formInputs.forEach(input => {
            this.addFormEffects(input);
        });
    }

    addFormEffects(input) {
        input.addEventListener('focus', () => {
            input.parentNode.classList.add('focused');
            this.animateLabel(input, true);
        });
        
        input.addEventListener('blur', () => {
            input.parentNode.classList.remove('focused');
            if (!input.value) {
                this.animateLabel(input, false);
            }
        });
        
        input.addEventListener('input', () => {
            this.validateInput(input);
        });
    }

    animateLabel(input, isFocused) {
        const label = input.parentNode.querySelector('label');
        if (label) {
            if (isFocused || input.value) {
                label.style.transform = 'translateY(-25px) scale(0.8)';
                label.style.color = 'var(--color-primary)';
            } else {
                label.style.transform = 'translateY(0) scale(1)';
                label.style.color = '';
            }
        }
    }

    validateInput(input) {
        const isValid = input.checkValidity();
        
        if (isValid) {
            input.classList.remove('error');
            input.classList.add('valid');
        } else {
            input.classList.remove('valid');
            input.classList.add('error');
        }
    }

    // ===========================
    //   PERFORMANCE OPTIMIZATION
    // ===========================
    optimizePerformance() {
        // Reduce animations on low-end devices
        if (this.isLowEndDevice()) {
            this.reduceAnimations();
        }

        // Pause animations when tab is not visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAnimations();
            } else {
                this.resumeAnimations();
            }
        });

        // Respect user's motion preferences
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            this.disableAnimations();
        }
    }

    isLowEndDevice() {
        return navigator.hardwareConcurrency <= 2 || 
               navigator.deviceMemory <= 2 ||
               /Android.*Chrome\/[.0-9]*\s(Mobile|eliboM)/i.test(navigator.userAgent);
    }

    reduceAnimations() {
        const style = document.createElement('style');
        style.textContent = `
            * {
                animation-duration: 0.3s !important;
                transition-duration: 0.3s !important;
            }
            .stagger-animation.visible > * {
                transition-delay: 0s !important;
            }
        `;
        document.head.appendChild(style);
    }

    pauseAnimations() {
        document.body.style.animationPlayState = 'paused';
    }

    resumeAnimations() {
        document.body.style.animationPlayState = 'running';
    }

    disableAnimations() {
        const style = document.createElement('style');
        style.textContent = `
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
                scroll-behavior: auto !important;
            }
        `;
        document.head.appendChild(style);
    }

    // ===========================
    //   UTILITY METHODS
    // ===========================
    addAnimationClass(element, className, duration = 600) {
        return new Promise(resolve => {
            element.classList.add(className);
            setTimeout(() => {
                element.classList.remove(className);
                resolve();
            }, duration);
        });
    }

    animateCounter(element, target, duration = 2000) {
        const start = parseInt(element.textContent) || 0;
        const increment = (target - start) / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    }

    createFloatingElement(container, content, duration = 6000) {
        const element = document.createElement('div');
        element.innerHTML = content;
        element.style.cssText = `
            position: absolute;
            animation: float ${duration}ms ease-in-out infinite;
            pointer-events: none;
        `;
        
        container.appendChild(element);
        return element;
    }

    // ===========================
    //   PUBLIC API
    // ===========================
    animateSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    showNotification(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
                <span>${message}</span>
                <button class="notification-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 2rem;
            right: 2rem;
            background: ${type === 'success' ? '#43e97b' : '#667eea'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.15);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        `;
        
        document.body.appendChild(notification);
        
        requestAnimationFrame(() => {
            notification.style.transform = 'translateX(0)';
        });
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, duration);
        
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        });
    }
}

// ===========================
//   CSS INJECTION
// ===========================
const animationStyles = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .notification {
        font-family: 'Inter', sans-serif;
        font-weight: 500;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: inherit;
        cursor: pointer;
        padding: 0.25rem;
        margin-left: auto;
        border-radius: 4px;
        transition: background-color 0.2s;
    }
    
    .notification-close:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);

// ===========================
//   INITIALIZATION
// ===========================
let smoothAnimations;

document.addEventListener('DOMContentLoaded', () => {
    smoothAnimations = new SmoothAnimations();
});

// Export for global access
window.SmoothAnimations = SmoothAnimations;
window.smoothAnimations = smoothAnimations;