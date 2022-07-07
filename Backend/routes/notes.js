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
module.exports = router;