// ===========================
//   CONFIGURAÇÕES GLOBAIS
// ===========================
const CONFIG = {
    animationDuration: 300,
    scrollOffset: 100,
    autoSlideInterval: 5000,

};

// ===========================
//   CLASSE PRINCIPAL DA APLICAÇÃO
// ===========================
class StudyConnectApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeComponents();
        this.handlePageLoad();
    }

    setupEventListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            this.initParticles();
            this.initLoadingScreen();
            this.initTheme();
            this.initNavigation();
            this.initAnimations();
            this.initCounters();
            this.initFilters();
            this.initContactForm();
            this.initBackToTop();
            this.initScrollEffects();
            this.initProfileMenu();
            this.initFavorites();
            
            setTimeout(() => this.checkLoginStatus(), 100);
        });

        window.addEventListener('scroll', this.handleScroll.bind(this));
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    initializeComponents() {
        this.themeManager = new ThemeManager();
        this.navigationManager = new NavigationManager();
        this.animationManager = new AnimationManager();
        this.formManager = new FormManager();
        this.favoritesManager = new FavoritesManager();
    }

    handlePageLoad() {
        // Carregamento mais rápido
        setTimeout(() => {
            this.hideLoadingScreen();
        }, 800);
    }



    // ===========================
    //   LOADING SCREEN
    // ===========================
    initLoadingScreen() {
        this.loadingScreen = document.getElementById('loadingScreen');
    }

    hideLoadingScreen() {
        if (this.loadingScreen) {
            this.loadingScreen.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    }

    // ===========================
    //   TEMA ESCURO/CLARO
    // ===========================
    initTheme() {
        this.themeManager.init();
    }

    // ===========================
    //   NAVEGAÇÃO
    // ===========================
    initNavigation() {
        this.navigationManager.init();
    }

    // ===========================
    //   ANIMAÇÕES
    // ===========================
    initAnimations() {
        this.animationManager.init();
        // Inicializar animações suaves se disponível
        if (window.smoothAnimations) {
            window.smoothAnimations.init();
        }
    }

    // ===========================
    //   CONTADORES ANIMADOS
    // ===========================
    initCounters() {
        const counters = document.querySelectorAll('.stat-number');
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        counters.forEach(counter => observer.observe(counter));
    }

    animateCounter(element) {
        const target = parseInt(element.dataset.target);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    }

    // ===========================
    //   FILTROS DE CURSO
    // ===========================
    initFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const courseCards = document.querySelectorAll('.course-card');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filter = button.dataset.filter;
                
                courseCards.forEach(card => {
                    if (filter === 'all' || card.dataset.category === filter) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeInUp 0.5s ease forwards';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // ===========================
    //   FORMULÁRIO DE CONTATO
    // ===========================
    initContactForm() {
        this.formManager.init();
    }

    // ===========================
    //   BOTÃO VOLTAR AO TOPO
    // ===========================
    initBackToTop() {
        this.backToTopBtn = document.getElementById('backToTop');
        
        if (this.backToTopBtn) {
            this.backToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    // ===========================
    //   EFEITOS DE SCROLL
    // ===========================
    initScrollEffects() {
        // Usar o sistema de animações suaves se disponível
        if (window.smoothAnimations) {
            return; // O sistema de animações suaves já cuida disso
        }
        
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, { threshold: 0.1 });

        elements.forEach(el => observer.observe(el));
    }

    // ===========================
    //   SISTEMA DE FAVORITOS
    // ===========================
    initFavorites() {
        this.favoritesManager.init();
    }

    // ===========================
    //   MENU DE PERFIL
    // ===========================
    initProfileMenu() {
        this.checkLoginStatus();
        
        const logoutBtn = document.getElementById('logoutBtn');
        const editProfileBtn = document.getElementById('editProfileBtn');
        const configBtn = document.getElementById('configBtn');
        
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.logout();
            });
        }
        
        // Event listeners para editar perfil e configurações são tratados pelo profile-modals-simple.js
        
        window.addEventListener('focus', () => {
            this.checkLoginStatus();
        });
    }

    checkLoginStatus() {
        const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
        const userName = localStorage.getItem('userName') || 'Usuário';
        
        const loginBtn = document.querySelector('.login-btn');
        const profileMenu = document.getElementById('profileMenu');
        const profileName = document.getElementById('profileName');
        const profileAvatar = document.querySelector('.profile-avatar');
        
        if (isLoggedIn) {
            if (loginBtn) loginBtn.parentElement.style.display = 'none';
            if (profileMenu) profileMenu.style.display = 'block';
            if (profileName) profileName.textContent = userName;
            
            // Carregar foto de perfil salva
            const savedAvatar = localStorage.getItem('userAvatar');
            if (savedAvatar && profileAvatar) {
                profileAvatar.src = savedAvatar;
            }
        } else {
            if (loginBtn) loginBtn.parentElement.style.display = 'block';
            if (profileMenu) profileMenu.style.display = 'none';
        }
    }

    logout() {
        // Remover apenas dados de sessão, manter perfil e usuários
        localStorage.removeItem('userLoggedIn');
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('joinDate');
        localStorage.removeItem('currentUserId');
        
        this.showNotification('Logout realizado com sucesso!', 'success');
        
        setTimeout(() => {
            window.location.href = 'cursos/Login/Login.html';
        }, 1000);
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
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
            background: ${type === 'success' ? '#43e97b' : type === 'error' ? '#ff6b6b' : '#667eea'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.15);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 400px;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        setTimeout(() => {
            this.removeNotification(notification);
        }, 3000);

        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            this.removeNotification(notification);
        });
    }

    removeNotification(notification) {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    handleScroll() {
        const scrollY = window.scrollY;
        
        // Scroll progress bar
        this.updateScrollProgress();
        
        // Header background on scroll
        const header = document.querySelector('header');
        if (header) {
            if (scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                if (document.body.classList.contains('dark-mode')) {
                    header.style.background = 'rgba(26, 26, 46, 0.98)';
                }
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                if (document.body.classList.contains('dark-mode')) {
                    header.style.background = 'rgba(26, 26, 46, 0.95)';
                }
            }
        }

        // Back to top button
        if (this.backToTopBtn) {
            if (scrollY > 300) {
                this.backToTopBtn.classList.add('visible');
            } else {
                this.backToTopBtn.classList.remove('visible');
            }
        }

        // Parallax effect for hero section
        const heroSection = document.querySelector('.hero-section');
        if (heroSection && scrollY < window.innerHeight) {
            heroSection.style.transform = `translateY(${scrollY * 0.5}px)`;
        }
    }

    updateScrollProgress() {
        const scrollProgressBar = document.getElementById('scrollProgressBar');
        if (scrollProgressBar) {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            scrollProgressBar.style.width = scrollPercent + '%';
        }
    }

    // ===========================
    //   PARTICLES.JS
    // ===========================
    initParticles() {
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles-js', {
                particles: {
                    number: { value: 50, density: { enable: true, value_area: 800 } },
                    color: { value: "#43e97b" },
                    shape: { type: "circle" },
                    opacity: { value: 0.6, random: false },
                    size: { value: 2, random: true },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: "#43e97b",
                        opacity: 0.5,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 1,
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
            });
        }
    }

    handleResize() {
        // Recalculate animations and layouts on resize
        if (typeof particlesJS !== 'undefined') {
            this.initParticles();
        }
    }


}

