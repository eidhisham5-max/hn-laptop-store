#!/bin/bash

# Production Deployment Script
# Usage: ./scripts/deploy.sh [environment]

set -e

ENVIRONMENT=${1:-production}
APP_NAME="hn-laptop-store"
BACKUP_DIR="./backups"

echo "🚀 Starting deployment to $ENVIRONMENT environment..."

# Check if required environment variables are set
check_env_vars() {
    echo "🔍 Checking environment variables..."
    
    required_vars=(
        "NEXT_PUBLIC_SUPABASE_URL"
        "NEXT_PUBLIC_SUPABASE_ANON_KEY"
        "SUPABASE_SERVICE_ROLE_KEY"
        "NEXT_PUBLIC_ADMIN_EMAIL"
        "PAYMOB_API_KEY"
        "PAYMOB_HMAC_SECRET"
        "PAYMOB_INTEGRATION_ID"
        "PAYMOB_IFRAME_ID"
        "NEXT_PUBLIC_APP_URL"
    )
    
    missing_vars=()
    
    for var in "${required_vars[@]}"; do
        if [ -z "${!var}" ]; then
            missing_vars+=("$var")
        fi
    done
    
    if [ ${#missing_vars[@]} -ne 0 ]; then
        echo "❌ Missing required environment variables:"
        printf '%s\n' "${missing_vars[@]}"
        exit 1
    fi
    
    echo "✅ All required environment variables are set"
}

# Create backup before deployment
create_backup() {
    echo "💾 Creating database backup..."
    
    if [ ! -d "$BACKUP_DIR" ]; then
        mkdir -p "$BACKUP_DIR"
    fi
    
    node scripts/backup.js
    
    if [ $? -eq 0 ]; then
        echo "✅ Backup created successfully"
    else
        echo "❌ Backup failed"
        exit 1
    fi
}

# Run pre-deployment checks
run_checks() {
    echo "🔍 Running pre-deployment checks..."
    
    # Type check
    echo "Running TypeScript type check..."
    npm run type-check
    
    # Lint check
    echo "Running ESLint..."
    npm run lint
    
    # Health check
    echo "Running health check..."
    npm run health-check
    
    echo "✅ All pre-deployment checks passed"
}

# Build the application
build_app() {
    echo "🔨 Building application..."
    
    # Clean previous build
    rm -rf .next
    
    # Install dependencies
    npm ci --only=production
    
    # Build application
    npm run build:production
    
    if [ $? -eq 0 ]; then
        echo "✅ Application built successfully"
    else
        echo "❌ Build failed"
        exit 1
    fi
}

# Deploy based on environment
deploy() {
    case $ENVIRONMENT in
        "vercel")
            echo "🚀 Deploying to Vercel..."
            vercel --prod
            ;;
        "docker")
            echo "🐳 Building and deploying with Docker..."
            docker-compose down
            docker-compose build --no-cache
            docker-compose up -d
            ;;
        "server")
            echo "🖥️  Deploying to server..."
            # Add server deployment commands here
            # Example: rsync, scp, or SSH commands
            echo "Server deployment not configured yet"
            ;;
        *)
            echo "❌ Unknown deployment environment: $ENVIRONMENT"
            echo "Available environments: vercel, docker, server"
            exit 1
            ;;
    esac
}

# Run post-deployment tests
post_deploy_tests() {
    echo "🧪 Running post-deployment tests..."
    
    # Wait for deployment to be ready
    sleep 30
    
    # Run health check
    npm run health-check
    
    # Run E2E tests
    npm run e2e:headless
    
    echo "✅ Post-deployment tests completed"
}

# Main deployment flow
main() {
    echo "=========================================="
    echo "🚀 $APP_NAME Deployment Script"
    echo "Environment: $ENVIRONMENT"
    echo "Timestamp: $(date)"
    echo "=========================================="
    
    check_env_vars
    create_backup
    run_checks
    build_app
    deploy
    post_deploy_tests
    
    echo "=========================================="
    echo "🎉 Deployment completed successfully!"
    echo "Environment: $ENVIRONMENT"
    echo "Timestamp: $(date)"
    echo "=========================================="
}

# Run main function
main "$@"
