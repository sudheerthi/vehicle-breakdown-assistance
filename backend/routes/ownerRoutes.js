const express = require('express');
const router = express.Router();
const Owner = require('../models/Owner'); 
const authenticate = require('../middleware/authenticate'); 


router.get('/:email', authenticate, async (req, res) => {
  try {
    const { email } = req.params;

    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    const owner = await Owner.findOne({ email });
    if (!owner) {
      return res.status(404).json({ message: 'Owner not found' });
    }

    res.status(200).json({
      owner: {
        name: owner.name,
        phone: owner.phone,
        shopName: owner.shopName,
        shopLocation: owner.shopLocation,
        operatingHours: owner.operatingHours,
        servicesOffered: owner.servicesOffered,
        chargesRange: owner.chargesRange,
        shopImage: owner.shopImage,
      },
    });
  } catch (error) {
    console.error('Error fetching owner details:', error);
    res.status(500).json({ message: 'Error fetching owner details', error: error.message });
  }
});


router.put('/:email', authenticate, async (req, res) => {
  try {
    const { email } = req.params;
    const {
      name,
      phone,
      shopName,
      shopImage,
      shopLocation,
      operatingHours,
      servicesOffered,
      chargesRange,
    } = req.body;

    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    const updatedOwner = await Owner.findOneAndUpdate(
      { email },
      { name, phone, shopName,shopImage, shopLocation, operatingHours, servicesOffered, chargesRange },
      { new: true, runValidators: true }
    );

    if (!updatedOwner) {
      return res.status(404).json({ message: 'Owner not found' });
    }

    res.status(200).json({
      message: 'Owner details updated successfully.',
      owner: updatedOwner,
    });
  } catch (error) {
    console.error('Error updating owner details:', error);
    res.status(500).json({ message: 'Error updating owner details', error: error.message });
  }
});

module.exports = router;
