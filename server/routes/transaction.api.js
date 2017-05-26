var express = require("express");
var passport = require("../configs/passport.js");
var Account = require("../models/account.js");

var router = express.Router();

router.get("/", function (req, res) {
    Account.find({
        username: req.user.username
    }, function (err, data) {
        if (err) {
            res.send("error");
            console.log(err);
        } else res.send(data);
    });
});

router.post("/", function (req, res) {
    var transaction = {};
    transaction.spendType = req.body.spendType;
    transaction.amount = Number(req.body.amount);
    transaction.category = req.body.category;
    transaction.date = new Date(req.body.date);
    transaction.note = req.body.note

    Account.find({
        username: req.user.username
    }, function (err, data) {
        if (err) res.send("error");
        else {
            var account = data[0];
            account.transactions.push(transaction);
            account.markModified("transactions");
            account.save(function (err) {
                if (err) {
                    res.send("error saving");
                    console.log(err);
                } else res.send("transaction added");
            });
        }
    });
});

router.post("/:id", function (req, res) {
    var id = req.params.id;

    Account.find({
        username: req.user.username
    }, function(err, data) {
        if (err) {
            res.send("error retreiving");
            console.log(err);
        } else {
            var account = data[0];
            var index = account.transactions.findIndex(function(transaction) {
                return transaction._id == id;
            });
            
            if (index > -1) {
                console.log(req.body);
                if (req.body.spendType) account.transactions[index].spendType = req.body.spendType;
                if (req.body.amount) account.transactions[index].amount = req.body.amount;
                if (req.body.category) account.transactions[index].category = req.body.category;
                if (req.body.note) account.transactions[index].note = req.body.note;
                if (req.body.date) account.transactions[index].date = new Date(req.body.date);

                console.log(account.transactions[index]);
                account.markModified("transactions");
                account.save(function (err) {
                if (err) {
                    res.send("error saving");
                    console.log(err);
                } else res.send("transaction updated");
            });
            }
        }
    });
});

router.delete("/:id", function (req, res) {
    var id = req.params.id;

    Account.update({
        username: req.user.username
    }, {
        $pull: {
            transactions: {
                _id: id
            }
        }
    }, function (err) {
        if (err) {
            res.send("error deleting");
            console.log(err);
        } else res.send("transaction deleted");
    });
})

module.exports = router;