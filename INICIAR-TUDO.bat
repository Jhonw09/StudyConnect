@echo off
echo ========================================
echo    StudyConnect+ - Inicializacao Completa
echo ========================================
echo.

echo 🚀 Iniciando API SQLite...
cd database
start "API StudyConnect" cmd /k "node api/server-sqlite.js"

echo ⏳ Aguardando API inicializar...
timeout /t 3 /nobreak >nul

echo 🧪 Testando conexao...
node test-api.js

echo.
echo 🌐 Abrindo site no navegador...
cd ..
start index.html

echo.
echo ✅ TUDO PRONTO!
echo 📡 API rodando em: http://localhost:3002
echo 🌐 Site aberto no navegador
echo.
echo 🔐 Usuarios de teste:
echo    joao@email.com / 123456
echo    maria@email.com / 123456
echo.
echo Pressione qualquer tecla para fechar...
pause >nul