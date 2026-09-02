@echo off
chcp 65001 >nul
title Subir cambios - Cabanas Caballieri
cd /d "%~dp0"

echo ============================================
echo   Subiendo cambios a GitHub y Vercel...
echo ============================================
echo.

git add -A

REM Mensaje del commit con la fecha y hora actual
for /f "delims=" %%d in ('powershell -NoProfile -Command "Get-Date -Format \"yyyy-MM-dd HH:mm\""') do set FECHA=%%d
git commit -m "Actualizacion %FECHA%"

if errorlevel 1 (
  echo.
  echo No habia cambios nuevos que subir ^(o ya estaban guardados^).
)

git push origin main

echo.
echo ============================================
echo   Listo. Vercel se actualizara en ~1 minuto.
echo ============================================
echo.
pause
