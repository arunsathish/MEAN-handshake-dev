const mongoose = require('mongoose');

const feedSchema = mongoose.Schema({
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: "Group", required: true },
    feedType: { type: String, required: true },
    feedTitle: { type: String, required: true },
    feedDesc: { type: String, required: true },
    feedCategory: { type: String, required: true },
    feedCreator: { type: mongoose.Schema.Types.ObjectId, ref: "AuthUser", required: true },
    feedCreatedOn: { type: Date, required: true },
    feedUpdatedOn: { type: Date },
    feedComment: [{
        feedCommentCreator: { type: mongoose.Schema.Types.ObjectId, ref: 'AuthUser', required: true },
        feedCommentCreatedOn: { type: Date, required: true },
        feedCommentUpdatedOn: { type: Date },
        feedCommentContent: { type: String, required: true },
    }]
});

module.exports = mongoose.model('Feed', feedSchema);