// ===========================
//   GERENCIADOR DE ÁUDIO OTIMIZADO
// ===========================

class AudioManager {
    constructor() {
        this.audioContext = null;
        this.isEnabled = true;
        this.isInitialized = false;
        this.sounds = new Map();
        this.init();
    }

    init() {
        try {
            // Criar contexto de áudio uma única vez
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.isInitialized = true;
            
            // Resumir contexto se estiver suspenso
            if (this.audioContext.state === 'suspended') {
                this.resumeContext();
            }
        } catch (error) {
            console.log('Áudio não suportado:', error);
            this.isEnabled = false;
        }
    }

    async resumeContext() {
        if (this.audioContext && this.audioContext.state === 'suspended') {
            try {
                await this.audioContext.resume();
            } catch (error) {
                console.log('Erro ao resumir contexto de áudio:', error);
            }
        }
    }

    playTone(frequency, duration, waveType = 'sine', volume = 0.1) {
        if (!this.isEnabled || !this.audioContext) return;

        try {
            // Garantir que o contexto está ativo
            this.resumeContext();

            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.type = waveType;
            oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
            
            // Envelope de volume para evitar cliques
            gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(volume, this.audioContext.currentTime + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + duration);
            
        } catch (error) {
            console.log('Erro ao reproduzir som:', error);
        }
    }

    playMelody(notes, durations, waveType = 'triangle') {
        if (!this.isEnabled || !this.audioContext) return;

        let currentTime = 0;
        notes.forEach((frequency, index) => {
            setTimeout(() => {
                this.playTone(frequency, durations[index], waveType);
            }, currentTime * 1000);
            currentTime += durations[index];
        });
    }

    // Sons específicos para o jogo de digitação
    playCorrectKey() {
        this.playTone(880, 0.08, 'triangle', 0.08);
    }

    playErrorKey() {
        this.playTone(220, 0.15, 'sawtooth', 0.12);
    }

    playGameStart() {
        this.playMelody([523, 659, 784], [0.1, 0.1, 0.2]);
    }

    playGameFinish() {
        this.playMelody([784, 880, 1047, 1319], [0.15, 0.15, 0.15, 0.3]);
    }

    playWarning() {
        for (let i = 0; i < 3; i++) {
            setTimeout(() => this.playTone(440, 0.1, 'square', 0.1), i * 150);
        }
    }

    playLevelUp() {
        this.playMelody([523, 659, 784, 1047], [0.1, 0.1, 0.1, 0.3]);
    }

    playSuccess() {
        this.playMelody([659, 784, 880, 1047, 1319], [0.1, 0.1, 0.1, 0.1, 0.4]);
    }

    // Controle de volume e habilitação
    setEnabled(enabled) {
        this.isEnabled = enabled;
        localStorage.setItem('audioEnabled', enabled.toString());
    }

    isAudioEnabled() {
        return this.isEnabled;
    }

    // Método para ativar o áudio após interação do usuário
    activate() {
        if (this.audioContext && this.audioContext.state === 'suspended') {
            this.resumeContext();
        }
    }
}

// Instância global do gerenciador de áudio
window.audioManager = new AudioManager();

// Ativar áudio na primeira interação do usuário
document.addEventListener('click', () => {
    if (window.audioManager) {
        window.audioManager.activate();
    }
}, { once: true });

document.addEventListener('keydown', () => {
    if (window.audioManager) {
        window.audioManager.activate();
    }
}, { once: true });