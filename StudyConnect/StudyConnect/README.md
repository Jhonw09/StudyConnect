# 🚀 StudyConnect - API Spring Boot

## 📋 Configuração

### 1. Banco de Dados SQL Server
```sql
-- Execute o arquivo database.sql no SQL Server Management Studio
-- Isso criará o banco StudyConnectDB com todas as tabelas e dados
```

### 2. Configurar Conexão
Edite `src/main/resources/application.properties`:
```properties
spring.datasource.username=sa
spring.datasource.password=SUA_SENHA_AQUI
```

### 3. Executar
```bash
# Opção 1: Script automático
start-studyconnect.bat

# Opção 2: Manual
mvn clean install
mvn spring-boot:run
```

## 🎯 Endpoints API

- **GET** `/api/cursos` - Listar todos os cursos
- **GET** `/api/cursos/categoria/{id}` - Cursos por categoria
- **GET** `/api/professores` - Listar professores
- **POST** `/api/contatos` - Enviar mensagem de contato
- **GET** `/api/stats` - Estatísticas do sistema

## 📊 Estrutura do Banco

- **categorias** - Categorias dos cursos
- **professores** - Dados dos professores
- **cursos** - Cursos disponíveis
- **contatos** - Mensagens de contato

## 🔧 Tecnologias

- Spring Boot 3.5.6
- JPA/Hibernate
- SQL Server
- Maven

**API rodará em: http://localhost:8080/api**