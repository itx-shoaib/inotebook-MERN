const express = require("express");
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

// Creating a user by a POST request. Path: /api/auth/createuser
router.post('/createuser',[
    body('name' , 'Enter a valid name').isLength({ min: 3 }),
    body('email','Enter a valid email').isEmail(),
    body('password','Your password must be atleast 5 characters').isLength({ min: 5 })
], async(req,res) => {
  // Checking if there are errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      
      // Creating the user in the database, If register with different email and also giving error if usin existing email.
      let user = await User.findOne({email:req.body.email})
      if(user){
        return res.status(400).json({error:"Sorry a user with this email already exist"})
      }
      user = await User.create({
          name: req.body.name,
          password: req.body.password,
          email: req.body.email
        })
        res.json({user})

    } catch (error) {
      console.error(error.message);
      res.status(500).send("some error occur");
    }
})

module.exports = router;