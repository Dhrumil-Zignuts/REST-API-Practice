const mongoose = require('mongoose');

module.exports = (port)=>{
    mongoose.connect(`mongodb+srv://dhrumilZignuts:${process.env.MONGO_PASS}@zignuts-technology.zveo5bz.mongodb.net/RESTapis`,()=>{
            console.log(`Server is running on port no. ${port}`);
            console.log(`MogoDB DataBase is Successffully connected`);
        })
    }
    // retryWrites=true&w=majority
    

    // mongodb+srv://dhrumilZignuts:2782001Ads@zignuts-technology.zveo5bz.mongodb.net/RESTapis