require('dotenv').config(); // Load .env file

module.exports = {
  apps: [
    {
      name: 'mahayojana-backend',
      script: 'build/server.js',
      exec_mode: 'cluster',
      instances: 'max',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
        PORT: 3000,
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 8080,
      },
    },
  ],
  deploy: {
    production: {
      user: 'deploy',
      host: '178.16.137.230',
      ref: 'origin/main',
      repo: 'https://github.com/Caygnus/mahayojana-backend',
      path: '/home/deploy/mahayojana-backend',
      ssh_options: 'StrictHostKeyChecking=no',
      'pre-deploy-local':
        'npm run env:encrypt && scp .env.store deploy@178.16.137.230:/home/deploy/mahayojana-backend/current/.env.store',
      'post-deploy':
        'npm install && npm install -g dotenv-store && DOTENV_STORE_PASSPHRASE=caygnus dotenv-store decrypt && npm run build && pm2 restart ecosystem.config.js --env production',
      'pre-setup': "echo 'Setting up server...'",
      key: '~/.ssh/caygnus',
    },
  },
};
