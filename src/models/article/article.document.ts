import * as mongoose from "mongoose";
import {IArticle} from "./article.interface";

/** The article model. */
export interface IArticleModel extends IArticle, mongoose.Document{}  
