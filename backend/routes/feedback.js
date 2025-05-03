const express = require('express');
const router = express.Router();
const Feedback = require('../models/feedbacks'); 


router.post('/', async (req, res) => {
    const { ownerEmail, rating, comments } = req.body;


    if (!ownerEmail || !rating || !comments) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
    
        const feedback = new Feedback({
            ownerEmail,
            rating,
            comments,
        });

    
        await feedback.save();

        
        res.status(201).json({ message: 'Feedback submitted successfully', feedback });
    } catch (error) {
        console.error('Error saving feedback:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/:ownerEmail', async (req, res) => {
    const { ownerEmail } = req.params;

    try {
        
        const feedback = await Feedback.find({ ownerEmail });

    
        if (feedback.length === 0) {
            return res.status(404).json({ message: 'No feedbacks found for this user.' });
        }

        
        res.status(200).json(feedback);
    } catch (error) {
        console.error('Error retrieving feedbacks:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
