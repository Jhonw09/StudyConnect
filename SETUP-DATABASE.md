# 🗄️ Setup do Banco de Dados - StudyConnect+

## 📋 Pré-requisitos

### SQL Server
- **SQL Server 2019** ou superior
- **SQL Server Management Studio (SSMS)**
- **Porta 1433** liberada

### Java & Maven
- **Java 17** ou superior
- **Maven 3.8+**
- **IntelliJ IDEA** (recomendado)

## 🚀 Configuração Passo a Passo

### 1. Configurar SQL Server

```sql
-- 1. Abrir SQL Server Management Studio
-- 2. Conectar com sa ou usuário admin
-- 3. Executar os scripts na ordem:

-- Script 1: Recriar Database
-- Arquivo: database/sql/00_drop_recreate_database.sql

-- Script 2: Criar Tabelas
-- Arquivo: database/sql/01_create_tables_complete.sql

-- Script 3: Inserir Dados
-- Arquivo: database/sql/02_insert_sample_data.sql
```

### 2. Configurar Conexão

**application.yml** já configurado:
```yaml
spring:
  datasource:
    url: jdbc:sqlserver://localhost:1433;databaseName=StudyConnectPlus
    username: sa
    password: 123456  # Altere conforme necessário
```

### 3. Executar API Spring Boot

```bash
# No diretório /api
cd api
mvn clean install
mvn spring-boot:run

# Ou usar o script
start-api.bat
```

### 4. Testar API

- **API Base**: http://localhost:8080/api
- **Swagger UI**: http://localhost:8080/api/swagger
- **Health Check**: http://localhost:8080/api/actuator/health

## 🔧 Endpoints Principais

### Cursos
- `GET /api/cursos` - Listar cursos
- `GET /api/cursos/{id}` - Buscar por ID
- `GET /api/cursos/populares` - Cursos populares
- `GET /api/cursos/categoria/{id}` - Por categoria

### Professores
- `GET /api/professores` - Listar professores
- `GET /api/professores/{id}` - Buscar por ID

### Contato
- `POST /api/contatos` - Enviar mensagem

## 🌐 Integração Frontend

Adicione ao seu HTML:
```html
<script src="frontend-api-integration.js"></script>
```

A integração carregará automaticamente:
- ✅ Cursos da API
- ✅ Professores da API  
- ✅ Estatísticas em tempo real
- ✅ Formulário de contato funcional

## 🔍 Troubleshooting

### Erro de Conexão
```
Verificar se SQL Server está rodando
Confirmar porta 1433
Testar credenciais sa
```

### Erro de Dependências
```bash
mvn clean install -U
```

### Erro CORS
```
API já configurada para aceitar requisições do frontend
```

## 📊 Dados de Exemplo

O banco vem populado com:
- **8 Categorias** (Frontend, Backend, etc.)
- **4 Cursos** completos
- **3 Professores** com perfis
- **10 Tecnologias** populares

## 🎯 Próximos Passos

1. ✅ Banco configurado
2. ✅ API funcionando
3. ✅ Frontend integrado
4. 🔄 Testar todas as funcionalidades
5. 🚀 Deploy em produção

**Tudo pronto para usar! 🎉**