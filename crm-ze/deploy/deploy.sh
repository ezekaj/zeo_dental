#!/bin/bash
# ManagerCRM Deployment Script
# Run from the deploy/ directory on the VPS after setup-vps.sh
# Usage: bash deploy.sh [initial|update|ssl]

set -e

APP_DIR="/opt/managercrm"
COMPOSE_FILE="docker-compose.prod.yml"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

cd "$APP_DIR"

# Load env
if [ -f .env ]; then
  source .env
else
  echo "ERROR: .env file not found. Copy .env.production to .env and fill in values."
  exit 1
fi

DOMAIN="${CRM_DOMAIN:-crm.zeodentalclinic.com}"
EMAIL="${CERTBOT_EMAIL:-elvizekaj02@gmail.com}"

case "${1:-initial}" in
  initial)
    echo "=== ManagerCRM Initial Deployment ==="
    echo ""

    # Step 1: Start with HTTP-only nginx for SSL cert
    echo "[1/5] Starting services with HTTP-only config..."
    cp nginx/conf.d/crm-initial.conf.template nginx/conf.d/crm.conf
    docker compose -f "$COMPOSE_FILE" up -d crm-ze-db crm-ze-app nginx

    # Wait for app to be healthy
    echo "[2/5] Waiting for ManagerCRM to start..."
    until docker compose -f "$COMPOSE_FILE" ps crm-ze-app | grep -q healthy; do
      sleep 10
      echo "  Still waiting..."
    done
    echo "  ManagerCRM is healthy!"

    # Step 2: Get SSL certificate
    echo "[3/5] Obtaining SSL certificate for $DOMAIN..."
    docker compose -f "$COMPOSE_FILE" run --rm certbot \
      certbot certonly --webroot -w /var/www/certbot \
      -d "$DOMAIN" --email "$EMAIL" --agree-tos --no-eff-email

    # Step 3: Switch to SSL nginx config
    echo "[4/5] Switching to SSL configuration..."
    cp "$SCRIPT_DIR/nginx/conf.d/crm.conf" nginx/conf.d/crm.conf
    docker compose -f "$COMPOSE_FILE" restart nginx

    # Step 4: Run setup
    echo "[5/5] Running ManagerCRM setup..."
    COMPOSE_PROJECT_NAME=managercrm bash "$SCRIPT_DIR/../setup.sh"

    echo ""
    echo "=== Deployment Complete ==="
    echo "  URL: https://$DOMAIN"
    echo "  Login: ${CRM_ZE_USER:-admin} / (your password from .env)"
    echo ""
    ;;

  update)
    echo "=== ManagerCRM Update ==="
    echo ""

    # Pull latest images
    echo "[1/3] Pulling latest images..."
    docker compose -f "$COMPOSE_FILE" pull

    # Restart services
    echo "[2/3] Restarting services..."
    docker compose -f "$COMPOSE_FILE" up -d

    # Re-run setup to apply any changes
    echo "[3/3] Re-applying setup..."
    COMPOSE_PROJECT_NAME=managercrm bash "$SCRIPT_DIR/../setup.sh"

    echo ""
    echo "=== Update Complete ==="
    ;;

  ssl)
    echo "=== Renewing SSL Certificate ==="
    docker compose -f "$COMPOSE_FILE" run --rm certbot certbot renew --webroot -w /var/www/certbot
    docker compose -f "$COMPOSE_FILE" restart nginx
    echo "=== SSL Renewal Complete ==="
    ;;

  *)
    echo "Usage: $0 [initial|update|ssl]"
    echo "  initial  - First-time deployment (SSL + setup)"
    echo "  update   - Update existing deployment"
    echo "  ssl      - Renew SSL certificate"
    exit 1
    ;;
esac
