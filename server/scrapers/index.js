require("dotenv").config();
const mongoose = require("mongoose");
const eventbrite = require("./eventbrite");
const whatsOnSydney = require("./whatsOnSydney");

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Scraper DB connected");

    console.log("Running EventBrite scraper...");
    await eventbrite();

    console.log("Running What's On Sydney scraper...");
    await whatsOnSydney();

    console.log("Scrape complete");
    process.exit(0);
  } catch (err) {
    console.error("Scrape failed:", err);
    process.exit(1);
  }
})();
