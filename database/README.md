# 🗄️ StudyConnect+ Database

Sistema de banco de dados completo e funcional para a plataforma StudyConnect+.

## 📁 Estrutura

```
database/
├── sql/                    # Scripts SQL
│   ├── create_database.sql # Criação do banco e tabelas
│   └── sample_data.sql     # Dados de exemplo
├── config/                 # Configurações
│   ├── database.js         # Conexão MySQL
│   └── .env               # Variáveis de ambiente
├── models/                 # Modelos de dados
│   ├── User.js            # Modelo de usuário
│   ├── Course.js          # Modelo de curso
│   └── Enrollment.js      # Modelo de matrícula
├── api/                   # API REST
│   └── server.js          # Servidor Express
├── setup.js               # Configuração automática
├── test-connection.js     # Testes do sistema
└── package.json           # Dependências
```

## 🚀 Instalação Rápida

### 1. Instalar MySQL
- Baixe e instale o MySQL Server
- Configure usuário `root` com senha (ou deixe em branco)

### 2. Configurar o Projeto
```bash
cd database
npm install
```

### 3. Configurar Variáveis (.env)
Edite o arquivo `config/.env` com suas configurações:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=studyconnect
DB_PORT=3306
```

### 4. Configurar Banco Automaticamente
```bash
npm run setup
```

### 5. Testar Sistema
```bash
npm test
```

### 6. Iniciar API
```bash
npm start
```

## 📊 Estrutura do Banco

### Tabelas Principais

#### 👥 users
- Usuários (alunos, professores, admin)
- Autenticação e perfis
- Estatísticas pessoais

#### 📚 courses
- Cursos disponíveis
- Informações completas
- Ratings e estatísticas

#### 🎓 enrollments
- Matrículas dos alunos
- Controle de progresso
- Certificações

#### 📖 lessons
- Aulas dos cursos
- Conteúdo e vídeos
- Ordem e duração

#### ⭐ reviews
- Avaliações dos cursos
- Comentários dos alunos
- Sistema de rating

## 🔌 API Endpoints

### Autenticação
```
POST /api/auth/register    # Cadastro
POST /api/auth/login       # Login
```

### Usuários
```
GET /api/users/profile     # Perfil do usuário
GET /api/users/teachers    # Lista de professores
```

### Cursos
```
GET /api/courses           # Lista de cursos
GET /api/courses/popular   # Cursos populares
GET /api/courses/:id       # Detalhes do curso
```

### Matrículas
```
POST /api/enrollments      # Nova matrícula
GET /api/enrollments/my-courses  # Meus cursos
```

### Teste
```
GET /api/test             # Status da API
```

## 💡 Exemplos de Uso

### Fazer Login
```javascript
const response = await fetch('http://localhost:3001/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        email: 'joao@email.com',
        password: '123456'
    })
});

const { token, user } = await response.json();
```

### Buscar Cursos
```javascript
const response = await fetch('http://localhost:3001/api/courses?category=1&level=beginner');
const courses = await response.json();
```

### Matricular em Curso
```javascript
const response = await fetch('http://localhost:3001/api/enrollments', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ courseId: 1 })
});
```

## 🔧 Configurações Avançadas

### Personalizar Conexão
Edite `config/database.js` para ajustar pool de conexões:
```javascript
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'studyconnect',
    connectionLimit: 10,  // Máximo de conexões
    queueLimit: 0
};
```

### Adicionar Novos Endpoints
Edite `api/server.js` e adicione suas rotas:
```javascript
app.get('/api/custom-endpoint', async (req, res) => {
    // Sua lógica aqui
});
```

## 📈 Dados de Exemplo

O sistema vem com dados pré-configurados:
- **6 usuários** (3 professores, 2 alunos, 1 admin)
- **6 cursos** (Frontend, Backend, Mobile, etc.)
- **8 aulas** distribuídas nos cursos
- **4 matrículas** com progresso
- **2 avaliações** de exemplo

## 🛠️ Comandos Úteis

```bash
npm start          # Iniciar API
npm run dev        # Modo desenvolvimento
npm run setup      # Configurar banco
npm test           # Testar sistema
```

## 🔒 Segurança

- Senhas criptografadas com bcrypt
- Autenticação JWT
- Validação de dados
- Proteção contra SQL injection
- CORS configurado

## 📱 Integração Frontend

Para integrar com seu frontend React:

```javascript
// Configurar base URL
const API_BASE = 'http://localhost:3001/api';

// Serviço de autenticação
class AuthService {
    static async login(email, password) {
        const response = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        return response.json();
    }
}

// Serviço de cursos
class CourseService {
    static async getCourses(filters = {}) {
        const params = new URLSearchParams(filters);
        const response = await fetch(`${API_BASE}/courses?${params}`);
        return response.json();
    }
}
```

## 🚨 Solução de Problemas

### Erro de Conexão MySQL
1. Verifique se o MySQL está rodando
2. Confirme usuário e senha no `.env`
3. Teste conexão: `npm test`

### Erro "Table doesn't exist"
1. Execute: `npm run setup`
2. Verifique se o banco foi criado

### API não responde
1. Verifique se a porta 3001 está livre
2. Confirme se todas as dependências foram instaladas

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique os logs do console
2. Execute `npm test` para diagnóstico
3. Consulte a documentação da API

---

**🎯 Sistema 100% funcional e pronto para produção!**