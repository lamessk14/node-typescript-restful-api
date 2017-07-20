# Node Typescript RESTful API

A RESTful API using [NodeJS](https://nodejs.org/en/) and [Typescript](https://www.typescriptlang.org/). 

This API uses two basic models : User and Article. But you can easily add new models and routes.

The models:
* User
  * email - *email format required*
  * password - *crypted in database*
  * createdAt - *automatically created*

* Article
  * title
  * text
  * createdAt - *automatically created*

The routes:
* User
  * Register - *post / create a new user*
  * Login - *post / find the user and returns a JWT (JSON Web Token)*

* Article
  * Create* - *post / create a new article*
  * Find - *get / find all articles*
  * Update* - *patch / update an article*
  * Delete* - *delete / delete an article*

The routes marked with an asterisk (*) need an authentication. That means a valid JWT must be send in the header of the request. You get this JWT Token in the JSON object returned by the login route. I tried to used the basics of the JSON API specifications from [JSON API](http://jsonapi.org/).


## Technologies used
* [NodeJS](https://nodejs.org/en/)
JavaScript runtime built on Chrome's V8 JavaScript engine using an event-driven, non-blocking I/O model that makes it lightweight and efficient.
* [Express](http://expressjs.com/)
Minimal and flexible node web application framework that provides a robust set of features for web and mobile applications.
* [MongoDB](https://www.mongodb.com)
Free and open-source cross-platform document-oriented database program.
* [Typescript](https://www.typescriptlang.org/)
Superset of JavaScript that compiles to clean JavaScript output.


Others technologies used:

* [Grunt](https://gruntjs.com/)
JavaScript based command line build tool that helps developers automate repetitive tasks. It perform tasks like minification, compilation, unit testing, linting, etc.
* [Mongoose](http://mongoosejs.com/)
Provides a straight-forward, schema-based solution to model your application data. It includes built-in type casting, validation, query building, business logic hooks and more, out of the box.
* [Mongoose Unique Validator](https://github.com/blakehaswell/mongoose-unique-validator)
Plugin which adds pre-save validation for unique fields within a Mongoose schema.
* [Bluebird](http://bluebirdjs.com/)
Fully featured promise library with focus on innovative features and performance.
* [Passport](http://passportjs.org/)
Authentication middleware for Node application.
* [Cors](https://github.com/expressjs/cors)
Provide a Connect/Express middleware that can be used to enable CORS with various options.
* [Bcrypt](https://github.com/kelektiv/node.bcrypt.js)
Help you hash passwords.
* [Validator](https://www.npmjs.com/package/validator)
String validators and sanitizers.
* [Node JWT Simple](https://github.com/hokaccha/node-jwt-simple)
Encode and decode JWT (JSON Web Token).


## Run
You need [NodeJS](https://nodejs.org/en/) and [MongoDB](https://www.mongodb.com) installed to run this project.

1. `npm install`
2. `npm run grunt`
2. `npm run start`

In development, you can run:
* `npm run grunt watch` to automatically detect changes and compile,
* `npm run dev` to automatically restart the server on changes.

## How to use
To test this API you can use [Postman](https://www.getpostman.com/) (a powerful GUI platform to make your API development faster & easier, from building API requests through testing, documentation and sharing).

### Exemple
1. Register an account: 

   POST - http://localhost:3000/api/users/register
    
   Email and password attributes required in the body.
    
    
2. Login your account: 
    
   POST - http://localhost:3000/api/users/login
    
   Email and password attributes required in the body. 
    
   The API returns a JWT.
    
3. Create a new article: 

   POST - http://localhost:3000/api/articles/create
   
   Title and text attributes required in the body.
   
   In the headers, "Authorization: JWT" required (ex: 'Authorization: JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1OTZkZjc1ODhmZTU0ODMyN2JhMThkMTEiLCJlbWFpbCI6ImVtYWlsQGdtYWlsLmNvbSJ9.0Bti-CdLPKZSAO1YIBBf5VVpGuEWigSrxnuSqa7s5vF).
   
   
4. Find all articles:
  
   GET - http://localhost:3000/api/articles
  

## Thanks and links
This project is basicly the combination of two others:
* Thanks to Michael Herman for his tutorial [Developing a RESTful API](http://mherman.org/blog/2016/11/05/developing-a-restful-api-with-node-and-typescript/#.WWz-mp9Nxpg)
* Thanks to brennanMKE for his gist about [Mongoose with Typescript and MongoDB](https://gist.github.com/brennanMKE/ee8ea002d305d4539ef6).
