const router = require("express").Router();
const Devis = require("../models/devis");
const mongoose = require("mongoose");
module.exports = router;

router.post("/post", async (req, res) => {
  try {
    const devis = new Devis({
      _id: mongoose.Types.ObjectId(),
      societe : req.body.societe,
      service : req.body.service,
      prixht : req.body.prixht,
      remise : req.body.remise,
      tva : req.body.tva,
      prixttc : req.body.prixttc,
    });
    devis
      .save()
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "server error" });
  }
});

router.get("/get", async (req, res) => {
  try {
    Devis.find()
      .exec()
      .then((data) => {
        if (data.length > 0) {
          res.status(200).json(data);
        } else {
          res.status(404).json({ message: "devis document empty" });
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
    Devis.findById(req.params.id)
      .exec()
      .then((data) => {
        if (data) {
          res.status(200).json(data);
        } else {
          res.status(404).json({ message: "devis not found" });
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
    Devis.findByIdAndDelete(req.params.id)
      .exec()
      .then((result) => {
        if (result) {
          res.status(200).json({ message: "deleted successfully" });
        } else {
          res.status(500).json({ error: "somethign went wrong" });
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
    Devis.findByIdAndUpdate(req.params.id, req.body)
      .exec()
      .then((result) => {
        if (result) {
          res.status(200).json({ message: "updated successfully" });
        } else {
          res.status(500).json({ error: "something went wrong" });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "server error" });
  }
});
