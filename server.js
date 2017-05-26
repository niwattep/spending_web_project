var express = require("express");

var app = require("./server/configs/express.js");
var router = require("./server/routes/routes");
var api = require("./server/routes/transaction.api")

app.set("view engine", "pug");
app.set("views", "./server/views");

app.use("/", router);
app.use("/api", api);

app.listen(3000, function () {
    console.log("Server is running at : http://localhost:3000");
});