import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './LoginSystem.css';

const LoginSystem = () => {
  const [isSignIn, setIsSignIn] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  
  // Estados para formulários
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '' });
  const [forgotEmail, setForgotEmail] = useState('');

  // Função para mostrar alertas
  const showAlert = (message, type, duration = 3000) => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: '', type: '' }), duration);
  };

  // Função de login
  const handleLogin = (e) => {
    e.preventDefault();
    
    if (!loginData.email || !loginData.password) {
      showAlert('Por favor, preencha todos os campos', 'error');
      return;
    }

    // Verificar credenciais salvas
    const users = JSON.parse(localStorage.getItem('studyconnect_users') || '[]');
    const user = users.find(u => u.email === loginData.email && u.password === loginData.password);
    
    if (user) {
      showAlert('Login realizado com sucesso!', 'success');
      localStorage.setItem('userLoggedIn', 'true');
      localStorage.setItem('userName', user.name);
      localStorage.setItem('userEmail', user.email);
      
      setTimeout(() => {
        window.location.href = '../index.html';
      }, 1500);
    } else {
      showAlert('Credenciais inválidas. Tente novamente.', 'error');
    }
  };

  // Função de cadastro
  const handleRegister = (e) => {
    e.preventDefault();
    
    if (!registerData.name || !registerData.email || !registerData.password) {
      showAlert('Por favor, preencha todos os campos', 'error');
      return;
    }

    if (registerData.password.length < 6) {
      showAlert('A senha deve ter pelo menos 6 caracteres', 'error');
      return;
    }

    // Verificar se email já existe
    const users = JSON.parse(localStorage.getItem('studyconnect_users') || '[]');
    if (users.find(u => u.email === registerData.email)) {
      showAlert('Este email já está cadastrado', 'error');
      return;
    }

    // Salvar novo usuário
    const newUser = {
      id: Date.now(),
      name: registerData.name,
      email: registerData.email,
      password: registerData.password,
      joinDate: new Date().toLocaleDateString('pt-BR')
    };
    
    users.push(newUser);
    localStorage.setItem('studyconnect_users', JSON.stringify(users));
    
    showAlert('Conta criada com sucesso!', 'success');
    setRegisterData({ name: '', email: '', password: '' });
    
    // Alternar para tela de login após cadastro
    setTimeout(() => setIsSignIn(true), 1500);
  };

  // Função de recuperação de senha
  const handleForgotPassword = (e) => {
    e.preventDefault();
    
    if (!forgotEmail) {
      showAlert('Por favor, digite seu email', 'error');
      return;
    }

    const users = JSON.parse(localStorage.getItem('studyconnect_users') || '[]');
    const user = users.find(u => u.email === forgotEmail);
    
    if (user) {
      showAlert(`Instruções enviadas para ${forgotEmail}`, 'success');
      setForgotEmail('');
      setShowForgotPassword(false);
    } else {
      showAlert('Email não encontrado', 'error');
    }
  };

  return (
    <div className="login-container">
      {/* Alert personalizado */}
      <AnimatePresence>
        {alert.show && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`custom-alert ${alert.type}`}
          >
            {alert.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de recuperação de senha */}
      <AnimatePresence>
        {showForgotPassword && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="forgot-password-modal"
            onClick={() => setShowForgotPassword(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="forgot-password-content"
              onClick={(e) => e.stopPropagation()}
            >
              <h3>Recuperar Senha</h3>
              <p>Digite seu email para receber as instruções:</p>
              <form onSubmit={handleForgotPassword}>
                <input
                  type="email"
                  placeholder="Seu email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  required
                />
                <div className="forgot-buttons">
                  <button type="submit" className="btn-recover">Enviar</button>
                  <button type="button" onClick={() => setShowForgotPassword(false)} className="btn-cancel">
                    Cancelar
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`content ${isSignIn ? 'sign-in-js' : ''}`}>
        {/* Primeira tela - Cadastro */}
        <div className="content-section first-content">
          <div className="first-column">
            <h2 className="title title-primary">Seja bem-vindo</h2>
            <p className="description description-primary">
              Para continuar conectado conosco,
            </p>
            <p className="description description-primary">faça login com suas informações pessoais</p>
            <button onClick={() => setIsSignIn(true)} className="btn btn-primary">
              Entrar
            </button>
          </div>
          
          <div className="second-column">
            <h2 className="title title-second">Criar conta</h2>
            <div className="social-media">
              <ul className="list-social-media">
                <li className="item-social-media">
                  <i className="fab fa-facebook-f"></i>
                </li>
                <li className="item-social-media">
                  <i className="fab fa-google-plus-g"></i>
                </li>
                <li className="item-social-media">
                  <i className="fab fa-linkedin-in"></i>
                </li>
              </ul>
            </div>
            <p className="description description-second">ou use seu e-mail para registro:</p>
            
            <form className="form" onSubmit={handleRegister}>
              <label className="label-input">
                <i className="far fa-user icon-modify"></i>
                <input
                  type="text"
                  placeholder="Nome completo"
                  value={registerData.name}
                  onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
                  required
                />
              </label>
              
              <label className="label-input">
                <i className="far fa-envelope icon-modify"></i>
                <input
                  type="email"
                  placeholder="E-mail"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                  required
                />
              </label>
              
              <label className="label-input">
                <i className="fas fa-lock icon-modify"></i>
                <input
                  type="password"
                  placeholder="Senha (min. 6 caracteres)"
                  value={registerData.password}
                  onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                  required
                  minLength="6"
                />
              </label>
              
              <button type="submit" className="btn btn-second">Cadastrar</button>
            </form>
          </div>
        </div>

        {/* Segunda tela - Login */}
        <div className="content-section second-content">
          <div className="first-column">
            <h2 className="title title-primary">Olá, Estudante!</h2>
            <p className="description description-primary">Insira seus dados pessoais</p>
            <p className="description description-primary">e comece sua jornada conosco</p>
            <button onClick={() => setIsSignIn(false)} className="btn btn-primary">
              Cadastrar
            </button>
          </div>
          
          <div className="second-column">
            <h2 className="title title-second">Entrar no StudyConnect+</h2>
            <div className="social-media">
              <ul className="list-social-media">
                <li className="item-social-media">
                  <i className="fab fa-facebook-f"></i>
                </li>
                <li className="item-social-media">
                  <i className="fab fa-google-plus-g"></i>
                </li>
                <li className="item-social-media">
                  <i className="fab fa-linkedin-in"></i>
                </li>
              </ul>
            </div>
            <p className="description description-second">ou use sua conta de e-mail:</p>
            
            <form className="form" onSubmit={handleLogin}>
              <label className="label-input">
                <i className="far fa-envelope icon-modify"></i>
                <input
                  type="email"
                  placeholder="E-mail"
                  value={loginData.email}
                  onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                  required
                />
              </label>
              
              <label className="label-input">
                <i className="fas fa-lock icon-modify"></i>
                <input
                  type="password"
                  placeholder="Senha"
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  required
                />
              </label>
              
              <button
                type="button"
                className="password-link"
                onClick={() => setShowForgotPassword(true)}
              >
                Esqueceu sua senha?
              </button>
              
              <button type="submit" className="btn btn-second">Entrar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSystem;