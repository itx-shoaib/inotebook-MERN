const mongoose = require('mongoose');

const NotesSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    title:{
        type : String,
        required : true
    },
    description:{
        type : String,
        required : true
    },
    tags:{
        type : String,
        default: "General"
    },
    date:{
        type : Date,
        default : Date.now
    },
  });

const Notes = mongoose.model('notes',NotesSchema);
module.exports = Notes;