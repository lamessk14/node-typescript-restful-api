import * as mongoose from "mongoose";
import * as uniqueValidator from "mongoose-unique-validator";
import * as bcrypt from "bcrypt";
import {IUserModel} from "./user.document";

/** Schema of an user. */
const schema = new mongoose.Schema({
  email: {type: String, unique: true, uniqueCaseInsensitive: true, required: true},
  password: {type: String, required: true},
  createdAt: {type: Date, required: false}
});

schema.plugin(uniqueValidator);

schema.pre('save', function(next) {
	if(this._doc){
		let doc = <IUserModel>this._doc; 
		if(!doc.createdAt){
			doc.createdAt = new Date(); 
		}
		
		// Encrypt the password
		bcrypt.hash(doc.password, 10, (err, hash) => {
			if(err) return next(err);
			console.log(hash) 
			doc.password = hash;
			next();
		});
	}else{
		next();
		return this;
	}
});

export const UserSchema = mongoose.model<IUserModel>("Users", schema, "users");
