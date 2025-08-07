// ===========================
//   JOGO DE DIGITAÇÃO RÁPIDA
// ===========================

class TypingGame {
    constructor() {
        this.texts = [
            "A educação é a arma mais poderosa que você pode usar para mudar o mundo.",
            "O conhecimento é o único bem que aumenta quando é compartilhado.",
            "Aprender é descobrir aquilo que você já sabe. Fazer é demonstrar que você o sabe.",
            "A mente que se abre a uma nova ideia jamais voltará ao seu tamanho original.",
            "O futuro pertence àqueles que acreditam na beleza de seus sonhos.",
            "Não é o mais forte que sobrevive, nem o mais inteligente, mas o que melhor se adapta às mudanças.",
            "A única fonte de conhecimento é a experiência.",
            "Investir em conhecimento rende sempre os melhores juros.",
            "A educação é o passaporte para o futuro, pois o amanhã pertence àqueles que se preparam hoje.",
            "Você nunca sabe que resultados virão da sua ação. Mas se você não fizer nada, não existirão resultados.",
            "O sucesso é ir de fracasso em fracasso sem perder o entusiasmo.",
            "A persistência é o caminho do êxito.",
            "Grandes realizações requerem grandes ambições.",
            "O único lugar onde o sucesso vem antes do trabalho é no dicionário.",
            "A diferença entre o possível e o impossível está na determinação da pessoa.",
            "Seja você mesmo; todos os outros já foram tomados.",
            "A vida é o que acontece enquanto você está ocupado fazendo outros planos.",
            "Duas coisas são infinitas: o universo e a estupidez humana; e não tenho certeza sobre o universo.",
            "Seja a mudança que você quer ver no mundo.",
            "A imaginação é mais importante que o conhecimento."
        ];
        
        this.currentText = '';
        this.currentIndex = 0;
        this.startTime = null;
        this.endTime = null;
        this.timer = null;
        this.timeLeft = 60;
        this.isGameActive = false;
        this.correctChars = 0;
        this.totalChars = 0;
        this.errors = 0;
        this.wpm = 0;
        this.accuracy = 100;
        
        this.initializeElements();
        this.setupEventListeners();
        this.resetGame();
    }
    
    initializeElements() {
        this.typingText = document.getElementById('typingText');
        this.typingInput = document.getElementById('typingInput');
        this.timeLeftElement = document.getElementById('timeLeft');
        this.wpmElement = document.getElementById('wpm');
        this.accuracyElement = document.getElementById('accuracy');
        this.startBtn = document.getElementById('startBtn');
        this.restartBtn = document.getElementById('restartBtn');
        this.resultsDiv = document.getElementById('results');
        this.finalWPM = document.getElementById('finalWPM');
        this.finalAccuracy = document.getElementById('finalAccuracy');
        this.finalChars = document.getElementById('finalChars');
        this.performanceMessage = document.getElementById('performanceMessage');
        this.playAgainBtn = document.getElementById('playAgainBtn');
        this.inputIndicator = document.getElementById('inputIndicator');
    }
    
