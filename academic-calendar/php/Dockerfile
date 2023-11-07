# Use the official PHP image with Apache. Adjust the version as needed.
FROM php:8.2-apache

# Install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Set the working directory inside the container
WORKDIR /var/www/html

# Copy application source to the image
COPY . /var/www/html

# Install the application's PHP dependencies
RUN composer install

# Enable Apache mod_rewrite for URL rewriting
RUN a2enmod rewrite

# Modify permissions to allow Apache to read the application files
RUN chown -R www-data:www-data /var/www/html

# Expose port 80 for Apache
EXPOSE 80

# Command to run the application. By default, Apache runs in the foreground
CMD ["apache2-foreground"]
