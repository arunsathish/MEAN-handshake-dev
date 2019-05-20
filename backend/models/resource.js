const mongoose = require('mongoose');

const resourceSchema = mongoose.Schema({
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: "Group", required: true },
    resourceTitle: { type: String, required: true },
    resourceDesc: { type: String, required: true },
    resourceCategory: { type: String, required: true },
    resourceCreator: { type: mongoose.Schema.Types.ObjectId, ref: "AuthUser", required: true },
    resourceCreatedOn: { type: Date, required: true },
    resourceUpdatedOn: { type: Date },
    resourceItem: [{
        fileId: { type: String },
        fileUrl: { type: String, required: true },
        fileName: { type: String, required: true },
        fileType: { type: String, required: true }
    }]
});

module.exports = mongoose.model('Resource', resourceSchema);