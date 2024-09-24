# Stage 1: Node.js for Vue.js
FROM node:20-alpine AS node

WORKDIR /var/www

# Copy Vue.js project files
COPY . .

# Install Node.js dependencies
RUN npm install

# Build Vue.js assets
CMD ["npm", "run", "dev"]

# Stage 2: PHP for Laravel
FROM php:8.2-fpm

# Set your user name, ex: user=jeffgabriiel
ARG user=jeffgabriiel
ARG uid=1000

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip

# Install some base extensions
RUN apt-get install -y \
    libzip-dev \
    zip \
    && docker-php-ext-install zip

# Install Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs

# Install cron
RUN apt-get install -y cron

# Install nano editor
RUN apt-get install -y nano

# Install sudo
RUN apt-get update && apt-get install -y sudo

# Check if the user already exists
RUN id -u $user &>/dev/null || useradd -G www-data,sudo -u $uid -d /home/$user -m $user

# Allow the user to execute commands without password
RUN echo "$user ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/$user

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd sockets

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Create system user to run Composer and Artisan Commands
RUN useradd -G www-data,root -u $uid -d /home/$user $user
RUN mkdir -p /home/$user/.composer && \
    chown -R $user:$user /home/$user

# Install Redis extension
RUN pecl install -o -f redis \
    &&  rm -rf /tmp/pear \
    &&  docker-php-ext-enable redis

# Set working directory
WORKDIR /var/www

# Copy custom PHP configurations
COPY docker/php/custom.ini /usr/local/etc/php/conf.d/custom.ini

# Add Laravel cron job
RUN echo "* * * * * cd /var/www && php artisan schedule:run >> /dev/null 2>&1" > /etc/cron.d/laravel-cron

# Set permissions for the cron file
RUN chmod 0644 /etc/cron.d/laravel-cron

# Configure nano as the default editor
ENV VISUAL=nano
ENV EDITOR=nano

# Create system user to run Composer and Artisan Commands if it doesn't exist
RUN id -u $user &>/dev/null || useradd -G www-data,root -u $uid -d /home/$user $user

# Ensure the user's home directory exists
RUN mkdir -p /home/$user/.composer && \
    chown -R $user:$user /home/$user

# Apply the cron job for the user
USER $user
RUN crontab /etc/cron.d/laravel-cron
