module.exports = {
    apps : [{
      name:'ta-presence-izin',
      script: 'app.js',
      watch: '.',
      ignore_watch: ['api/logapi','tmp','upload', 'images/in', 'images/out', 'images/izin'],
      env: {
        "NODE_ENV": "development",
        "PORT": 1103,
        "DATABASE_CONN": "postgres://postgres:root@localhost:5432/my_presence",
        "JWT_CONF_TOKEN": "$1$MVdV2Riq$C37FIkSV7yHA5gowfCKnD0"
      },
      env_production: {
        "NODE_ENV": "production",
        "PORT": 1103,
        "DATABASE_CONN": "postgres://postgres:Tikomdik2019@192.168.100.25:5432/temporary_ta_presensi",
        "JWT_CONF_TOKEN": "$1$MVdV2Riq$C37FIkSV7yHA5gowfCKnD0"
      }
    }],
  
    deploy : {
      production : {
        user : 'SSH_USERNAME',
        host : 'SSH_HOSTMACHINE',
        ref  : 'origin/master',
        repo : 'GIT_REPOSITORY',
        path : 'DESTINATION_PATH',
        'pre-deploy-local': '',
        'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
        'pre-setup': ''
      }
    }
  };
  