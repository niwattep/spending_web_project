var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var Account = require("../models/account.js");

passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

module.exports = passport;