// ===========================
//   GERENCIADOR DE TEMA
// ===========================
class ThemeManager {
    constructor() {
        this.darkModeToggle = document.getElementById('darkModeToggle');
        this.body = document.body;
    }

    init() {
        this.loadTheme();
        this.setupToggle();
    }

    loadTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            this.disableDarkMode();
        } else {
            this.enableDarkMode();
        }
    }

    setupToggle() {
        if (this.darkModeToggle) {
            this.darkModeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });

            this.darkModeToggle.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.toggleTheme();
                }
            });
        }
    }

    toggleTheme() {
        if (this.body.classList.contains('dark-mode')) {
            this.disableDarkMode();
        } else {
            this.enableDarkMode();
        }
    }

    enableDarkMode() {
        this.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    }

    disableDarkMode() {
        this.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    }


}

// ===========================
//   GERENCIADOR DE NAVEGAÇÃO
// ===========================
class NavigationManager {
    constructor() {
        this.mobileMenuToggle = document.getElementById('mobileMenuToggle');
        this.navList = document.getElementById('nav-list');
        this.navLinks = document.querySelectorAll('.nav-list a');
    }

    init() {
        this.setupMobileMenu();
        this.setupSmoothScroll();
    }

    setupMobileMenu() {
        if (this.mobileMenuToggle && this.navList) {
            this.mobileMenuToggle.addEventListener('click', () => {
                this.toggleMobileMenu();
            });

            // Close menu when clicking on links
            this.navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    this.closeMobileMenu();
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!e.target.closest('nav')) {
                    this.closeMobileMenu();
                }
            });
        }
    }

    toggleMobileMenu() {
        this.navList.classList.toggle('active');
        this.mobileMenuToggle.classList.toggle('active');
    }

    closeMobileMenu() {
        this.navList.classList.remove('active');
        this.mobileMenuToggle.classList.remove('active');
    }

    setupSmoothScroll() {
        this.navLinks.forEach(link => {
            if (link.getAttribute('href').startsWith('#')) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = link.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        const headerHeight = document.querySelector('header').offsetHeight;
                        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                });
            }
        });
    }
}

