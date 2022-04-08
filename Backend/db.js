// this js file to is to connect with our local database through our local DB string.

const mongoose = require('mongoose')

const mongoUrl= "mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&ssl=false"

const connectToMongo = ()=>{
    mongoose.connect(mongoUrl, ()=>               // (URI, Callback Function)
    {
        console.log("Connect to MOngoDB")
    })
}

module.exports=connectToMongo
