const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const usersRoutes = require('./routes/users');
const groupRoutes = require('./routes/groups');
const feedRoutes = require('./routes/feeds');
const resourceRoutes = require('./routes/resources');

const app = express();

mongoose.connect("")
    .then(() => {
        console.log('Connected to MongoDB Database');
    })
    .catch(() => {
        console.log('Connection Failed');
    });



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", express.static(path.join(__dirname, "angular")));

app.use( (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Request-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    next();
});

app.use("/api/user", usersRoutes);
app.use("/api/group", groupRoutes);
app.use("/api/feed", feedRoutes);
app.use("/api/resource", resourceRoutes);

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "angular", "index.html"))
});

module.exports = app;