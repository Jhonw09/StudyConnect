// ===========================
//   JOGO DE DIGITAÇÃO MODERNO - STUDYCONNECT+
// ===========================

class ModernTypingGame {
    constructor() {
        // Textos em português para diferentes níveis
        this.levels = [
            {
                name: "Nível Iniciante",
                texts: [
                    "A educação é a arma mais poderosa que você pode usar para mudar o mundo. O conhecimento liberta e transforma vidas.",
                    "Aprender é descobrir aquilo que você já sabe. Ensinar é lembrar aos outros que eles sabem tanto quanto você.",
                    "O futuro pertence àqueles que acreditam na beleza de seus sonhos e trabalham para realizá-los todos os dias."
                ],
                difficulty: "Fácil",
                timeLimit: 70,
                targetWPM: 30
            },
            {
                name: "Nível Básico", 
                texts: [
                    "A mente que se abre a uma nova ideia jamais voltará ao seu tamanho original. Seja curioso e questione sempre.",
                    "Não é o mais forte que sobrevive, nem o mais inteligente, mas o que melhor se adapta às mudanças do mundo.",
                    "O sucesso é ir de fracasso em fracasso sem perder o entusiasmo. A persistência é o caminho do êxito."
                ],
                difficulty: "Básico",
                timeLimit: 65,
                targetWPM: 40
            },
            {
                name: "Nível Intermediário",
                texts: [
                    "A única fonte de conhecimento é a experiência. Investir em conhecimento rende sempre os melhores juros para o futuro.",
                    "Grandes realizações requerem grandes ambições. O único lugar onde o sucesso vem antes do trabalho é no dicionário.",
                    "A diferença entre o possível e o impossível está na determinação da pessoa. Seja você mesmo; todos os outros já foram tomados."
                ],
                difficulty: "Intermediário", 
                timeLimit: 60,
                targetWPM: 50
            },
            {
                name: "Nível Avançado",
                texts: [
                    "A vida é o que acontece enquanto você está ocupado fazendo outros planos. Duas coisas são infinitas: o universo e a estupidez humana.",
                    "Seja a mudança que você quer ver no mundo. A imaginação é mais importante que o conhecimento, pois o conhecimento é limitado.",
                    "O verdadeiro sinal de inteligência não é o conhecimento, mas a imaginação. A educação é aquilo que permanece depois que você esquece tudo."
                ],
                difficulty: "Avançado",
                timeLimit: 55,
                targetWPM: 60
            },
            {
                name: "Nível Expert",
                texts: [
                    "A tecnologia é melhor quando aproxima as pessoas. A inovação distingue um líder de um seguidor. O futuro pertence àqueles que se preparam hoje.",
                    "A inteligência artificial é o novo motor da inovação. Machine learning e big data estão transformando a maneira como vivemos e trabalhamos.",
                    "Programação é a arte de resolver problemas complexos com soluções elegantes. Algoritmos eficientes são a base da computação moderna."
                ],
                difficulty: "Expert",
                timeLimit: 50,
                targetWPM: 70
            }
        ];
        
        // Estado do jogo
        this.currentLevel = 0;
        this.currentTextIndex = 0;
        this.currentText = '';
        this.startTime = null;
        this.endTime = null;
        this.timer = null;
        this.timeLeft = 70;
        this.isGameActive = false;
        
        // Estatísticas
        this.correctChars = 0;
        this.totalChars = 0;
        this.errors = 0;
        this.totalKeystrokes = 0;
        this.wpm = 0;
        this.accuracy = 100;
        this.completedLevels = [];
        this.errorPositions = new Set();
        
        // Elementos DOM
        this.initializeElements();
        this.setupEventListeners();
        this.resetGame();
        this.setupTheme();
    }
    
