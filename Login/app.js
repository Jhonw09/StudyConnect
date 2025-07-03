// Seleciona os botões de alternância e o corpo do documento
const signinBtn = document.getElementById('signin'); // Botão "Entrar" (para exibir o formulário de login)
const signupBtn = document.getElementById('signup'); // Botão "Cadastrar" (para exibir o formulário de cadastro)
const body = document.body; // O elemento <body> do seu HTML

// Adiciona um ouvinte de evento para o clique no botão "Entrar"
// Ele adiciona a classe 'sign-in-js' e remove 'sign-up-js' do <body>,
// controlando qual formulário é visível (presumindo CSS apropriado).
if (signinBtn) { // Verifica se o botão existe antes de adicionar o listener
    signinBtn.addEventListener('click', () => {
        body.classList.add('sign-in-js');
        body.classList.remove('sign-up-js');
    });
}


// Adiciona um ouvinte de evento para o clique no botão "Cadastrar"
// Ele adiciona a classe 'sign-up-js' e remove 'sign-in-js' do <body>,
// controlando qual formulário é visível (presumindo CSS apropriado).
if (signupBtn) { // Verifica se o botão existe antes de adicionar o listener
    signupBtn.addEventListener('click', () => {
        body.classList.add('sign-up-js');
        body.classList.remove('sign-in-js');
    });
}


// --- Lógica para o redirecionamento após o login ---
// Seleciona o formulário de login real (onde o usuário digita e-mail e senha para ENTRAR)
const loginForm = document.getElementById('loginForm');
const customAlert = document.getElementById('custom-alert'); // Seleciona o elemento do alerta personalizado

// Função para exibir o alerta personalizado
function showAlert(message, type, duration = 3000) {
    customAlert.textContent = message; // Define o texto do alerta
    customAlert.className = 'custom-alert'; // Reseta as classes
    customAlert.classList.add('show', type); // Adiciona classes para mostrar e tipo (success/error)

    setTimeout(() => {
        customAlert.classList.remove('show'); // Remove a classe 'show' para iniciar a transição de saída
        // Opcional: remover o texto após a transição para acessibilidade ou se precisar
        setTimeout(() => {
            customAlert.textContent = '';
        }, 500); // Espera um pouco mais que a transição CSS para limpar o texto
    }, duration); // Define por quanto tempo o alerta ficará visível
}


// Verifica se o formulário de login existe na página
if (loginForm) {
    // Adiciona um ouvinte de evento para o envio do formulário de login
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o recarregamento padrão da página ao enviar o formulário

        // Obtém os valores de e-mail e senha digitados pelo usuário
        // ATENÇÃO: Adicionado .trim() para remover espaços em branco no início/fim
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value.trim();

        // --- SIMULAÇÃO de Autenticação (IMPORTANTE: ISSO NÃO É SEGURO PARA PRODUÇÃO) ---
        // Em um aplicativo real, você enviaria 'email' e 'password' para um servidor
        // para validação de segurança. Esta é apenas uma simulação para fins de demonstração.
        if (email === 'Rm95197@estudante.fieb.edu.br' && password === '11022009') { // Credenciais de exemplo
            showAlert('Login bem-sucedido!', 'success'); // Usa o alerta personalizado para sucesso
            // Atrasar o redirecionamento um pouco para o usuário ver o alerta
            setTimeout(() => {
                window.location.href = "../index.html" // Redireciona o usuário para a sua página principal
            }, 1500); // Redireciona após 1.5 segundos
        } else {
            showAlert('Credenciais inválidas. Por favor, tente novamente.', 'error'); // Usa o alerta personalizado para erro
        }
    });
}