const mongoose = require('mongoose');


const serviceRequestSchema = new mongoose.Schema({
    userEmail: { 
        type: String, 
        required: true, 
        trim: true 
    },
    ownerEmail: { 
        type: String, 
        required: true, 
        trim: true 
    },
    issue: { 
        type: String, 
        required: true, 
        trim: true 
    },
    location: { 
        type: String, 
        required: true, 
        trim: true 
    },
    status: { 
        type: String, 
        enum: ['Pending', 'Accepted', 'Declined', 'Completed'], 
        default: 'Pending' 
    },
    requestedAt: { 
        type: Date, 
        default: Date.now 
    },
  
}, { 
    timestamps: true 
});

module.exports = mongoose.model('ServiceRequest', serviceRequestSchema);