    setupEventListeners() {
        // Botões
        this.startBtn?.addEventListener('click', () => this.startTest());
        this.restartBtn?.addEventListener('click', () => this.resetGame());
        this.playAgainBtn?.addEventListener('click', () => this.resetGame());
        
        // Input de digitação
        this.typingInput?.addEventListener('input', (e) => this.handleInput(e));
        this.typingInput?.addEventListener('keydown', (e) => this.handleKeyDown(e));
        this.typingInput?.addEventListener('paste', (e) => e.preventDefault());
        
        // Atalhos de teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isGameActive) {
                this.endTest();
            }
            if (e.key === 'F5') {
                e.preventDefault();
                this.resetGame();
            }
        });
        
        // Prevenir seleção de texto
        this.typingText?.addEventListener('selectstart', (e) => e.preventDefault());
    }
    
    resetGame() {
        this.currentText = this.getRandomText();
        this.currentIndex = 0;
        this.startTime = null;
        this.endTime = null;
        this.timeLeft = 60;
        this.isGameActive = false;
        this.correctChars = 0;
        this.totalChars = 0;
        this.errors = 0;
        this.wpm = 0;
        this.accuracy = 100;
        
        this.stopTimer();
        this.displayText();
        this.updateStats();
        this.resetUI();
        
        document.body.classList.remove('game-active', 'game-finished');
    }
    
    resetUI() {
        if (this.typingInput) {
            this.typingInput.value = '';
            this.typingInput.disabled = true;
        }
        
        if (this.startBtn) {
            this.startBtn.style.display = 'inline-flex';
            this.startBtn.disabled = false;
        }
        
        if (this.restartBtn) {
            this.restartBtn.style.display = 'none';
        }
        
        if (this.resultsDiv) {
            this.resultsDiv.style.display = 'none';
        }
        
        if (this.inputIndicator) {
            this.inputIndicator.style.width = '0%';
        }
    }
    
    getRandomText() {
        return this.texts[Math.floor(Math.random() * this.texts.length)];
    }
    
    displayText() {
        if (!this.typingText) return;
        
        let displayHTML = '';
        for (let i = 0; i < this.currentText.length; i++) {
            let className = 'char';
            
            if (i < this.currentIndex) {
                const inputChar = this.typingInput.value[i];
                const textChar = this.currentText[i];
                className += inputChar === textChar ? ' correct' : ' incorrect';
            } else if (i === this.currentIndex && this.isGameActive) {
                className += ' current';
            }
            
            displayHTML += `<span class="${className}">${this.currentText[i] === ' ' ? '&nbsp;' : this.currentText[i]}</span>`;
        }
        
        this.typingText.innerHTML = displayHTML;
    }
    
    startTest() {
        this.isGameActive = true;
        this.startTime = new Date().getTime();
        
        if (this.typingInput) {
            this.typingInput.disabled = false;
            this.typingInput.focus();
        }
        
        if (this.startBtn) {
            this.startBtn.style.display = 'none';
        }
        
        if (this.restartBtn) {
            this.restartBtn.style.display = 'inline-flex';
        }
        
        document.body.classList.add('game-active');
        this.startTimer();
        this.displayText();
    }
    
    startTimer() {
        this.timer = setInterval(() => {
            this.timeLeft--;
            this.updateStats();
            
            if (this.timeLeft <= 0) {
                this.endTest();
            }
        }, 1000);
    }
    
    stopTimer() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }
    
    endTest() {
        this.isGameActive = false;
        this.endTime = new Date().getTime();
        this.stopTimer();
        
        if (this.typingInput) {
            this.typingInput.disabled = true;
        }
        
        document.body.classList.remove('game-active');
        document.body.classList.add('game-finished');
        
        this.calculateFinalStats();
        this.showResults();
        this.saveScore();
    }
    
    handleInput(e) {
        if (!this.isGameActive) return;
        
        const inputValue = e.target.value;
        this.currentIndex = inputValue.length;
        this.totalChars = inputValue.length;
        
        // Contar caracteres corretos e erros
        this.correctChars = 0;
        this.errors = 0;
        
        for (let i = 0; i < inputValue.length && i < this.currentText.length; i++) {
            if (inputValue[i] === this.currentText[i]) {
                this.correctChars++;
            } else {
                this.errors++;
            }
        }
        
        // Atualizar indicador de progresso
        const progress = (inputValue.length / this.currentText.length) * 100;
        if (this.inputIndicator) {
            this.inputIndicator.style.width = Math.min(progress, 100) + '%';
        }
        
        this.displayText();
        this.updateStats();
        
        // Verificar se terminou o texto
        if (inputValue === this.currentText) {
            this.endTest();
        }
        
        // Limitar o input ao tamanho do texto
        if (inputValue.length > this.currentText.length) {
            e.target.value = inputValue.substring(0, this.currentText.length);
        }
    }
    
    handleKeyDown(e) {
        if (!this.isGameActive) return;
        
        // Prevenir algumas teclas especiais
        if (['Tab', 'Enter'].includes(e.key)) {
            e.preventDefault();
        }
        
        // Permitir apenas backspace se não estiver no início
        if (e.key === 'Backspace' && this.typingInput.value.length === 0) {
            e.preventDefault();
        }
    }
    
    updateStats() {
        // Atualizar tempo
        if (this.timeLeftElement) {
            this.timeLeftElement.textContent = this.timeLeft;
        }
        
        // Calcular WPM
        if (this.startTime && this.totalChars > 0) {
            const timeElapsed = (new Date().getTime() - this.startTime) / 1000 / 60; // em minutos
            this.wpm = Math.round((this.correctChars / 5) / timeElapsed) || 0;
        }
        
        if (this.wpmElement) {
            this.wpmElement.textContent = this.wpm;
        }
        
        // Calcular precisão
        if (this.totalChars > 0) {
            this.accuracy = Math.round((this.correctChars / this.totalChars) * 100);
        } else {
            this.accuracy = 100;
        }
        
        if (this.accuracyElement) {
            this.accuracyElement.textContent = this.accuracy + '%';
        }
    }
    
    calculateFinalStats() {
        if (this.startTime && this.endTime) {
            const timeElapsed = (this.endTime - this.startTime) / 1000 / 60; // em minutos
            this.wpm = Math.round((this.correctChars / 5) / timeElapsed) || 0;
        }
        
        if (this.totalChars > 0) {
            this.accuracy = Math.round((this.correctChars / this.totalChars) * 100);
        }
    }
    
    showResults() {
        if (!this.resultsDiv) return;
        
        // Atualizar elementos de resultado
        if (this.finalWPM) {
            this.finalWPM.textContent = this.wpm + ' WPM';
        }
        
        if (this.finalAccuracy) {
            this.finalAccuracy.textContent = this.accuracy + '%';
        }
        
        if (this.finalChars) {
            this.finalChars.textContent = this.correctChars + '/' + this.totalChars;
        }
        
        // Mostrar mensagem de performance
        this.showPerformanceMessage();
        
        // Mostrar resultados
        this.resultsDiv.style.display = 'block';
        this.resultsDiv.scrollIntoView({ behavior: 'smooth' });
    }
    
    showPerformanceMessage() {
        if (!this.performanceMessage) return;
        
        let message = '';
        let className = '';
        
        if (this.wpm >= 60 && this.accuracy >= 95) {
            message = `🚀 Excelente! Você é um digitador profissional! ${this.wpm} WPM com ${this.accuracy}% de precisão é impressionante!`;
            className = 'performance-excellent';
        } else if (this.wpm >= 40 && this.accuracy >= 90) {
            message = `👍 Muito bom! Você tem uma velocidade acima da média! Continue praticando para chegar aos 60 WPM!`;
            className = 'performance-good';
        } else if (this.wpm >= 25 && this.accuracy >= 80) {
            message = `📈 Bom trabalho! Você está no caminho certo. Foque em manter a precisão enquanto aumenta a velocidade!`;
            className = 'performance-average';
        } else {
            message = `💪 Continue praticando! A digitação rápida é uma habilidade que melhora com o tempo. Foque primeiro na precisão!`;
            className = 'performance-needs-improvement';
        }
        
        this.performanceMessage.textContent = message;
        this.performanceMessage.className = 'performance-message ' + className;
    }
    
    saveScore() {
        try {
            const scores = JSON.parse(localStorage.getItem('typingGameScores') || '[]');
            const newScore = {
                wpm: this.wpm,
                accuracy: this.accuracy,
                correctChars: this.correctChars,
                totalChars: this.totalChars,
                errors: this.errors,
                date: new Date().toISOString(),
                timestamp: Date.now()
            };
            
            scores.push(newScore);
            
            // Manter apenas os últimos 50 scores
            if (scores.length > 50) {
                scores.splice(0, scores.length - 50);
            }
            
            localStorage.setItem('typingGameScores', JSON.stringify(scores));
            
            // Salvar melhor pontuação
            const bestScore = JSON.parse(localStorage.getItem('typingGameBestScore') || '{}');
            if (!bestScore.wpm || this.wpm > bestScore.wpm || 
                (this.wpm === bestScore.wpm && this.accuracy > bestScore.accuracy)) {
                bestScore.wpm = this.wpm;
                bestScore.accuracy = this.accuracy;
                bestScore.date = new Date().toISOString();
                localStorage.setItem('typingGameBestScore', JSON.stringify(bestScore));
            }
        } catch (error) {
            console.log('Erro ao salvar pontuação:', error);
        }
    }
    
    // Método para obter estatísticas
    getStats() {
        try {
            const scores = JSON.parse(localStorage.getItem('typingGameScores') || '[]');
            const bestScore = JSON.parse(localStorage.getItem('typingGameBestScore') || '{}');
            
            if (scores.length === 0) {
                return {
                    gamesPlayed: 0,
                    averageWPM: 0,
                    averageAccuracy: 0,
                    bestWPM: 0,
                    bestAccuracy: 0
                };
            }
            
            const totalWPM = scores.reduce((sum, score) => sum + score.wpm, 0);
            const totalAccuracy = scores.reduce((sum, score) => sum + score.accuracy, 0);
            
            return {
                gamesPlayed: scores.length,
                averageWPM: Math.round(totalWPM / scores.length),
                averageAccuracy: Math.round(totalAccuracy / scores.length),
                bestWPM: bestScore.wpm || 0,
                bestAccuracy: bestScore.accuracy || 0,
                lastPlayed: scores[scores.length - 1]?.date
            };
        } catch (error) {
            console.log('Erro ao obter estatísticas:', error);
            return {
                gamesPlayed: 0,
                averageWPM: 0,
                averageAccuracy: 0,
                bestWPM: 0,
                bestAccuracy: 0
            };
        }
    }
}

