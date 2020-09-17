const requireLogin = require("../middleware/requireLogin");
const mongoose = require("mongoose");
const Nacak = mongoose.model("nacaklar");

module.exports = (app) => {
  // post a nacak
  app.post("/api/yeni", requireLogin, async (req, res) => {
    const { body, cost } = req.body;
    const ownerName = req.user.name;

    const nacak = new Nacak({
      body: body,
      dateSent: Date.now(),
      owner: ownerName,
      cost: cost,
    });

    try {
      await nacak.save();
      res.send(nacak);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  //get all nacak
  app.get("/api/nacaklar", requireLogin, async (req, res) => {
    const nacaklar = await Nacak.find({}).sort({ dateSent: -1 });
    res.send(nacaklar);
  });

  //delete a nacak
  app.get("/api/sil/:nacakId", requireLogin, async (req, res) => {
    const nacakId = req.params.nacakId;
    await Nacak.findByIdAndDelete({ _id: nacakId });
    res.send({ message: "Silindi." });
  });

  //update a nacak
  app.post("/api/guncelle/:nacakId", requireLogin, async (req, res) => {
    const nacakId = req.params.nacakId;
    const newBody = req.body.body;
    const newCost = req.body.cost;

    Nacak.findOneAndUpdate(
      { _id: nacakId, owner: req.user.name },
      {
        body: newBody,
        cost: newCost,
      },
      { new: true }
    )
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.status(500).send({ error: err });
      });
  });

  //nacak to mış
  app.get("/api/toMis/:nacakId", requireLogin, async (req, res) => {
    const nacakId = req.params.nacakId;

    Nacak.findOneAndUpdate(
      {
        _id: nacakId,
      },
      {
        mis: true,
      },
      { new: true }
    )
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.status(500).send({ error: err });
      });
  });

  //mis to nacak
  app.get("/api/toNacak/:nacakId", requireLogin, async (req, res) => {
    const nacakId = req.params.nacakId;

    Nacak.findOneAndUpdate(
      {
        _id: nacakId,
      },
      {
        mis: false,
      },
      { new: true }
    )
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.status(500).send({ error: err });
      });
  });
};
