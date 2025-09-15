@echo off
echo 🚀 StudyConnect+ Database Setup
echo ================================

echo.
echo 📦 Instalando dependências...
call npm install

echo.
echo 🗄️ Configurando banco de dados...
call npm run setup

echo.
echo 🧪 Testando sistema...
call npm test

echo.
echo 🎉 Sistema configurado com sucesso!
echo 💡 Execute 'npm start' para iniciar a API
echo.

pause