const express = require("express");
const mongoose = require('mongoose');
const router = express.Router();

const Feed = require("../models/feed");

// +++++++++++++++++++
// FEED
// +++++++++++++++++++

// Create Feed
router.post("", (req, res, next) => {
    const feed = new Feed({
        groupId: req.body.groupId,
        feedType: req.body.feedType,
        feedTitle: req.body.feedTitle,
        feedDesc: req.body.feedDesc,
        feedCategory: req.body.feedCategory,
        feedCreator: req.body.feedCreator,
        feedCreatedOn: req.body.feedCreatedOn,
        feedUpdatedOn: req.body.feedUpdatedOn
    });
    feed.save().then((response) => {
        res.status(201).json({ message: "Feed Created" });
    });
});

// Read single feed by feedID
router.get("/:id", (req, res, next) => {
    Feed.findById(req.params.id)
        .populate('feedCreator')
        .populate('feedComment.feedCommentCreator')
        .then(doc => {
            res.status(200).json({
                message: "Feed Fetched",
                feed: doc
            })
        });
});

// Read multiple feeds for specific group by groupID
router.get("/group/:gid", (req, res, next) => {
    Feed.find( { 'groupId': req.params.gid })
        .sort('-feedCreatedOn')
        .populate('feedCreator')
        .then(doc => {
            res.status(200).json({
                message: "Feeds Fetched for a group",
                feeds: doc
            })
        });
});

// Update Feed edited
router.put("/:fid", (req, res, next) => {
    const feed = new Feed({
        _id: req.body.id,
        feedType: req.body.feedType,
        feedTitle: req.body.feedTitle,
        feedDesc: req.body.feedDesc,
        feedCategory: req.body.feedCategoy,
        feedUpdatedOn: req.body.feedUpdatedOn
    });
    Feed.updateOne({ _id: req.params.fid }, feed).then(result => {
        res.status(200).json({ message: "Feed updated successfully" });
    });
});

// Delete Feed
router.delete("/:id", (req, res, next) => {
    Feed.deleteOne({ _id: req.params.id })
        .then(result => {
            res.status(200).json({ message: "Feed deleted"});
        });
});




// +++++++++++++++++++
// FEED COMMENT
// +++++++++++++++++++

// Create Feed COMMENT
router.post("/feedComment", (req, res, next) => {
    const feedComment = {
        feedCommentCreator: req.body.feedCommentCreator,
        feedCommentCreatedOn: req.body.feedCommentCreatedOn,
        feedCommentContent: req.body.feedCommentContent,
    }
    // Feed Comment Created By Updating FeedCollection (pushing array into feedComment)
    Feed.updateOne({ _id: req.body.fid }, { $push: { feedComment: feedComment } }).then((response) => {
        res.status(201).json({ message: "Feed Comment Created" });
    });
});


// Read Single Feed Comment
router.get("/feedComment/:fcid", (req, res, next) => {
    Feed.findOne({ "feedComment": { $elemMatch: { _id: req.params.fcid } } }, { 'feedComment.$': 1 }).then((result) => {
        res.status(201).json({ message: "FeedComment Fetched", feedComment: result.feedComment });
    });
});

// Update Single Feed Comment
router.put("/feedComment/:fcid", (req, res, next) => {
    Feed.updateOne({ "feedComment": { $elemMatch: { _id: req.params.fcid } } }, { $set: { "feedComment.$.feedCommentContent": req.body.feedCommentContent, "feedComment.$.feedCommentUpdatedOn": req.body.feedCommentUpdatedOn } }).then((result) => {
        res.status(201).json({ message: "FeedComment Updated" });
    });
});


router.delete("/:fid/feedComment/:fcid", (req, res, next) => {
    // Feed.deleteOne({ "feedComment": { $elemMatch: { _id: req.params.fcid } } }, { 'feedComment.$': 1 }).then((result) => {
    //     res.status(200).json({ message: "Feed Comment Deleted" });
    // });
    Feed.updateOne({ _id: req.params.fid }, { $pull: { feedComment: { _id: req.params.fcid } } }).then((response) => {
        res.status(201).json({ message: "Feed Comment Deleted" });
    });
});




module.exports = router;