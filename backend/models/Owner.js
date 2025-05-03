const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  shopName: { type: String, required: true },
  shopImage: { type: String, required: true },
  licenseNumber: { type: String, required: true },
  shopLocation: { type: String, required: true },
  operatingHours: { type: String, required: true },
  servicesOffered: { type: String, required: true },
  chargesRange: { type: String, required: true },
  secretQuestion: { type: String, required: true },
  secretAnswer: { type: String, required: true },

  serviceRequests: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'ServiceRequest' 
  }],
  feedback: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Feedback' 
  }]
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Owner', ownerSchema);