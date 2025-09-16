@echo off
echo 🚀 Iniciando StudyConnect+ API...
echo.

cd /d "c:\Users\jonin\StudyConnect-3\database"

echo 📦 Verificando dependências...
if not exist node_modules (
    echo 📥 Instalando dependências...
    npm install
)

echo.
echo 🗄️ Iniciando servidor SQLite...
echo 📡 API disponível em: http://localhost:3002/api
echo 🌐 Teste: http://localhost:3002/api/test
echo.
echo ⚠️  Mantenha esta janela aberta enquanto usar o site
echo 🔴 Para parar o servidor, pressione Ctrl+C
echo.

node api/server-sqlite.js

pause