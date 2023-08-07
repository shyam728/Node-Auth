const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserDB = require('../model/users');
const bcript = require('bcrypt');

passport.use(
  new LocalStrategy({ usernameField: 'email', passReqToCallback: true }, async function (
    req,
    email,
    password,
    done
  ) {
    try {
      const user = await UserDB.findOne({ email: email });

      if (!user || !(await bcript.compare(password, user.password))) {
        req.flash('error', 'Invalid email / password');
        console.log('Invalid email / password');
        return done(null, false);
      }

      return done(null, user);
    } catch (err) {
      req.flash('error', 'Error in passport authentication');
      console.log('Error in passport authentication', err);
      return done(err);
    }
  })
);

// serialzing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
  })




// deserialzing the user from the key in the cookies
passport.deserializeUser(async function (id, done) {
    try {
        const user = await UserDB.findById(id);
        if (!user) {
            return done(null, false);
        }
        return done(null, user);
    } catch (err) {
        console.log("Error in finding user --> Passport");
        return done(err);
    }
});




// check req user sign in or not
passport.checkAuthentication = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/');
};

// set user in locals for views
passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  next();
};

module.exports = passport;
