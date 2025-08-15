// ===== INTERAÇÕES AVANÇADAS E PROFISSIONAIS =====

class StudyConnectPlatform {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.applyTheme();
        this.setupThemeToggle();
        this.setupAdvancedInteractions();
        this.setupAnimations();
        this.setupModuleToggle();
        this.setupLessonNavigation();
    }

    // Sistema de Tema Avançado
    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
        const toggle = document.getElementById('darkModeToggle');
        if (toggle) {
            toggle.classList.toggle('active', this.theme === 'dark');
        }
    }

    setupThemeToggle() {
        const toggle = document.getElementById('darkModeToggle');
        if (!toggle) return;

        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleTheme();
        });

        toggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.toggleTheme();
            }
        });
    }

    toggleTheme() {
        this.theme = this.theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', this.theme);
        
        // Animação suave de transição
        document.body.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        this.applyTheme();
        
        // Efeito visual de mudança
        this.createThemeTransitionEffect();
        
        setTimeout(() => {
            document.body.style.transition = '';
        }, 400);
    }

    createThemeTransitionEffect() {
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: ${this.theme === 'dark' ? '#1a1a2e' : '#ffffff'};
            opacity: 0;
            pointer-events: none;
            z-index: 10000;
            transition: opacity 0.2s ease;
        `;
        
        document.body.appendChild(overlay);
        
        requestAnimationFrame(() => {
            overlay.style.opacity = '0.3';
            setTimeout(() => {
                overlay.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(overlay);
                }, 200);
            }, 100);
        });
    }

    // Interações Avançadas
    setupAdvancedInteractions() {
        // Hover effects avançados para stats
        document.querySelectorAll('.stat').forEach(stat => {
            stat.addEventListener('mouseenter', () => {
                stat.style.transform = 'translateY(-4px) scale(1.02)';
            });
            
            stat.addEventListener('mouseleave', () => {
                stat.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Efeito parallax no hero
        this.setupParallaxEffect();

        // Contador animado para stats
        this.animateCounters();

        // Efeitos de partículas
        this.createParticleEffect();
    }

    setupParallaxEffect() {
        const hero = document.querySelector('.course-hero');
        if (!hero) return;

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (hero.querySelector('::before')) {
                hero.style.transform = `translateY(${rate}px)`;
            }
        });
    }

    animateCounters() {
        const stats = document.querySelectorAll('.stat span');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateNumber(entry.target);
                }
            });
        }, { threshold: 0.5 });

        stats.forEach(stat => observer.observe(stat));
    }

    animateNumber(element) {
        const text = element.textContent;
        const numbers = text.match(/\d+/g);
        
        if (numbers && numbers.length > 0) {
            const finalNumber = parseInt(numbers[0]);
            let currentNumber = 0;
            const increment = finalNumber / 60;
            const duration = 2000;
            const stepTime = duration / 60;
            
            const timer = setInterval(() => {
                currentNumber += increment;
                if (currentNumber >= finalNumber) {
                    currentNumber = finalNumber;
                    clearInterval(timer);
                }
                element.textContent = text.replace(/\d+/, Math.floor(currentNumber));
            }, stepTime);
        }
    }

    createParticleEffect() {
        const hero = document.querySelector('.course-hero');
        if (!hero) return;

        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: linear-gradient(45deg, var(--color-primary), var(--color-secondary));
                border-radius: 50%;
                opacity: 0.6;
                animation: float-particle ${5 + Math.random() * 10}s linear infinite;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                pointer-events: none;
            `;
            hero.appendChild(particle);
        }

        // Adicionar keyframes para partículas
        if (!document.querySelector('#particle-styles')) {
            const style = document.createElement('style');
            style.id = 'particle-styles';
            style.textContent = `
                @keyframes float-particle {
                    0% { transform: translateY(0px) rotate(0deg); opacity: 0; }
                    10% { opacity: 0.6; }
                    90% { opacity: 0.6; }
                    100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Navegação Avançada de Aulas
    setupLessonNavigation() {
        document.querySelectorAll('.lesson[onclick]').forEach(lesson => {
            // Remover onclick inline
            const onclickStr = lesson.getAttribute('onclick');
            lesson.removeAttribute('onclick');
            
            // Adicionar event listener avançado
            lesson.addEventListener('click', (e) => {
                e.preventDefault();
                
                if (onclickStr.includes('alert')) {
                    this.showComingSoonModal();
                    return;
                }
                
                const urlMatch = onclickStr.match(/window\.location\.href='([^']+)'/);
                if (urlMatch) {
                    this.navigateToLesson(urlMatch[1], lesson);
                }
            });
        });
    }

    navigateToLesson(url, element) {
        // Adicionar classe de loading
        element.classList.add('loading');
        
        // Efeito visual de clique
        element.style.transform = 'scale(0.98)';
        
        // Criar overlay de transição
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
            opacity: 0;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 1.2rem;
            font-weight: 600;
            transition: opacity 0.4s ease;
        `;
        
        overlay.innerHTML = `
            <div style="text-align: center;">
                <div style="width: 40px; height: 40px; border: 3px solid rgba(255,255,255,0.3); border-top: 3px solid white; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 20px;"></div>
                <div>Carregando aula...</div>
            </div>
        `;
        
        document.body.appendChild(overlay);
        
        setTimeout(() => {
            overlay.style.opacity = '1';
            
            setTimeout(() => {
                window.location.href = url;
            }, 800);
        }, 100);
    }

    showComingSoonModal() {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(10px);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        modal.innerHTML = `
            <div style="
                background: var(--card-bg);
                backdrop-filter: blur(20px);
                border-radius: 20px;
                padding: 40px;
                text-align: center;
                border: 1px solid var(--glass-border);
                max-width: 400px;
                transform: scale(0.9);
                transition: transform 0.3s ease;
            ">
                <div style="font-size: 3rem; margin-bottom: 20px;">🚧</div>
                <h3 style="color: var(--text-color); margin-bottom: 15px;">Aula em Desenvolvimento</h3>
                <p style="color: var(--text-secondary); margin-bottom: 25px;">Esta aula está sendo preparada com muito carinho para você!</p>
                <button onclick="this.closest('.modal').remove()" style="
                    background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
                    color: white;
                    border: none;
                    padding: 12px 24px;
                    border-radius: 25px;
                    cursor: pointer;
                    font-weight: 600;
                    transition: transform 0.2s ease;
                " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                    Entendi
                </button>
            </div>
        `;
        
        modal.className = 'modal';
        document.body.appendChild(modal);
        
        setTimeout(() => {
            modal.style.opacity = '1';
            modal.querySelector('div').style.transform = 'scale(1)';
        }, 100);
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    // Toggle de Módulos Avançado
    setupModuleToggle() {
        document.querySelectorAll('.module-header').forEach(header => {
            header.addEventListener('click', () => {
                const module = header.parentElement;
                const lessons = module.querySelector('.module-lessons');
                const icon = header.querySelector('i');
                
                if (lessons) {
                    const isExpanded = lessons.style.maxHeight && lessons.style.maxHeight !== '0px';
                    
                    if (isExpanded) {
                        lessons.style.maxHeight = '0px';
                        lessons.style.opacity = '0';
                        icon.style.transform = 'rotate(0deg)';
                        module.classList.remove('expanded');
                    } else {
                        lessons.style.maxHeight = lessons.scrollHeight + 'px';
                        lessons.style.opacity = '1';
                        icon.style.transform = 'rotate(90deg)';
                        module.classList.add('expanded');
                    }
                }
            });
        });
    }

    // Animações de Entrada
    setupAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('fade-in-up');
                    }, index * 100);
                }
            });
        }, observerOptions);

        // Observar elementos para animação
        document.querySelectorAll('.module, .stat, .course-preview').forEach(el => {
            observer.observe(el);
        });
    }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    new StudyConnectPlatform();
});

;