    initializeElements() {
        this.typingText = document.getElementById('typingText');
        this.typingInput = document.getElementById('typingInput');
        this.timeLeftElement = document.getElementById('timeLeft');
        this.wpmElement = document.getElementById('wpm');
        this.accuracyElement = document.getElementById('accuracy');
        this.errorsElement = document.getElementById('errors');
        this.startBtn = document.getElementById('startBtn');
        this.restartBtn = document.getElementById('restartBtn');
        this.nextLevelBtn = document.getElementById('nextLevelBtn');
        this.backBtn = document.getElementById('backBtn');
        this.resultsDiv = document.getElementById('results');
        this.finalWPM = document.getElementById('finalWPM');
        this.finalAccuracy = document.getElementById('finalAccuracy');
        this.finalErrors = document.getElementById('finalErrors');
        this.finalChars = document.getElementById('finalChars');
        this.performanceMessage = document.getElementById('performanceMessage');
        this.playAgainBtn = document.getElementById('playAgainBtn');
        this.phaseInfo = document.getElementById('phaseInfo');
        this.progressFill = document.getElementById('progressFill');
        this.currentWPM = document.getElementById('currentWPM');
        this.currentAccuracy = document.getElementById('currentAccuracy');
        this.themeToggle = document.getElementById('themeToggle');
        this.audioToggle = document.getElementById('audioToggle');
    }
    
