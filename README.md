# Leishmania Database and Web Application

## Overview

This project is a Django-based web application for the Leishmania Database hosted at the Centro de Biología Molecular Severo Ochoa (CBM). The application provides researchers and the public with access to information about Leishmania species, research data, and resources related to leishmaniasis research.

## Technology Stack

- **Framework**: Django 5.1.x
- **Programming Language**: Python 3.12
- **Database**: SQLite
- **Web Server**: Nginx
- **Application Server**: Django development server (in Docker)
- **Containerization**: Docker & Docker Compose
- **SSL/TLS**: Yes, managed through Nginx

## Server Architecture

### Host Server

- **Location**: Centro de Biología Molecular Severo Ochoa (CBM)
- **Operating System**: Ubuntu 24.04.2 LTS (noble)
- **Access Method**: SSH

#### NGINX Configuration

The NGINX server configuration is implemented in `/etc/nginx/sites-available/leishmania.cbm.uam.es` with the following settings:

```
server { 
    listen 80; server_name leishmania.cbm.uam.es www.leishmania.cbm.uam.es;
    
    # HTTP traffict --> HTTPS
    return 301 https://$host$request_uri;
}

server { 
    listen 443 ssl; # Listen for HTTPS connections 
    server_name leishmania.cbm.uam.es www.leishmania.cbm.uam.es;

    # SSL certificate and private key paths
    ssl_certificate /opt/certs/leishmania_certs/Cert_bundle.pem; 
    ssl_certificate_key /opt/certs/leishmania_certs/privateKey.pem;
    
    # SSL/TLS settings
    ssl_protocols TLSv1.2 TLSv1.3; # Use up-do-date TLS protocols only 
    ssl_ciphers HIGH:!aNULL:!MD5; # Use strong SSL/TLS ciphers  # TODO: Check !aNULL
    ssl_prefer_server_ciphers on; # Prioritize secure server ciphers

    # Server static files
    location /static/ {
        alias /opt/leish-web/staticfiles/;  # Directory on the host
        autoindex on;  # Optional: allows directory listing for debugging
    }
    
    # Proxy requests to the Docker container
    location / { 
        proxy_pass http://127.0.0.1:8080; 
        proxy_http_version 1.1; 
        proxy_set_header Upgrade $http_upgrade; 
        proxy_set_header Connection 'upgrade'; 
        proxy_set_header Host $host; 
        proxy_cache_bypass $http_upgrade;
    }

    # Log and error files
    access_log /var/log/nginx/leishmania-cbm-access.log; 
    error_log /var/log/nginx/leishmania-cbm-error.log;
}
```

#### External Access Maintenance

For security reasons, the server automatically restricts external access after periods of inactivity, limiting access to the CBM intranet only. To maintain continuous public accessibility, a monitoring script is implemented at `/opt/leish-web/scripts/ping_web_leishmania.sh`:

```bash
#!/bin/bash
while true; do
    echo "[$(date)] Sending request..."
    curl -s https://leishmania.cbm.uam.es
    sleep 1800
done
```

This script sends a request to the website every 30 minutes (1800 seconds), keeping the external connection active. The script is executed using:

```bash
nohup ./ping_web_leishmania.sh > ./ping.log 2>&1 &
```

Activity logs are stored at `/opt/leish-web/scripts/ping.log` for monitoring and troubleshooting purposes.

### Component Structure

```
┌─────────────────────────────────────┐
│ Client                              │
└─────────────┬───────────────────────┘
              │ HTTPS
┌─────────────▼───────────────────────┐
│ Nginx (Port 443)                    │
│  - SSL Termination                  │
│  - Reverse Proxy                    │
│  - Static Files Serving             │
└─────────────┬───────────────────────┘
              │ HTTP
┌─────────────▼───────────────────────┐
│ Docker Container (Port 8080→3000)   │
│  - Django Application               │
│  - Database Access                  │
└─────────────┬───────────────────────┘
              │
┌─────────────▼───────────────────────┐
│ Volume Mounts:                      │
│  - Database                         │
│  - Static Files                     │
└─────────────────────────────────────┘
```

## Critical Paths

### File System Structure

- **Nginx Configuration**:
  - `/etc/nginx/sites-available/leishmania.cbm.uam.es`
  - Linked to `/etc/nginx/sites-enabled/leishmania.cbm.uam.es`

- **Application Code**:
  - `/var/www/leish_web_app`

- **Persistent Data**:
  - Database: `/opt/leish-web/databases`
  - Secret Key: `/opt/leish-web/secrets/django_secret_key.txt`
  - Static Files: `/opt/leish-web/staticfiles`

- **SSL Certificates**:
  - Certificate Bundle: `/opt/certs/leishmania_certs/Cert_bundle.pem`
  - Private Key: `/opt/certs/leishmania_certs/privateKey.pem`

- **Log Files**:
  - Nginx Access: `/var/log/nginx/leishmania-cbm-access.log`
  - Nginx Error: `/var/log/nginx/leishmania-cbm-error.log`
  - Application: View with `docker-compose logs web`

## Deployment Process

### Initial Setup

1. Clone the repository:
   ```bash
   git clone [repository-url] /var/www/leish_web_app
   cd /var/www/leish_web_app
   ```

2. Create the necessary directories:
   ```bash
   sudo mkdir -p /opt/leish-web/databases
   sudo mkdir -p /opt/leish-web/staticfiles
   ```

3. Set appropriate permissions:
   ```bash
   sudo chown -R $(whoami):$(whoami) /opt/leish-web
   ```

4. Configure Nginx:
   ```bash
   sudo ln -s /etc/nginx/sites-available/leishmania.cbm.uam.es /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

### Deployment and Updates

1. Pull the latest code:
   ```bash
   cd /var/www/leish_web_app
   git fetch --all
   git reset --hard origin/main  # Or your target branch
   ```

2. Stop current containers:
   ```bash
   docker compose down
   ```

3. Rebuild the application:
   ```bash
   docker compose build --no-cache
   ```

4. Start the service:
   ```bash
   docker compose up -d
   ```

5. Verify deployment:
   ```bash
   docker ps
   docker compose logs -f web
   ```

### Maintenance Tasks

#### Clear Docker Cache

If disk space is running low:

```bash
docker system prune -a --volumes  # Removes all unused containers, images, and volumes
```

#### Backup Database

```bash
cp -r /opt/leish-web/databases /path/to/backup/$(date +%Y%m%d)
```

#### SSL Certificate Renewal

Follow the certificate provider's instructions and update paths in the Nginx configuration.

## Troubleshooting

### Common Issues

1. **Web Application Not Accessible**:
   - Check Nginx status: `sudo systemctl status nginx`
   - Verify Docker container running: `docker ps`
   - Check Nginx logs: `sudo tail -f /var/log/nginx/leishmania-cbm-error.log`

2. **SSL Certificate Problems**:
   - Verify certificate paths in Nginx config
   - Check certificate expiration: `openssl x509 -in /opt/certs/leishmania_certs/Cert_bundle.pem -noout -dates`

3. **Database Issues**:
   - Check volume mounts: `docker compose config`
   - Examine database permissions: `ls -la /opt/leish-web/databases`

4. **Static Files Not Loading**:
   - Check if collectstatic ran successfully in container logs
   - Verify Nginx static file configuration

## Security Considerations

- Keep DEBUG=0 in production
- Ensure all secrets (like SECRET_KEY) are properly secured
- Regularly update dependencies and apply security patches
- Consider implementing regular database backups
- Monitor logs for suspicious activity

## Contact

For issues or questions regarding deployment and maintenance, contact the CBM IT Department or the project maintainers.
