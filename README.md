# 🚀 StudyConnect+ - Sistema Completo

## 📁 Arquivos Principais

### 🗄️ **db.sql**
- Banco SQL Server completo
- Tabelas: usuarios, cursos, professores, contatos
- Dados de exemplo inclusos

### ☕ **backend/StudyConnectApp.java**
- API Spring Boot em arquivo único
- Endpoints: /cursos, /professores, /contatos, /stats
- Configuração automática

### 🌐 **api.js**
- Integração frontend com API
- Carregamento automático de dados
- Filtros e formulários funcionais

## 🔧 Como Usar

### 1. Banco de Dados
```sql
-- SQL Server Management Studio
-- Execute: db.sql
```

### 2. API Spring Boot
```bash
# IntelliJ IDEA
# 1. Abrir pasta: backend
# 2. Executar: StudyConnectApp.java
# 3. API: http://localhost:8080/api
```

### 3. Frontend
```html
<!-- Adicionar no index.html -->
<script src="api.js"></script>
```

## 🎯 Funcionalidades

✅ **Cursos** - Listagem, filtros, categorias  
✅ **Professores** - Perfis e especialidades  
✅ **Contato** - Formulário funcional  
✅ **Estatísticas** - Contadores em tempo real  

## 📊 Endpoints API

- `GET /api/cursos` - Todos os cursos
- `GET /api/cursos/categoria/{id}` - Por categoria
- `GET /api/professores` - Todos os professores
- `POST /api/contatos` - Enviar mensagem
- `GET /api/stats` - Estatísticas

## 🚀 Executar

1. Execute `start.bat`
2. Siga as instruções
3. Teste no navegador

**Sistema 100% funcional! 🎉**