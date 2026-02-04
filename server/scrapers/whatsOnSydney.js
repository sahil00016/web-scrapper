const axios = require("axios");
const cheerio = require("cheerio");
const Event = require("../models/Event");

module.exports = async () => {
  const url = "https://www.whatsonsydney.com/events";
  const { data } = await axios.get(url, {
    headers: { "User-Agent": "Mozilla/5.0" }
  });

  const $ = cheerio.load(data);
  const links = [];

  $('a.event-link').each(async (i, el) => {
    const title = $(el).find("h2").text().trim();
    const dateTime = $(el).find(".event-date").text().trim();
    const venue = $(el).find(".event-venue").text().trim();
    const description = $(el).find(".event-description").text().trim();
    const img = $(el).find("img").attr("src");
    const link = $(el).attr("href");

    if (!link || !title) return;

    links.push(link);

    const found = await Event.findOne({ sourceUrl: link });

    if (!found) {
      await Event.create({
        title,
        dateTime,
        venue,
        city: "Sydney",
        description,
        category: "General",
        image: img,
        source: "WhatsOnSydney",
        sourceUrl: link,
        lastScraped: new Date(),
        status: "new"
      });
    } else {
      found.lastScraped = new Date();
      found.status = "updated";
      await found.save();
    }
  });

  // mark removed events
  await Event.updateMany(
    { source: "WhatsOnSydney", sourceUrl: { $nin: links } },
    { status: "inactive" }
  );
};
