var express = require("express");
var router = express.Router();
let FruitModel = require("../models/fruit");
var multer = require("multer");
var mime = require("mime");
var crypto = require("crypto");

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function(req, file, cb) {
    crypto.pseudoRandomBytes(16, function(err, raw) {
      cb(
        null,
        raw.toString("hex") + Date.now() + "." + mime.extension(file.mimetype)
      );
    });
  }
});

var upload = multer({ storage: storage });

router.get("/", function(req, res, next) {
  FruitModel.find()
    .then(result => res.send(result))
    .catch(error => res.status(500).send(error));
});

router.post("/", upload.single("image"), function(req, res, next) {
  let newFruit = new FruitModel();
  newFruit.name = req.body.name;
  //newFruit.image = req.file.filename;

  newFruit.image =
    req.protocol + "://" + req.get("host") + "/public/" + req.file.filename;

  newFruit
    .save()
    .then(fruit => res.json(fruit))
    .catch(error => res.status(400).send(error));
});

module.exports = router;
