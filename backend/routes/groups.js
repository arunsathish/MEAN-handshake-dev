const express = require("express");
var crypto = require('crypto');
const router = express.Router();

const Group = require('../models/group');
const Feed = require('../models/feed');
const Resource = require('../models/resource');
const User = require('../models/user');


// Created Group
router.post("", (req, res, next) => {

    function encrypt(data) {
        var cipher = crypto.createCipher('aes-256-ecb', 'mypassword');
        return cipher.update(data, 'utf8', 'base64') + cipher.final('base64');
    }
    const stringToEncrypt = req.body.createdOn;
    const encryptedCode = encrypt(stringToEncrypt);

    // function decrypt(data) {
    //     var cipher = crypto.createDecipher('aes-256-ecb', 'mypassword');
    //     return cipher.update(data, 'hex', 'utf8') + cipher.final('utf8');
    // }
    // const decryptedCode = decrypt(en);

    const groupCode = encryptedCode.substring(36,42);

    const group = new Group({
        groupName: req.body.groupName,
        groupCode: groupCode,
        creator: req.body.creator,
        createdOn: req.body.createdOn,
        members: { userId: req.body.creator }
    });

    group.save().then((response) => {
        User.updateOne({ _id: req.body.creator }, { $push: { groups: group._id } }).then(result => {
            res.status(201).json();
        });
        res.status(201).json({ message: "Group Created", group: response });
    });

});

// Join Group
router.put("/join", (req, res, next) => {

    Group.findOne({ groupCode: req.body.groupCode })
        .then((groupData) => {
            // Updated User_groups array for Joining Member
            User.updateOne({ _id: req.body.userId }, { $push: { groups: groupData._id } }).then(result => {
                res.status(201).json();
            });
            // Updating Group_members array who joined the group
            Group.updateOne({ _id: groupData._id }, { $push: { members: { userId: req.body.userId, isAdmin: false } }  }).then((response) => {
                res.status(201).json();
            });
            res.status(200).json({ message: "You Joined", groupData: groupData });
    })
    .catch(error => {
        res.status(200).json({ message: "No Group Found" });
    })

});


// Update Group Admin
router.put("/updateGroupAdmin/:gid", (req, res, next) => {

    

});


// Update Group Drive FolderId
router.put("/updateGroupDriveFolderId", (req, res, next) => {
    // console.log(req.body);
    Group.findOne({ _id: req.body.groupId })
        .then((response) => {
            Group.findOneAndUpdate({ "members.userId": req.body.userId }, { $set: { "members.$.groupFolderId": req.body.folderId } }).then((response) => {
                res.status(201).json({ message: 'updated' });
            });
        });

});

// Leave Joined Group
router.put("/leaveJoined", (req, res, next) => {

    Group.findOne({ _id: req.body.groupId })
        .then((groupData) => {
            // Updated User_groups array for Leaving Member
            User.updateOne({ _id: req.body.userId }, { $pull: { groups: groupData._id } }).then(result => {
                res.status(200).json();
            });
            // Updating Group_members array who leaving the group
            Group.updateOne({ _id: groupData._id }, { $pull: { members: { userId: req.body.userId } }  }).then((response) => {
                res.status(200).json();
            });
            res.status(201).json({ message: "You Left - " + groupData.groupName });
    })

});

// Finding single group by groupId
router.get("/:gid", (req, res, next) => {
    Group.findById(req.params.gid)
        .populate('creator', )
        .populate('members.userId')
        .then(response => {
            res.status(200).json({
                message: "Single Group Fetched",
                group: response
            })
        });
});

// Finding single group by groupId of UserId sub-Object
router.get("/:gid/:userId", (req, res, next) => {
    Group.findById(req.params.gid)
        .then(response => {
            Group.findOne({ 'members.userId': req.params.userId }).then((respond) => {
                res.status(200).json({ message: "Single Group Fetched of Specific UserId Object", groupMemberObject: respond });
            });
        });
});

// Delete Single group by groupId
router.delete("/:gid", (req, res, next) => {
    Group.deleteOne({ _id: req.params.gid })
        .then(result => {
            // feeds stored in deleted_group deleted
            Feed.deleteMany({ groupId: req.params.gid }).then((response) => {
                res.status(201).json();
            });
            // resources stored in deleted_group deleted
            Resource.deleteMany({ groupId: req.params.gid }).then((response) => {
                res.status(201).json();
            });
            // delete groupId stored in User->groups
            User.updateMany({ groups: req.params.gid }, { $pull: { groups: { $in: [ req.params.gid ] } } }).then((response) => {
                res.status(201).json();
            });
            res.status(200).json({ message: "Group Deleted!!"});
        });
});


// Group Category Update
router.put("/updateGroupCategory/:gid", (req, res, next) => {
    Group.findOneAndUpdate({ _id: req.params.gid }, { $set: { groupCategory: req.body } }).then((response) => {
        res.status(201).json({ message: "Group Category Updated!" });
    });
});


module.exports = router;