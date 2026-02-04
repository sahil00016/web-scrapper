const router = require("express").Router();
const Event = require("../models/Event");

router.get("/", async (req, res) => {
  const { q, city, source } = req.query;

  let filter = {
    city: city || "Sydney",
    status: { $ne: "inactive" }
  };

  if (source) {
    filter.source = source;
  }

  if (q) {
    filter.$or = [
      { title: new RegExp(q, "i") },
      { venue: new RegExp(q, "i") },
      { description: new RegExp(q, "i") }
    ];
  }

  const events = await Event.find(filter).sort({ lastScraped: -1 });
  res.json(events);
});


router.post("/import/:id", async (req,res)=>{
  const e = await Event.findById(req.params.id);
  e.status = "imported";
  e.importedAt = new Date();
  e.importedBy = "admin";
  await e.save();
  res.json(e);
});

module.exports = router;
