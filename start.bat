@echo off
cd /d "c:\Coding Projects\hackCBS"

:: Start Java program in a new terminal
start "Java Program" cmd /k ^
"java -jar hackCBS.jar"

:: Wait 2 seconds
timeout /t 2 /nobreak >nul

:: Start npm dev server in another terminal
start "NPM Dev Server" cmd /k npm run dev