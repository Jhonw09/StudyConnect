@echo off
echo 🚀 StudyConnect+ SQLite Setup (Sem MySQL!)
echo ==========================================

echo.
echo 📦 Instalando dependências...
call npm install

echo.
echo 🗄️ Configurando banco SQLite...
call node setup-sqlite.js

echo.
echo 🎉 Sistema configurado com sucesso!
echo 💡 Agora execute: npm run start-sqlite
echo.

pause