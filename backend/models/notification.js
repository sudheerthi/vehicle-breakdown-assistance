const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    userEmail: { type: String, required: false }, 
    ownerEmail: { type: String, required: false }, 
    message: { type: String, required: true }, 
    
    createdAt: { type: Date, default: Date.now }, 
});

module.exports = mongoose.model('Notification', notificationSchema);
