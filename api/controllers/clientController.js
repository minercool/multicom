const router = require("express").Router();
const mongoose = require("mongoose");
const Client = require("../models/client");
const multer = require("multer");
var filename;
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images");
  },
  filename: function (req, file, cb) {
    filename = Date.now() + file.originalname;
    cb(null, filename);
  },
});
var upload = multer({ storage: storage });
module.exports = router;

router.post("/post", upload.single("logo"), async (req, res) => {
  try {
    if (filename != null) {
      const client = new Client({
        _id: mongoose.Types.ObjectId(),
        logo: filename,
        societe: req.body.societe,
        client: req.body.client,
        email: req.body.email,
        telephone: req.body.telephone,
      });
      client
        .save()
        .then((result) => {
          res.status(200).json(result);
        })
        .catch((err) => {
          res.status(500).json({ error: err });
        });
    } else {
      const client = new Client({
        _id: mongoose.Types.ObjectId(),
        logo: "logo.png",
        societe: req.body.societe,
        client: req.body.client,
        email: req.body.email,
        telephone: req.body.telephone,
      });
      client
        .save()
        .then((result) => {
          res.status(200).json(result);
        })
        .catch((err) => {
          res.status(500).json({ error: err });
        });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "server error" });
  }
});

router.get("/get", async (req, res) => {
  try {
    Client.find()
      .exec()
      .then((result) => {
        if (result.length > 0) {
          res.status(200).json(result);
        } else {
          res.status(404).json({ message: "client document empty" });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "server error" });
  }
});

router.get("/get/:id", async (req, res) => {
  try {
    Client.findById(req.params.id)
      .exec()
      .then((result) => {
        if (result) {
          res.status(200).json(result);
        } else {
          res.status(404).json({ message: "id not found" });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "server error" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    Client.findByIdAndDelete(req.params.id)
      .exec()
      .then((result) => {
        if (result) {
          res.status(200).json({ message: "deleted successfully" });
        } else {
          res.status(500).json({ message: "id not found" });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "server error" });
  }
});

router.patch("/update/:id", async (req, res) => {
  try {
    Client.findByIdAndUpdate(req.params.id, req.body)
      .exec()
      .then((result) => {
        if (result) {
          res.status(200).json({ message: "updated successfully" });
        } else {
          res.status(404).json({ message: "id not found" });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "server error" });
  }
});
