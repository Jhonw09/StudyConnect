@echo off
echo ========================================
echo   StudyConnect+ - Sistema Completo
echo ========================================
echo.

echo 1. BANCO DE DADOS
echo Execute no SQL Server Management Studio:
echo - Abra o arquivo: db.sql
echo - Execute todo o script
echo.

echo 2. API SPRING BOOT
echo No IntelliJ IDEA:
echo - Abra a pasta: backend
echo - Execute: StudyConnectApp.java
echo - API estará em: http://localhost:8080/api
echo.

echo 3. FRONTEND
echo - Adicione no index.html: ^<script src="api.js"^>^</script^>
echo - Abra index.html no navegador
echo.

echo 4. TESTAR
echo - Cursos: http://localhost:8080/api/cursos
echo - Professores: http://localhost:8080/api/professores
echo - Stats: http://localhost:8080/api/stats
echo.

echo ARQUIVOS PRINCIPAIS:
echo - db.sql (Banco de dados)
echo - backend/src/main/java/StudyConnectApp.java (API)
echo - api.js (Integração frontend)
echo.

echo Sistema pronto! Siga os passos acima.
pause