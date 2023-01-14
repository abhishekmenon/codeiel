const mongoose = require('mongoose');

const resetPasswordSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    isValid: {
        type: Boolean,
        default: true
    },
    accessToken: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const ResetPassword = mongoose.model('ResetPassword', resetPasswordSchema);

module.exports = ResetPassword;