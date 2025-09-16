# 🗄️ StudyConnect+ Database

## 📁 Estrutura

### 📊 **SQL Scripts**
- `01_create_database.sql` - Criar banco de dados
- `02_create_tables.sql` - Criar todas as tabelas
- `03_insert_data.sql` - Inserir dados de exemplo
- `execute_all.sql` - **Executar tudo de uma vez**

### ☕ **API Spring Boot**
- `pom.xml` - Dependências Maven
- `application.yml` - Configuração
- `StudyConnectApplication.java` - API completa

## 🚀 Como Usar

### 1. **SQL Server Management Studio**
```sql
-- Opção 1: Executar arquivo único
-- Abra: execute_all.sql
-- Execute tudo

-- Opção 2: Executar separadamente
-- 1. Execute: 01_create_database.sql
-- 2. Execute: 02_create_tables.sql  
-- 3. Execute: 03_insert_data.sql
```

### 2. **IntelliJ IDEA**
```bash
# 1. Abrir pasta: database/api
# 2. Importar projeto Maven
# 3. Executar: StudyConnectApplication.java
# 4. API: http://localhost:8080/api
```

## 🎯 Funcionalidades

### ✅ **Banco de Dados**
- **13 tabelas** completas
- **Relacionamentos** corretos
- **Índices** para performance
- **Dados de exemplo** prontos

### 🔗 **API Endpoints**
- `GET /api/cursos` - Todos os cursos
- `GET /api/cursos/categoria/{id}` - Por categoria
- `GET /api/cursos/populares` - Cursos populares
- `GET /api/professores` - Todos os professores
- `POST /api/contatos` - Enviar mensagem
- `GET /api/stats` - Estatísticas
- `GET /api/health` - Status da API

### 📊 **Dados Inclusos**
- **4 categorias** (Frontend, Backend, Matemática, Português)
- **4 professores** com perfis completos
- **4 cursos** com aulas e tecnologias
- **3 jogos** (Quiz e digitação)
- **Configurações** do sistema

## 🔧 Configuração

### **Banco de Dados**
- **Nome**: StudyConnect
- **Servidor**: localhost:1433
- **Usuário**: sa
- **Senha**: 123456

### **API**
- **Porta**: 8080
- **Context**: /api
- **URL Base**: http://localhost:8080/api

## ✅ **Testando**

1. Execute `execute_all.sql` no SSMS
2. Inicie a API no IntelliJ
3. Teste: http://localhost:8080/api/health
4. Veja cursos: http://localhost:8080/api/cursos

**Sistema 100% funcional! 🎉**