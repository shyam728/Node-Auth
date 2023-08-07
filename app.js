const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const bodyParser=require('body-parser');
const db = require('./config/mongoose');
const expressSession = require('express-session')
const passport=require('passport');
const LocalStrategy=require('./config/passport-local-strategy');
const googleStrategy=require('./config/passport-google-oauth2-strategy');
const flash=require('connect-flash');
const customMware=require('./config/Noty_middelware');
const MongoStore=require('connect-mongo');
const dotenv = require('dotenv')
const app = express()

const cookie = require('cookie-parser')
dotenv.config()
path = require('path')
const port = 3000


// set  up ejs 
// set up the view engine
app.set('view engine','ejs')
app.set('views',path.join(__dirname , 'view'))


//for extract style and script from sub pages into the layout
app.set('layout extractStyles', true)
app.set('layout extractScripts', true)




// middlewares 
app.use(expressLayouts);
app.use(express.static('./assets'))
app.use(bodyParser.urlencoded({extended:false}));



//for session cookie
app.use(expressSession({
    name:"user_id",
    secret:"anyValue",
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(10000*60*100)
    },
    //for mongostore
    store:MongoStore.create({
        mongoUrl:process.env.MONGOOSELINK,
        autoRemove:'disabled'
    },
    function(err){
        console.log(err|| "Connect-mongo setup ok");
    })
}));






app.use(express.urlencoded());



app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);



app.use(flash());
app.use(customMware.setFlash);









// use express router
app.use('/',require('./routes'))
app.use('/users',require('./routes/users'))




// handle error
app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
