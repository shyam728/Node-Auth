const express = require('express')
const router = express.Router()
const userController = require('../controllers/user_controllers')
const passport = require('passport')
const User = require('../model/users')


router.get('/profile' ,userController.profile)


router.get('/sign-up',userController.signUp)
router.get('/sign-in',userController.signIn)


//------------ Create user Route ------------//
router.post('/createUser' , userController.SignUpCreate)




//create session or login user
router.post('/sign-in-user', passport.authenticate('local', { failureRedirect: '/' }), userController.signInUser);



//------------ Forgot Password Route ------------//
router.get('/forgot', userController.forgot);

//------------ Reset Password Route ------------//
router.get('/reset/:id' , userController.resetPassword)


//reset password page
router.get('/reset-password-page', passport.checkAuthentication, userController.resetPasswordPage);

//reset password / set new password 
router.post('/setNewPassword', passport.checkAuthentication, userController.setNewPassword);





// google sign in and sign up
router.get('/auth/google' , passport.authenticate('google', {scope:['profile' , 'email']}));
router.get('/auth/google/callback' , passport.authenticate('google' , {failureRedirect:'/users/sign-in'}), userController.signInUser)


router.get('/sign-out', userController.signOut)

module.exports = router