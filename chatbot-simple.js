// StudyBot Simples - Funcional
document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendBtn = document.getElementById('sendBtn');
    
    if (!chatMessages || !userInput || !sendBtn) {
        console.error('Elementos do chat não encontrados');
        return;
    }
    
    const responses = {
        'oi': "Oi! Sou o StudBot! 😊 Como posso ajudar?",
        'olá': "Olá! Sou o StudBot, seu assistente de estudos! 📚",
        'como você se chama': "Meu nome é StudBot! 🤖",
        'quem é você': "Sou o StudBot, assistente de estudos da StudyConnect+! 🚀",
        'cursos': "Temos cursos gratuitos de Front-End, Back-End, Design e Mobile! 💻",
        'gratuito': "Sim! Todos os cursos são 100% gratuitos! 🎉",
        'certificado': "Sim! Certificado digital gratuito! 🏆",
        'ajuda': "Posso ajudar com cursos, dúvidas e motivação! 💪"
    };
    
    function addMessage(text, isUser) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user' : 'bot'}-message`;
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-${isUser ? 'user' : 'robot'}"></i>
            </div>
            <div class="message-content">
                <p>${text}</p>
            </div>
        `;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    function findResponse(message) {
        const lowerMessage = message.toLowerCase();
        for (const [key, response] of Object.entries(responses)) {
            if (lowerMessage.includes(key)) {
                return response;
            }
        }
        return "Posso ajudar com cursos, certificados ou dúvidas! O que você precisa? 🤔";
    }
    
    function sendMessage() {
        const message = userInput.value.trim();
        if (!message) return;
        
        addMessage(message, true);
        userInput.value = '';
        
        setTimeout(() => {
            const response = findResponse(message);
            addMessage(response, false);
        }, 500);
    }
    
    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Quick buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('quick-btn')) {
            const question = e.target.dataset.question;
            addMessage(question, true);
            setTimeout(() => {
                const response = findResponse(question);
                addMessage(response, false);
            }, 500);
        }
    });
    
    console.log('StudBot carregado com sucesso!');
});