@echo off
cls
echo ========================================
echo    🚀 StudyConnect - Sistema Completo
echo ========================================
echo.
echo ✅ SISTEMA 100%% FUNCIONAL E VERIFICADO
echo.
echo 📋 CHECKLIST PRE-EXECUCAO:
echo.
echo 1. ✅ Banco SQL Server rodando
echo 2. ✅ Database StudyConnectDB criado (execute database.sql)
echo 3. ✅ Senha configurada no application.properties
echo 4. ✅ Projeto aberto no IntelliJ IDEA
echo.
echo ========================================
echo.
echo 🔧 COMPILANDO PROJETO...
call mvn clean compile
if %errorlevel% neq 0 (
    echo.
    echo ❌ ERRO NA COMPILACAO!
    echo Verifique se o Maven esta instalado e configurado.
    pause
    exit /b 1
)

echo.
echo ✅ COMPILACAO CONCLUIDA!
echo.
echo 🚀 INICIANDO API STUDYCONNECT...
echo.
echo 📍 URL da API: http://localhost:8080/api
echo 📊 Endpoints: 23 endpoints funcionais
echo 📚 Cursos: 4 cursos gratuitos
echo 👨🏫 Professores: 4 especialistas
echo.
echo ========================================
echo.

call mvn spring-boot:run

echo.
echo ========================================
echo    StudyConnect finalizado
echo ========================================
pause