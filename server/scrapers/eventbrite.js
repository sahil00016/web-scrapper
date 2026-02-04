const axios = require("axios");
const cheerio = require("cheerio");
const Event = require("../models/Event");

module.exports = async () => {
  const url = "https://www.eventbrite.com.au/d/australia--sydney/all-events/";
  const { data } = await axios.get(url, {
    headers: { "User-Agent": "Mozilla/5.0" }
  });

  const $ = cheerio.load(data);
  const links = [];

  for (const el of $("a[data-event-id]").toArray()) {
    const title = $(el).find("h3").first().text().trim();
    const date = $(el).find("time").first().text().trim();
    let href = $(el).attr("href");
    const img = $(el).find("img").attr("src");

    if (!href || !title) continue;

    // sanitize
    href = href
      .replace("https://www.eventbrite.com", "")
      .replace("http://www.eventbrite.com", "");

    const link = href.startsWith("http")
      ? href
      : "https://www.eventbrite.com.au" + href;

    links.push(link);

    const found = await Event.findOne({ sourceUrl: link });

    if (!found) {
      await Event.create({
        title,
        dateTime: date,
        venue: "Sydney",
        city: "Sydney",
        description: "",
        category: "General",
        image: img,
        source: "Eventbrite",
        sourceUrl: link,
        lastScraped: new Date(),
        status: "new"
      });
    } else {
      found.lastScraped = new Date();
      found.status = "updated";
      await found.save();
    }
  }

  // mark removed events
  await Event.updateMany(
    { source: "Eventbrite", sourceUrl: { $nin: links } },
    { status: "inactive" }
  );
};
