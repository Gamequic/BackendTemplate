# Backend template

The plan of this template is to be used on apps to avoid start with nothing.

This backend template shut achieve with this pints

1. Clean code
2. Secure CRUD with users
3. Authentication
4. Use always conventional commits


### Starting the application without Docker:

1. **Prerequisites** :
   * Node.js installed on your system. You can download it from [nodejs.org](https://nodejs.org/).
2. **Installing dependencies** :
   * Open a terminal and navigate to the root directory of your Node.js application.
   * Run the following command to install the dependencies defined in the`package.json` file:
     `npm install`
3. **Database setup** :
   * Ensure you have [Docker](https://www.docker.com/get-started/) instaled on your machine
4. **Starting the application** :
   * Once you have installed the dependencies and set up the database, you can start the application by running the following command:

     `npm run dev`
   * This will start the app and a docker postgre database
   * The application should start and be available at`http://localhost:3000` by default.

### Starting the application with Docker:

1. **Prerequisites** :
   * Docker installed on your system. You can download and install Docker Desktop from [docker.com]().
2. **Configuring Dockerfile** :
   * Create a file named`Dockerfile` in the root directory of your Node.js application with the necessary instructions to build the Docker image for your application. You can use the example provided in the previous response.
     `docker build -t my-node-app .`
3. **Building and running containers** :
   * Open a terminal and navigate to the root directory of your project.
   * Run the following command to build the Docker images and create the containers defined in your`docker-compose.yml` file:
     `docker compose up -d`
   * Once the build is complete and the containers are running, your application will be available at`http://localhost:3000`.

## Philosophy

All of you are free to take this code by forking this repo, and change whatever you want.

## Features

[RootLogIn](/middlewares/root.handler.js)
[Upload profile photos](/services/auth.service.js)
[LogIn system](/middlewares/auth.handler.js)
[CRUD users](/services/user.service.js)

## Checklist

* [X] Fix proc and dev mode
* [X] Block endpoits with rootMiddleware
* [X] Create a public path to leave the HTML use on nodemailer
* [X] Create path docs
* [X] Create docker file
* [X] Clean old code
  This code is taken for older proyects, right now it is been cleaned for old code for other proyects.
* [X] Logs
* [ ] DevOps

## Project Structure

This project is organized based on specific functionalities to facilitate code management and maintenance. Below is the basic structure of the project:

```
/project-root
  /src
    /features
      /user-management
        /controllers
        /models
        /routes
        /services
      /product-catalog
        /controllers
        /models
        /routes
        /services
  /config
  /tests
  /public
  /scripts
  /docs
```

## Logging System

Implementing a logging system is crucial for monitoring and debugging the application. In this project, we use `winston` for managing logs and `morgan` for logging HTTP requests.

### Winston

`winston` is a versatile logging library for Node.js. It provides multiple log levels:

* **Debug** : Detailed debug messages for development.
* **Info** : Informational messages about the application's state.
* **Warn** : Warnings about potential issues.
* **Error** : Critical errors that require immediate attention.

To use `winston`, configure it first, then utilize its methods to create logs:

```
const logger = require('./logger');

// Examples of logging with different levels
logger.debug('Debug message');
logger.info('Informational message');
logger.warn('Warning message');
logger.error('Error message');

```

## Made with

* JS
* Express
* Boom
* Nodemailer
* JOI
* JWT
* Morgan
* Winston
