const dotenv = require('dotenv')
const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../model/users');

dotenv.config()
// tell passport to use a new strategy for google login
passport.use(new googleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID, // e.g. asdfghjkkadhajsghjk.apps.googleusercontent.com
        clientSecret: process.env.GOOGLE_CLIENT_SECRET, // e.g. _ASDFA%KFJWIASDFASD#FAD-
        callbackURL: "http://localhost:3000/users/auth/google/callback",
    },

  async  function(accessToken, refreshToken, profile, done){

    try{
          //finding user in db
          const user=await User.findOne({email:profile.emails[0].value});
          console.log(accessToken, refreshToken);
          console.log(profile);

      //if user is found 
      if(user){
        // If found, set this user as req.user
        return done(null,user);
    }
    else{
        //if user is not found then create new 
        let newUser=await User.create({
            name:profile.displayName,
            email:profile.emails[0].value,
            password:crypto.randomBytes(20).toString('hex'),
           
        });
        
        return done(null,newUser);
    }

}catch(error){
    console.log('error in google strategy-passport', error)
    return done(err, false);
}
        
       
       


}));


module.exports = passport;