// ===========================
//   GERENCIADOR DE ANIMAÇÕES
// ===========================
class AnimationManager {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
    }

    init() {
        this.setupScrollAnimations();
        this.setupHoverEffects();
    }

    setupScrollAnimations() {
        const animatedElements = document.querySelectorAll('.course-card, .teacher-card, .contact-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, this.observerOptions);

        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease';
            observer.observe(el);
        });
    }

    setupHoverEffects() {
        // Card tilt effect
        const cards = document.querySelectorAll('.course-card, .teacher-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            });
        });
    }
}

// ===========================
//   GERENCIADOR DE FORMULÁRIO
// ===========================
class FormManager {
    constructor() {
        this.contactForm = document.getElementById('contact-form');
        this.submitBtn = this.contactForm?.querySelector('.btn-contact');
    }

    init() {
        if (this.contactForm) {
            this.setupFormValidation();
            this.setupFormSubmission();
        }
    }

    setupFormValidation() {
        const inputs = this.contactForm.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
            
            input.addEventListener('input', () => {
                this.clearFieldError(input);
            });
        });
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Remove previous error
        this.clearFieldError(field);

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'Este campo é obrigatório';
        }

        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Digite um email válido';
            }
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    }

    showFieldError(field, message) {
        field.classList.add('error');
        
        const errorElement = document.createElement('span');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        errorElement.style.color = '#ff6b6b';
        errorElement.style.fontSize = '0.8rem';
        errorElement.style.marginTop = '0.25rem';
        errorElement.style.display = 'block';
        
        field.parentNode.appendChild(errorElement);
    }

    clearFieldError(field) {
        field.classList.remove('error');
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }

    setupFormSubmission() {
        this.contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Validate all fields
            const inputs = this.contactForm.querySelectorAll('input, select, textarea');
            let isFormValid = true;
            
            inputs.forEach(input => {
                if (!this.validateField(input)) {
                    isFormValid = false;
                }
            });

            if (!isFormValid) {
                this.showNotification('Por favor, corrija os erros no formulário', 'error');
                return;
            }

            // Show loading state
            this.setLoadingState(true);

            try {
                // Simulate form submission
                await this.simulateFormSubmission();
                
                this.showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
                this.contactForm.reset();
            } catch (error) {
                this.showNotification('Erro ao enviar mensagem. Tente novamente.', 'error');
            } finally {
                this.setLoadingState(false);
            }
        });
    }

    setLoadingState(loading) {
        if (this.submitBtn) {
            if (loading) {
                this.submitBtn.classList.add('loading');
                this.submitBtn.disabled = true;
            } else {
                this.submitBtn.classList.remove('loading');
                this.submitBtn.disabled = false;
            }
        }
    }

    async simulateFormSubmission() {
        return new Promise((resolve) => {
            setTimeout(resolve, 2000);
        });
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
                <button class="notification-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 2rem;
            right: 2rem;
            background: ${type === 'success' ? '#43e97b' : type === 'error' ? '#ff6b6b' : '#667eea'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.15);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 400px;
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Auto remove
        setTimeout(() => {
            this.removeNotification(notification);
        }, 5000);

        // Close button
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            this.removeNotification(notification);
        });
    }

    removeNotification(notification) {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }
}

