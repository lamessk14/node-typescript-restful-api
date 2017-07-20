import * as mongoose from 'mongoose';

import {ArticleRepository} from './article.repository';
import {IArticleModel} from './article.document';

/** Handle the article model. */
export class ArticleModel { 

  /** The article model */
  private _articleModel: IArticleModel;

   /**
   * Construct an article model.
   * @param {IArticleModel} articleModel The article model
   */
  constructor(articleModel: IArticleModel){
    this._articleModel = articleModel;
  }

  /**
   * Create an article.
   * @param {string} title The title of the article.
   * @param {string} text The text of the article.
   */
  static create(title: string, text: string): Promise<IArticleModel> {
    return new Promise((resolve, reject) => {
      let repository = new ArticleRepository();
      let doc = <IArticleModel> {
        title: title,
        text: text
      };
      repository.create(doc, (err, res) => {
        err ? reject(err): resolve(res);
      });
    });
  }

  /**
   * Update an article.
   * @param {IArticleModel} article The updated article.
   */
  static update(article: IArticleModel): Promise<any> {
    return new Promise((resolve, reject) => {
      let repository = new ArticleRepository();
      repository.update(article._id, article, (err, res) => { 
        err ? reject(err) : resolve(res);
      });
    });
  }

  /**
   * Find articles
   * @param {Object} cond The conditions.
   */
  static find(cond?: Object): Promise<Array<IArticleModel>> {
    return new Promise((resolve, reject) => {
      let repository = new ArticleRepository();
      if(cond){
        repository.find(cond, {}, {}, (err: any, res: Array<IArticleModel>) => {
          err ? reject(err) : resolve(res);
        });
      }else{
        repository.find((err: any, res: Array<IArticleModel>) => {
          err ? reject(err) : resolve(res);
        });
      }
    });
  }

  /**
   * Find by id
   * @param {string} id The article's id
   */
  static findById(id: string): Promise<IArticleModel> {
    return new Promise((resolve, reject) => {
      let repository = new ArticleRepository();
      repository.findById(id, (err: any, res: IArticleModel) => { 
        err ? reject(err) : resolve(res);
      });
    });
  }

  /**
   * Delete an article.
   * @param {string} id The article's id to delete.
   */
  static delete(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let repository = new ArticleRepository();
      repository.delete(''+id, (err: any, res: any) => {
        err ? reject(err) : resolve(res);
      });
    });
  }

}
