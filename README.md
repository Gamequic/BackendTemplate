# Backend template

The plan of this template is to be used on apps to avoid start with nothing.

This backend template shut achieve with this pints

1. Clean code
2. Secure CRUD with users
3. Authentication
4. Use always conventional commits

## Philosophy

All of you are free to take this code by forking this repo, and change whatever you want.

## Features

[RootLogIn](/middlewares/root.handler.js)
[Upload profile photos](/services/auth.service.js)
[LogIn system](/middlewares/auth.handler.js)
[CRUD users](/services/user.service.js)

## Checklist

* [ ] Add server for static files
* [X] Fix proc and dev mode
* [X] Block endpoits with rootMiddleware
* [ ] Create a public path to leave the HTML use on nodemailer
* [X] Create path docs
* [ ] Create docker file
* [ ] Clean old code
  This code is taken for older proyects, right now it is been cleaned for old code for other proyects.
* [ ] Logs

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

## Made with

* JS
* Express
* Boom
* Nodemailer
* JOI
* JWT
