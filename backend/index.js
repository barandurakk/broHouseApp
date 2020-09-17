const express = require("express");
const mongoose = require("mongoose");
const keys = require("./util/keys");
const bodyParser = require("body-parser");
const passport = require("passport");
const cookieSession = require("cookie-session");
const cors = require("cors");

require("./models/Owner");
require("./models/Nacak");

mongoose.connect(keys.mongoURI);
require("./services/passport");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.secretKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

console.log("selam server!");

require("./routes/auth")(app);
require("./routes/nacakRoutes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