    setupEventListeners() {
        // Botões principais
        this.startBtn?.addEventListener('click', () => this.startTest());
        this.restartBtn?.addEventListener('click', () => this.resetGame());
        this.nextLevelBtn?.addEventListener('click', () => this.nextLevel());
        this.backBtn?.addEventListener('click', () => this.goBack());
        this.playAgainBtn?.addEventListener('click', () => this.resetGame());
        this.themeToggle?.addEventListener('click', () => this.toggleTheme());
        this.audioToggle?.addEventListener('click', () => this.toggleAudio());
        
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
            if (e.ctrlKey && e.key === 'Enter' && !this.isGameActive) {
                this.startTest();
            }
        });
        
        // Prevenir seleção de texto
        this.typingText?.addEventListener('selectstart', (e) => e.preventDefault());
    }
    
    setupTheme() {
        // Tema escuro como padrão
        const savedTheme = localStorage.getItem('typingGameTheme') || 'dark';
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            this.themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            this.themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
        
        // Verificar estado do áudio
        const audioEnabled = localStorage.getItem('audioEnabled') !== 'false';
        if (window.audioManager) {
            window.audioManager.setEnabled(audioEnabled);
        }
        this.updateAudioButton(audioEnabled);
    }
    
    toggleTheme() {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        
        this.themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        localStorage.setItem('typingGameTheme', isDark ? 'dark' : 'light');
        
        // Efeito visual
        this.themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            this.themeToggle.style.transform = '';
        }, 400);
    }
    
    toggleAudio() {
        if (!window.audioManager) return;
        
        const currentState = window.audioManager.isAudioEnabled();
        const newState = !currentState;
        
        window.audioManager.setEnabled(newState);
        this.updateAudioButton(newState);
        
        // Feedback visual
        this.audioToggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.audioToggle.style.transform = '';
        }, 200);
        
        // Tocar som de teste se habilitado
        if (newState) {
            setTimeout(() => window.audioManager.playCorrectKey(), 100);
        }
    }
    
    updateAudioButton(enabled) {
        if (!this.audioToggle) return;
        
        if (enabled) {
            this.audioToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
            this.audioToggle.classList.remove('disabled');
            this.audioToggle.title = 'Desativar Sons';
        } else {
            this.audioToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
            this.audioToggle.classList.add('disabled');
            this.audioToggle.title = 'Ativar Sons';
        }
    }
    
    resetGame() {
        this.currentLevel = 0;
        this.currentTextIndex = 0;
        this.currentText = this.getCurrentText();
        this.startTime = null;
        this.endTime = null;
        this.timeLeft = this.levels[this.currentLevel].timeLimit;
        this.isGameActive = false;
        
        // Reset estatísticas
        this.correctChars = 0;
        this.totalChars = 0;
        this.errors = 0;
        this.totalKeystrokes = 0;
        this.wpm = 0;
        this.accuracy = 100;
        this.completedLevels = [];
        this.errorPositions = new Set();
        
        this.stopTimer();
        this.displayText();
        this.updateStats();
        this.updateLevelInfo();
        this.resetUI();
        
        document.body.classList.remove('game-active', 'game-finished');
        
        // Efeito visual de reset
        this.addVisualEffect('reset');
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
        
        if (this.nextLevelBtn) {
            this.nextLevelBtn.style.display = 'none';
        }
        
        if (this.resultsDiv) {
            this.resultsDiv.style.display = 'none';
        }
        
        if (this.progressFill) {
            this.progressFill.style.width = '0%';
        }
    }
    
    getCurrentText() {
        const level = this.levels[this.currentLevel];
        return level.texts[this.currentTextIndex % level.texts.length];
    }
    
    nextLevel() {
        if (this.currentLevel < this.levels.length - 1) {
            this.completedLevels.push(this.currentLevel);
            this.currentLevel++;
            this.currentTextIndex = Math.floor(Math.random() * this.levels[this.currentLevel].texts.length);
            this.currentText = this.getCurrentText();
            this.startTime = null;
            this.endTime = null;
            this.timeLeft = this.levels[this.currentLevel].timeLimit;
            this.isGameActive = false;
            
            // Reset estatísticas
            this.correctChars = 0;
            this.totalChars = 0;
            this.errors = 0;
            this.totalKeystrokes = 0;
            this.wpm = 0;
            this.accuracy = 100;
            this.errorPositions = new Set();
            
            this.stopTimer();
            this.displayText();
            this.updateStats();
            this.updateLevelInfo();
            this.resetUI();
            
            document.body.classList.remove('game-active', 'game-finished');
            
            // Efeito visual de próximo nível
            this.addVisualEffect('levelUp');
            this.playSound('levelUp');
        } else {
            this.showFinalResults();
        }
    }
    
    goBack() {
        window.location.href = 'index.html#games';
    }
    
    updateLevelInfo() {
        if (this.phaseInfo) {
            const level = this.levels[this.currentLevel];
            this.phaseInfo.innerHTML = `
                <h3><i class="fas fa-layer-group"></i> ${level.name}</h3>
                <p>Tempo: ${level.timeLimit}s | Meta: ${level.targetWPM} WPM | ${level.difficulty}</p>
                <div class="phase-progress">
                    ${this.levels.map((_, index) => 
                        `<div class="phase-dot ${
                            this.completedLevels.includes(index) ? 'completed' : 
                            index === this.currentLevel ? 'current' : ''
                        }"></div>`
                    ).join('')}
                </div>
            `;
        }
    }
    
    displayText() {
        if (!this.typingText) return;
        
        let displayHTML = '';
        const inputValue = this.typingInput?.value || '';
        
        for (let i = 0; i < this.currentText.length; i++) {
            let className = 'char';
            
            if (i < inputValue.length) {
                const inputChar = inputValue[i];
                const textChar = this.currentText[i];
                className += inputChar === textChar ? ' correct' : ' incorrect';
            } else if (i === inputValue.length && this.isGameActive) {
                className += ' current';
            }
            
            const char = this.currentText[i] === ' ' ? '&nbsp;' : this.currentText[i];
            displayHTML += `<span class="${className}">${char}</span>`;
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
        
        // Efeito visual de início
        this.addVisualEffect('start');
        this.playSound('start');
    }
    
    startTimer() {
        this.timeLeft = this.levels[this.currentLevel].timeLimit;
        this.timer = setInterval(() => {
            this.timeLeft--;
            this.updateStats();
            
            // Aviso de tempo baixo
            if (this.timeLeft === 10) {
                this.addVisualEffect('warning');
                this.playSound('warning');
            }
            
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
        
        // Efeito visual de fim
        this.addVisualEffect('finish');
        this.playSound('finish');
    }
    
    handleInput(e) {
        if (!this.isGameActive) return;
        
        const inputValue = e.target.value;
        this.totalChars = inputValue.length;
        
        // Calcular caracteres corretos
        this.correctChars = 0;
        
        for (let i = 0; i < inputValue.length && i < this.currentText.length; i++) {
            if (inputValue[i] === this.currentText[i]) {
                this.correctChars++;
            } else {
                // Marcar posição como erro se ainda não foi marcada
                if (!this.errorPositions.has(i)) {
                    this.errorPositions.add(i);
                }
            }
        }
        
        // Total de erros é o tamanho do Set de posições com erro
        this.errors = this.errorPositions.size;
        
        // Atualizar progresso
        const progress = (inputValue.length / this.currentText.length) * 100;
        if (this.progressFill) {
            this.progressFill.style.width = Math.min(progress, 100) + '%';
        }
        
        this.displayText();
        this.updateStats();
        
        // Verificar se terminou
        if (inputValue === this.currentText) {
            this.endTest();
        }
        
        // Limitar input
        if (inputValue.length > this.currentText.length) {
            e.target.value = inputValue.substring(0, this.currentText.length);
        }
        
        // Feedback sonoro e visual
        const lastChar = inputValue[inputValue.length - 1];
        const expectedChar = this.currentText[inputValue.length - 1];
        if (lastChar && expectedChar) {
            const isCorrect = lastChar === expectedChar;
            this.playSound(isCorrect ? 'correct' : 'error');
            
            // Efeito visual no container
            const container = document.querySelector('.typing-text-container');
            if (container) {
                container.classList.remove('char-success', 'char-error');
                container.classList.add(isCorrect ? 'char-success' : 'char-error');
                setTimeout(() => {
                    container.classList.remove('char-success', 'char-error');
                }, 300);
            }
        }
    }
    
    handleKeyDown(e) {
        if (!this.isGameActive) return;
        
        // Contar apenas teclas de caracteres válidos
        if (e.key.length === 1 || e.key === 'Backspace') {
            this.totalKeystrokes++;
        }
        
        // Prevenir algumas teclas
        if (['Tab'].includes(e.key)) {
            e.preventDefault();
        }
        
        if (e.key === 'Enter') {
            if (this.typingInput.value === this.currentText) {
                this.endTest();
            }
            e.preventDefault();
        }
    }
    
    updateStats() {
        // Tempo
        if (this.timeLeftElement) {
            this.timeLeftElement.textContent = this.timeLeft;
            
            // Mudança de cor baseada no tempo
            if (this.timeLeft <= 10) {
                this.timeLeftElement.style.color = '#ff6b6b';
            } else if (this.timeLeft <= 30) {
                this.timeLeftElement.style.color = '#f39c12';
            } else {
                this.timeLeftElement.style.color = '';
            }
        }
        
        // WPM
        if (this.startTime && this.totalChars > 0) {
            const timeElapsed = (new Date().getTime() - this.startTime) / 1000 / 60;
            this.wpm = Math.round((this.correctChars / 5) / timeElapsed) || 0;
        }
        
        if (this.wpmElement) {
            const oldWPM = this.wpmElement.textContent;
            this.wpmElement.textContent = this.wpm;
            
            // Animação quando WPM muda
            if (oldWPM !== this.wpm.toString()) {
                this.wpmElement.style.animation = 'valueUpdate 0.3s ease-out';
                setTimeout(() => {
                    this.wpmElement.style.animation = '';
                }, 300);
            }
        }
        
        if (this.currentWPM) {
            this.currentWPM.textContent = this.wpm + ' WPM';
        }
        
        // Precisão baseada em caracteres corretos vs total digitado + erros
        const totalAttempts = this.totalChars + this.errors;
        if (totalAttempts > 0) {
            this.accuracy = Math.round((this.correctChars / totalAttempts) * 100);
        } else {
            this.accuracy = 100;
        }
        
        if (this.accuracyElement) {
            this.accuracyElement.textContent = this.accuracy + '%';
        }
        
        if (this.currentAccuracy) {
            this.currentAccuracy.textContent = this.accuracy + '%';
        }
        
        // Erros
        if (this.errorsElement) {
            const oldErrors = this.errorsElement.textContent;
            this.errorsElement.textContent = this.errors;
            
            // Animação quando erros aumentam
            if (oldErrors !== this.errors.toString() && this.errors > 0) {
                this.errorsElement.style.animation = 'error 0.4s ease-out';
                setTimeout(() => {
                    this.errorsElement.style.animation = '';
                }, 400);
            }
        }
    }
    
    calculateFinalStats() {
        if (this.startTime && this.endTime) {
            const timeElapsed = (this.endTime - this.startTime) / 1000 / 60;
            this.wpm = Math.round((this.correctChars / 5) / timeElapsed) || 0;
        }
        
        const totalAttempts = this.totalChars + this.errors;
        if (totalAttempts > 0) {
            this.accuracy = Math.round((this.correctChars / totalAttempts) * 100);
        }
    }
    
    showResults() {
        if (!this.resultsDiv) return;
        
        // Atualizar resultados
        if (this.finalWPM) {
            this.finalWPM.textContent = this.wpm + ' WPM';
        }
        
        if (this.finalAccuracy) {
            this.finalAccuracy.textContent = this.accuracy + '%';
        }
        
        if (this.finalErrors) {
            this.finalErrors.textContent = this.errors;
        }
        
        if (this.finalChars) {
            this.finalChars.textContent = this.correctChars + '/' + this.totalChars;
        }
        
        this.showPerformanceMessage();
        
        // Mostrar botão apropriado
        if (this.currentLevel < this.levels.length - 1) {
            if (this.nextLevelBtn) {
                this.nextLevelBtn.style.display = 'inline-flex';
            }
        } else {
            if (this.playAgainBtn) {
                this.playAgainBtn.style.display = 'inline-flex';
            }
        }
        
        this.resultsDiv.style.display = 'block';
        this.resultsDiv.scrollIntoView({ behavior: 'smooth' });
    }
    
    showPerformanceMessage() {
        if (!this.performanceMessage) return;
        
        const level = this.levels[this.currentLevel];
        const targetWPM = level.targetWPM;
        let message = '';
        let className = '';
        
        if (this.wpm >= targetWPM + 20 && this.accuracy >= 95) {
            message = `🏆 EXCEPCIONAL! ${this.wpm} WPM com ${this.accuracy}% de precisão! Você é um mestre da digitação!`;
            className = 'excellent';
        } else if (this.wpm >= targetWPM && this.accuracy >= 90) {
            message = `🎯 EXCELENTE! Meta atingida com ${this.wpm} WPM e ${this.accuracy}% de precisão!`;
            className = 'excellent';
        } else if (this.wpm >= targetWPM - 10 && this.accuracy >= 85) {
            message = `👍 MUITO BOM! Quase na meta com ${this.wpm} WPM e ${this.accuracy}% de precisão!`;
            className = 'good';
        } else if (this.wpm >= targetWPM - 20 && this.accuracy >= 75) {
            message = `📈 BOM PROGRESSO! Continue praticando para atingir ${targetWPM} WPM!`;
            className = 'average';
        } else {
            message = `💪 CONTINUE PRATICANDO! Foque na precisão primeiro, a velocidade vem naturalmente!`;
            className = 'poor';
        }
        
        // Adicionar dicas baseadas na performance
        if (this.accuracy < 85) {
            message += `<br><small>💡 Dica: Diminua a velocidade e foque na precisão. É melhor digitar devagar e correto!</small>`;
        } else if (this.wpm < targetWPM) {
            message += `<br><small>⚡ Dica: Sua precisão está boa! Agora tente aumentar gradualmente a velocidade.</small>`;
        }
        
        this.performanceMessage.innerHTML = message;
        this.performanceMessage.className = 'performance-message ' + className;
    }
    
    showFinalResults() {
        if (this.performanceMessage) {
            const avgWPM = Math.round(
                this.completedLevels.reduce((sum, level) => sum + this.wpm, 0) / 
                Math.max(this.completedLevels.length, 1)
            );
            
            this.performanceMessage.innerHTML = `
                <h3>🎉 PARABÉNS! Você completou todos os 5 níveis!</h3>
                <p>Velocidade média: ${avgWPM} WPM | Você demonstrou excelente evolução!</p>
                <p>🏆 Agora você é oficialmente um Expert em Digitação Rápida!</p>
            `;
            this.performanceMessage.className = 'performance-message excellent';
        }
        
        if (this.playAgainBtn) {
            this.playAgainBtn.style.display = 'inline-flex';
        }
        
        if (this.nextLevelBtn) {
            this.nextLevelBtn.style.display = 'none';
        }
    }
    
    saveScore() {
        try {
            const scores = JSON.parse(localStorage.getItem('modernTypingScores') || '[]');
            const newScore = {
                wpm: this.wpm,
                accuracy: this.accuracy,
                correctChars: this.correctChars,
                totalChars: this.totalChars,
                errors: this.errors,
                totalKeystrokes: this.totalKeystrokes,
                level: this.currentLevel + 1,
                levelName: this.levels[this.currentLevel].name,
                difficulty: this.levels[this.currentLevel].difficulty,
                targetWPM: this.levels[this.currentLevel].targetWPM,
                timeUsed: this.levels[this.currentLevel].timeLimit - this.timeLeft,
                date: new Date().toISOString(),
                timestamp: Date.now()
            };
            
            scores.push(newScore);
            
            // Manter apenas os últimos 100 scores
            if (scores.length > 100) {
                scores.splice(0, scores.length - 100);
            }
            
            localStorage.setItem('modernTypingScores', JSON.stringify(scores));
            
            // Salvar melhor pontuação
            const bestScore = JSON.parse(localStorage.getItem('modernTypingBestScore') || '{}');
            if (!bestScore.wpm || this.wpm > bestScore.wpm || 
                (this.wpm === bestScore.wpm && this.accuracy > bestScore.accuracy)) {
                bestScore.wpm = this.wpm;
                bestScore.accuracy = this.accuracy;
                bestScore.level = this.currentLevel + 1;
                bestScore.date = new Date().toISOString();
                localStorage.setItem('modernTypingBestScore', JSON.stringify(bestScore));
            }
        } catch (error) {
            console.log('Erro ao salvar pontuação:', error);
        }
    }
    
    addVisualEffect(type) {
        const container = document.querySelector('.typing-container');
        if (!container) return;
        
        switch (type) {
            case 'start':
                container.classList.add('success-animation');
                setTimeout(() => container.classList.remove('success-animation'), 600);
                break;
            case 'finish':
                container.classList.add('success-animation');
                setTimeout(() => container.classList.remove('success-animation'), 600);
                break;
            case 'error':
                container.classList.add('error-animation');
                setTimeout(() => container.classList.remove('error-animation'), 500);
                break;
            case 'warning':
                if (this.timeLeftElement) {
                    this.timeLeftElement.style.animation = 'pulse 0.5s ease-in-out 3';
                    setTimeout(() => {
                        this.timeLeftElement.style.animation = '';
                    }, 1500);
                }
                break;
            case 'levelUp':
                container.classList.add('success-animation');
                setTimeout(() => container.classList.remove('success-animation'), 600);
                break;
            case 'reset':
                container.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    container.style.transform = '';
                }, 200);
                break;
        }
    }
    
    playSound(type) {
        if (!window.audioManager) return;
        
        switch (type) {
            case 'correct':
                window.audioManager.playCorrectKey();
                break;
            case 'error':
                window.audioManager.playErrorKey();
                break;
            case 'start':
                window.audioManager.playGameStart();
                break;
            case 'finish':
                window.audioManager.playGameFinish();
                break;
            case 'warning':
                window.audioManager.playWarning();
                break;
            case 'levelUp':
                window.audioManager.playLevelUp();
                break;
        }
    }
    
    getStats() {
        try {
            const scores = JSON.parse(localStorage.getItem('modernTypingScores') || '[]');
            const bestScore = JSON.parse(localStorage.getItem('modernTypingBestScore') || '{}');
            
            if (scores.length === 0) {
                return {
                    gamesPlayed: 0,
                    averageWPM: 0,
                    averageAccuracy: 0,
                    bestWPM: 0,
                    bestAccuracy: 0,
                    bestLevel: 0
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
                bestLevel: bestScore.level || 0,
                lastPlayed: scores[scores.length - 1]?.date
            };
        } catch (error) {
            console.log('Erro ao obter estatísticas:', error);
            return {
                gamesPlayed: 0,
                averageWPM: 0,
                averageAccuracy: 0,
                bestWPM: 0,
                bestAccuracy: 0,
                bestLevel: 0
            };
        }
    }
}

// ===========================
//   INICIALIZAÇÃO E EFEITOS
// ===========================

let modernTypingGame = null;

document.addEventListener('DOMContentLoaded', function() {
    modernTypingGame = new ModernTypingGame();
    initializeModernEffects();
    showWelcomeMessage();
});

function initializeModernEffects() {
    // Criar partículas flutuantes
    createFloatingParticles();
    
    // Animação do título
    animateTitle();
    
    // Efeito de digitação no placeholder
    animatePlaceholder();
}

function createFloatingParticles() {
    const container = document.querySelector('.typing-game-wrapper');
    if (!container) return;
    
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 6px;
            height: 6px;
            background: linear-gradient(45deg, #43e97b, #38f9d7);
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: particleFloat ${5 + Math.random() * 5}s ease-in-out infinite;
            z-index: -1;
            opacity: 0.6;
            pointer-events: none;
        `;
        container.appendChild(particle);
    }
    
    // Adicionar CSS da animação se não existir
    if (!document.getElementById('particle-styles')) {
        const style = document.createElement('style');
        style.id = 'particle-styles';
        style.textContent = `
            @keyframes particleFloat {
                0%, 100% { 
                    transform: translateY(0px) translateX(0px) rotate(0deg) scale(1); 
                }
                25% { 
                    transform: translateY(-30px) translateX(20px) rotate(90deg) scale(1.2); 
                }
                50% { 
                    transform: translateY(-10px) translateX(-20px) rotate(180deg) scale(0.8); 
                }
                75% { 
                    transform: translateY(-40px) translateX(10px) rotate(270deg) scale(1.1); 
                }
            }
        `;
        document.head.appendChild(style);
    }
}

