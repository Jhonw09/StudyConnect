// StudyBot - Assistente Virtual Simples
class StudyBot {
    constructor() {
        this.chatMessages = document.getElementById('chatMessages');
        this.userInput = document.getElementById('userInput');
        this.sendBtn = document.getElementById('sendBtn');
        
        this.responses = {
            // Saudações
            'oi': "Oi! Sou o StudBot, seu assistente de estudos! 😊 Como posso ajudar?",
            'olá': "Olá! Prazer em conhecê-lo! Sou o StudBot e estou aqui para ajudar nos seus estudos! 📚",
            'hello': "Hello! I'm StudBot, your study assistant! How can I help you today? 🤖",
            'bom dia': "Bom dia! Que ótimo começar o dia estudando! Como posso ajudar? ☀️",
            'boa tarde': "Boa tarde! Pronto para aprender algo novo? 🌅",
            'boa noite': "Boa noite! Estudando até tarde? Admiro sua dedicação! 🌙",
            
            // Identidade
            'como você se chama': "Meu nome é StudBot! Sou seu assistente virtual de estudos aqui no StudyConnect+! 🤖",
            'qual seu nome': "Eu sou o StudBot! Prazer em me apresentar! 😊",
            'quem é você': "Sou o StudBot, uma inteligência artificial criada para ajudar estudantes como você! Posso recomendar cursos, tirar dúvidas e motivar seus estudos! 🚀",
            'quem e vc': "Eu sou o StudBot! Seu assistente pessoal de estudos! Estou aqui 24/7 para ajudar! 💪",
            'o que você faz': "Eu ajudo estudantes com recomendações de cursos, dicas de estudo, esclarecimento de dúvidas e motivação! Sou especialista em educação online! 📖",
            
            // Funcionalidades originais
            'funciona': 'A StudyConnect+ é gratuita! Acesse cursos, faça quizzes e aprenda com professores experientes. Clique em "Entrar" para começar! 📚',
            'gratuito': 'Sim! Todos os cursos são 100% gratuitos. Nossa missão é democratizar a educação! 🎉',
            'inscrever': 'Clique em "Entrar" no menu, depois "Criar conta". Preencha seus dados e pronto! ✨',
            'cursos': 'Temos Front-End, Back-End, Design UI/UX e Mobile. Todos com certificado gratuito! 💻',
            'certificado': 'Sim! Certificado digital gratuito ao concluir qualquer curso! 🏆',
            'professores': 'Profissionais de Google, Spotify e outras grandes empresas! 👨‍🏫',
            'quiz': 'Quiz Misto (programação + cultura geral) e Quiz de Português (9º ano)! 🧠',
            'contato': 'Use a seção "Contato" ou email: contato@studyconnect.com. Resposta em 24h! 📧',
            'mobile': 'Site totalmente responsivo! Estude no celular quando quiser! 📱',
            
            // Motivação
            'difícil': "Eu sei que pode parecer difícil, mas lembre-se: todo expert já foi iniciante! Você consegue! 💪",
            'desistir': "Não desista! Cada linha de código, cada conceito aprendido te aproxima do sucesso! Vamos continuar juntos! 🌟",
            'cansado': "Descansar faz parte do aprendizado! Que tal fazer uma pausa e voltar com energia renovada? 😴",
            
            // Despedidas
            'obrigado': "De nada! Fico feliz em ajudar! Se precisar de mais alguma coisa, é só chamar! 😊",
            'valeu': "De nada! Fico feliz em ajudar! Se precisar de mais alguma coisa, é só chamar! 😊",
            'tchau': "Até logo! Continue estudando e boa sorte nos seus projetos! 👋",
            'até': "Até logo! Continue estudando e boa sorte nos seus projetos! 👋"
        };
        
        this.init();
    }
    
    init() {
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        this.userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
        
        // Quick buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('quick-btn')) {
                const question = e.target.dataset.question;
                this.addUserMessage(question);
                this.processMessage(question);
            }
        });
    }
    
    sendMessage() {
        const message = this.userInput.value.trim();
        if (!message) return;
        
        this.addUserMessage(message);
        this.userInput.value = '';
        this.processMessage(message);
    }
    
    addUserMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user-message';
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-user"></i>
            </div>
            <div class="message-content">
                <p>${message}</p>
            </div>
        `;
        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
    }
    
    addBotMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot-message';
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <p>${message}</p>
            </div>
        `;
        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
    }
    
    showTyping() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing';
        typingDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
                <div class="typing-indicator">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        `;
        this.chatMessages.appendChild(typingDiv);
        this.scrollToBottom();
        
        setTimeout(() => {
            typingDiv.remove();
        }, 1500);
    }
    
    processMessage(message) {
        this.showTyping();
        
        setTimeout(() => {
            const response = this.findResponse(message.toLowerCase());
            this.addBotMessage(response);
        }, 1500);
    }
    
    findResponse(message) {
        for (const [key, response] of Object.entries(this.responses)) {
            if (message.includes(key)) {
                return response;
            }
        }
        
        // Respostas padrão inteligentes
        const defaultResponses = [
            'Interessante! Posso ajudar com cursos, dicas de estudo ou esclarecer dúvidas. O que você gostaria de saber? 🎓',
            'Não entendi completamente, mas posso ajudar com: cursos gratuitos, certificados, professores ou motivação! 💭',
            'Que tal me perguntar sobre nossos cursos, como me chamo, ou se precisa de motivação para estudar? 😊',
            'Sou o StudBot e estou aqui para ajudar! Pergunte sobre cursos, quizzes ou qualquer dúvida de estudos! 🤖'
        ];
        
        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }
    
    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
}

// Inicializar chatbot quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    new StudyBot();
});