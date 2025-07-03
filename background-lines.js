// JavaScript para Linhas de Fundo Modernas
document.addEventListener('DOMContentLoaded', function() {
    createBackgroundLines();
});

function createBackgroundLines() {
    const container = document.createElement('div');
    container.className = 'animated-background';
    
    // Criar 6 linhas coloridas animadas
    for (let i = 0; i < 6; i++) {
        const line = document.createElement('div');
        line.className = 'background-line';
        container.appendChild(line);
    }
    
    document.body.appendChild(container);
}