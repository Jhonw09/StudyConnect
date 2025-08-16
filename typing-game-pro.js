// ===========================
//   JOGO DE DIGITAÇÃO PROFISSIONAL
// ===========================

class TypingGamePro {
    constructor() {
        this.wordSets = {
            programming: [
                "function", "variable", "array", "object", "method", "class", "interface", "algorithm", "database", "framework",
                "javascript", "python", "react", "nodejs", "typescript", "mongodb", "express", "angular", "vue", "docker",
                "component", "module", "package", "library", "repository", "version", "deployment", "testing", "debugging", "optimization"
            ],
            technology: [
                "artificial", "intelligence", "machine", "learning", "blockchain", "cryptocurrency", "quantum", "computing", "cybersecurity", "automation",
                "innovation", "digital", "transformation", "cloud", "internet", "virtual", "reality", "augmented", "analytics", "data",
                "network", "protocol", "encryption", "authentication", "authorization", "infrastructure", "scalability", "performance", "monitoring", "integration"
            ],
            business: [
                "strategy", "management", "leadership", "innovation", "productivity", "efficiency", "optimization", "performance", "analytics", "metrics",
                "entrepreneurship", "investment", "marketing", "branding", "customer", "experience", "stakeholder", "revenue", "profit", "growth",
                "planning", "execution", "evaluation", "feedback", "improvement", "collaboration", "communication", "negotiation", "decision", "solution"
            ],
            education: [
                "knowledge", "learning", "education", "teaching", "student", "professor", "university", "research", "academic", "scholarship",
                "curriculum", "methodology", "pedagogy", "assessment", "evaluation", "certification", "qualification", "competency", "skill", "expertise",
                "development", "training", "workshop", "seminar", "conference", "publication", "thesis", "dissertation", "project", "assignment"
            ]
        };
        
        this.phases = [
            {
                name: "Fase 1 - Iniciante",
                wordSet: "education",
                wordCount: 15,
                difficulty: "Fácil",
                timeLimit: 60,
                targetWPM: 25
            },
            {
                name: "Fase 2 - Básico",
                wordSet: "business",
                wordCount: 20,
                difficulty: "Básico",
                timeLimit: 50,
                targetWPM: 35
            },
            {
                name: "Fase 3 - Intermediário",
                wordSet: "technology",
                wordCount: 25,
                difficulty: "Intermediário",
                timeLimit: 45,
                targetWPM: 45
            },
            {
                name: "Fase 4 - Avançado",
                wordSet: "programming",
                wordCount: 30,
                difficulty: "Avançado",
                timeLimit: 40,
                targetWPM: 55
            },
            {
                name: "Fase 5 - Expert",
                wordSet: "programming",
                wordCount: 35,
                difficulty: "Expert",
                timeLimit: 35,
                targetWPM: 65
            }
        ];
        
        this.currentPhase = 0;
        this.currentWords = [];
        this.currentWordIndex = 0;
        this.currentCharIndex = 0;
        this.currentText = '';
        this.startTime = null;
        this.endTime = null;
        this.timer = null;
        this.timeLeft = 60;
        this.isGameActive = false;
        this.correctChars = 0;
        this.totalChars = 0;
        this.errors = 0;
        this.keystrokeErrors = 0;
        this.totalKeystrokes = 0;
        this.wordsTyped = 0;
        this.wpm = 0;
        this.accuracy = 100;
        this.phaseCompleted = false;
        this.completedPhases = [];
        
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
        this.nextPhaseBtn = document.getElementById('nextPhaseBtn');
        this.backBtn = document.getElementById('backBtn');
        this.resultsDiv = document.getElementById('results');
        this.finalWPM = document.getElementById('finalWPM');
        this.finalAccuracy = document.getElementById('finalAccuracy');
        this.finalChars = document.getElementById('finalChars');
        this.performanceMessage = document.getElementById('performanceMessage');
        this.playAgainBtn = document.getElementById('playAgainBtn');
        this.inputIndicator = document.getElementById('inputIndicator');
        this.phaseInfo = document.getElementById('phaseInfo');
    }
    
