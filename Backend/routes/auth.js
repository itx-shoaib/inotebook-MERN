// Connecting with our packages.
const express = require("express");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser');

// Connecting with our Database/models.
const User = require('../models/User');

// Making a JsonWebToken sign.
const JWT_SECRET = "Thisisasecret$sign";

//ROUTE:1 , Creating a user by a POST request. Path: /api/auth/createuser
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

      // Using bcrypt.js functions for saving passwords in hash
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password,salt);

      // Creating a user.
      user = await User.create({
          name: req.body.name,
          password: secPass,
          email: req.body.email
        })

        // Sending payload.
        const data = {
          user:{
            id: user.id
          }
        }
        const authtoken = jwt.sign( data ,JWT_SECRET);
        // res.json({user})

        res.json({authtoken})

    } catch (error) {
      // Returning a error if unable to make a user.
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
})


//ROUTE:2, Login a user by a POST request. Path: /api/auth/login
router.post('/login',[
  body('email','Enter a valid email').isEmail(),
  body('password','Password cannot be blank').exists(),
], async(req,res) => {

  // Checking if there are errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Destructing, Taking email and password from the req.body
  const {email , password} = req.body;

  try {
    // Finding the user in the database.
    let user = await User.findOne({email})
    if(!user){
      //If user is not available in db.
      return res.status(400).json({error:"Please try to login the correct credentials"})
    }

    // Using bcrypt.compare function to compare the password use in frontend and to compare with password store in db.
    const passwordCompare = await bcrypt.compare(password,user.password);
    if (!passwordCompare) {

      //If user is not available in db.
      return res.status(400).json({error:"Please try to login the correct credentials"})
    }

    // Sending payload.
    const data = {
      user:{
        id: user.id
      }
    }
    const authtoken = jwt.sign( data ,JWT_SECRET);
    res.json({authtoken})

  } catch (error) {
    // Returning a error if unable to make a user.
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

//ROUTE:3, Get a user details by a POST request. Path: /api/auth/getuser.
router.post('/getuser', fetchUser, async(req,res) => {
try {
  const userid = req.user.id;
  const user = await User.findById(userid).select('-password')
  res.send(user);
} catch (error) {
  // Returning a error if unable to make a user.
  console.error(error.message);
  res.status(500).send("Internal Server Error");
}
})
module.exports = router;