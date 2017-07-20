import * as mongoose from "mongoose";
import * as uniqueValidator from "mongoose-unique-validator";
import {IArticleModel} from "./article.document";

/** Schema of an article. */
const schema = new mongoose.Schema({
  title: {type: String, required: true},
  text: {type: String, required: true},
  createdAt: {type: Date, required: false}
});

schema.plugin(uniqueValidator);

schema.pre('save', function(next) { 
	if(this._doc){
		let doc = <IArticleModel>this._doc; 
		if(!doc.createdAt){
			doc.createdAt = new Date();
		}
	}
	next();
	return this;
});

export const ArticleSchema = mongoose.model<IArticleModel>("Articles", schema, "articles");