// ===========================
//   INICIALIZAÇÃO
// ===========================

let typingGame = null;

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar o jogo
    typingGame = new TypingGame();
    
    // Adicionar efeitos visuais extras
    addVisualEffects();
    
    // Mostrar dica inicial
    showInitialTip();
});

// ===========================
//   EFEITOS VISUAIS EXTRAS
// ===========================

function addVisualEffects() {
    // Efeito de partículas no fundo (opcional)
    createBackgroundEffect();
    
    // Efeito de digitação no título
    animateTitle();
}

function createBackgroundEffect() {
    // Criar efeito sutil de partículas ou linhas no fundo
    const container = document.querySelector('.typing-container');
    if (!container) return;
    
    // Adicionar algumas linhas decorativas
    for (let i = 0; i < 3; i++) {
        const line = document.createElement('div');
        line.style.cssText = `
            position: absolute;
            width: 2px;
            height: 100px;
            background: linear-gradient(to bottom, transparent, rgba(102, 126, 234, 0.1), transparent);
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: float ${3 + Math.random() * 2}s ease-in-out infinite;
            z-index: -1;
        `;
        container.appendChild(line);
    }
    
    // Adicionar CSS para animação
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
        }
    `;
    document.head.appendChild(style);
}

function animateTitle() {
    const title = document.querySelector('.typing-header h1');
    if (!title) return;
    
    const text = title.textContent;
    title.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            title.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    setTimeout(typeWriter, 500);
}

function showInitialTip() {
    // Mostrar dica sobre como usar o jogo
    setTimeout(() => {
        const tip = document.createElement('div');
        tip.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #43e97b, #38f9d7);
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 10px 25px rgba(67, 233, 123, 0.3);
            z-index: 1000;
            font-size: 0.9rem;
            max-width: 300px;
            animation: slideInRight 0.5s ease;
        `;
        tip.innerHTML = `
            <strong>💡 Dica:</strong> Foque na precisão primeiro, a velocidade vem naturalmente com a prática!
            <button onclick="this.parentElement.remove()" style="background: none; border: none; color: white; float: right; cursor: pointer; font-size: 1.2rem; margin-left: 10px;">×</button>
        `;
        
        document.body.appendChild(tip);
        
        // Remover automaticamente após 5 segundos
        setTimeout(() => {
            if (tip.parentElement) {
                tip.remove();
            }
        }, 5000);
    }, 2000);
    
    // Adicionar CSS para animação
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
}

// ===========================
//   FUNÇÕES UTILITÁRIAS
// ===========================

// Função para obter estatísticas globais
function getTypingStats() {
    return typingGame ? typingGame.getStats() : null;
}

// Função para resetar todas as estatísticas
function resetAllStats() {
    if (confirm('Tem certeza que deseja resetar todas as estatísticas? Esta ação não pode ser desfeita.')) {
        localStorage.removeItem('typingGameScores');
        localStorage.removeItem('typingGameBestScore');
        alert('Estatísticas resetadas com sucesso!');
        if (typingGame) {
            typingGame.resetGame();
        }
    }
}

// Exportar para uso global
window.TypingGame = TypingGame;
window.getTypingStats = getTypingStats;
window.resetAllStats = resetAllStats;