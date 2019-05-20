const express = require("express");

const router = express.Router();

const Resource = require("../models/resource");


// +++++++++++++++++++
// RESOURCE
// +++++++++++++++++++

// Create Resource
router.post("", (req, res, next) => {
    const resource = new Resource({
        groupId: req.body.groupId,
        resourceTitle: req.body.resourceTitle,
        resourceDesc: req.body.resourceDesc,
        resourceCategory: req.body.resourceCategory,
        resourceCreator: req.body.resourceCreator,
        resourceCreatedOn: req.body.resourceCreatedOn,
        resourceUpdatedOn: req.body.resourceUpdatedOn,
        resourceItem: req.body.resourceItem
    });
    resource.save().then((response) => {
        res.status(201).json({ message: "Resource Created" });
    });
});

// Read single feed by feedID
router.get("/:id", (req, res, next) => {
    Resource.findById(req.params.id)
        .populate('resourceCreator')
        .then(doc => {
            res.status(200).json({
                message: "Resource Fetched",
                resource: doc
            })
        });
});

// Read multiple feeds for specific group by groupID
router.get("/group/:gid", (req, res, next) => {
    Resource.find( { 'groupId': req.params.gid })
        .sort('-feedCreatedOn')
        .populate('resourceCreator')
        .then(doc => {
            res.status(200).json({
                message: "Resources Fetched for a group",
                resources: doc
            })
        });
});

// Delete Feed
router.delete("/:id", (req, res, next) => {
    Resource.deleteOne({ _id: req.params.id })
        .then(result => {
            res.status(200).json({ message: "Resource deleted"});
        });
});

module.exports = router;