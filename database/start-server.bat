@echo off
echo ========================================
echo   StudyConnect+ Database Server
echo ========================================
echo.
echo Iniciando servidor da API...
cd /d "c:\Users\rm95197\StudyConnect\database"

echo Verificando dependencias...
if not exist node_modules (
    echo Instalando dependencias...
    npm install
)

echo.
echo Servidor iniciando na porta 3000...
echo Acesse: http://localhost:3000
echo.
echo Para parar o servidor, pressione Ctrl+C
echo.

node api.js

pause