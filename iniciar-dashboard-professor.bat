@echo off
title StudyConnect+ - Dashboard Professor
color 0B

echo.
echo ========================================
echo    StudyConnect+ - Dashboard Professor
echo ========================================
echo.
echo Iniciando sistema...
echo.

REM Verificar se o navegador está disponível
where chrome >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo Abrindo no Google Chrome...
    start chrome "file:///%~dp0dashboard-professor/dashboard.html"
    goto :end
)

where msedge >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo Abrindo no Microsoft Edge...
    start msedge "file:///%~dp0dashboard-professor/dashboard.html"
    goto :end
)

where firefox >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo Abrindo no Firefox...
    start firefox "file:///%~dp0dashboard-professor/dashboard.html"
    goto :end
)

REM Fallback para navegador padrão
echo Abrindo no navegador padrão...
start "" "file:///%~dp0dashboard-professor/dashboard.html"

:end
echo.
echo Dashboard do Professor iniciado com sucesso!
echo.
echo Para fazer login:
echo 1. Use suas credenciais de professor
echo 2. Ou crie uma nova conta de professor
echo.
echo Funcionalidades disponíveis:
echo - Visão geral com gráficos
echo - Gerenciar cursos e aulas
echo - Acompanhar alunos
echo - Gerar certificados
echo - Relatórios e análises
echo.
pause