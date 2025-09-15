# Banco de Dados StudyConnect+ 🗄️

Sistema completo de banco de dados SQL Server para a plataforma StudyConnect+.

## 📋 Estrutura do Banco

### Tabelas Principais
- **usuarios**: Dados dos usuários (alunos, professores, admins)
- **professores**: Informações específicas dos professores
- **categorias**: Categorias dos cursos
- **cursos**: Dados dos cursos disponíveis
- **aulas**: Aulas de cada curso
- **matriculas**: Matrículas dos alunos
- **progresso_aulas**: Progresso individual das aulas
- **avaliacoes**: Avaliações dos cursos

## 🚀 Como Usar

### 1. Configurar SQL Server
```sql
-- Execute o arquivo create_database.sql no SQL Server Management Studio
-- ou via sqlcmd:
sqlcmd -S localhost -i create_database.sql
```

### 2. Instalar Dependências
```bash
cd database
npm install
```

### 3. Configurar Conexão
Edite o arquivo `config.js` com suas credenciais:
```javascript
const config = {
    user: 'seu_usuario',
    password: 'sua_senha',
    server: 'localhost',
    database: 'StudyConnectPlus'
};
```

### 4. Iniciar API
```bash
npm start
# ou para desenvolvimento:
npm run dev
```

### 5. Integrar com Frontend
Adicione ao seu HTML:
```html
<script src="database/frontend-integration.js"></script>
```

## 📡 Endpoints da API

### Autenticação
- `POST /api/login` - Login de usuário

### Cursos
- `GET /api/cursos` - Listar todos os cursos
- `GET /api/cursos?categoria=1` - Filtrar por categoria

### Categorias
- `GET /api/categorias` - Listar categorias

### Professores
- `GET /api/professores` - Listar professores

### Matrículas
- `POST /api/matricular` - Matricular aluno em curso
- `POST /api/progresso` - Atualizar progresso

## 🔧 Procedures Disponíveis

- `sp_AutenticarUsuario` - Autenticação
- `sp_ObterCursosPorCategoria` - Buscar cursos
- `sp_MatricularAluno` - Realizar matrícula
- `sp_AtualizarProgresso` - Atualizar progresso

## 💾 Dados de Exemplo

O banco já vem com dados de exemplo:
- 2 professores (Maria Silva, Carlos Souza)
- 4 categorias (Frontend, Backend, Matemática, Português)
- 4 cursos populares
- 1 aluno de teste

## 🔐 Segurança

- Senhas devem ser hasheadas em produção
- Use HTTPS em produção
- Configure firewall do SQL Server
- Use autenticação JWT para sessões

## 📊 Monitoramento

Para monitorar performance:
```sql
-- Verificar conexões ativas
SELECT * FROM sys.dm_exec_sessions WHERE is_user_process = 1;

-- Verificar queries lentas
SELECT * FROM sys.dm_exec_query_stats 
ORDER BY total_elapsed_time DESC;
```