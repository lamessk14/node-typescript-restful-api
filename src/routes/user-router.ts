import {Router, Request, Response, NextFunction} from 'express';
import * as isEmail from 'validator/lib/isEmail';
import * as jwt from 'jwt-simple';
import * as bcrypt from 'bcrypt';

import {Config} from "./../config/config";
import {UserModel} from './../models/user/user.model';

export class UserRouter {

  router: Router

  /** Initialize the HeroRouter. */
  constructor(){
    this.router = Router();
    this.init();
  }

  /** 
   * Create an objet with user data to encode in the jwt token.  
   * @param {IUser} user The user
   */
  private static userDataToPassInToken(user): Object{
    return {
      _id: user._id,
      email: user.email
    };
  }

  /** Create an user. */
  public create(req: Request, res: Response, next: NextFunction): void { 

    // The attributes.
    let email = req.body.email;
    let password = req.body.password;

    // The errors object
    let errors: Array<Object> = [];

    // Check email
    if(!email){ 
      errors.push({
        title: "Attribute is missing",
        detail: "No email specified"
      });
    }else{
      // If email has not email format
      if(!isEmail(email)){
        errors.push({
          title: "Invalide attribute",
          detail: "Email must have an email format"
        });
      }
      // If email doesn't have characters length requirments
      if(email.length < 5){
        errors.push({
          title: "Invalid attribute",
          detail: "Email must contain at least five characters"
        });
      }
    }
   
    // Check password
    if(!password){
      errors.push({
        title: "Attribute is missing",
        detail: "No password specified"
      });
    }else{
      if(password.length < 6){
        errors.push({
          title: "Invalid attribute",
          detail: "Password must contain at least 6 characters"
        });
      }
    }

    // If a least one error
    if(errors.length > 0){
      res.status(403).send({
        errors: errors
      });
    }else{
      UserModel.create(email, password)
      .then(user => {
        res.status(201).send({
          data: {
            type: "users",
            id: user._id,
            attributes: {
              email: user.email
            },
            token: "JWT " + jwt.encode(UserRouter.userDataToPassInToken(user), Config.key, "HS256", "")
          }
        });
      })
      .catch(err => {
        res.status(400).send({
          errors: [{
            title: "Can't create the user",
            detail: err.message
          }]
        });
      }); 
    }
    
  }

  /** Login an user. */
  public findById(req: Request, res: Response, next: NextFunction): void {
    
    // The attributes.
    let email = req.body.email;
    let password = req.body.password;

    // The errors object
    let errors: Array<Object> = [];


    // Check email
    if(!email){ 
      errors.push({
        title: "Attribute is missing",
        detail: "No email specified"
      });
    }else{
      // If email has not email format
      if(!isEmail(email)){
        errors.push({
          title: "Invalide attribute",
          detail: "Email must have an email format"
        });
      }
      // If email doesn't have characters length requirments
      if(email.length < 5){
        errors.push({
          title: "Invalid attribute",
          detail: "Email must contain at least five characters"
        });
      }
    }
   
    // Check password
    if(!password){
      errors.push({
        title: "Attribute is missing",
        detail: "No password specified"
      });
    }else{
      if(password.length < 6){
        errors.push({
          title: "Invalid attribute",
          detail: "Password must contain at least 6 characters"
        });
      }
    }

    // If a least one error
    if(errors.length > 0){
      res.status(403).send({
        errors: errors
      });
    }else{
      UserModel.find({email: email})
      .then(users => { 
        if(users.length > 0){
          let user = users[0];
          bcrypt.compare(password, user.password, (err, isMatch) => {

            if(err){
              errors.push({
                title: "Can't login user",
                detail: "Error comparing the password"
              });
            }

            if(!isMatch){
              errors.push({
                title: "Can't login user",
                detail: "The password doesn't match"
              });
            }

            if(errors.length > 0){
              res.status(400).send({
                errors: errors
              });
            }else{
              res.status(201).send({
                data: {
                  type: "users",
                  id: user._id,
                  attributes: {
                    email: user.email
                  },
                  token: "JWT " + jwt.encode(UserRouter.userDataToPassInToken(user), Config.key, "HS256", "")
                }
              })
            }
            
          });
        }else{
          res.status(400).send({
            errors: [{
              title: "Invalid attribute",
              detail: "The email does not exist"
            }]
          })
        }
      });
    }
  }

  /** Take each handler, and attach to one of the Express.Router's endpoints. */
  init(){
    this.router.post('/register', this.create);
    this.router.post('/login', this.findById);
  }

}

// Create the UserRouter, and export its configured Express.Router.
const userRoutes = new UserRouter();
userRoutes.init();

export default userRoutes.router;
