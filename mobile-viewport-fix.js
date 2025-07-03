// Universal Viewport Fix para todos os dispositivos
function setViewportHeight() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  
  // Fix específico para dispositivos dobráveis
  if (window.screen && window.screen.orientation) {
    document.documentElement.style.setProperty('--screen-width', `${window.screen.width}px`);
    document.documentElement.style.setProperty('--screen-height', `${window.screen.height}px`);
  }
}

// Detecta tipo de dispositivo
function detectDevice() {
  const ua = navigator.userAgent;
  const isMobile = /iPhone|iPad|iPod|Android|BlackBerry|Opera Mini|IEMobile/i.test(ua);
  const isTablet = /iPad|Android(?!.*Mobile)/i.test(ua);
  const isFoldable = window.screen && (window.screen.width < 400 && window.screen.height > 600);
  
  document.body.classList.toggle('is-mobile', isMobile);
  document.body.classList.toggle('is-tablet', isTablet);
  document.body.classList.toggle('is-foldable', isFoldable);
  
  return { isMobile, isTablet, isFoldable };
}

// Executa detecção e viewport fix
function initResponsive() {
  detectDevice();
  setViewportHeight();
}

// Executa no carregamento
initResponsive();

// Executa quando a orientação muda
window.addEventListener('orientationchange', () => {
  setTimeout(initResponsive, 150);
});

// Executa quando a janela é redimensionada
window.addEventListener('resize', () => {
  clearTimeout(window.resizeTimeout);
  window.resizeTimeout = setTimeout(initResponsive, 100);
});

// Remove barra de endereço no mobile
if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
  window.addEventListener('load', () => {
    setTimeout(() => {
      if (window.scrollY === 0) {
        window.scrollTo(0, 1);
        setTimeout(() => window.scrollTo(0, 0), 0);
      }
    }, 100);
  });
}

// Fix para dispositivos com notch
if (CSS.supports('padding: max(0px)')) {
  document.documentElement.classList.add('has-safe-area');
}

// Fix para PWA
if (window.matchMedia('(display-mode: standalone)').matches) {
  document.body.classList.add('is-pwa');
}