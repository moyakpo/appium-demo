@echo off
echo Configurando variables de entorno para Android SDK...

rem Ruta base de tu Android SDK
set "ANDROID_SDK_BASE_PATH=C:\Users\Lele\AppData\Local\Android\Sdk"

rem Configurando ANDROID_HOME y ANDROID_SDK_ROOT
setx ANDROID_HOME "%ANDROID_SDK_BASE_PATH%" /M
setx ANDROID_SDK_ROOT "%ANDROID_SDK_BASE_PATH%" /M

rem Rutas para el PATH
set "PATH_PLATFORM_TOOLS=%ANDROID_SDK_BASE_PATH%\platform-tools"
rem set "PATH_TOOLS=%ANDROID_SDK_BASE_PATH%\tools" REM --> Esta línea comentada si no existe la carpeta 'tools'
rem set "PATH_TOOLS_BIN=%ANDROID_SDK_BASE_PATH%\tools\bin" REM --> Esta línea comentada si no existe la carpeta 'tools\bin'

rem Construyendo el nuevo PATH
rem Solo incluye platform-tools, que es lo más crítico
set "NEW_PATH_ENTRIES=%PATH_PLATFORM_TOOLS%"

rem Agregando al PATH del sistema (verifica si las rutas ya existen antes de agregar)
rem Esto es más avanzado y evita duplicados, pero para empezar, la forma simple está bien
rem Para un primer intento, el simple 'setx PATH "%%PATH%%;%NEW_PATH_ENTRIES%" /M' puede funcionar,
rem pero es mejor ser explícito para evitar problemas si PATH es muy largo.
echo.
echo Comprobando y actualizando la variable PATH...
for /f "tokens=*" %%a in ('echo %%PATH%%') do (
    set current_path=%%a
)

set needs_update=false

echo Current PATH: %current_path%
echo New entries to add: %NEW_PATH_ENTRIES%

rem Comprobar si platform-tools ya está en el PATH
echo %current_path% | findstr /i /c:"%PATH_PLATFORM_TOOLS%" > nul
if %errorlevel% neq 0 (
    set needs_update=true
    echo Adding platform-tools to PATH.
)

if "%needs_update%"=="true" (
    setx PATH "%current_path%;%NEW_PATH_ENTRIES%" /M
    echo PATH actualizado.
) else (
    echo Las rutas necesarias ya parecen estar en el PATH.
)

echo.
echo Variables de entorno configuradas.
echo POR FAVOR, REINICIA TU TERMINAL (CMD, PowerShell, Git Bash)
echo para que los cambios surtan efecto.
echo.
pause