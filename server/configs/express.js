var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var expressSession = require("express-session");
var passport = require("passport");

var app = express();

app.use("/static", express.static(path.join(__dirname, 'app')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(expressSession({
    secret: "5byetg5bw3uyn6iun6ebv5sedydfdthdfsges5y6",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

module.exports = app;