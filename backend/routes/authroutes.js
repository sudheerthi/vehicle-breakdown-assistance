const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Owner = require('../models/Owner');

const dotenv = require('dotenv');
dotenv.config(); 

const router = express.Router();


const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '4h' });
};


router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

 
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = generateToken(user._id, 'user');
    res.json({ token,email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



router.post('/signup', async (req, res) => {
  const { name, email, password ,secretAnswer,secretQuestion} = req.body;

  try {
 
    if (!name || !email || !password  || !secretAnswer || !secretQuestion) {
      return res.status(400).json({ message: 'Please enter all fields' });
    }

   
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedAnswer = await bcrypt.hash(secretAnswer.trim(), 10);


    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      secretAnswer: hashedAnswer,
      secretQuestion,
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post('/owner/login', async (req, res) => {
  const { email, password } = req.body;

  try {
  
    const owner = await Owner.findOne({ email });
    if (!owner) return res.status(404).json({ message: 'Owner not found' });

   
    const isMatch = await bcrypt.compare(password, owner.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });


    const token = generateToken(owner._id, 'owner');
    res.json({ token,email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post('/owner/signup', async (req, res) => {
  const { 
    name, phone, email, password, shopName, shopImage,
    licenseNumber, shopLocation, operatingHours, servicesOffered,
    chargesRange, secretQuestion, secretAnswer
  } = req.body;

  try {
    
    if (
      !name || !phone || !email || !password || !shopName ||
      !shopImage || !licenseNumber || !shopLocation || !operatingHours ||
      !servicesOffered || !chargesRange || !secretQuestion || !secretAnswer
    ) {
      
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingOwner = await Owner.findOne({ email });
    if (existingOwner) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const hashedSecretAnswer = await bcrypt.hash(secretAnswer.trim(), 12); // Hashing secret answer

    const newOwner = new Owner({
      name,
      phone,
      email,
      password: hashedPassword,
      shopName,
      shopImage,
      licenseNumber,
      shopLocation,
      operatingHours,
      servicesOffered,
      chargesRange,
      secretQuestion,
      secretAnswer: hashedSecretAnswer, // Ensure it's hashed
    });

    await newOwner.save();
    res.status(201).json({ success: true, message: 'Owner registered successfully' }); 

  } catch (error) {
    console.error('Signup Error:', error.message);
    res.status(500).json({ message: 'Error registering owner', error: error.message });
  }
});



  



router.post('/forgot-password', async (req, res) => {
  const { email, secretAnswer, secretQuestion } = req.body;

  try {
      if (!email || !secretAnswer || !secretQuestion) {
          return res.status(400).json({ success: false, message: 'All fields are required' });
      }

      const user = await User.findOne({ email });
      if (!user) {
          return res.status(404).json({ success: false, message: 'User not found' });
      }
      if (user.secretQuestion !== secretQuestion.trim()) {
          return res.status(400).json({ success: false, message: 'Incorrect secret question' });
      }
      const isAnswerValid = await bcrypt.compare(secretAnswer.trim(), user.secretAnswer);
      if (!isAnswerValid) {
          return res.status(400).json({ success: false, message: 'Incorrect secret answer' });
      }
      res.status(200).json({ success: true, message: 'Secret answer validated. Proceed to reset password.' });

  } catch (err) {
      res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});


router.post('/forgot-password1', async (req, res) => {
  const { email, secretAnswer, secretQuestion } = req.body;

  try {
      if (!email || !secretAnswer || !secretQuestion) {
          return res.status(400).json({ success: false, message: 'All fields are required' });
      }

      
      const owner = await Owner.findOne({ email });
      if (!owner) {
          return res.status(404).json({ success: false, message: 'User not found' });
      }

      
      if (owner.secretQuestion !== secretQuestion.trim()) {
          return res.status(400).json({ success: false, message: 'Incorrect secret question' });
      }

    
      const isAnswerValid = await bcrypt.compare(secretAnswer.trim(), owner.secretAnswer);
      if (!isAnswerValid) {
          return res.status(400).json({ success: false, message: 'Incorrect secret answer' });
      }

      res.status(200).json({ success: true, message: 'Secret answer validated. Proceed to reset password.' });

  } catch (err) {
      console.error('Forgot Password Error:', err);
      res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});






router.post('/reset-password', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
  
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }


    const hashedPassword = await bcrypt.hash(password, 10);

  
    user.password = hashedPassword;

   
    await user.save();

   
    return res.status(200).json({ message: 'Password updated successfully.' });
  } catch (error) {
    console.error('Error updating password:', error);
    return res.status(500).json({ message: 'Server error, please try again later.' });
  }
});


//owner
router.post('/reset-password1', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    const owner = await Owner.findOne({ email });

    if (!owner) {
      return res.status(404).json({ message: 'Owner not found.' });
    }


    const hashedPassword = await bcrypt.hash(password, 10);

  
    owner.password = hashedPassword;

   
    await owner.save();

   
    return res.status(200).json({ message: 'Password updated successfully.' });
  } catch (error) {
    console.error('Error updating password:', error);
    return res.status(500).json({ message: 'Server error, please try again later.' });
  }
});

module.exports = router;