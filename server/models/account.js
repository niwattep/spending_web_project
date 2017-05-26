var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var passportLocalMongoose = require("passport-local-mongoose");

mongoose.connect("mongodb://localhost/spending");

var AccountSchema = new Schema({
    username: String,
    password: String,
    name: String,
    email: String,
    transactions: [
        {
            spendType: String,
            amount: Number,
            category: String,
            date: Date,
            note: String
        }
    ]
});

AccountSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Account", AccountSchema);