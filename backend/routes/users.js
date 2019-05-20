const express = require("express");
const jwt = require("jsonwebtoken");
const AuthUser = require("../models/user");
const router = express.Router();

const User = require('../models/user');

router.post("/signin", (req, res, next) => {

    // console.log(req.body);
    let fetchedUser;
    const user = new AuthUser({
        uid: req.body.uid,
        email: req.body.email,
        photoURL: req.body.photoURL,
        displayName: req.body.displayName
    });

    User.findOne({ email: req.body.email })
        .then(foundUser => {

            User.updateOne({ _id: foundUser._id }, { $set: user });
            fetchedUser = foundUser;
            const token = jwt.sign({ email: fetchedUser.email, userId: fetchedUser._id }, 'secret_this_should_be_longer');
            res.status(200).json({ token: token, userId: fetchedUser._id });

        })
        .catch(response => {

            user.save().then(result => {
                const token = jwt.sign({ email: result.email, userId: result._id }, "secret_this_should_be_longer");
                res.status(201).json({ token: token, userId: result._id });
            });

        });

});



router.get("/:userId", (req, res, next) => {

    User.findById({ _id: req.params.userId })
        .populate('groups')
        .then((user) => {
            // console.log(user.groups.length);

            res.status(200).json({ message: "User fetched", user: user });
        });

});





module.exports = router;