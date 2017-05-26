var express = require("express");
var path = require("path");
var passport = require("../configs/passport.js");
var Account = require("../models/account.js");

var router = express.Router();

router.get("/", function (req, res) {
    res.render("home");
});

router.get("/login", alreadyLoggedIn, function (req, res) {
    res.render("login");
});

router.post("/login", passport.authenticate("local"), function(req, res) {
    res.redirect("/app");
});

router.get("/register", alreadyLoggedIn, function (req, res) {
    res.render("register");
});

router.post("/register", function (req, res, next) {
    Account.register(new Account({ username: req.body.username }), req.body.password, function (err, account) {
        if (err) {
            console.log(err);
            return res.render("register");
        }
            
        passport.authenticate("local")(req, res, function() {
            req.session.save(function(err) {
                if (err) {
                    return next(err);
                }
                res.redirect("/app");
            });
        });
    });
});

router.get("/logout",function (req, res) {
    req.logout();
    res.redirect("/");
});

var absPath = path.join(__dirname, "../../app");

router.get("/app", isLoggedIn, function(req, res){
   res.sendFile(absPath + "/app.html");
});

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

function alreadyLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect("/app");
    }
    return next();
}

module.exports = router;