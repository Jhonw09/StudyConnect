@echo off
echo 🚀 Testando API StudyConnect+
echo ============================

echo.
echo 📡 Iniciando servidor na porta 3333...
echo 🌐 Acesse: http://localhost:3333/test
echo.

start /min node api-simples.js

echo ⏳ Aguardando 3 segundos...
timeout /t 3 /nobreak > nul

echo.
echo 🧪 Testando endpoints...

curl -s http://localhost:3333/test
echo.
echo.

echo 📚 Testando cursos...
curl -s http://localhost:3333/cursos
echo.
echo.

echo ✅ Teste concluído!
echo 💡 Se funcionou, a API está OK!

pause