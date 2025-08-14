// ===== INTERAÇÕES DOS CURSOS - StudyConnect+ =====

document.addEventListener('DOMContentLoaded', function() {
    
    // Inicializar funcionalidades
    initModuleToggle();
    initProgressTracking();
    initFavoriteSystem();
    initVideoPreview();
    initTooltips();
    initScrollAnimations();
    
    // Toggle de módulos do currículo
    function initModuleToggle() {
        const moduleHeaders = document.querySelectorAll('.module-header');
        
        moduleHeaders.forEach(header => {
            header.addEventListener('click', function() {
                const module = this.parentElement;
                const lessons = module.querySelector('.module-lessons');
                const icon = this.querySelector('i');
                
                if (lessons) {
                    const isExpanded = lessons.style.display !== 'none';
                    
                    if (isExpanded) {
                        lessons.style.display = 'none';
                        icon.classList.remove('fa-play-circle');
                        icon.classList.add('fa-plus-circle');
                        module.classList.remove('expanded');
                    } else {
                        lessons.style.display = 'block';
                        icon.classList.remove('fa-plus-circle');
                        icon.classList.add('fa-play-circle');
                        module.classList.add('expanded');
                    }
                    
                    // Animação suave
                    lessons.style.animation = 'fadeInUp 0.3s ease-out';
                }
            });
        });
    }
    
    // Sistema de progresso
    function initProgressTracking() {
        const lessons = document.querySelectorAll('.lesson');
        const progressBar = document.querySelector('.progress-fill');
        const progressText = document.querySelector('.course-progress p');
        
        if (!progressBar) return;
        
        let completedLessons = 0;
        const totalLessons = lessons.length;
        
        lessons.forEach((lesson, index) => {
            lesson.addEventListener('click', function() {
                if (!this.classList.contains('completed')) {
                    this.classList.add('completed');
                    completedLessons++;
                    updateProgress();
                    
                    // Efeito visual
                    this.style.animation = 'pulse 0.5s ease-out';
                    setTimeout(() => {
                        this.style.animation = '';
                    }, 500);
                }
            });
        });
        
        function updateProgress() {
            const percentage = Math.round((completedLessons / totalLessons) * 100);
            progressBar.style.width = percentage + '%';
            if (progressText) {
                progressText.textContent = `${percentage}% concluído`;
            }
            
            // Salvar progresso no localStorage
            localStorage.setItem(`course-progress-${window.location.pathname}`, percentage);
        }
        
        // Carregar progresso salvo
        const savedProgress = localStorage.getItem(`course-progress-${window.location.pathname}`);
        if (savedProgress) {
            progressBar.style.width = savedProgress + '%';
            if (progressText) {
                progressText.textContent = `${savedProgress}% concluído`;
            }
        }
    }
    
    // Sistema de favoritos
    function initFavoriteSystem() {
        const favoriteBtn = document.querySelector('.btn-secondary');
        
        if (favoriteBtn && favoriteBtn.textContent.includes('Favoritar')) {
            const courseId = window.location.pathname;
            const isFavorited = localStorage.getItem(`favorite-${courseId}`) === 'true';
            
            updateFavoriteButton(favoriteBtn, isFavorited);
            
            favoriteBtn.addEventListener('click', function() {
                const currentlyFavorited = this.classList.contains('favorited');
                const newState = !currentlyFavorited;
                
                updateFavoriteButton(this, newState);
                localStorage.setItem(`favorite-${courseId}`, newState);
                
                // Feedback visual
                showNotification(newState ? 'Curso adicionado aos favoritos!' : 'Curso removido dos favoritos!');
            });
        }
    }
    
    function updateFavoriteButton(btn, isFavorited) {
        if (isFavorited) {
            btn.classList.add('favorited');
            btn.innerHTML = '<i class="fas fa-heart"></i> Favoritado';
            btn.style.background = 'linear-gradient(135deg, #ff6b6b, #ee5a24)';
            btn.style.color = 'white';
        } else {
            btn.classList.remove('favorited');
            btn.innerHTML = '<i class="far fa-heart"></i> Favoritar';
            btn.style.background = '';
            btn.style.color = '';
        }
    }
    
    // Preview de vídeo
    function initVideoPreview() {
        const playButton = document.querySelector('.play-button');
        const coursePreview = document.querySelector('.course-preview');
        
        if (playButton && coursePreview) {
            playButton.addEventListener('click', function() {
                // Simular abertura de modal de vídeo
                showVideoModal();
            });
            
            // Hover effect no preview
            coursePreview.addEventListener('mouseenter', function() {
                playButton.style.transform = 'translate(-50%, -50%) scale(1.1)';
                playButton.style.boxShadow = '0 15px 40px rgba(102, 126, 234, 0.6)';
            });
            
            coursePreview.addEventListener('mouseleave', function() {
                playButton.style.transform = 'translate(-50%, -50%) scale(1)';
                playButton.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
            });
        }
    }
    
    // Tooltips para estatísticas
    function initTooltips() {
        const stats = document.querySelectorAll('.stat');
        
        stats.forEach(stat => {
            const icon = stat.querySelector('i');
            const text = stat.querySelector('span').textContent;
            
            let tooltipText = '';
            if (icon.classList.contains('fa-clock')) {
                tooltipText = 'Duração total do curso';
            } else if (icon.classList.contains('fa-users')) {
                tooltipText = 'Número de alunos matriculados';
            } else if (icon.classList.contains('fa-star')) {
                tooltipText = 'Avaliação média dos alunos';
            } else if (icon.classList.contains('fa-certificate')) {
                tooltipText = 'Certificado de conclusão incluído';
            }
            
            if (tooltipText) {
                stat.setAttribute('data-tooltip', tooltipText);
            }
        });
    }
    
    // Animações no scroll
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease-out';
                    entry.target.style.animationFillMode = 'both';
                }
            });
        }, observerOptions);
        
        // Observar elementos
        const elementsToAnimate = document.querySelectorAll('.module, .instructor-card, .course-features');
        elementsToAnimate.forEach(el => observer.observe(el));
    }
    
    // Modal de vídeo (simulado)
    function showVideoModal() {
        const modal = document.createElement('div');
        modal.className = 'video-modal';
        modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <button class="modal-close">&times;</button>
                    <div class="video-placeholder">
                        <i class="fas fa-play-circle"></i>
                        <p>Preview do curso seria exibido aqui</p>
                        <small>Funcionalidade de demonstração</small>
                    </div>
                </div>
            </div>
        `;
        
        // Estilos do modal
        const style = document.createElement('style');
        style.textContent = `
            .video-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10000;
                animation: fadeIn 0.3s ease-out;
            }
            .modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
            }
            .modal-content {
                background: var(--card-bg);
                border-radius: 15px;
                padding: 30px;
                max-width: 600px;
                width: 100%;
                position: relative;
                border: 1px solid rgba(255, 255, 255, 0.1);
            }
            .modal-close {
                position: absolute;
                top: 15px;
                right: 20px;
                background: none;
                border: none;
                font-size: 24px;
                color: var(--text-color);
                cursor: pointer;
                padding: 5px;
                border-radius: 50%;
                transition: all 0.3s ease;
            }
            .modal-close:hover {
                background: rgba(255, 255, 255, 0.1);
                transform: scale(1.1);
            }
            .video-placeholder {
                text-align: center;
                padding: 40px 20px;
                color: var(--text-secondary);
            }
            .video-placeholder i {
                font-size: 4rem;
                color: var(--color-primary);
                margin-bottom: 20px;
            }
            .video-placeholder p {
                font-size: 1.2rem;
                margin-bottom: 10px;
            }
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(modal);
        
        // Fechar modal
        const closeBtn = modal.querySelector('.modal-close');
        const overlay = modal.querySelector('.modal-overlay');
        
        closeBtn.addEventListener('click', closeModal);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeModal();
        });
        
        function closeModal() {
            modal.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => {
                document.body.removeChild(modal);
                document.head.removeChild(style);
            }, 300);
        }
        
        // Adicionar animação de saída
        style.textContent += `
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
        `;
    }
    
    // Sistema de notificações
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Estilos da notificação
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: type === 'success' ? 'linear-gradient(135deg, #43e97b, #38f9d7)' : 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
            color: type === 'success' ? '#333' : 'white',
            padding: '15px 20px',
            borderRadius: '10px',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
            zIndex: '10000',
            animation: 'slideInRight 0.3s ease-out',
            fontWeight: '600',
            fontSize: '0.9rem'
        });
        
        document.body.appendChild(notification);
        
        // Remover após 3 segundos
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
        
        // Adicionar animações se não existirem
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOutRight {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Botão "Começar Agora" com loading
    const startBtn = document.querySelector('.btn-primary.btn-large');
    if (startBtn) {
        startBtn.addEventListener('click', function() {
            this.classList.add('loading');
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Carregando...';
            
            // Simular carregamento
            setTimeout(() => {
                showNotification('Redirecionando para a primeira aula...');
                setTimeout(() => {
                    this.classList.remove('loading');
                    this.innerHTML = '<i class="fas fa-play"></i> Começar Agora';
                }, 1000);
            }, 2000);
        });
    }
    
    // Smooth scroll para seções
    const navLinks = document.querySelectorAll('nav a[href*="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.includes('#')) {
                e.preventDefault();
                const targetId = href.split('#')[1];
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Contador animado para estatísticas
    function animateCounters() {
        const stats = document.querySelectorAll('.stat span');
        
        stats.forEach(stat => {
            const text = stat.textContent;
            const numbers = text.match(/\d+/g);
            
            if (numbers && numbers.length > 0) {
                const finalNumber = parseInt(numbers[0]);
                let currentNumber = 0;
                const increment = finalNumber / 50;
                const timer = setInterval(() => {
                    currentNumber += increment;
                    if (currentNumber >= finalNumber) {
                        currentNumber = finalNumber;
                        clearInterval(timer);
                    }
                    stat.textContent = text.replace(/\d+/, Math.floor(currentNumber));
                }, 30);
            }
        });
    }
    
    // Iniciar contadores quando a seção for visível
    const heroSection = document.querySelector('.course-hero');
    if (heroSection) {
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    heroObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        heroObserver.observe(heroSection);
    }
});