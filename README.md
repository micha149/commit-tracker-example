# CommitTracker Task Management App

A simple task management application built with HTML, CSS, and JavaScript. This application serves as an example project for the Git workshop "Clean Commits for a Sustainable Code History".

## Features

- Create, edit, and delete tasks
- Set task priorities and due dates
- Mark tasks as completed
- Categorize tasks
- Store tasks locally in the browser

## Project Structure

```
index.html              # Main HTML file
styles/                 # CSS files
  ├── main.css          # Main stylesheet
  └── components.css    # Component-specific styles
scripts/                # JavaScript files
  ├── app.js            # Main application logic
  ├── components/       # UI components
  ├── services/         # Data services
  └── utils/            # Utility functions
assets/                 # Images, icons, etc.
  └── icons/            # SVG icons
```

## Development

This project uses [Vite](https://vitejs.dev/) for development and building.

### Using Node.js locally

If you have Node.js installed, you can use these commands:

To start the development server:
```
npm run dev
```

To build for production:
```
npm run build
```

To preview the production build:
```
npm run preview
```

### Using Docker (recommended for workshop participants)

This project includes Docker configuration for both development and production environments.

#### Prerequisites
- Docker
- Docker Compose

#### Development Server

To start the development server in Docker:
```
docker-compose up -d
```

To stop the server:
```
docker-compose down
```

The application will be available at http://localhost:5173

Changes to the source code will be reflected immediately due to the volume mapping.

#### Production Build

The Dockerfile includes a production build stage that can be used to create a production-ready image:
```
docker build --target production -t git-workshop-prod .
```

## Purpose

This project is designed as a learning environment for a Git workshop focused on clean commit histories. It provides a practical foundation for participants to practice various Git techniques for organizing commits.
