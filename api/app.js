const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require('mongoose');
const db = require("./config/db");
const base = require("./config/base");
const session = require('express-session');
const passport = require('passport');

const app = express();
app.use(cors());

mongoose.connect(db.url)
    .then(() => console.log('db connected'))
    .catch(err => console.log(err));

// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(session({ secret: 'secret', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false}));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome" });
});

require('./models/User');
require('./models/Table');
require('./config/passport');

app.use(require('./routes'));

// set port, listen for requests
const PORT = base.port || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});