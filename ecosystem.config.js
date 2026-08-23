/** @type {import('pm2').StartOptions} */
module.exports = {
  apps: [
    {
      name: 'bibaho-ghor',
      script: '.next/standalone/server.js',
      cwd: '/var/www/bibahohub_website',

      instances: 'max',   // one process per CPU core
      exec_mode: 'cluster',

      env: {
        NODE_ENV: 'production',
        PORT: 4050,
        HOSTNAME: '127.0.0.1',
        NEXT_PUBLIC_API_URL: 'https://api-metromony.eratechltd.com',
      },

      // Logging
      out_file: '/var/log/pm2/bibaho-ghor-out.log',
      error_file: '/var/log/pm2/bibaho-ghor-err.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,

      // Restart policy
      autorestart: true,
      max_restarts: 10,
      min_uptime: '10s',
      restart_delay: 3000,

      // Memory ceiling — adjust based on your VPS RAM
      max_memory_restart: '512M',

      // Zero-downtime reload
      wait_ready: true,
      listen_timeout: 10000,
      kill_timeout: 5000,
    },
  ],
};
