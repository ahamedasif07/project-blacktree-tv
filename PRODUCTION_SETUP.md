# 🚀 Production Deployment Guide - Blacktree TV Monorepo

Welcome to the official production deployment guide. This document details how to deploy, secure, and monitor your high-performance **Unified Bun & Nginx Monorepo Stack** on a production virtual private server (VPS) or cloud instance (e.g., AWS, DigitalOcean, Linode).

---

## 🏗️ Production Architecture Overview

The system runs on a highly secured, private-network container topology:

* **Gateway (Public):** Nginx on port `80` (and `443` for SSL) routing traffic, compressing assets, and caching static Next.js pages directly from disk.
* **Frontend (Private):** Next.js running standalone under **Bun** (Port 3000), fully hidden from direct internet access.
* **Backend (Private):** Express.js API running under **Bun** (Port 5000), fully hidden from direct internet access.
* **Cache (Private):** Redis Alpine key-value store.
* **Database (Remote):** PostgreSQL (Neon Serverless Postgres).

---

## 📋 Prerequisites

Before deploying, ensure your production Linux server has the following installed:
1. **Docker Engine** (v20.10+)
2. **Docker Compose** (v2.0+)
3. **Git**

To install Docker and Compose on Ubuntu:
```bash
sudo apt update
sudo apt install -y docker.io docker-compose-plugin
sudo systemctl enable --now docker
```

---

## 🛠️ Step-by-Step Deployment

### Step 1: Clone Your Repository
Clone your project onto your production server:
```bash
git clone <your-repository-url> /var/www/blacktree-tv
cd /var/www/blacktree-tv
```

### Step 2: Set Up Secure Environment Variables

Create your production `.env` files for both frontend and backend. 

#### 📂 Backend Environment

Create the file `/var/www/blacktree-tv/server/.env` and configure your credentials:

```env
NODE_ENV=production
PORT=5000

# Serverless Database Connection (e.g., Neon Postgres)
DATABASE_URL="postgresql://<user>:<password>@<host>/neondb?sslmode=require"

# JWT Config (Generate 32+ character random strings)
JWT_SECRET="generate-a-secure-secret-key-with-32-chars-min"
JWT_REFRESH_SECRET="generate-another-secure-secret-key-with-32-chars-min"
JWT_EXPIRES_IN=7d
JWT_REFRESH_EXPIRES_IN=30d

# Better Auth Config
BETTER_AUTH_SECRET="your-better-auth-generated-secret"

# Third-party integrations
AUTH_GOOGLE_ID=xxxx.apps.googleusercontent.com
AUTH_GOOGLE_SECRET=xxxx

# Email / SMTP Setup
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-production-email@gmail.com
EMAIL_PASSWORD=your-app-specific-smtp-password
EMAIL_FROM=Blacktree TV <noreply@blacktree.tv>
```

#### 📂 Frontend Environment

Create the file `/var/www/blacktree-tv/web/.env` (Even if empty, this must exist so Docker Compose doesn't throw warnings, or you can add Clerk keys here if needed at runtime):

```env

# Clerk Authentication Configuration
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_xxxxxxxxxx
CLERK_SECRET_KEY=sk_live_xxxxxxxxxx
```

---

### Step 3: Start the Cluster

Build and start your containers in background (detached) mode:

```bash
docker compose up --build -d
```

*Docker will automatically download the lightweight Alpine images, execute multi-stage cache compiles under Bun, and launch all services safely behind Nginx.*

To verify that all containers are online and healthy:

```bash
docker compose ps
```

---

### Step 4: Run Database Migrations & Seeds

Once the container cluster is online, sync your Prisma schema with the live Neon production database and apply seed data:

```bash

# Push database migrations
docker compose exec server bunx prisma migrate deploy

# Run the seeding scripts
docker compose exec server bunx prisma db seed
```

---

## 🔒 Step 5: Secure with SSL (HTTPS) via Let's Encrypt

Running on HTTP (port 80) is highly insecure. In production, you must set up SSL certificates using Certbot.

### 1. Install Certbot

On your host machine, install Certbot:

```bash
sudo apt install -y certbot
```

### 2. Obtain SSL Certificates

Generate Let's Encrypt certificates by temporarily stopping your docker Nginx container so Certbot can verify your domain:

```bash

# Stop Docker Compose
docker compose down

# Obtain SSL Certificate (Replace yourdomain.com with your actual domain name)
sudo certbot certonly --standalone -d yourdomain.com -d www.yourdomain.com

# Start Docker Compose back up
docker compose up -d
```

### 3. Update Nginx Config to Enable HTTPS

Update your Nginx configuration at `docker/nginx/nginx.conf` to handle HTTPS traffic:

Modify the `server` block in `docker/nginx/nginx.conf` to bind to port 443 and connect the certificates:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$host$request_uri; # Redirect all HTTP to HTTPS
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    # SSL Certificates
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    # Highly Optimized SSL Settings (Modern Compatibility)
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers 'ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384';
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 1d;

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;

    # Backend Proxy (/api)
    location /api {
        proxy_pass http://backend;
        proxy_http_version 1.1;
        proxy_set_header Connection "";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Catch-all to Next.js Frontend
    location / {
        proxy_pass http://frontend;
        proxy_http_version 1.1;
        proxy_set_header Connection "";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### 4. Mount Certificates into Nginx

Update the `nginx` service inside your `docker-compose.yml` to mount the certificate files directly inside the Nginx container:

```yaml
  nginx:
    build:
      context: ./docker/nginx
    container_name: blacktree-nginx
    restart: always
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - /etc/letsencrypt:/etc/letsencrypt:ro
    depends_on:
      - web
      - server
    networks:
      - blacktree-network
```
Run `docker compose up -d` to load the changes. Your system is now **fully secured under premium HTTPS!**

---

## 📈 Monitoring & Maintenance Operations

### 1. View Service Logs
Keep track of live server activities and API requests:
```bash
# View logs for all containers
docker compose logs -f

# View logs for backend server only
docker compose logs -f server
```

### 2. Graceful Updates (Zero-Downtime Hot Reloads)
When you push code updates to Git and want to apply them without taking the site down:
```bash
# Pull new changes from Git
git pull origin main

# Rebuild and reload containers in the background without affecting uptime
docker compose up --build -d
```
*Docker will build the updated images in the background, spin up new containers, and gracefully shut down the old ones once the new ones are ready.*

### 3. Database Maintenance (Prisma Commands)
If you need to check migrations or perform custom DB syncs on the production server:
```bash
# Check migrations status
docker compose exec server bunx prisma migrate status

# Run manual database seed updates
docker compose exec server bunx prisma db seed
```

---

## 🛡️ Production Security Checklist

* [ ] **Disable Public Ports:** Double-check that your server firewall (UFW) only permits incoming connections on port `80` and `443`. Ports `3000`, `5000`, and `6379` should be completely blocked to prevent unauthorized database access.
* [ ] **Regular Backups:** Implement cron-jobs on the host machine to back up configuration files and database states regularly.
* [ ] **Keep Secrets Secret:** Never commit your production `.env` files to git. Keep them locked on your host server.

---

### Congratulations! 🎉
Your high-performance, unified Bun monorepo cluster is fully hardened and production-ready!
