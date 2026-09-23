#!/bin/bash
set -euo pipefail

export PATH="/root/.nvm/versions/node/v20.20.2/bin:$PATH"
APP_DIR="/root/docker-servicios/delivery-app/mateiii"
COMPOSE_FILE="$APP_DIR/docker-compose.yml"
SERVICE="mateiii-web"
LOG="/root/deploy-mateiii.log"

log() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG"; }

log "Deploy mateiii iniciado"
cd "$APP_DIR"
git fetch origin main >> "$LOG" 2>&1
git reset --hard origin/main >> "$LOG" 2>&1
docker compose -f "$COMPOSE_FILE" build "$SERVICE" >> "$LOG" 2>&1
docker compose -f "$COMPOSE_FILE" up -d "$SERVICE" >> "$LOG" 2>&1
log "Deploy mateiii completado"
