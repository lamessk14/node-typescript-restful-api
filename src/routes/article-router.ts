import {Router, Request, Response, NextFunction} from 'express';
import * as passport from 'passport';
require('./../config/passport')(passport); 

import {ArticleModel} from './../models/article/article.model';

export class ArticleRouter {

  router: Router

  /** Initialize the ArticleRouter. */
  constructor(){
    this.router = Router();
    this.init();
  }

  /** Create an article. */
  public create(req: Request, res: Response, next: NextFunction): void { 

    // The attributes.
    let title = req.body.title;
    let text = req.body.text;

    // The errors object
    let errors: Array<Object> = [];

    // Check title
    if(!title){ 
      errors.push({
        title: "Attribute is missing",
        detail: "No title specified"
      });
    }else{
      // If title doesn't have characters length requirments
      if(title.length < 3){
        errors.push({
          title: "Invalid attribute",
          detail: "Title must contain at least three characters"
        });
      }
      if(title.length > 128){ 
        errors.push({
          title: "Invalid attribute",
          detail: "Title must not contain more than 128 characters"
        });
      }
    }
   
    // Check text
    if(!text){
      errors.push({
        title: "Attribute is missing",
        detail: "No text specified"
      });
    }else{
      if(text.length < 6){
        errors.push({
          title: "Invalid attribute",
          detail: "The text length must be at least 3 characters long"
        });
      }
    }

    // If a least one error
    if(errors.length > 0){
      res.status(403).send({
        errors: errors
      });
    }else{ 
      ArticleModel.create(title, text)
      .then(article => {
        res.status(201).send({
          data: {
            type: "articles",
            id: article._id,
            attributes: {
              title: article.title, 
              text: article.text
            }
          }
        })
      })
      .catch(err => {
        res.status(400).send({
          errors: [{
            title: "Can't create the article",
            detail: err.message
          }]
        });
      }); 
    }
    
  }

  /** Update an article. */
  public update(req: Request, res: Response, next: NextFunction): void {

    // The params and attributes
    let id = req.params.id;
    let updates = req.body.updates;
    
    // The errors object
    let errors: Array<Object> = [];

    if(!id){
      errors.push({
        title: "Parameter is missing",
        detail: "No id specified"
      });
    }

    if(!updates){
      errors.push({
        title: "Attribute is missing",
        detail: "No updates specified"
      })
    }
    
    if(errors.length > 0){
      res.status(400).send({
        errors: errors
      });
    }else{
      ArticleModel.findById(id)
      .then(article => {
        if(article){
          
          // Update the article
          article.title = updates.title || article.title;
          article.text = updates.text || article.text;

          ArticleModel.update(article)
          .then(() => {
            res.status(200).send({
              data: {
                type: "articles",
                id: article._id,
                attributes: {
                  title: article.title,
                  text: article.text 
                }
              }
            });
          });

        }
      })
      .catch(err => {
        res.status(400).send({
          errors: [{
            title: "Can't find the article",
            detail: err.message
          }]
        });
      });
    }

  }

  /** Find all articles. */
  public find(req: Request, res: Response, next: NextFunction): void {

    ArticleModel.find()
    .then(articles => { 

      let data: Object[] = [];

      articles.forEach(article => {
        data.push({
          type: "articles",
          id: article._id,
          attributes: {
            title: article.title,
            text: article.text
          }
        }); 
      });

      res.status(200).send({
        data: data
      });

    })
    .catch(err => {
      res.status(400).send({
        errors: [{
          title: "Can't find articles",
          detail: err.message
        }]
      });
    });

  }

  /** Delete an article. */
  public delete(req: Request, res: Response, next: NextFunction): void { 

    // The parameters.
    let id = req.params.id;

    // The errors object
    let errors: Array<Object> = [];

    if(!id){
      errors.push({
        title: "Parameter is missing",
        detail: "No id specified"
      });
    }
    
    if(errors.length > 0){
      res.status(404);
    }else{
      ArticleModel.delete(id)
      .then(()=> {
        res.status(204).send({
        
        });
      })
      .catch(err => {
        res.status(404).send({
          errors: [{
            title: "Can't delete the article",
            detail: err.message
          }]
        });
      });
    }

  }

  /** Take each handler, and attach to one of the Express.Router's endpoints. */
  init(){
    this.router.post('/create', passport.authenticate('jwt', {session: false}), this.create);
    this.router.patch('/update/:id', passport.authenticate('jwt', {session: false}), this.update);
    this.router.get('/', this.find);
    this.router.delete('/delete/:id', passport.authenticate('jwt', {session: false}), this.delete);
  }

}

// Create the ArticleRouter, and export its configured Express.Router.
const articleRoutes = new ArticleRouter();
articleRoutes.init();

export default articleRoutes.router;
