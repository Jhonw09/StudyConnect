@echo off
echo 🚀 Iniciando StudyConnect+ API...
echo.

echo ✅ Verificando Java...
java -version
if %errorlevel% neq 0 (
    echo ❌ Java não encontrado! Instale Java 17+
    pause
    exit /b 1
)

echo.
echo ✅ Verificando Maven...
mvn -version
if %errorlevel% neq 0 (
    echo ❌ Maven não encontrado! Instale Maven
    pause
    exit /b 1
)

echo.
echo 🔧 Compilando projeto...
mvn clean compile

echo.
echo 🚀 Iniciando API na porta 8080...
echo 📍 URL: http://localhost:8080/api
echo 🔍 Health Check: http://localhost:8080/api/health
echo.
echo Pressione Ctrl+C para parar
echo.

mvn spring-boot:run