function animateTitle() {
    const title = document.querySelector('.header-content h1');
    if (!title) return;
    
    title.style.opacity = '0';
    title.style.transform = 'translateY(-30px)';
    
    setTimeout(() => {
        title.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
        title.style.opacity = '1';
        title.style.transform = 'translateY(0)';
    }, 300);
}

function animatePlaceholder() {
    const input = document.getElementById('typingInput');
    if (!input) return;
    
    const placeholders = [
        'Digite o texto acima aqui...',
        'Foque na precisão primeiro...',
        'A velocidade vem com a prática...',
        'Mantenha uma postura correta...',
        'Use todos os dedos...'
    ];
    
    let currentIndex = 0;
    
    setInterval(() => {
        if (!input.disabled && !input.value) {
            currentIndex = (currentIndex + 1) % placeholders.length;
            input.placeholder = placeholders[currentIndex];
        }
    }, 3000);
}

function showWelcomeMessage() {
    setTimeout(() => {
        const welcome = document.createElement('div');
        welcome.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 1.5rem 2rem;
            border-radius: 15px;
            box-shadow: 0 15px 40px rgba(102, 126, 234, 0.3);
            z-index: 1000;
            max-width: 400px;
            animation: slideInRight 0.6s cubic-bezier(0.4, 0, 0.2, 1);
            font-size: 0.95rem;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
        `;
        welcome.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                <strong style="font-size: 1.1rem;">🚀 Digitação Rápida Pro</strong>
                <button onclick="this.parentElement.parentElement.remove()" style="background: rgba(255, 255, 255, 0.2); border: none; color: white; cursor: pointer; font-size: 1.3rem; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">×</button>
            </div>
            <p style="margin: 0; opacity: 0.95; line-height: 1.5;">
                ✨ Sistema moderno com textos em português<br>
                📊 Métricas precisas e contador de erros<br>
                ⏱️ 70 segundos por teste<br>
                🎯 5 níveis progressivos de dificuldade
            </p>
        `;
        
        document.body.appendChild(welcome);
        
        setTimeout(() => {
            if (welcome.parentElement) {
                welcome.style.animation = 'slideOutRight 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                setTimeout(() => welcome.remove(), 600);
            }
        }, 10000);
    }, 1500);
    
    // Adicionar CSS das animações
    if (!document.getElementById('welcome-styles')) {
        const style = document.createElement('style');
        style.id = 'welcome-styles';
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
            @keyframes slideOutRight {
                from { 
                    transform: translateX(0); 
                    opacity: 1; 
                }
                to { 
                    transform: translateX(100%); 
                    opacity: 0; 
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// ===========================
//   FUNÇÕES UTILITÁRIAS GLOBAIS
// ===========================

function getModernTypingStats() {
    return modernTypingGame ? modernTypingGame.getStats() : null;
}

function resetModernTypingStats() {
    if (confirm('Tem certeza que deseja resetar todas as estatísticas? Esta ação não pode ser desfeita.')) {
        localStorage.removeItem('modernTypingScores');
        localStorage.removeItem('modernTypingBestScore');
        alert('✅ Estatísticas resetadas com sucesso!');
        if (modernTypingGame) {
            modernTypingGame.resetGame();
        }
    }
}

// Exportar para uso global
window.ModernTypingGame = ModernTypingGame;
window.getModernTypingStats = getModernTypingStats;
window.resetModernTypingStats = resetModernTypingStats;