const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    uid: { type: String, required: true },
    email: { type: String, required: true },
    photoURL: { type: String, required: true },
    displayName: { type: String, required: true },
    groups: [{ type: mongoose.Schema.Types.ObjectId, ref: "Group" }]
});


module.exports = mongoose.model('AuthUser', userSchema);