// ===========================
//   UTILITÁRIOS
// ===========================
class Utils {
    static debounce(func, wait) {
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

    static throttle(func, limit) {
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

    static fadeIn(element, duration = 300) {
        element.style.opacity = 0;
        element.style.display = 'block';
        
        const start = performance.now();
        
        function animate(currentTime) {
            const elapsed = currentTime - start;
            const progress = elapsed / duration;
            
            if (progress < 1) {
                element.style.opacity = progress;
                requestAnimationFrame(animate);
            } else {
                element.style.opacity = 1;
            }
        }
        
        requestAnimationFrame(animate);
    }

    static fadeOut(element, duration = 300) {
        const start = performance.now();
        const startOpacity = parseFloat(getComputedStyle(element).opacity);
        
        function animate(currentTime) {
            const elapsed = currentTime - start;
            const progress = elapsed / duration;
            
            if (progress < 1) {
                element.style.opacity = startOpacity * (1 - progress);
                requestAnimationFrame(animate);
            } else {
                element.style.opacity = 0;
                element.style.display = 'none';
            }
        }
        
        requestAnimationFrame(animate);
    }
}

// ===========================
//   GERENCIADOR DE FAVORITOS
// ===========================
class FavoritesManager {
    constructor() {
        this.favorites = JSON.parse(localStorage.getItem('studyconnect_favorites') || '[]');
        this.likeButtons = [];
    }

    init() {
        this.setupLikeButtons();
        this.updateLikeButtonsState();
    }

    setupLikeButtons() {
        this.likeButtons = document.querySelectorAll('.like-btn');
        
        this.likeButtons.forEach((btn, index) => {
            const courseCard = btn.closest('.course-card');
            if (courseCard) {
                const courseData = this.extractCourseData(courseCard, index);
                
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.toggleFavorite(courseData, btn);
                });
            }
        });
    }

    extractCourseData(courseCard, index) {
        const title = courseCard.querySelector('h3')?.textContent || `Curso ${index + 1}`;
        const description = courseCard.querySelector('p')?.textContent || 'Descrição do curso';
        const image = courseCard.querySelector('img')?.src || 'images/default-course.jpg';
        const duration = courseCard.querySelector('.course-duration')?.textContent || '40h';
        const students = courseCard.querySelector('.course-students')?.textContent || '100+';
        const link = courseCard.querySelector('.btn-course')?.href || '#';
        const category = courseCard.dataset.category || 'geral';
        
        return {
            id: `course-${category}-${index}`,
            title,
            description,
            image,
            duration,
            students,
            link,
            category,
            addedAt: new Date().toISOString()
        };
    }

    toggleFavorite(courseData, button) {
        const existingIndex = this.favorites.findIndex(fav => fav.id === courseData.id);
        
        if (existingIndex > -1) {
            // Remove from favorites
            const removedCourse = this.favorites[existingIndex];
            this.favorites.splice(existingIndex, 1);
            this.updateButtonState(button, false);
            this.showNotification(`"${removedCourse.title}" removido dos favoritos!`, 'warning');
        } else {
            // Add to favorites
            this.favorites.push(courseData);
            this.updateButtonState(button, true);
            this.showNotification(`"${courseData.title}" adicionado aos favoritos!`, 'success');
            
            // Enviar para página de desempenho se estiver aberta
            this.notifyPerformancePage(courseData);
        }
        
        this.saveFavorites();
        this.updateLikeCount(button);
    }

    updateButtonState(button, isFavorited) {
        const icon = button.querySelector('i');
        if (isFavorited) {
            button.classList.add('liked');
            icon.classList.remove('far');
            icon.classList.add('fas');
        } else {
            button.classList.remove('liked');
            icon.classList.remove('fas');
            icon.classList.add('far');
        }
    }

