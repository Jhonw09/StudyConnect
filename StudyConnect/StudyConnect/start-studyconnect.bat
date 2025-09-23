@echo off
echo ========================================
echo    🚀 StudyConnect - Inicializacao
echo ========================================
echo.

echo 📋 PASSO 1: Configurar Banco de Dados
echo.
echo 1. Abra SQL Server Management Studio
echo 2. Execute o arquivo: database.sql
echo 3. Configure a senha no application.properties
echo.
pause

echo 📋 PASSO 2: Compilar Projeto
echo.
call mvn clean install
if %errorlevel% neq 0 (
    echo ❌ Erro na compilacao!
    pause
    exit /b 1
)

echo.
echo 📋 PASSO 3: Iniciar API
echo.
echo ✅ Iniciando StudyConnect API...
call mvn spring-boot:run

pause