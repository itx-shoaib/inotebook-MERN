const express = require("express");
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');
const { body, validationResult } = require('express-validator');
const Notes = require('../models/Notes');

//ROUTE:1, Get all notes by GET request. Path: /api/auth/fetchallnotes
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
        
    } catch (error) {
        // Returning a error if unable to make a user.
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//ROUTE:2, Add a new note by POST request. Path: /api/notes/addnote
router.post('/addnote', fetchUser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Your description must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {
    const { title, description, tag } = req.body;
    // Checking if there are errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const note = new Notes({
            title, description, tag, user: req.user.id
        })

        const savednote = await note.save();

        res.json(savednote);

    } catch (error) {
        // Returning a error if unable to make a user.
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//ROUTE:3, Update a  note by PUT request. Path: /api/notes/updatenote
router.put('/updatenote/:id', fetchUser, async (req, res) => {
    // Destructing, title,description,tag from req.body.
    const {title,description,tag} = req.body;

    // Creating a new note.
    const newNote = {};
    // Checking
    if (title) {
        newNote.title = title
    };
    if (description) {
        newNote.description = description
    };
    if (tag) {
        newNote.tag = tag
    };

    // Finding note in db to update.
    let note = await Notes.findById(req.params.id);
    if (!note) {
        return res.status(404).send("Not Found");
    }

    //Making a restriction for other user to not change others note.
    if(note.user.toString() !== req.user.id){
        return res.status(404).send("Not Allowed");
    }

    note = await Notes.findByIdAndUpdate(req.params.id, {$set : newNote} , {new:true})
    res.json(note);
})

module.exports = router;