const express = require('express');
const router = express.Router();
const ServiceRequest = require('../models/Servicerequest');


router.get('/:ownerEmail', async (req, res) => {
    const { ownerEmail } = req.params;

    try {
        const serviceRequests = await ServiceRequest.find({ ownerEmail }).sort({ requestedAt: -1 });

        if (serviceRequests.length === 0) {
            return res.status(404).json({ message: 'No service requests found for this user.' });
        }

        res.status(200).json(serviceRequests);
    } catch (error) {
        console.error('Error retrieving service requests:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/:ownerEmail/status', async (req, res) => {
    const { ownerEmail } = req.params;
    const { status } = req.body;

    try {
        const updatedRequests = await ServiceRequest.updateMany(
            { ownerEmail: ownerEmail },
            { $set: { status: status } },
            { new: true, runValidators: true }
        );

        if (!updatedRequests) {
            return res.status(404).json({ message: 'No service requests found for this owner' });
        }

        res.status(200).json(updatedRequests);
    } catch (error) {
        console.error('Error updating service request status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/update/:requestId', async (req, res) => {
    const { requestId } = req.params;
    const { status } = req.body;

    try {
        const updatedRequest = await ServiceRequest.findByIdAndUpdate(
            requestId,
            { status },
            { new: true, runValidators: true }
        );

        if (!updatedRequest) {
            return res.status(404).json({ message: 'Service request not found' });
        }

       

        res.status(200).json(updatedRequest);
    } catch (error) {
        console.error('Error updating service request status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;
