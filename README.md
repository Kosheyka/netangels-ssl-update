# netangels-ssl-update
This script is designed to automatically renew SSL certificates on a server hosted on NetAngels.

## Getting started

1. Pull project and install dependencies.
2. `cp .env.example .env`.
3. Fill in API_KEY from [Netangels account settings](https://panel.netangels.ru/account/api/).
4. Fill in SSL_DIR according to your server settings.
5. (Not required) Fill in LOG_DIRECTORY to your server log directory.

## Config and running
There is very important to run this update-script as root user!

### Nginx
Adjust your Nginx config server sections with the correct file names:
```
server {
    listen 443 ssl;
    
    ssl_certificate /etc/nginx/ssl/filename.crt;
    ssl_certificate_key /etc/nginx/ssl/filename.key;
    ...
}
```

### Cron

Create new file `/etc/cron.d/ssl` and add to it:
```
*   *   */10    *   *   root    cd /path/to/netangels-ssl-update && yarn update
```

This will run the update-script every 10 days.
