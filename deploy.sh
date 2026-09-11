#!/usr/bin/env bash
set -e

echo "🚀 Starting deployment for chess-skins.com..."

cd /var/www/chess-skins.com

# 1. Maintenance mode
php8.4 artisan down || true

# 2. Pull latest code from main
git fetch origin main
git reset --hard origin/main

# 3. Install PHP dependencies
composer install --no-dev --optimize-autoloader --no-interaction

# 4. Install NPM dependencies & build assets
npm ci --legacy-peer-deps
npm run build

# 5. Database migrations & seeders
php8.4 artisan migrate --force
php8.4 artisan db:seed --force

# 6. Optimize Laravel caches
php8.4 artisan storage:link || true
php8.4 artisan config:cache
php8.4 artisan route:cache
php8.4 artisan view:cache

# 7. Set correct permissions
chown -R www-data:www-data /var/www/chess-skins.com/storage /var/www/chess-skins.com/bootstrap/cache /var/www/chess-skins.com/database
chmod -R 775 /var/www/chess-skins.com/storage /var/www/chess-skins.com/bootstrap/cache

# 8. Reload PHP-FPM
systemctl reload php8.4-fpm || service php8.4-fpm reload

# 9. Exit maintenance mode
php8.4 artisan up

echo "✅ Deployment completed successfully for chess-skins.com!"