    updateLikeButtonsState() {
        this.likeButtons.forEach((btn, index) => {
            const courseCard = btn.closest('.course-card');
            if (courseCard) {
                const courseData = this.extractCourseData(courseCard, index);
                const isFavorited = this.favorites.some(fav => fav.id === courseData.id);
                this.updateButtonState(btn, isFavorited);
            }
        });
    }

    updateLikeCount(button) {
        const countSpan = button.querySelector('span');
        if (countSpan) {
            let currentCount = parseInt(countSpan.textContent.replace(/[^0-9]/g, '')) || 0;
            const isLiked = button.classList.contains('liked');
            
            if (isLiked) {
                currentCount += 1;
            } else {
                currentCount = Math.max(0, currentCount - 1);
            }
            
            countSpan.textContent = this.formatCount(currentCount);
        }
    }

    formatCount(count) {
        if (count >= 1000) {
            return (count / 1000).toFixed(1) + 'k';
        }
        return count.toString();
    }

    saveFavorites() {
        localStorage.setItem('studyconnect_favorites', JSON.stringify(this.favorites));
    }

    notifyPerformancePage(courseData) {
        // Tentar notificar todas as janelas abertas
        const windows = [];
        
        // Verificar se há uma janela de desempenho aberta
        try {
            if (window.performanceWindow && !window.performanceWindow.closed) {
                window.performanceWindow.postMessage({
                    type: 'favoriteAdded',
                    courseData: courseData
                }, '*');
            }
        } catch (e) {
            console.log('Não foi possível notificar a página de desempenho');
        }
        
        // Broadcast para todas as abas
        localStorage.setItem('favorite_update', JSON.stringify({
            type: 'added',
            courseData: courseData,
            timestamp: Date.now()
        }));
        
        // Limpar o broadcast após um tempo
        setTimeout(() => {
            localStorage.removeItem('favorite_update');
        }, 1000);
    }

    showNotification(message, type = 'info') {
        // Evitar notificações duplicadas
        const existingNotifications = document.querySelectorAll('.notification');
        for (let notif of existingNotifications) {
            if (notif.textContent.includes(message.replace(/"/g, ''))) {
                return; // Não criar duplicata
            }
        }

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'heart' : type === 'warning' ? 'heart-broken' : 'info-circle'}"></i>
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
            background: ${type === 'success' ? '#43e97b' : type === 'warning' ? '#f39c12' : '#667eea'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.15);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 400px;
            font-weight: 500;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        setTimeout(() => {
            this.removeNotification(notification);
        }, 3000);

        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            this.removeNotification(notification);
        });
    }

    removeNotification(notification) {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }
}

// ===========================
//   INICIALIZAÇÃO
// ===========================
const app = new StudyConnectApp();

// Escutar mudanças no localStorage para sincronizar favoritos
window.addEventListener('storage', (e) => {
    if (e.key === 'favorite_update') {
        const data = JSON.parse(e.newValue || '{}');
        if (data.type === 'removed' && app.favoritesManager) {
            app.favoritesManager.updateLikeButtonsState();
        }
    }
});

// ===========================
//   FUNÇÃO GLOBAL PARA LOGIN
// ===========================
window.handleSuccessfulLogin = function(userName) {
    localStorage.setItem('userLoggedIn', 'true');
    localStorage.setItem('userName', userName);
};

window.addEventListener('storage', () => {
    if (app && app.checkLoginStatus) {
        app.checkLoginStatus();
    }
});

// ===========================
//   EASTER EGGS E EXTRAS
// ===========================
document.addEventListener('keydown', (e) => {
    // Konami Code: ↑↑↓↓←→←→BA
    const konamiCode = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];
    
    if (!window.konamiSequence) window.konamiSequence = [];
    
    window.konamiSequence.push(e.code);
    
    if (window.konamiSequence.length > konamiCode.length) {
        window.konamiSequence.shift();
    }
    
    if (window.konamiSequence.join(',') === konamiCode.join(',')) {
        // Easter egg ativado!
        document.body.style.animation = 'rainbow 2s infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 10000);
        
        console.log('🎉 Easter egg ativado! Você encontrou o código secreto!');
    }
});

// CSS para o easter egg
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
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
    }
    
    .field-error {
        animation: shake 0.5s ease-in-out;
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
