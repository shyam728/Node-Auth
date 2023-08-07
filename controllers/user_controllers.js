//------------ User Model ------------//
const UserDB = require('../model/users');

//encript password
const bcript=require('bcrypt');






// render profile
module.exports.profile  = function(req,res){
    // console.log(req.cookies);
    // res.cookie('user_id',67)
    res.render('profile', {title:'Profile Page'});
}



// // render the sign up page
module.exports.signUp = function(req, res){

    if(req.isAuthenticated()){
       return res.redirect('/users/profile')
     }


    return res.render('sign-up', {
        title: "Node Auth | Sign Up"
    })
}


//creating new user
module.exports.SignUpCreate= async function(req,res){
    //if password and confrom password match or not 
    if(req.body.password != req.body.ConfromPassword){
        req.flash('error','password and Conform Password not match');
        return res.redirect('back');
    }

    //finding user in db
    let user= await UserDB.findOne({email:req.body.email});
    
    //if user is not found in db then create new 
    if(!user){

        //encript password here
        req.body.password= await bcript.hash(req.body.password,10);
        //create new user
        await UserDB.create(req.body);

        req.flash('success','user created successfully');
        return res.redirect('/');
    }

    //if user is already present in db then just go back
    req.flash('error','user Already Ragister');
    return res.redirect('/');

}







// // render the sign in page
module.exports.signIn = function(req, res){
    
    if(req.isAuthenticated()){
       return   res.redirect('/users/profile')
    }


    return res.render('sign-in', {
        title: "Node Auth | Sign In"
    })
}


//sign in user /creating session 
module.exports.signInUser= function(req,res){
    console.log(req.body)
    req.flash('success','signin successfully');
    return res.redirect('/users/profile');
}




//sign out
module.exports.signOut=function(req,res){
    req.logout(function(err){if(err){console.log(err)}});
    req.flash('success','signout successfully');
    res.redirect('/');
}

















// render the forgot page
module.exports.forgot = function(req, res){

    return res.render('forgot' ,{
        title: "Node Auth | Forgot Password"
    })
}

// render the reset page
module.exports.resetPassword = function(req, res){
    return res.render('reset-password', { id: req.params.id })
}




//reset password page
module.exports.resetPasswordPage= async function(req,res){
    // finding user in db 
    let user= await UserDB.findById(req.user.id);
    
    //if user is google register user they can not change password
    if(user.isGoogle==true){
        req.flash('error',"Google Users can not reset password");
        return res.redirect('back');
    }
    else{
        //user is not google user then show reset password page 
        return res.render('reset-password',{
            title:"Reset Password"
        })
    }
}

//reset Password /set new password
module.exports.setNewPassword= async function(req,res){
    try{
        //password and comform password not match
        if(req.body.password != req.body.ConfromPassword){
            req.flash('error',"password and comform password not match!");
            return res.redirect('back');
        }
        //finding user
        let user=await UserDB.findById(req.user.id);

        if(user){
            //check db password or user send old password match or not 
            let isMatch=await bcript.compare(req.body.oldPassword, user.password);
            //if match then update password
            if(isMatch==true){

                //encript password here
                req.body.password= await bcript.hash(req.body.password,10);
                
                await UserDB.findByIdAndUpdate(user.id,{password:req.body.password});
                req.flash('success',"password reset successfully!");
                return res.redirect('back');
            }else{
                req.flash('error',"Old password not match!");
                return res.redirect('back');
            }
        }
        else{
            req.flash('error',"user is not found!");
            return res.redirect('/sign-up');
        }

    }catch(err){
        req.flash('error',err);
        return console.log(err);
    }
}

