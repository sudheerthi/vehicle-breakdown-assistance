
const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    
    secretAnswer: { type: String, required: true },
    secretQuestion: { type: String, required: true },
    serviceHistory: [
        {
            ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Owner' },
            issue: String,
            status: { type: String, default: 'Pending' },
            serviceDate: { type: Date, default: Date.now },
        },
    ],
});

// userSchema.methods.createResetPassword = function () {
//     const resetToken = crypto.randomBytes(32).toString('hex');
//     this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
//     this.passwordResetExpires = Date.now() + 10 * 60 * 1000; 
//     return resetToken;
// };


module.exports = mongoose.model('User', userSchema);
