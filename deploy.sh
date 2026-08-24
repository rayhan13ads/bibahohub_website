#!/usr/bin/env bash
# Run on the server from /var/www/bibahohub_website
set -e

echo "Installing dependencies..."
npm ci --omit=dev

echo "Building..."
npm run build:prod

echo "Reloading PM2..."
pm2 reload bibaho-ghor --update-env

echo "Done."
