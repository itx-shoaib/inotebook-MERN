// Storing mongoose in a variable
const mongoose = require('mongoose');

// Storing DB URI in mongoURI variable
const mongoURI = "mongodb+srv://shoaib:shoaibjamil43@cluster0.gxfrpaw.mongodb.net/mern-inotebook"


// Storing mongoDB connection in a variable.
const connectToMongo = ()=>{
    // using mongoose function to connect and giving uri.
    mongoose.connect(mongoURI, ()=>{
        // Call back it when it is connected.
        console.log("MongoDB has been connected successfully");
    })
}

module.exports = connectToMongo;