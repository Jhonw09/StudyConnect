/* ===========================
   CONTROLE DE TRANSIÇÕES SUAVES
=========================== */

document.addEventListener('DOMContentLoaded', function() {
    // Configuração do Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    // Observer para seções
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                
                // Adicionar efeito de respiração para seção ativa
                entry.target.classList.add('section-breathing');
                
                // Animar elementos filhos
                animateChildElements(entry.target);
            } else {
                // Remover efeito de respiração quando sair da viewport
                entry.target.classList.remove('section-breathing');
            }
        });
    }, observerOptions);

    // Observer para cards
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('card-visible');
            }
        });
    }, { threshold: 0.2 });

    // Observer para itens de contato
    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('item-visible');
            }
        });
    }, { threshold: 0.3 });

    // Função para animar elementos filhos
    function animateChildElements(section) {
        const cards = section.querySelectorAll('.course-card, .teacher-card, .game-card');
        const contactItems = section.querySelectorAll('.contact-item');
        const infoCards = section.querySelectorAll('.info-card');

        // Animar cards com delay
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('card-visible');
            }, index * 100);
        });

        // Animar itens de contato
        contactItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('item-visible');
            }, index * 150);
        });

        // Animar info cards
        infoCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('card-visible');
            }, index * 100);
        });
    }

    // Observar todas as seções
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Observar todos os cards
    const cards = document.querySelectorAll('.course-card, .teacher-card, .game-card');
    cards.forEach(card => {
        cardObserver.observe(card);
    });

    // Observar itens de contato
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        contactObserver.observe(item);
    });

    // Observar info cards
    const infoCards = document.querySelectorAll('.info-card');
    infoCards.forEach(card => {
        cardObserver.observe(card);
    });

    // Efeito de ondulação no scroll
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        // Adicionar classe de scroll ativo
        document.body.classList.add('scrolling');
        
        // Remover classe após parar de scrollar
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            document.body.classList.remove('scrolling');
        }, 150);

        // Efeito parallax sutil
        const scrolled = window.pageYOffset;
        const parallaxSections = document.querySelectorAll('.parallax-section');
        
        parallaxSections.forEach((section, index) => {
            const rate = scrolled * -0.05 * (index % 2 === 0 ? 1 : -1);
            section.style.transform = `translateY(${rate}px)`;
        });
    });

    // Transições suaves para navegação
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Adicionar efeito de transição
                document.body.classList.add('section-transitioning');
                
                // Scroll suave para a seção
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Remover efeito após transição
                setTimeout(() => {
                    document.body.classList.remove('section-transitioning');
                    document.body.classList.add('complete');
                    
                    setTimeout(() => {
                        document.body.classList.remove('complete');
                    }, 300);
                }, 800);
            }
        });
    });

    // Efeito de ondulação para seções
    function createWaveEffect(section) {
        section.classList.add('scroll-wave');
        section.classList.add('wave-active');
        
        setTimeout(() => {
            section.classList.remove('wave-active');
        }, 800);
    }

    // Aplicar efeito de ondulação quando seção entra na viewport
    const waveObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                createWaveEffect(entry.target);
            }
        });
    }, { threshold: 0.3 });

    // Observar seções para efeito de ondulação
    sections.forEach(section => {
        waveObserver.observe(section);
    });

    // Otimização para dispositivos móveis
    function optimizeForMobile() {
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            // Reduzir animações em mobile
            document.body.classList.add('mobile-optimized');
            
            // Desabilitar parallax em mobile
            const parallaxSections = document.querySelectorAll('.parallax-section');
            parallaxSections.forEach(section => {
                section.style.transform = 'none';
            });
        } else {
            document.body.classList.remove('mobile-optimized');
        }
    }

    // Verificar otimização no carregamento e redimensionamento
    optimizeForMobile();
    window.addEventListener('resize', optimizeForMobile);

    // Preloader para transições suaves
    window.addEventListener('load', () => {
        document.body.classList.add('page-loaded');
        
        // Animar hero section imediatamente
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            heroSection.classList.add('section-visible');
        }
    });

    // Detectar preferência por movimento reduzido
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        document.body.classList.add('reduced-motion');
    }

    // Escutar mudanças na preferência
    prefersReducedMotion.addEventListener('change', () => {
        if (prefersReducedMotion.matches) {
            document.body.classList.add('reduced-motion');
        } else {
            document.body.classList.remove('reduced-motion');
        }
    });

    // Adicionar classe quando todas as transições estão prontas
    setTimeout(() => {
        document.body.classList.add('transitions-ready');
    }, 1000);
});

// CSS adicional via JavaScript
const transitionStyles = `
    body.scrolling {
        pointer-events: none;
    }
    
    body.scrolling * {
        pointer-events: auto;
    }
    
    body.mobile-optimized .course-card,
    body.mobile-optimized .teacher-card,
    body.mobile-optimized .game-card {
        transition-duration: 0.3s;
    }
    
    body.reduced-motion * {
        animation: none !important;
        transition: none !important;
    }
    
    body.page-loaded {
        opacity: 1;
    }
    
    body.transitions-ready .section-divider {
        opacity: 1;
    }
`;

// Adicionar estilos ao documento
const styleSheet = document.createElement('style');
styleSheet.textContent = transitionStyles;
document.head.appendChild(styleSheet);