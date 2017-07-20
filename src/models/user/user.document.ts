import * as mongoose from "mongoose";
import {IUser} from "./user.interface";

/** The user model. */
export interface IUserModel extends IUser, mongoose.Document{}  
