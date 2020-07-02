const User = require("../models/users");
const passport = require("passport");

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// var JwtStrategy = require("passport-jwt").Strategy,
//   ExtractJwt = require("passport-jwt").ExtractJwt;
// var opts = {};
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = "kafir";
// opts.issuer = "http://localhost:4000";
// opts.audience = "http://localhost:3000";
// passport.use(
//   new JwtStrategy(opts, function (jwt_payload, done) {
//     User.findOne({ id: jwt_payload.sub }, function (err, user) {
//       if (err) {
//         return done(err, false);
//       }
//       if (user) {
//         return done(null, user);
//       } else {
//         return done(null, false);
//         // or you could create a new account
//       }
//     });
//   })
// );

module.exports = passport;