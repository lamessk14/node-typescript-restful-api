import * as mongoose from 'mongoose';

import {UserRepository} from './user.repository';
import {IUserModel} from './user.document';

/** Handle the user model. */
export class UserModel {

  /** The user model */
  private _userModel: IUserModel;

   /**
   * Construct an user model.
   * @param {IUserModel} userModel The user model
   */
  constructor(userModel: IUserModel){
    this._userModel = userModel;
  }

  /**
   * Create an user.
   * @param {string} email The user's email.
   * @param {string} text The user's password.
   */
  static create(email: string, password: string): Promise<IUserModel> {
    return new Promise((resolve, reject) => {
      let repository = new UserRepository();
      let doc = <IUserModel> {
        email: email,
        password: password
      };
      repository.create(doc, (err, res) => {
        err ? reject(err): resolve(res);
      });
    });
  }

  /**
   * Update an user.
   * @param {IArticleModel} user The updated user.
   */
  static update(user: IUserModel): Promise<any> {
    return new Promise((resolve, reject) => {
      let repository = new UserRepository();
      repository.update(user._id, user, (err, res) => { 
        err ? reject(err) : resolve(res);
      });
    });
  }

  /**
   * Find users
   * @param {Object} cond The conditions.
   */
  static find(cond?: Object): Promise<Array<IUserModel>> {
    return new Promise((resolve, reject) => {
      let repository = new UserRepository();
      if(cond){
        repository.find(cond, {}, {}, (err: any, res: Array<IUserModel>) => {
          err ? reject(err) : resolve(res);
        });
      }else{
        repository.find((err: any, res: Array<IUserModel>) => {
          err ? reject(err) : resolve(res);
        });
      }
    });
  }

  /**
   * Delete an user.
   * @param {string} id The user's id to delete.
   */
  static delete(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let repository = new UserRepository();
      repository.delete(''+id, (err: any, res: any) => {
        err ? reject(err) : resolve(res);
      });
    });
  }

}
