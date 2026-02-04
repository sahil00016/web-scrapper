require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
require("./cron");

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGO_URI).then(() => console.log("MongoDB Connected"));

app.use("/api/events", require("./routes/event.routes"));
app.use("/api/leads", require("./routes/lead.routes"));
app.use("/auth", require("./routes/auth.routes"));

app.listen(5000, () => console.log("Server running on 5000"));
