import * as bodyParser from "body-parser";
import * as express from "express";
import * as logger from "morgan";
import * as path from "path";
import * as cors from "cors";
import * as mongoose from "mongoose";
import * as Promise from "bluebird";
Promise.promisifyAll(mongoose); 

import {Config} from "./config/config";
import UserRouter from './routes/user-router';
import ArticleRouter from './routes/article-router';

/** Creates and configures an ExpressJS web server. */
class App {

  /** Ref to Express instance */
  public express: express.Application; 

  /** Run configuration methods on the Express instance. */
  constructor() {
    this.express = express();  
    this.middleware();
    this.database();
    this.routes();
  }

  /** Configure Express middleware. */
  private middleware(): void {

    // Configure Cors.
    this.express.use(cors());

    // Configure header.
    this.express.use((req, res, next) => {
      res.header("Content-Type",'application/vnd.api+json');
      next();
    });

    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false })); 
  }

  /** Database configuration. */
  database(): void {
    mongoose.connectAsync(Config.dbUrl, { 
      useMongoClient: true
    })
    .then(() => console.log('Connected to database'))
    .catch(err => console.log(err));
  }

  /** Configure API endpoints. */
  private routes(): void {
    let router = express.Router();

    this.express.use('/', router);
    this.express.use('/api/users', UserRouter);
    this.express.use('/api/articles', ArticleRouter);
  }

}

export default new App().express;
