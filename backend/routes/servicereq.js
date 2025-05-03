const express = require('express');
const router = express.Router();
const ServiceRequest = require(`../models/Servicerequest`)
const notification = require('../models/notification');
const User = require('../models/User');
const Owner = require('../models/Owner');


router.post('/', async (req, res) => {
    const { userEmail, ownerEmail, issue ,location} = req.body;

    if (!userEmail || !ownerEmail || !issue || !location ) {
        return res.status(400).json({ error: 'All fields are required (userEmail, ownerEmail, issue).' });
    }

    try {
        const user = await User.findOne({ email: userEmail });
        const owner = await Owner.findOne({ email: ownerEmail });

        if (!user || !owner) {
            return res.status(404).json({ error: 'User or owner not found.' });
        }

        const serviceRequest = new ServiceRequest({
            userEmail,
            ownerEmail,
            issue,
            location,
            status: 'Pending',
            vehicle,
        });

        const savedRequest = await serviceRequest.save();

        const userNotification = new notification({
            userEmail,
            message: `Your service request has been sent successfully to ${ownerEmail}!`,
        });

        const ownerNotification = new notification({
            ownerEmail,
            message: `You have received a new service request from ${userEmail}.`,
        });

        await userNotification.save();
        await ownerNotification.save();

        res.status(201).json({
            message: 'Service request created successfully!',
            request: serviceRequest,
        });
    } catch (error) {
        console.error(`Error creating service request and notifications: ${error.message}`);
        res.status(500).json({ error: 'An error occurred while creating the service request and notifications.' });
    }
});


router.get('/notifications', async (req, res) => {
    const { email } = req.query;

    if (!email) {
        return res.status(400).json({ error: 'Email is required.' });
    }

    try {
        const notifications = await notification.find({
            userEmail: email,
        }).sort({ createdAt: -1 });

        res.status(200).json({ notifications });
    } catch (error) {
        console.error(`Error fetching user notifications for email ${email}: ${error.message}`);
        res.status(500).json({ error: 'An error occurred while fetching notifications.' });
    }
});
router.get('/notifications1', async (req, res) => {
    const { email } = req.query;

    if (!email) {
        return res.status(400).json({ error: 'Email is required.' });
    }

    try {
        const notifications = await notification.find({
            ownerEmail: email,
        }).sort({ createdAt: -1 });

        res.status(200).json({ notifications });
    } catch (error) {
        console.error(`Error fetching user notifications for email ${email}: ${error.message}`);
        res.status(500).json({ error: 'An error occurred while fetching notifications.' });
    }
});

module.exports = router;
