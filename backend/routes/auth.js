const passport = require("passport");
const mongoose = require("mongoose");

module.exports = (app) => {
  app.post("/api/login", async function (req, res, next) {
    passport.authenticate("local", { session: true }, (err, owner, info) => {
      if (err || !owner) {
        return res.status(400).json({
          message: "Something is not right",
          owner: owner,
        });
      }
      req.login(owner, { session: true }, (err) => {
        if (err) {
          res.send(err);
        }
        const ownerObject = {
          _id: owner._id,
          name: owner.name,
        };
        return res.send(ownerObject);
      });
    })(req, res);
  });

  app.get("/api/ownerDetail", (req, res) => {
    res.send(req.user);
  });

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });
};
