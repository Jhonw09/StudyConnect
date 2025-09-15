# 🚀 SETUP COMPLETO - StudyConnect+ Database

## ✅ PASSO A PASSO PARA FUNCIONAR

### 1️⃣ **Configurar SQL Server**
```sql
-- Execute este script no SQL Server Management Studio:
-- Arquivo: setup-complete.sql
```

### 2️⃣ **Instalar Dependências**
```bash
# Execute o arquivo:
install.bat
```

### 3️⃣ **Configurar Conexão**
Edite o arquivo `config.js` com suas credenciais:
```javascript
const config = {
    user: 'sa',                    // SEU USUÁRIO
    password: '123456',            // SUA SENHA
    server: 'localhost\\SQLEXPRESS', // SEU SERVIDOR
    database: 'StudyConnectPlus'
};
```

### 4️⃣ **Iniciar Servidor**
```bash
# Execute:
start-server.bat
```

### 5️⃣ **Testar Conexão**
Abra: `http://localhost:3000/api/cursos`

## 🎯 **ARQUIVOS IMPORTANTES**

- `setup-complete.sql` - Cria banco completo
- `config.js` - Configuração de conexão
- `api.js` - Servidor da API
- `database-integration.js` - Integração frontend

## 🔧 **ENDPOINTS DISPONÍVEIS**

- `GET /api/cursos` - Lista cursos
- `GET /api/professores` - Lista professores
- `POST /api/login` - Login de usuário
- `POST /api/matricular` - Matricular aluno

## ✨ **FUNCIONALIDADES ATIVAS**

✅ Cursos carregados do banco
✅ Professores carregados do banco  
✅ Sistema de login funcional
✅ Matrículas funcionando
✅ Filtros por categoria
✅ Interface integrada

## 🚨 **SOLUÇÃO DE PROBLEMAS**

### Erro de Conexão:
1. Verifique se SQL Server está rodando
2. Confirme usuário/senha no `config.js`
3. Teste conexão: `sqlcmd -S localhost\SQLEXPRESS -U sa`

### API não inicia:
1. Execute `npm install` na pasta database
2. Verifique porta 3000 livre
3. Execute `node api.js` manualmente

### Frontend não carrega dados:
1. Confirme API rodando em localhost:3000
2. Abra console do navegador (F12)
3. Verifique erros de CORS

## 🎉 **PRONTO!**

Seu StudyConnect+ agora está 100% funcional com SQL Server!

**Usuários de teste:**
- Email: `joao@email.com` | Senha: `123456` (Aluno)
- Email: `maria@studyconnect.com` | Senha: `123456` (Professor)
- Email: `admin@studyconnect.com` | Senha: `123456` (Admin)