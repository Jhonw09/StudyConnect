# ⚙️ Configuração StudyConnect

## 🎯 Passos Obrigatórios

### 1️⃣ SQL Server
```sql
-- Execute no SQL Server Management Studio:
-- Arquivo: database.sql
```

### 2️⃣ Configurar Senha
Edite: `src/main/resources/application.properties`
```properties
spring.datasource.password=SUA_SENHA_SQL_SERVER
```

### 3️⃣ IntelliJ IDEA
1. **File** → **Open** → Selecionar pasta do projeto
2. **Maven** → **Reload** (se necessário)
3. **Run** → **StudyConnectApplication**

## ✅ Verificação

**API funcionando em:** `http://localhost:8080/api`

**Endpoints de teste:**
- `GET /api/cursos`
- `GET /api/professores`
- `GET /api/stats`

## 🔧 Estrutura Confirmada

```
StudyConnect/
├── pom.xml ✅
├── database.sql ✅
├── src/main/java/com/Study/StudyConnect/
│   ├── StudyConnectApplication.java ✅
│   ├── model/ ✅
│   │   ├── Categoria.java
│   │   ├── Professor.java
│   │   ├── Curso.java
│   │   └── Contato.java
│   ├── repository/ ✅
│   │   ├── CategoriaRepository.java
│   │   ├── ProfessorRepository.java
│   │   ├── CursoRepository.java
│   │   └── ContatoRepository.java
│   └── controller/ ✅
│       └── StudyConnectController.java
└── src/main/resources/
    └── application.properties ✅
```

**Projeto 100% funcional para IntelliJ + SQL Server!**