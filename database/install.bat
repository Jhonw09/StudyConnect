@echo off
echo Instalando dependencias do StudyConnect+ Database...
cd /d "c:\Users\rm95197\StudyConnect\database"
npm install express mssql cors nodemon
echo.
echo Dependencias instaladas com sucesso!
echo.
echo Para iniciar a API, execute: npm start
pause