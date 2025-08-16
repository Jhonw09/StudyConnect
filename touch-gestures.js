// ===========================
//   SISTEMA DE GESTOS TOUCH
// ===========================

class TouchGestureSystem {
    constructor() {
        this.touchStartX = 0;
        this.touchStartY = 0;
        this.touchEndX = 0;
        this.touchEndY = 0;
        this.isScrolling = false;
        this.lastShake = 0;
        this.init();
    }

    init() {
        this.setupSwipeGestures();
        this.setupPullToRefresh();
        this.setupPinchZoom();
        this.setupShakeDetection();
        this.setupTouchFeedback();
    }

    setupSwipeGestures() {
        let startX, startY, startTime;

        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            startTime = Date.now();
        }, { passive: true });

        document.addEventListener('touchend', (e) => {
            if (!startX || !startY) return;

            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const endTime = Date.now();

            const deltaX = endX - startX;
            const deltaY = endY - startY;
            const deltaTime = endTime - startTime;

            // Verificar se é um swipe válido
            if (Math.abs(deltaX) > 50 && deltaTime < 300) {
                if (deltaX > 0) {
                    this.handleSwipeRight(e.target);
                } else {
                    this.handleSwipeLeft(e.target);
                }
            }

            if (Math.abs(deltaY) > 50 && deltaTime < 300) {
                if (deltaY > 0) {
                    this.handleSwipeDown(e.target);
                } else {
                    this.handleSwipeUp(e.target);
                }
            }

            startX = startY = null;
        }, { passive: true });
    }

    handleSwipeRight(target) {
        // Navegação entre seções
        const currentSection = target.closest('section');
        if (currentSection) {
            const prevSection = currentSection.previousElementSibling;
            if (prevSection && prevSection.tagName === 'SECTION') {
                this.smoothScrollToSection(prevSection);
                this.showSwipeFeedback('← Seção anterior');
            }
        }

        // Fechar modais/dropdowns
        const modal = document.querySelector('.modal.show');
        const dropdown = document.querySelector('.dropdown.show');
        if (modal) {
            modal.classList.remove('show');
            this.showSwipeFeedback('Modal fechado');
        } else if (dropdown) {
            dropdown.classList.remove('show');
            this.showSwipeFeedback('Menu fechado');
        }
    }

    handleSwipeLeft(target) {
        // Navegação entre seções
        const currentSection = target.closest('section');
        if (currentSection) {
            const nextSection = currentSection.nextElementSibling;
            if (nextSection && nextSection.tagName === 'SECTION') {
                this.smoothScrollToSection(nextSection);
                this.showSwipeFeedback('Próxima seção →');
            }
        }

        // Abrir menu lateral (se existir)
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            sidebar.classList.add('show');
            this.showSwipeFeedback('Menu aberto');
        }
    }

    handleSwipeUp(target) {
        // Scroll para próxima seção
        const currentSection = target.closest('section');
        if (currentSection) {
            const nextSection = currentSection.nextElementSibling;
            if (nextSection && nextSection.tagName === 'SECTION') {
                this.smoothScrollToSection(nextSection);
                this.showSwipeFeedback('↑ Próxima seção');
            }
        }
    }

    handleSwipeDown(target) {
        // Scroll para seção anterior
        const currentSection = target.closest('section');
        if (currentSection) {
            const prevSection = currentSection.previousElementSibling;
            if (prevSection && prevSection.tagName === 'SECTION') {
                this.smoothScrollToSection(prevSection);
                this.showSwipeFeedback('↓ Seção anterior');
            }
        }
    }

    setupPullToRefresh() {
        let startY = 0;
        let pullDistance = 0;
        let isPulling = false;
        const threshold = 100;

        const refreshIndicator = this.createRefreshIndicator();

        document.addEventListener('touchstart', (e) => {
            if (window.scrollY === 0) {
                startY = e.touches[0].clientY;
                isPulling = true;
            }
        }, { passive: true });

        document.addEventListener('touchmove', (e) => {
            if (!isPulling || window.scrollY > 0) return;

            const currentY = e.touches[0].clientY;
            pullDistance = currentY - startY;

            if (pullDistance > 0) {
                e.preventDefault();
                const progress = Math.min(pullDistance / threshold, 1);
                this.updateRefreshIndicator(refreshIndicator, progress);
            }
        });

        document.addEventListener('touchend', () => {
            if (isPulling && pullDistance > threshold) {
                this.performRefresh(refreshIndicator);
            } else {
                this.hideRefreshIndicator(refreshIndicator);
            }
            isPulling = false;
            pullDistance = 0;
        }, { passive: true });
    }

    createRefreshIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'pull-refresh-indicator';
        indicator.innerHTML = `
            <div class="refresh-spinner">
                <i class="fas fa-sync-alt"></i>
            </div>
            <span class="refresh-text">Puxe para atualizar</span>
        `;
        document.body.appendChild(indicator);
        return indicator;
    }

    updateRefreshIndicator(indicator, progress) {
        indicator.style.transform = `translateY(${progress * 60 - 60}px)`;
        indicator.style.opacity = progress;
        
        const spinner = indicator.querySelector('.refresh-spinner i');
        spinner.style.transform = `rotate(${progress * 360}deg)`;

        if (progress >= 1) {
            indicator.querySelector('.refresh-text').textContent = 'Solte para atualizar';
        } else {
            indicator.querySelector('.refresh-text').textContent = 'Puxe para atualizar';
        }
    }

    performRefresh(indicator) {
        indicator.querySelector('.refresh-text').textContent = 'Atualizando...';
        indicator.querySelector('.refresh-spinner').classList.add('spinning');
        
        // Simular refresh
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }

    hideRefreshIndicator(indicator) {
        indicator.style.transform = 'translateY(-60px)';
        indicator.style.opacity = '0';
    }

    setupPinchZoom() {
        let initialDistance = 0;
        let currentScale = 1;

        document.addEventListener('touchstart', (e) => {
            if (e.touches.length === 2) {
                initialDistance = this.getDistance(e.touches[0], e.touches[1]);
            }
        }, { passive: true });

        document.addEventListener('touchmove', (e) => {
            if (e.touches.length === 2) {
                e.preventDefault();
                const currentDistance = this.getDistance(e.touches[0], e.touches[1]);
                const scale = currentDistance / initialDistance;
                
                const target = e.target.closest('img, .zoomable');
                if (target) {
                    currentScale = Math.min(Math.max(scale, 0.5), 3);
                    target.style.transform = `scale(${currentScale})`;
                    target.style.transition = 'none';
                }
            }
        });

        document.addEventListener('touchend', (e) => {
            if (e.touches.length < 2) {
                const target = document.querySelector('img[style*="scale"], .zoomable[style*="scale"]');
                if (target) {
                    target.style.transition = 'transform 0.3s ease';
                    if (currentScale < 1.2) {
                        target.style.transform = 'scale(1)';
                    }
                }
            }
        }, { passive: true });
    }

    getDistance(touch1, touch2) {
        const dx = touch1.clientX - touch2.clientX;
        const dy = touch1.clientY - touch2.clientY;
        return Math.sqrt(dx * dx + dy * dy);
    }

    setupShakeDetection() {
        if (!window.DeviceMotionEvent) return;

        window.addEventListener('devicemotion', (e) => {
            const acceleration = e.accelerationIncludingGravity;
            const threshold = 15;
            const now = Date.now();

            if (now - this.lastShake < 1000) return;

            const totalAcceleration = Math.abs(acceleration.x) + 
                                    Math.abs(acceleration.y) + 
                                    Math.abs(acceleration.z);

            if (totalAcceleration > threshold) {
                this.lastShake = now;
                this.handleShake();
            }
        });
    }

    handleShake() {
        // Feedback de shake
        this.showSwipeFeedback('📱 Dispositivo balançado!');
        
        // Ações possíveis:
        // - Refresh da página
        // - Abrir menu de ajuda
        // - Desfazer última ação
        // - Easter egg
        
        if (navigator.vibrate) {
            navigator.vibrate([100, 50, 100]);
        }

        // Exemplo: abrir menu de ajuda
        const helpModal = document.getElementById('helpModal');
        if (helpModal) {
            helpModal.classList.add('show');
        } else {
            // Criar modal de ajuda dinâmico
            this.showHelpModal();
        }
    }

    showHelpModal() {
        const modal = document.createElement('div');
        modal.className = 'modal shake-help-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>🤝 Gestos Disponíveis</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="gesture-list">
                        <div class="gesture-item">
                            <i class="fas fa-hand-point-right"></i>
                            <div>
                                <strong>Deslizar →</strong>
                                <p>Próxima seção ou fechar modal</p>
                            </div>
                        </div>
                        <div class="gesture-item">
                            <i class="fas fa-hand-point-left"></i>
                            <div>
                                <strong>Deslizar ←</strong>
                                <p>Seção anterior ou abrir menu</p>
                            </div>
                        </div>
                        <div class="gesture-item">
                            <i class="fas fa-arrows-alt-v"></i>
                            <div>
                                <strong>Puxar para baixo</strong>
                                <p>Atualizar página (no topo)</p>
                            </div>
                        </div>
                        <div class="gesture-item">
                            <i class="fas fa-search-plus"></i>
                            <div>
                                <strong>Pinçar</strong>
                                <p>Zoom em imagens</p>
                            </div>
                        </div>
                        <div class="gesture-item">
                            <i class="fas fa-mobile-alt"></i>
                            <div>
                                <strong>Balançar</strong>
                                <p>Abrir esta ajuda</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        setTimeout(() => modal.classList.add('show'), 10);

        modal.querySelector('.modal-close').addEventListener('click', () => {
            modal.classList.remove('show');
            setTimeout(() => modal.remove(), 300);
        });
    }

    setupTouchFeedback() {
        // Feedback visual para toques
        document.addEventListener('touchstart', (e) => {
            const touch = e.touches[0];
            this.createTouchRipple(touch.clientX, touch.clientY);
        }, { passive: true });
    }

    createTouchRipple(x, y) {
        const ripple = document.createElement('div');
        ripple.className = 'touch-ripple';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        document.body.appendChild(ripple);
        
        setTimeout(() => {
            ripple.classList.add('animate');
        }, 10);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    smoothScrollToSection(section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }

    showSwipeFeedback(message) {
        const feedback = document.createElement('div');
        feedback.className = 'swipe-feedback';
        feedback.textContent = message;
        
        document.body.appendChild(feedback);
        
        setTimeout(() => {
            feedback.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            feedback.classList.remove('show');
            setTimeout(() => feedback.remove(), 300);
        }, 2000);
    }
}

