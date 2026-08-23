# Bibaho Ghor — Web App

Next.js 16 (standalone) landing/web app for the Bibaho Hub matrimony platform.

---

## Tech Stack

| Layer        | Technology                              |
|--------------|-----------------------------------------|
| Framework    | Next.js 16 (App Router, standalone output) |
| Language     | TypeScript 5                            |
| Styling      | Tailwind CSS 4                          |
| AI           | Google Gemini (`@google/genai`)         |
| Data         | TanStack Query v5                       |
| Process mgr  | PM2 (cluster mode)                      |
| Web server   | Nginx (reverse proxy + SSL termination) |

---

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Copy and fill in env vars
cp .env.example .env.local
# Edit .env.local — set NEXT_PUBLIC_API_URL to your local API (default: http://localhost:8000)

# 3. Start dev server
npm run dev
# → http://localhost:3000
```

---

## Production Deployment (Ubuntu VPS)

### 1. Server prerequisites

```bash
# Node.js 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# PM2
sudo npm install -g pm2

# Nginx
sudo apt install -y nginx

# Certbot (Let's Encrypt SSL)
sudo apt install -y certbot python3-certbot-nginx
```

### 2. Build the app locally and upload

```bash
# On your local machine
npm run build

# The standalone output is at .next/standalone/
# Upload the following to /var/www/bibaho-ghor/ on the VPS:
#   .next/standalone/   (the node server)
#   .next/static/       (static assets — copy into standalone/.next/static/)
#   public/             (public assets)
#   ecosystem.config.js
```

Or clone and build directly on the VPS:

```bash
# On VPS
git clone <repo-url> /var/www/bibaho-ghor
cd /var/www/bibaho-ghor
npm install
npm run build

# Copy static assets into standalone output
cp -r .next/static .next/standalone/.next/static
cp -r public .next/standalone/public
```

### 3. Set environment variables

Create `/var/www/bibaho-ghor/.env.production`:

```env
NEXT_PUBLIC_API_URL=https://api.bibaohghor.com
GEMINI_API_KEY=your_gemini_api_key
```

Update `ecosystem.config.js` with the real values if you prefer inline env vars.

### 4. Start with PM2

```bash
cd /var/www/bibaho-ghor
pm2 start ecosystem.config.js
pm2 save            # persist across reboots
pm2 startup         # generate systemd unit (follow the printed command)

# Useful commands
pm2 status          # check process status
pm2 logs bibaho-ghor
pm2 reload bibaho-ghor   # zero-downtime reload
pm2 restart bibaho-ghor
```

### 5. Configure Nginx

```bash
# Obtain SSL certificates (run once per domain)
sudo certbot certonly --nginx -d bibahohub.com -d www.bibahohub.com
sudo certbot certonly --nginx -d bibahohub.ie  -d www.bibahohub.ie

# Install shared snippet (proxy/static/header rules used by both domains)
sudo cp bibahohub-common.nginx.conf /etc/nginx/snippets/bibahohub-common.conf

# Install main vhost config
sudo cp bibaho-ghor.nginx.conf /etc/nginx/sites-available/bibaho-ghor
sudo ln -s /etc/nginx/sites-available/bibaho-ghor /etc/nginx/sites-enabled/

# Test and reload
sudo nginx -t
sudo systemctl reload nginx
```

### 6. Firewall

```bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw reload
```

---

## Directory Layout (on VPS)

```
/var/www/bibaho-ghor/
├── .next/
│   ├── standalone/        ← node server entry (server.js)
│   │   └── .next/static/  ← copied here after build
│   └── static/
├── public/
├── ecosystem.config.js
└── .env.production
```

---

## Zero-downtime Redeploy Script

```bash
#!/usr/bin/env bash
set -e
cd /var/www/bibaho-ghor
git pull origin main
npm install --omit=dev
npm run build
cp -r .next/static .next/standalone/.next/static
cp -r public .next/standalone/public
pm2 reload bibaho-ghor
echo "Deploy complete."
```

---

## Environment Variables

| Variable              | Required | Description                              |
|-----------------------|----------|------------------------------------------|
| `NEXT_PUBLIC_API_URL` | Yes      | Base URL of the FastAPI backend           |
| `GEMINI_API_KEY`      | Yes      | Google Gemini API key for AI features     |
| `APP_URL`             | No       | Public URL of this app — `https://bibahohub.com` or `https://bibahohub.ie` |

---

## Related Services

| Service          | Description                     |
|------------------|---------------------------------|
| `metromony-api`  | FastAPI backend (`systemctl restart metromony-api`) |
| `metromony-chat` | MongoDB-backed chat service      |
| `metromony_gateway` | API gateway                  |

---

## Logs

```bash
# PM2 app logs
pm2 logs bibaho-ghor

# Nginx access/error logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# PM2 structured logs
tail -f /var/log/pm2/bibaho-ghor-out.log
tail -f /var/log/pm2/bibaho-ghor-err.log
```
