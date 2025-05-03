const express = require('express');
const router = express.Router();
const ServiceRequest = require('../models/Servicerequest');


router.get('/:userEmail', async (req, res) => {
    const { userEmail } = req.params;

    try {
        const serviceRequests = await ServiceRequest.find({ userEmail }).sort({  requestedAt: -1 });

        if (serviceRequests.length === 0) {
            return res.status(404).json({ message: 'No service requests found for this user.' });
        }

        res.status(200).json(serviceRequests);
    } catch (error) {
        console.error('Error retrieving service requests:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});




module.exports = router;
