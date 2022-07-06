const express = require("express");
const router = express.Router();
const User = require('../models/User');

// Creating a user by a POST request. Path: /api/auth/
router.get('/', (req,res) => {
    console.log(req.body);
    const user = User(req.body);
    user.save()
    res.send(req.body);
})

module.exports = router;