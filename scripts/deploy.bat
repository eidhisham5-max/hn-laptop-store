@echo off
REM Production Deployment Script for Windows
REM Usage: scripts\deploy.bat [environment]

setlocal enabledelayedexpansion

set ENVIRONMENT=%1
if "%ENVIRONMENT%"=="" set ENVIRONMENT=production
set APP_NAME=hn-laptop-store
set BACKUP_DIR=.\backups

echo 🚀 Starting deployment to %ENVIRONMENT% environment...

REM Check if required environment variables are set
:check_env_vars
echo 🔍 Checking environment variables...

set required_vars=NEXT_PUBLIC_SUPABASE_URL NEXT_PUBLIC_SUPABASE_ANON_KEY SUPABASE_SERVICE_ROLE_KEY NEXT_PUBLIC_ADMIN_EMAIL PAYMOB_API_KEY PAYMOB_HMAC_SECRET PAYMOB_INTEGRATION_ID PAYMOB_IFRAME_ID NEXT_PUBLIC_APP_URL

for %%v in (%required_vars%) do (
    if "!%%v!"=="" (
        echo ❌ Missing required environment variable: %%v
        exit /b 1
    )
)

echo ✅ All required environment variables are set
goto :create_backup

REM Create backup before deployment
:create_backup
echo 💾 Creating database backup...

if not exist "%BACKUP_DIR%" mkdir "%BACKUP_DIR%"

node scripts\backup.js
if errorlevel 1 (
    echo ❌ Backup failed
    exit /b 1
)

echo ✅ Backup created successfully
goto :run_checks

REM Run pre-deployment checks
:run_checks
echo 🔍 Running pre-deployment checks...

echo Running TypeScript type check...
npm run type-check
if errorlevel 1 (
    echo ❌ Type check failed
    exit /b 1
)

echo Running ESLint...
npm run lint
if errorlevel 1 (
    echo ❌ Lint check failed
    exit /b 1
)

echo Running health check...
npm run health-check
if errorlevel 1 (
    echo ❌ Health check failed
    exit /b 1
)

echo ✅ All pre-deployment checks passed
goto :build_app

REM Build the application
:build_app
echo 🔨 Building application...

REM Clean previous build
if exist .next rmdir /s /q .next

REM Install dependencies
npm ci --only=production
if errorlevel 1 (
    echo ❌ Dependency installation failed
    exit /b 1
)

REM Build application
npm run build:production
if errorlevel 1 (
    echo ❌ Build failed
    exit /b 1
)

echo ✅ Application built successfully
goto :deploy

REM Deploy based on environment
:deploy
if "%ENVIRONMENT%"=="vercel" (
    echo 🚀 Deploying to Vercel...
    vercel --prod
) else if "%ENVIRONMENT%"=="docker" (
    echo 🐳 Building and deploying with Docker...
    docker-compose down
    docker-compose build --no-cache
    docker-compose up -d
) else if "%ENVIRONMENT%"=="server" (
    echo 🖥️  Deploying to server...
    echo Server deployment not configured yet
) else (
    echo ❌ Unknown deployment environment: %ENVIRONMENT%
    echo Available environments: vercel, docker, server
    exit /b 1
)

goto :post_deploy_tests

REM Run post-deployment tests
:post_deploy_tests
echo 🧪 Running post-deployment tests...

REM Wait for deployment to be ready
timeout /t 30 /nobreak >nul

REM Run health check
npm run health-check
if errorlevel 1 (
    echo ❌ Post-deployment health check failed
    exit /b 1
)

REM Run E2E tests
npm run e2e:headless
if errorlevel 1 (
    echo ❌ Post-deployment E2E tests failed
    exit /b 1
)

echo ✅ Post-deployment tests completed
goto :main_end

:main_end
echo ==========================================
echo 🎉 Deployment completed successfully!
echo Environment: %ENVIRONMENT%
echo Timestamp: %date% %time%
echo ==========================================