// CSS para gestos touch
const touchStyles = `
<style>
.pull-refresh-indicator {
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%) translateY(-60px);
    background: rgba(26, 26, 46, 0.9);
    color: white;
    padding: 1rem 2rem;
    border-radius: 0 0 15px 15px;
    display: flex;
    align-items: center;
    gap: 1rem;
    z-index: 1000;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
}

.refresh-spinner {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.refresh-spinner.spinning i {
    animation: spin 1s linear infinite;
}

@keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

.touch-ripple {
    position: fixed;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: rgba(67, 233, 123, 0.6);
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%) scale(0);
    transition: transform 0.6s ease-out, opacity 0.6s ease-out;
}

.touch-ripple.animate {
    transform: translate(-50%, -50%) scale(4);
    opacity: 0;
}

.swipe-feedback {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
    background: rgba(26, 26, 46, 0.9);
    color: white;
    padding: 1rem 2rem;
    border-radius: 25px;
    font-weight: 600;
    z-index: 1001;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.swipe-feedback.show {
    transform: translate(-50%, -50%) scale(1);
}

.shake-help-modal .modal-content {
    max-width: 400px;
}

.gesture-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.gesture-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
    transition: all 0.3s ease;
}

.gesture-item:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateX(5px);
}

.gesture-item i {
    font-size: 1.5rem;
    color: #43e97b;
    width: 30px;
    text-align: center;
}

.gesture-item strong {
    display: block;
    margin-bottom: 0.3rem;
    color: white;
}

.gesture-item p {
    margin: 0;
    font-size: 0.9rem;
    opacity: 0.8;
    color: rgba(255, 255, 255, 0.8);
}

/* Melhorar experiência touch */
.course-card,
.btn,
.nav-link {
    touch-action: manipulation;
}

img.zoomable {
    touch-action: pinch-zoom;
    cursor: zoom-in;
}

img.zoomable:hover {
    transform: scale(1.02);
    transition: transform 0.3s ease;
}

/* Feedback visual para elementos tocáveis */
.touchable {
    position: relative;
    overflow: hidden;
}

.touchable::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
}

.touchable:active::after {
    width: 300px;
    height: 300px;
}

@media (max-width: 768px) {
    .pull-refresh-indicator {
        padding: 0.8rem 1.5rem;
        font-size: 0.9rem;
    }
    
    .swipe-feedback {
        padding: 0.8rem 1.5rem;
        font-size: 0.9rem;
    }
    
    .gesture-item {
        padding: 0.8rem;
    }
    
    .gesture-item i {
        font-size: 1.2rem;
    }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', touchStyles);

// Inicializar sistema de gestos apenas em dispositivos touch
if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    document.addEventListener('DOMContentLoaded', () => {
        window.touchGestureSystem = new TouchGestureSystem();
    });
}