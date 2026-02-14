#!/bin/bash
# ManagerCRM VPS Setup Script for Hetzner
# Run this on a fresh Ubuntu 22.04/24.04 VPS
# Usage: ssh root@YOUR_VPS_IP 'bash -s' < setup-vps.sh

set -e

DOMAIN="${CRM_DOMAIN:-crm.zeodentalclinic.com}"
EMAIL="${CERTBOT_EMAIL:-elvizekaj02@gmail.com}"
APP_DIR="/opt/managercrm"

echo "=== ManagerCRM VPS Setup ==="
echo "Domain: $DOMAIN"
echo ""

# 1. System updates
echo "[1/8] Updating system..."
apt-get update -qq && apt-get upgrade -y -qq

# 2. Install Docker
echo "[2/8] Installing Docker..."
if ! command -v docker &> /dev/null; then
  curl -fsSL https://get.docker.com | sh
  systemctl enable docker
  systemctl start docker
fi
echo "  Docker $(docker --version | cut -d' ' -f3) installed"

# 3. Install Docker Compose plugin
echo "[3/8] Verifying Docker Compose..."
docker compose version || {
  apt-get install -y -qq docker-compose-plugin
}

# 4. Create app directory
echo "[4/8] Setting up application directory..."
mkdir -p "$APP_DIR"
cd "$APP_DIR"

# 5. Set up firewall
echo "[5/8] Configuring firewall..."
if command -v ufw &> /dev/null; then
  ufw allow 22/tcp
  ufw allow 80/tcp
  ufw allow 443/tcp
  ufw --force enable
  echo "  Firewall enabled (SSH, HTTP, HTTPS)"
fi

# 6. Create swap (2GB) for small VPS
echo "[6/8] Setting up swap..."
if [ ! -f /swapfile ]; then
  fallocate -l 2G /swapfile
  chmod 600 /swapfile
  mkswap /swapfile
  swapon /swapfile
  echo '/swapfile none swap sw 0 0' >> /etc/fstab
  echo "  2GB swap created"
else
  echo "  Swap already exists"
fi

# 7. Create backup script
echo "[7/8] Setting up daily backups..."
mkdir -p "$APP_DIR/backups"
cat > "$APP_DIR/backup.sh" << 'BACKUP_EOF'
#!/bin/bash
# Daily ManagerCRM database backup
BACKUP_DIR="/opt/managercrm/backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
CONTAINER=$(docker ps --filter "name=crm-ze-db" --format "{{.Names}}" | head -1)

if [ -z "$CONTAINER" ]; then
  echo "Database container not running"
  exit 1
fi

docker exec "$CONTAINER" mysqldump -u root -p"$MYSQL_ROOT_PASSWORD" openemr > "$BACKUP_DIR/managercrm_$TIMESTAMP.sql"
gzip "$BACKUP_DIR/managercrm_$TIMESTAMP.sql"

# Keep only last 14 days
find "$BACKUP_DIR" -name "managercrm_*.sql.gz" -mtime +14 -exec rm {} \;
echo "Backup complete: managercrm_$TIMESTAMP.sql.gz"
BACKUP_EOF
chmod +x "$APP_DIR/backup.sh"

# Add cron job for daily backup at 3 AM
(crontab -l 2>/dev/null | grep -v managercrm; echo "0 3 * * * cd /opt/managercrm && source .env && /opt/managercrm/backup.sh >> /var/log/managercrm-backup.log 2>&1") | crontab -
echo "  Daily backup at 3 AM configured"

# 8. Summary
echo "[8/8] Setup complete!"
echo ""
echo "=== Next Steps ==="
echo ""
echo "1. Upload your project files to $APP_DIR:"
echo "   scp -r crm-ze/deploy/* root@YOUR_VPS_IP:$APP_DIR/"
echo "   scp crm-ze/docker-compose.yml root@YOUR_VPS_IP:$APP_DIR/  (for reference)"
echo ""
echo "2. Copy and edit the .env file:"
echo "   cp .env.production .env"
echo "   nano .env  # Set real passwords"
echo ""
echo "3. Get SSL certificate (first time):"
echo "   cp nginx/conf.d/crm-initial.conf.template nginx/conf.d/crm.conf"
echo "   docker compose -f docker-compose.prod.yml up -d nginx"
echo "   docker compose -f docker-compose.prod.yml run --rm certbot \\"
echo "     certbot certonly --webroot -w /var/www/certbot \\"
echo "     -d $DOMAIN --email $EMAIL --agree-tos --no-eff-email"
echo "   cp nginx/conf.d/crm.conf.ssl nginx/conf.d/crm.conf  # Switch to SSL config"
echo "   docker compose -f docker-compose.prod.yml restart nginx"
echo ""
echo "4. Start everything:"
echo "   docker compose -f docker-compose.prod.yml up -d"
echo ""
echo "5. Run the setup script:"
echo "   COMPOSE_PROJECT_NAME=managercrm bash setup.sh"
echo ""
echo "6. Point DNS: A record for $DOMAIN -> $(curl -s ifconfig.me)"
echo ""
