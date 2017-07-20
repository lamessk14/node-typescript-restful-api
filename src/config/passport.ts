let JwtStrategy = require('passport-jwt').Strategy;
let ExtractJwt = require('passport-jwt').ExtractJwt;

import {Config} from './config';
import {UserSchema} from './../models/user/user.schema';  
 
/** Check if the JWT matches an user in the database. */
module.exports = function(passport) { 
  let opts = {jwtFromRequest: ExtractJwt.fromAuthHeader(), secretOrKey: Config.key};
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    UserSchema.findOne({_id: jwt_payload._id}, (err, user) => {
    	if(err){
        return done(err, false);
      }
      if(user){
        done(null, user);
      }else{
        done(null, false);
      }
    });
  }));
};
