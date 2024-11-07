@echo off

echo Running local CI checks...

:: Build and run using docker-compose
docker-compose -f docker-compose.ci.yml up --build

:: Check if the build was successful
if %ERRORLEVEL% EQU 0 (
    echo CI checks passed successfully!
    exit 0
) else (
    echo CI checks failed!
    exit 1
)
