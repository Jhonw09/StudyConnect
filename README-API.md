# 🚀 StudyConnect+ API

## 📋 Pré-requisitos

- **Java 17+** instalado
- **Maven** instalado  
- **SQL Server** rodando na porta 1433
- **Banco StudyConnect** criado (execute `db.sql`)

## ⚡ Início Rápido

### 1. Preparar Banco
```sql
-- Execute no SQL Server Management Studio
-- Arquivo: db.sql
```

### 2. Iniciar API
```bash
# Opção 1: Script automático
start-api.bat

# Opção 2: Maven direto
mvn spring-boot:run

# Opção 3: IntelliJ IDEA
# Abrir StudyConnectApp.java e executar
```

### 3. Testar API
- **Health Check**: http://localhost:8080/api/health
- **Cursos**: http://localhost:8080/api/cursos
- **Professores**: http://localhost:8080/api/professores
- **Stats**: http://localhost:8080/api/stats

## 🔗 Endpoints

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/health` | Status da API |
| GET | `/api/cursos` | Todos os cursos |
| GET | `/api/cursos/categoria/{id}` | Cursos por categoria |
| GET | `/api/cursos/populares` | Cursos populares |
| GET | `/api/professores` | Todos os professores |
| POST | `/api/contatos` | Enviar contato |
| GET | `/api/stats` | Estatísticas |

## 🛠️ Configuração

### Banco de Dados
```properties
# application.properties
spring.datasource.url=jdbc:sqlserver://localhost:1433;databaseName=StudyConnect
spring.datasource.username=sa
spring.datasource.password=123456
```

### Porta
```properties
server.port=8080
server.servlet.context-path=/api
```

## 🔧 Solução de Problemas

### Erro de Conexão
- Verificar se SQL Server está rodando
- Confirmar usuário/senha: sa/123456
- Executar `db.sql` para criar banco

### Porta em Uso
- Alterar porta no `application.properties`
- Ou parar processo na porta 8080

### Java/Maven
- Instalar Java 17+
- Instalar Maven 3.6+
- Configurar JAVA_HOME

## ✅ Teste Rápido

```bash
# Testar health
curl http://localhost:8080/api/health

# Testar cursos
curl http://localhost:8080/api/cursos

# Enviar contato
curl -X POST http://localhost:8080/api/contatos \
  -H "Content-Type: application/json" \
  -d '{"nome":"Teste","email":"teste@email.com","assunto":"Teste","mensagem":"Mensagem teste"}'
```

**API pronta para uso! 🎉**