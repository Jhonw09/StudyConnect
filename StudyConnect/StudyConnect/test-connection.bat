@echo off
echo ========================================
echo    🔍 StudyConnect - Teste de Conexao
echo ========================================
echo.

echo 📋 Verificando estrutura do projeto...
echo.

if not exist "pom.xml" (
    echo ❌ Arquivo pom.xml nao encontrado!
    pause
    exit /b 1
)

if not exist "src\main\java\com\Study\StudyConnect\StudyConnectApplication.java" (
    echo ❌ Classe principal nao encontrada!
    pause
    exit /b 1
)

echo ✅ Estrutura do projeto OK
echo.

echo 📋 Compilando projeto...
call mvn clean compile
if %errorlevel% neq 0 (
    echo ❌ Erro na compilacao!
    pause
    exit /b 1
)

echo ✅ Compilacao OK
echo.
echo 📋 PROXIMO PASSO:
echo 1. Execute database.sql no SQL Server
echo 2. Configure sua senha no application.properties
echo 3. Execute: mvn spring-boot:run
echo.
pause