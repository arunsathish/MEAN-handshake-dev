const mongoose = require('mongoose');

const groupSchema = mongoose.Schema({
    groupName: { type: String, required: true },
    groupCode: { type: String, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "AuthUser", required: true },
    createdOn: { type: Date, required: true },
    groupCategory: { name: { type: String } },
    members: [ { 
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "AuthUser", required: true }, 
        isAdmin: { type: Boolean },
        groupFolderId: { type: String }
    }]
});


module.exports = mongoose.model('Group', groupSchema);