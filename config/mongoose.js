const dotenv = require('dotenv')
//require the library
const mongoose = require('mongoose');
dotenv.config()
// here we are using the MongoDB Url (i.e. Mondodb Atlas)
const db = process.env.MONGOOSELINK;

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('Successfully connected to the database');
}).catch((err)=> console.log('Failed to connect to the database', err));
 



// id ajayagrawal
// password 12345
