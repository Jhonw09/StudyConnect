# StudyConnect Database & API

## 📋 Pré-requisitos

### SQL Server
- SQL Server 2019 ou superior
- SQL Server Management Studio (SSMS)

### Java/IntelliJ
- Java 17 ou superior
- IntelliJ IDEA
- Maven

## 🗄️ Configuração do Banco de Dados

### 1. Executar Scripts SQL
Execute os scripts na seguinte ordem no SSMS:

```sql
-- 1. Criar banco
.\sql\01_create_database.sql

-- 2. Criar tabelas
.\sql\02_create_tables.sql

-- 3. Inserir dados iniciais
.\sql\03_insert_data.sql
```

### 2. Configurar Usuário SQL Server
```sql
-- Criar login e usuário
CREATE LOGIN studyconnect_user WITH PASSWORD = 'SuaSenha123';
USE StudyConnect;
CREATE USER studyconnect_user FOR LOGIN studyconnect_user;
ALTER ROLE db_owner ADD MEMBER studyconnect_user;
```

## 🚀 Configuração da API

### 1. Abrir no IntelliJ
1. Abra o IntelliJ IDEA
2. File → Open → Selecione a pasta `database/api`
3. Aguarde o Maven baixar as dependências

### 2. Configurar application.properties
Edite `src/main/resources/application.properties`:

```properties
# Altere para suas configurações
spring.datasource.url=jdbc:sqlserver://localhost:1433;databaseName=StudyConnect;encrypt=false
spring.datasource.username=sa
spring.datasource.password=SuaSenhaAqui
```

### 3. Executar a API
1. Localize `StudyConnectApplication.java`
2. Clique com botão direito → Run
3. API estará disponível em: `http://localhost:8080/api`

## 📡 Endpoints da API

### Cursos
- `GET /api/cursos` - Listar todos os cursos
- `GET /api/cursos/populares` - Cursos populares
- `GET /api/cursos/categoria/{id}` - Cursos por categoria
- `GET /api/cursos/buscar?termo=react` - Buscar cursos
- `POST /api/cursos` - Criar curso

### Professores
- `GET /api/professores` - Listar professores
- `GET /api/professores/online` - Professores online
- `GET /api/professores/{id}` - Professor por ID

### Contatos
- `POST /api/contatos` - Enviar contato
- `GET /api/contatos` - Listar contatos

## 🔗 Integração com Frontend

### JavaScript Fetch Example
```javascript
// Buscar cursos
async function buscarCursos() {
    try {
        const response = await fetch('http://localhost:8080/api/cursos');
        const cursos = await response.json();
        console.log(cursos);
    } catch (error) {
        console.error('Erro:', error);
    }
}

// Enviar contato
async function enviarContato(dados) {
    try {
        const response = await fetch('http://localhost:8080/api/contatos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });
        const resultado = await response.json();
        console.log('Contato enviado:', resultado);
    } catch (error) {
        console.error('Erro:', error);
    }
}
```

## 🛠️ Estrutura do Projeto

```
database/
├── sql/                    # Scripts SQL Server
│   ├── 01_create_database.sql
│   ├── 02_create_tables.sql
│   └── 03_insert_data.sql
└── api/                    # API Spring Boot
    ├── pom.xml
    └── src/main/java/com/studyconnect/
        ├── StudyConnectApplication.java
        ├── model/          # Entidades JPA
        ├── repository/     # Repositórios
        ├── service/        # Serviços
        └── controller/     # Controllers REST
```

## 🔧 Troubleshooting

### Erro de Conexão SQL Server
1. Verifique se o SQL Server está rodando
2. Confirme a porta (padrão: 1433)
3. Verifique usuário e senha
4. Teste conexão no SSMS primeiro

### Erro de Dependências Maven
1. IntelliJ → File → Reload Maven Project
2. Ou execute: `mvn clean install`

### CORS Error
- API já configurada para aceitar requisições do frontend
- Verifique se a porta está correta (8080)

## 📝 Próximos Passos

1. **Autenticação JWT**: Implementar login/registro
2. **Upload de Imagens**: Para fotos de cursos/professores
3. **Paginação**: Para listas grandes
4. **Cache**: Redis para performance
5. **Logs**: Sistema de auditoria

## 🤝 Suporte

Para dúvidas ou problemas:
1. Verifique os logs da aplicação
2. Confirme configurações do banco
3. Teste endpoints com Postman/Insomnia