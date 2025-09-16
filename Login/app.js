// Sistema de Login/Cadastro Avançado com Banco SQLite
class AuthSystem {
    constructor() {
        this.init();
        this.currentEmail = '';
        this.verificationCode = '';
        this.apiUrl = 'http://localhost:3002/api';
    }

    init() {
        this.bindEvents();
        this.setupPasswordToggles();
        this.setupPasswordStrength();
        this.setupVerificationInputs();
        this.checkIfLoggedIn();
    }

    bindEvents() {
        // Alternância entre telas
        const signinBtn = document.getElementById('signin');
        const signupBtn = document.getElementById('signup');
        
        if (signinBtn) {
            signinBtn.addEventListener('click', () => this.switchToLogin());
        }
        
        if (signupBtn) {
            signupBtn.addEventListener('click', () => this.switchToRegister());
        }

        // Formulários
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');
        
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }
        
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => this.handleRegister(e));
        }

        // Validação em tempo real
        this.setupRealTimeValidation();

        // Recuperação de senha
        const forgotLink = document.getElementById('forgotPasswordLink');
        if (forgotLink) {
            forgotLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.showForgotPasswordModal();
            });
        }

        // Formulários de recuperação
        this.bindForgotPasswordEvents();
    }

    bindForgotPasswordEvents() {
        const forgotForm = document.getElementById('forgotPasswordForm');
        const verificationForm = document.getElementById('verificationForm');
        const newPasswordForm = document.getElementById('newPasswordForm');
        const cancelBtn = document.getElementById('cancelForgot');
        const resendBtn = document.getElementById('resendCode');

        if (forgotForm) {
            forgotForm.addEventListener('submit', (e) => this.handleForgotPassword(e));
        }

        if (verificationForm) {
            verificationForm.addEventListener('submit', (e) => this.handleVerification(e));
        }

        if (newPasswordForm) {
            newPasswordForm.addEventListener('submit', (e) => this.handleNewPassword(e));
        }

        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => this.closeForgotModal());
        }

        if (resendBtn) {
            resendBtn.addEventListener('click', () => this.resendVerificationCode());
        }

        // Fechar modal clicando fora
        document.querySelectorAll('.forgot-password-modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeForgotModal();
                }
            });
        });
    }

    setupPasswordToggles() {
        document.querySelectorAll('.toggle-password').forEach(toggle => {
            toggle.addEventListener('click', () => {
                const targetId = toggle.getAttribute('data-target');
                const input = document.getElementById(targetId);
                const icon = toggle.querySelector('i');
                
                if (input.type === 'password') {
                    input.type = 'text';
                    icon.className = 'fas fa-eye-slash';
                } else {
                    input.type = 'password';
                    icon.className = 'fas fa-eye';
                }
            });
        });
    }

    setupPasswordStrength() {
        const passwordInputs = ['registerPassword', 'newPassword'];
        
        passwordInputs.forEach(inputId => {
            const input = document.getElementById(inputId);
            if (input) {
                input.addEventListener('input', () => this.updatePasswordStrength(input));
            }
        });
    }

    setupRealTimeValidation() {
        // Validação de email em tempo real
        const emailInputs = ['loginEmail', 'registerEmail', 'forgotEmail'];
        
        emailInputs.forEach(inputId => {
            const input = document.getElementById(inputId);
            if (input) {
                input.addEventListener('blur', () => this.validateEmailField(input));
                input.addEventListener('input', () => this.clearFieldError(input));
            }
        });

        // Validação de nome
        const nameInput = document.getElementById('registerName');
        if (nameInput) {
            nameInput.addEventListener('blur', () => this.validateNameField(nameInput));
            nameInput.addEventListener('input', () => this.clearFieldError(nameInput));
        }

        // Validação de senha
        const passwordInputs = ['loginPassword', 'registerPassword'];
        passwordInputs.forEach(inputId => {
            const input = document.getElementById(inputId);
            if (input) {
                input.addEventListener('blur', () => this.validatePasswordField(input));
                input.addEventListener('input', () => this.clearFieldError(input));
            }
        });
    }

    validateEmailField(input) {
        const email = input.value.trim();
        const fieldId = input.id;
        
        if (!email) {
            this.setFieldError(fieldId, 'Email é obrigatório');
            return false;
        }
        
        if (!this.validateEmail(email)) {
            this.setFieldError(fieldId, 'Digite um email válido');
            return false;
        }
        
        this.setFieldSuccess(fieldId);
        return true;
    }

    validateNameField(input) {
        const name = input.value.trim();
        const fieldId = input.id;
        
        if (!name) {
            this.setFieldError(fieldId, 'Nome é obrigatório');
            return false;
        }
        
        if (name.length < 2) {
            this.setFieldError(fieldId, 'Nome deve ter pelo menos 2 caracteres');
            return false;
        }
        
        if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(name)) {
            this.setFieldError(fieldId, 'Nome deve conter apenas letras');
            return false;
        }
        
        this.setFieldSuccess(fieldId);
        return true;
    }

    validatePasswordField(input) {
        const password = input.value;
        const fieldId = input.id;
        
        if (!password) {
            this.setFieldError(fieldId, 'Senha é obrigatória');
            return false;
        }
        
        if (fieldId === 'registerPassword' && password.length < 6) {
            this.setFieldError(fieldId, 'Senha deve ter pelo menos 6 caracteres');
            return false;
        }
        
        this.setFieldSuccess(fieldId);
        return true;
    }

    clearFieldError(input) {
        const label = input.closest('.label-input');
        const messageEl = label.querySelector('.validation-message');
        
        label.classList.remove('error', 'success');
        messageEl.textContent = '';
    }

    setupVerificationInputs() {
        const inputs = document.querySelectorAll('.code-input');
        
        inputs.forEach((input, index) => {
            input.addEventListener('input', (e) => {
                if (e.target.value.length === 1 && index < inputs.length - 1) {
                    inputs[index + 1].focus();
                }
            });

            input.addEventListener('keydown', (e) => {
                if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
                    inputs[index - 1].focus();
                }
            });
        });
    }

    switchToLogin() {
        document.body.classList.add('sign-in-js');
        document.body.classList.remove('sign-up-js');
    }

    switchToRegister() {
        document.body.classList.add('sign-up-js');
        document.body.classList.remove('sign-in-js');
    }

    async handleLogin(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value.trim();
        const submitBtn = e.target.querySelector('button[type="submit"]');
        
        if (!this.validateLoginForm(email, password)) return;
        
        this.setButtonLoading(submitBtn, true);
        
        try {
            const response = await fetch(`${this.apiUrl}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                this.showAlert('Login realizado com sucesso!', 'success');
                this.setUserSession(data.user, data.token);
                
                setTimeout(() => {
                    window.location.href = '../index.html';
                }, 1500);
            } else {
                this.showAlert(data.error || 'Erro no login', 'error');
            }
        } catch (error) {
            console.error('Erro na conexão:', error);
            this.showAlert('Erro de conexão. Verifique se a API está rodando.', 'error');
        }
        
        this.setButtonLoading(submitBtn, false);
    }

    async handleRegister(e) {
        e.preventDefault();
        
        const name = document.getElementById('registerName').value.trim();
        const email = document.getElementById('registerEmail').value.trim();
        const password = document.getElementById('registerPassword').value.trim();
        const submitBtn = e.target.querySelector('button[type="submit"]');
        
        if (!this.validateRegisterForm(name, email, password)) return;
        
        this.setButtonLoading(submitBtn, true);
        
        try {
            const response = await fetch(`${this.apiUrl}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password, type: 'student' })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                this.showAlert('Conta criada com sucesso!', 'success');
                this.clearForm('registerForm');
                
                setTimeout(() => {
                    this.switchToLogin();
                }, 1500);
            } else {
                this.showAlert(data.error || 'Erro no cadastro', 'error');
            }
        } catch (error) {
            console.error('Erro na conexão:', error);
            this.showAlert('Erro de conexão. Verifique se a API está rodando.', 'error');
        }
        
        this.setButtonLoading(submitBtn, false);
    }

    async handleForgotPassword(e) {
        e.preventDefault();
        
        const email = document.getElementById('forgotEmail').value.trim();
        
        if (!this.validateEmail(email)) {
            this.showAlert('Digite um email válido', 'error');
            return;
        }
        
        try {
            // Verificar se email existe no banco
            const response = await fetch(`${this.apiUrl}/auth/check-email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });
            
            if (response.ok) {
                this.currentEmail = email;
                this.verificationCode = this.generateVerificationCode();
                
                // Simular envio de email (em produção, seria enviado pelo backend)
                await this.delay(1000);
                
                this.showAlert(`Código enviado para ${email}`, 'success');
                this.showVerificationModal();
            } else {
                this.showAlert('Email não encontrado', 'error');
            }
        } catch (error) {
            // Fallback para localStorage se API não estiver disponível
            const users = this.getUsers();
            const user = users.find(u => u.email === email);
            
            if (user) {
                this.currentEmail = email;
                this.verificationCode = this.generateVerificationCode();
                await this.delay(1000);
                this.showAlert(`Código enviado para ${email}`, 'success');
                this.showVerificationModal();
            } else {
                this.showAlert('Email não encontrado', 'error');
            }
        }
    }

    async handleVerification(e) {
        e.preventDefault();
        
        const inputs = document.querySelectorAll('.code-input');
        const code = Array.from(inputs).map(input => input.value).join('');
        
        if (code.length !== 6) {
            this.showAlert('Digite o código completo', 'error');
            return;
        }
        
        // Simular verificação
        await this.delay(800);
        
        if (code === this.verificationCode) {
            this.showAlert('Código verificado!', 'success');
            this.showNewPasswordModal();
        } else {
            this.showAlert('Código inválido', 'error');
            inputs.forEach(input => input.value = '');
            inputs[0].focus();
        }
    }

    async handleNewPassword(e) {
        e.preventDefault();
        
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        if (!this.validateNewPassword(newPassword, confirmPassword)) return;
        
        const users = this.getUsers();
        const userIndex = users.findIndex(u => u.email === this.currentEmail);
        
        if (userIndex !== -1) {
            users[userIndex].password = newPassword;
            this.saveUsers(users);
            
            this.showAlert('Senha alterada com sucesso!', 'success');
            
            setTimeout(() => {
                this.closeForgotModal();
                this.switchToLogin();
            }, 1500);
        }
    }

    validateLoginForm(email, password) {
        let isValid = true;
        
        if (!this.validateEmail(email)) {
            this.setFieldError('loginEmail', 'Digite um email válido');
            isValid = false;
        } else {
            this.setFieldSuccess('loginEmail');
        }
        
        if (!password) {
            this.setFieldError('loginPassword', 'Digite sua senha');
            isValid = false;
        } else {
            this.setFieldSuccess('loginPassword');
        }
        
        return isValid;
    }

    validateRegisterForm(name, email, password) {
        let isValid = true;
        
        if (name.length < 2) {
            this.setFieldError('registerName', 'Nome deve ter pelo menos 2 caracteres');
            isValid = false;
        } else {
            this.setFieldSuccess('registerName');
        }
        
        if (!this.validateEmail(email)) {
            this.setFieldError('registerEmail', 'Digite um email válido');
            isValid = false;
        } else {
            this.setFieldSuccess('registerEmail');
        }
        
        if (password.length < 6) {
            this.setFieldError('registerPassword', 'Senha deve ter pelo menos 6 caracteres');
            isValid = false;
        } else {
            this.setFieldSuccess('registerPassword');
        }
        
        return isValid;
    }

    validateNewPassword(newPassword, confirmPassword) {
        let isValid = true;
        
        if (newPassword.length < 6) {
            this.showAlert('Senha deve ter pelo menos 6 caracteres', 'error');
            isValid = false;
        }
        
        if (newPassword !== confirmPassword) {
            this.showAlert('Senhas não coincidem', 'error');
            isValid = false;
        }
        
        return isValid;
    }

    validateEmail(email) {
        // Validação robusta de email
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        
        if (!emailRegex.test(email)) return false;
        
        // Verificações adicionais
        if (email.length > 254) return false; // RFC 5321
        if (email.includes('..')) return false; // Pontos consecutivos
        if (email.startsWith('.') || email.endsWith('.')) return false;
        
        const [localPart, domain] = email.split('@');
        if (localPart.length > 64) return false; // RFC 5321
        if (domain.length > 253) return false;
        
        // Verificar caracteres especiais no início/fim
        if (localPart.startsWith('.') || localPart.endsWith('.')) return false;
        
        // Verificar domínio válido
        if (!domain.includes('.')) return false;
        if (domain.startsWith('-') || domain.endsWith('-')) return false;
        
        return true;
    }

    setFieldError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const label = field.closest('.label-input');
        const messageEl = label.querySelector('.validation-message');
        
        label.classList.remove('success');
        label.classList.add('error');
        messageEl.textContent = message;
        messageEl.style.color = '#e74c3c';
        
        // Adicionar shake animation
        field.style.animation = 'shake 0.5s';
        setTimeout(() => {
            field.style.animation = '';
        }, 500);
    }

    setFieldSuccess(fieldId) {
        const field = document.getElementById(fieldId);
        const label = field.closest('.label-input');
        const messageEl = label.querySelector('.validation-message');
        
        label.classList.remove('error');
        label.classList.add('success');
        messageEl.textContent = '✓ Válido';
        messageEl.style.color = '#43e97b';
    }

    updatePasswordStrength(input) {
        const password = input.value;
        const strengthBar = input.closest('.second-column, .forgot-password-content').querySelector('.strength-fill');
        const strengthText = input.closest('.second-column, .forgot-password-content').querySelector('.strength-text');
        
        if (!strengthBar || !strengthText) return;
        
        const strength = this.calculatePasswordStrength(password);
        
        strengthBar.style.width = `${strength.percentage}%`;
        strengthBar.style.background = strength.color;
        strengthText.textContent = strength.text;
    }

    calculatePasswordStrength(password) {
        let score = 0;
        
        if (password.length >= 6) score += 20;
        if (password.length >= 8) score += 20;
        if (/[a-z]/.test(password)) score += 20;
        if (/[A-Z]/.test(password)) score += 20;
        if (/[0-9]/.test(password)) score += 10;
        if (/[^A-Za-z0-9]/.test(password)) score += 10;
        
        if (score < 40) {
            return { percentage: score, color: '#e74c3c', text: 'Fraca' };
        } else if (score < 70) {
            return { percentage: score, color: '#f39c12', text: 'Média' };
        } else {
            return { percentage: score, color: '#43e97b', text: 'Forte' };
        }
    }

    generateVerificationCode() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    showForgotPasswordModal() {
        document.getElementById('forgotPasswordModal').classList.add('show');
    }

    showVerificationModal() {
        document.getElementById('forgotPasswordModal').classList.remove('show');
        document.getElementById('verificationModal').classList.add('show');
        document.querySelector('.code-input').focus();
    }

    showNewPasswordModal() {
        document.getElementById('verificationModal').classList.remove('show');
        document.getElementById('newPasswordModal').classList.add('show');
    }

    closeForgotModal() {
        document.querySelectorAll('.forgot-password-modal').forEach(modal => {
            modal.classList.remove('show');
        });
        this.currentEmail = '';
        this.verificationCode = '';
    }

    async resendVerificationCode() {
        this.verificationCode = this.generateVerificationCode();
        await this.delay(500);
        this.showAlert('Novo código enviado!', 'success');
    }

    setButtonLoading(button, loading) {
        if (loading) {
            button.classList.add('loading');
        } else {
            button.classList.remove('loading');
        }
    }

    clearForm(formId) {
        const form = document.getElementById(formId);
        form.reset();
        form.querySelectorAll('.label-input').forEach(label => {
            label.classList.remove('error', 'success');
        });
        form.querySelectorAll('.validation-message').forEach(msg => {
            msg.textContent = '';
        });
    }

    getUsers() {
        return JSON.parse(localStorage.getItem('studyconnect_users') || '[]');
    }

    saveUsers(users) {
        localStorage.setItem('studyconnect_users', JSON.stringify(users));
    }

    setUserSession(user, token) {
        localStorage.setItem('userLoggedIn', 'true');
        localStorage.setItem('userName', user.name);
        localStorage.setItem('userEmail', user.email);
        localStorage.setItem('userId', user.id);
        localStorage.setItem('userType', user.type);
        localStorage.setItem('authToken', token);
        localStorage.setItem('joinDate', new Date().toLocaleDateString('pt-BR'));
    }

    checkIfLoggedIn() {
        if (localStorage.getItem('userLoggedIn') === 'true') {
            window.location.href = '../index.html';
        }
    }

    showAlert(message, type, duration = 3000) {
        const alert = document.getElementById('custom-alert');
        alert.textContent = message;
        alert.className = `custom-alert ${type} show`;
        
        setTimeout(() => {
            alert.classList.remove('show');
        }, duration);
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Inicializar sistema
document.addEventListener('DOMContentLoaded', () => {
    new AuthSystem();


    
});