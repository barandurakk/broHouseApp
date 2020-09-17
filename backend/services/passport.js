const passport = require("passport");
const keys = require("../util/keys");
const mongoose = require("mongoose");
const LocalStrategy = require("passport-local").Strategy;
const Owner = mongoose.model("owners");

passport.serializeUser((owner, done) => {
  done(null, owner._id);
});

passport.deserializeUser((_id, done) => {
  Owner.findById(_id, (err, owner) => {
    if (err) done(null, false, { error: err });
    else {
      const ownerObject = {
        _id: owner._id,
        name: owner.name,
      };
      done(null, ownerObject);
    }
  });
});

passport.use(
  new LocalStrategy(
    {
      usernameField: "pass",
      passwordField: "pass",
    },
    (email, pass, done) => {
      return Owner.findOne({ pass: pass })
        .then((owner) => {
          if (!owner) {
            return done(null, false, { message: "Yanlış şifre" });
          }
          console.log("giriş yapıldı");
          return done(null, owner, { message: "Giriş yapıldı" });
        })
        .catch((err) => {
          console.log(err);
          done(err);
        });
    }
  )
);
