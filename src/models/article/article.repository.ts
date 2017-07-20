import * as mongoose from 'mongoose';

import {RepositoryBase} from './../repository-base';
import {IArticleModel} from './article.document';
import {ArticleSchema} from './article.schema';

/** The repository for articles. */
export class ArticleRepository extends RepositoryBase<IArticleModel> {
  constructor() {
    super(ArticleSchema);
  }
}
