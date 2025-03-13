# Team Members Block

A custom WordPress block that allows you to display team members in your posts and pages. This block provides an easy way to showcase your team members with their information in a visually appealing manner.

## Features

- Add and manage team members directly in the WordPress block editor
- Customizable team member display
- Responsive design
- Built with modern WordPress block development practices

## Requirements

- WordPress 6.7 or higher
- PHP 7.4 or higher
- Node.js and npm (for development)
- Docker and Docker Compose (for development environment)

## Installation

1. Download the plugin zip file
2. Go to WordPress admin panel > Plugins > Add New
3. Click "Upload Plugin" and select the downloaded zip file
4. Click "Install Now" and then "Activate"

## Development

### Docker Setup

Create a `docker-compose.yml` file in the root directory with the following configuration:

```yaml
services:
  db:
    image: mysql:5.7
    volumes:
      - db_data:/var/lib/mysql
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: your_root_password
      MYSQL_DATABASE: wordpress_db
      MYSQL_USER: wordpress_user
      MYSQL_PASSWORD: your_password

  wordpress:
    depends_on:
      - db
    image: wordpress:latest
    volumes:
      - ./wordpress:/var/www/html
      - ./plugins:/var/www/html/wp-content/plugins
    ports:
      - "8080:80"
    restart: always
    environment:
      WORDPRESS_DB_HOST: db:3306
      WORDPRESS_DB_USER: wordpress_user
      WORDPRESS_DB_PASSWORD: your_password
      WORDPRESS_DB_NAME: wordpress_db
    user: "${UID}:${GID}"

volumes:
  db_data:
```

To start the development environment:
```bash
docker-compose up -d
```

### Local Setup

1. Clone the repository
2. Navigate to the plugin directory:
   ```bash
   cd plugins/my-simple-block
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Available Scripts

- `npm run build` - Build the block for production
- `npm run start` - Start development mode with hot reloading
- `npm run format` - Format code using WordPress coding standards
- `npm run lint:js` - Lint JavaScript files
- `npm run lint:css` - Lint CSS files
- `npm run plugin-zip` - Create a zip file for distribution
- `npm run build-docker-restart` - Build the block and restart the Docker container

## Usage

1. Create or edit a post/page
2. Click the "+" button to add a new block
3. Search for "Team Members" or find it in the "Widgets" category
4. Add team members and customize their information
5. Save or publish your post

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the GPL-2.0-or-later License - see the [LICENSE](LICENSE) file for details.

## Author

Created by Ali Khakbazan 