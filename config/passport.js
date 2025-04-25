const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/users');
require('dotenv').config()

module.exports = function(passport){
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = process.env.secretOrkey
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.findById(jwt_payload.id, (err, User) => {
            if(err){
                return done(err, false);
            }

            if(User){
                return done(null, User);
            } else {
                return done(null, false);
            }
        });
    }));
}