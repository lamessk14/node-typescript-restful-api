import * as mongoose from 'mongoose';

import {RepositoryBase} from './../repository-base';
import {IUserModel} from './user.document';
import {UserSchema} from './user.schema';

/** The repository for users. */
export class UserRepository extends RepositoryBase<IUserModel> {
  constructor() {
    super(UserSchema);
  }
}