    setupEventListeners() {
        this.startBtn?.addEventListener('click', () => this.startTest());
        this.restartBtn?.addEventListener('click', () => this.resetGame());
        this.nextPhaseBtn?.addEventListener('click', () => this.nextPhase());
        this.backBtn?.addEventListener('click', () => this.goBack());
        this.playAgainBtn?.addEventListener('click', () => this.resetGame());
        
        this.typingInput?.addEventListener('input', (e) => this.handleInput(e));
        this.typingInput?.addEventListener('keydown', (e) => this.handleKeyDown(e));
        this.typingInput?.addEventListener('paste', (e) => e.preventDefault());
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isGameActive) {
                this.endTest();
            }
            if (e.key === 'F5') {
                e.preventDefault();
                this.resetGame();
            }
        });
    }
    
    generateWords() {
        const phase = this.phases[this.currentPhase];
        const wordSet = this.wordSets[phase.wordSet];
        const shuffled = [...wordSet].sort(() => Math.random() - 0.5);
        this.currentWords = shuffled.slice(0, phase.wordCount);
        this.currentText = this.currentWords.join(' ');
    }
    
    resetGame() {
        this.currentPhase = 0;
        this.currentWordIndex = 0;
        this.currentCharIndex = 0;
        this.startTime = null;
        this.endTime = null;
        this.timeLeft = this.phases[this.currentPhase].timeLimit;
        this.isGameActive = false;
        this.correctChars = 0;
        this.totalChars = 0;
        this.errors = 0;
        this.keystrokeErrors = 0;
        this.totalKeystrokes = 0;
        this.wordsTyped = 0;
        this.wpm = 0;
        this.accuracy = 100;
        this.phaseCompleted = false;
        this.completedPhases = [];
        
        this.stopTimer();
        this.generateWords();
        this.displayText();
        this.updateStats();
        this.updatePhaseInfo();
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
        
        if (this.nextPhaseBtn) {
            this.nextPhaseBtn.style.display = 'none';
        }
        
        if (this.resultsDiv) {
            this.resultsDiv.style.display = 'none';
        }
        
        if (this.inputIndicator) {
            this.inputIndicator.style.width = '0%';
        }
    }
    
    nextPhase() {
        if (this.currentPhase < this.phases.length - 1) {
            this.completedPhases.push(this.currentPhase);
            this.currentPhase++;
            this.currentWordIndex = 0;
            this.currentCharIndex = 0;
            this.startTime = null;
            this.endTime = null;
            this.timeLeft = this.phases[this.currentPhase].timeLimit;
            this.isGameActive = false;
            this.correctChars = 0;
            this.totalChars = 0;
            this.errors = 0;
            this.keystrokeErrors = 0;
            this.totalKeystrokes = 0;
            this.wordsTyped = 0;
            this.wpm = 0;
            this.accuracy = 100;
            this.phaseCompleted = false;
            
            this.stopTimer();
            this.generateWords();
            this.displayText();
            this.updateStats();
            this.updatePhaseInfo();
            this.resetUI();
            
            document.body.classList.remove('game-active', 'game-finished');
        } else {
            this.showFinalResults();
        }
    }
    
    goBack() {
        window.location.href = 'index.html#quiz';
    }
    
    updatePhaseInfo() {
        if (this.phaseInfo) {
            const phase = this.phases[this.currentPhase];
            this.phaseInfo.innerHTML = `
                <h3><i class="fas fa-layer-group"></i> ${phase.name}</h3>
                <p>Dificuldade: ${phase.difficulty} | Tempo: ${phase.timeLimit}s | Meta: ${phase.targetWPM} WPM</p>
                <div class="phase-progress">
                    ${this.phases.map((_, index) => 
                        `<div class="phase-dot ${
                            this.completedPhases.includes(index) ? 'completed' : 
                            index === this.currentPhase ? 'current' : ''
                        }"></div>`
                    ).join('')}
                </div>
            `;
        }
    }
    
    displayText() {
        if (!this.typingText) return;
        
        let displayHTML = '';
        let charIndex = 0;
        
        for (let wordIndex = 0; wordIndex < this.currentWords.length; wordIndex++) {
            const word = this.currentWords[wordIndex];
            
            for (let i = 0; i < word.length; i++) {
                let className = 'char';
                
                if (charIndex < this.typingInput.value.length) {
                    const inputChar = this.typingInput.value[charIndex];
                    const textChar = word[i];
                    className += inputChar === textChar ? ' correct' : ' incorrect';
                } else if (charIndex === this.typingInput.value.length && this.isGameActive) {
                    className += ' current';
                }
                
                displayHTML += `<span class="${className}">${word[i]}</span>`;
                charIndex++;
            }
            
            if (wordIndex < this.currentWords.length - 1) {
                let spaceClass = 'char';
                if (charIndex < this.typingInput.value.length) {
                    const inputChar = this.typingInput.value[charIndex];
                    spaceClass += inputChar === ' ' ? ' correct' : ' incorrect';
                } else if (charIndex === this.typingInput.value.length && this.isGameActive) {
                    spaceClass += ' current';
                }
                displayHTML += `<span class="${spaceClass}">&nbsp;</span>`;
                charIndex++;
            }
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
        this.timeLeft = this.phases[this.currentPhase].timeLimit;
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
        this.phaseCompleted = true;
        this.showResults();
        this.saveScore();
    }
    
    handleInput(e) {
        if (!this.isGameActive) return;
        
        const inputValue = e.target.value;
        this.totalChars = inputValue.length;
        this.totalKeystrokes++;
        
        // Calcular caracteres corretos e erros
        this.correctChars = 0;
        this.errors = 0;
        
        for (let i = 0; i < inputValue.length && i < this.currentText.length; i++) {
            if (inputValue[i] === this.currentText[i]) {
                this.correctChars++;
            } else {
                this.errors++;
            }
        }
        
        // Contar palavras digitadas
        const words = inputValue.trim().split(/\s+/);
        this.wordsTyped = words.length;
        
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
        
        // Contar erros de tecla
        if (e.key.length === 1) {
            const currentPos = this.typingInput.value.length;
            if (currentPos < this.currentText.length && e.key !== this.currentText[currentPos]) {
                this.keystrokeErrors++;
            }
        }
        
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
        // Atualizar tempo
        if (this.timeLeftElement) {
            this.timeLeftElement.textContent = this.timeLeft;
        }
        
        // Calcular WPM (palavras por minuto)
        if (this.startTime && this.totalChars > 0) {
            const timeElapsed = (new Date().getTime() - this.startTime) / 1000 / 60;
            this.wpm = Math.round((this.correctChars / 5) / timeElapsed) || 0;
        }
        
        if (this.wpmElement) {
            this.wpmElement.textContent = this.wpm;
        }
        
        // Calcular precisão
        if (this.totalKeystrokes > 0) {
            this.accuracy = Math.round(((this.totalKeystrokes - this.keystrokeErrors) / this.totalKeystrokes) * 100);
        } else {
            this.accuracy = 100;
        }
        
        if (this.accuracyElement) {
            this.accuracyElement.textContent = this.accuracy + '%';
        }
    }
    
    calculateFinalStats() {
        if (this.startTime && this.endTime) {
            const timeElapsed = (this.endTime - this.startTime) / 1000 / 60;
            this.wpm = Math.round((this.correctChars / 5) / timeElapsed) || 0;
        }
        
        if (this.totalKeystrokes > 0) {
            this.accuracy = Math.round(((this.totalKeystrokes - this.keystrokeErrors) / this.totalKeystrokes) * 100);
        }
    }
    
    showResults() {
        if (!this.resultsDiv) return;
        
        if (this.finalWPM) {
            this.finalWPM.textContent = this.wpm + ' WPM';
        }
        
        if (this.finalAccuracy) {
            this.finalAccuracy.textContent = this.accuracy + '%';
        }
        
        if (this.finalChars) {
            this.finalChars.textContent = this.correctChars + '/' + this.totalChars;
        }
        
        this.showPerformanceMessage();
        
        if (this.currentPhase < this.phases.length - 1) {
            if (this.nextPhaseBtn) {
                this.nextPhaseBtn.style.display = 'inline-flex';
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
        
        const phase = this.phases[this.currentPhase];
        const targetWPM = phase.targetWPM;
        let message = '';
        let className = '';
        
        if (this.wpm >= targetWPM + 15 && this.accuracy >= 95) {
            message = `🏆 EXCEPCIONAL! ${this.wpm} WPM com ${this.accuracy}% de precisão! Você superou a meta!`;
            className = 'performance-exceptional';
        } else if (this.wpm >= targetWPM && this.accuracy >= 90) {
            message = `🎯 META ATINGIDA! ${this.wpm} WPM com ${this.accuracy}% de precisão!`;
            className = 'performance-excellent';
        } else if (this.wpm >= targetWPM - 10 && this.accuracy >= 85) {
            message = `👍 Muito bom! Quase na meta com ${this.wpm} WPM e ${this.accuracy}% de precisão!`;
            className = 'performance-good';
        } else if (this.wpm >= targetWPM - 20 && this.accuracy >= 75) {
            message = `📈 Bom progresso! Continue praticando para atingir ${targetWPM} WPM!`;
            className = 'performance-average';
        } else {
            message = `💪 Continue praticando! Foque na precisão primeiro, velocidade vem depois!`;
            className = 'performance-needs-improvement';
        }
        
        // Adicionar estatísticas detalhadas
        message += `<br><small>Erros: ${this.keystrokeErrors} | Palavras: ${this.wordsTyped} | Teclas: ${this.totalKeystrokes}</small>`;
        
        this.performanceMessage.innerHTML = message;
        this.performanceMessage.className = 'performance-message ' + className;
    }
    
    showFinalResults() {
        if (this.performanceMessage) {
            const avgWPM = Math.round(this.completedPhases.reduce((sum, phase) => sum + this.wpm, 0) / this.completedPhases.length);
            this.performanceMessage.innerHTML = `
                <h3>🎉 PARABÉNS! Você completou todas as 5 fases!</h3>
                <p>Velocidade média: ${avgWPM} WPM | Você demonstrou excelente evolução!</p>
                <p>Agora você está pronto para desafios mais avançados de digitação!</p>
            `;
        }
        
        if (this.playAgainBtn) {
            this.playAgainBtn.style.display = 'inline-flex';
        }
        
        if (this.nextPhaseBtn) {
            this.nextPhaseBtn.style.display = 'none';
        }
    }
    
    saveScore() {
        try {
            const scores = JSON.parse(localStorage.getItem('typingGameProScores') || '[]');
            const newScore = {
                wpm: this.wpm,
                accuracy: this.accuracy,
                correctChars: this.correctChars,
                totalChars: this.totalChars,
                errors: this.errors,
                keystrokeErrors: this.keystrokeErrors,
                totalKeystrokes: this.totalKeystrokes,
                wordsTyped: this.wordsTyped,
                phase: this.currentPhase + 1,
                phaseName: this.phases[this.currentPhase].name,
                difficulty: this.phases[this.currentPhase].difficulty,
                targetWPM: this.phases[this.currentPhase].targetWPM,
                wordSet: this.phases[this.currentPhase].wordSet,
                date: new Date().toISOString(),
                timestamp: Date.now()
            };
            
            scores.push(newScore);
            
            if (scores.length > 100) {
                scores.splice(0, scores.length - 100);
            }
            
            localStorage.setItem('typingGameProScores', JSON.stringify(scores));
            
            // Salvar melhor pontuação por fase
            const bestScores = JSON.parse(localStorage.getItem('typingGameProBestScores') || '{}');
            const phaseKey = `phase_${this.currentPhase}`;
            
            if (!bestScores[phaseKey] || this.wpm > bestScores[phaseKey].wpm || 
                (this.wpm === bestScores[phaseKey].wpm && this.accuracy > bestScores[phaseKey].accuracy)) {
                bestScores[phaseKey] = {
                    wpm: this.wpm,
                    accuracy: this.accuracy,
                    date: new Date().toISOString()
                };
                localStorage.setItem('typingGameProBestScores', JSON.stringify(bestScores));
            }
        } catch (error) {
            console.log('Erro ao salvar pontuação:', error);
        }
    }
    
    getStats() {
        try {
            const scores = JSON.parse(localStorage.getItem('typingGameProScores') || '[]');
            const bestScores = JSON.parse(localStorage.getItem('typingGameProBestScores') || '{}');
            
            if (scores.length === 0) {
                return {
                    gamesPlayed: 0,
                    averageWPM: 0,
                    averageAccuracy: 0,
                    bestWPM: 0,
                    bestAccuracy: 0,
                    phaseStats: {}
                };
            }
            
            const totalWPM = scores.reduce((sum, score) => sum + score.wpm, 0);
            const totalAccuracy = scores.reduce((sum, score) => sum + score.accuracy, 0);
            
            return {
                gamesPlayed: scores.length,
                averageWPM: Math.round(totalWPM / scores.length),
                averageAccuracy: Math.round(totalAccuracy / scores.length),
                bestWPM: Math.max(...scores.map(s => s.wpm)),
                bestAccuracy: Math.max(...scores.map(s => s.accuracy)),
                lastPlayed: scores[scores.length - 1]?.date,
                phaseStats: bestScores
            };
        } catch (error) {
            console.log('Erro ao obter estatísticas:', error);
            return {
                gamesPlayed: 0,
                averageWPM: 0,
                averageAccuracy: 0,
                bestWPM: 0,
                bestAccuracy: 0,
                phaseStats: {}
            };
        }
    }
}

// ===========================
//   INICIALIZAÇÃO
// ===========================

let typingGamePro = null;

document.addEventListener('DOMContentLoaded', function() {
    typingGamePro = new TypingGamePro();
    addModernEffects();
    showWelcomeMessage();
});

function addModernEffects() {
    // Efeito de partículas no fundo
    createParticleEffect();
    
    // Animação do título
    animateTitle();
    
    // Efeitos sonoros (opcional)
    setupSoundEffects();
}

function createParticleEffect() {
    const container = document.querySelector('.typing-container');
    if (!container) return;
    
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: linear-gradient(45deg, #43e97b, #38f9d7);
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: particleFloat ${4 + Math.random() * 3}s ease-in-out infinite;
            z-index: -1;
            opacity: 0.7;
        `;
        container.appendChild(particle);
    }
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFloat {
            0%, 100% { transform: translateY(0px) translateX(0px) scale(1); }
            25% { transform: translateY(-20px) translateX(10px) scale(1.2); }
            50% { transform: translateY(-10px) translateX(-10px) scale(0.8); }
            75% { transform: translateY(-30px) translateX(5px) scale(1.1); }
        }
    `;
    document.head.appendChild(style);
}

function animateTitle() {
    const title = document.querySelector('.typing-header h1');
    if (!title) return;
    
    title.style.opacity = '0';
    title.style.transform = 'translateY(-20px)';
    title.style.transition = 'all 0.8s ease';
    
    setTimeout(() => {
        title.style.opacity = '1';
        title.style.transform = 'translateY(0)';
    }, 300);
}

function setupSoundEffects() {
    // Criar contexto de áudio para feedback sonoro
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        window.playKeySound = (isCorrect) => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(isCorrect ? 800 : 400, audioContext.currentTime);
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        };
    } catch (error) {
        window.playKeySound = () => {}; // Fallback silencioso
    }
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
            padding: 1rem 1.5rem;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
            z-index: 1000;
            max-width: 350px;
            animation: slideInRight 0.5s ease;
            font-size: 0.9rem;
        `;
        welcome.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                <strong>🚀 Jogo de Digitação Pro</strong>
                <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; color: white; cursor: pointer; font-size: 1.2rem;">×</button>
            </div>
            <p style="margin: 0; opacity: 0.9;">Sistema avançado com palavras dinâmicas, métricas precisas e 5 fases progressivas!</p>
        `;
        
        document.body.appendChild(welcome);
        
        setTimeout(() => {
            if (welcome.parentElement) {
                welcome.remove();
            }
        }, 8000);
    }, 1000);
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

// ===========================
//   FUNÇÕES UTILITÁRIAS
// ===========================

function getTypingStatsPro() {
    return typingGamePro ? typingGamePro.getStats() : null;
}

function resetAllStatsPro() {
    if (confirm('Resetar todas as estatísticas do Jogo Pro? Esta ação não pode ser desfeita.')) {
        localStorage.removeItem('typingGameProScores');
        localStorage.removeItem('typingGameProBestScores');
        alert('Estatísticas resetadas com sucesso!');
        if (typingGamePro) {
            typingGamePro.resetGame();
        }
    }
}

// Exportar para uso global
window.TypingGamePro = TypingGamePro;
window.getTypingStatsPro = getTypingStatsPro;
window.resetAllStatsPro = resetAllStatsPro;