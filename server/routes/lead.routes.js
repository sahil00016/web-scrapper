const router = require("express").Router();
const Lead = require("../models/Lead");
const Event = require("../models/Event");

router.post("/", async (req,res)=>{
  try {
    const { email, consent, eventId } = req.body;
    
    // Validate that event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    
    const lead = await Lead.create({ email, consent, eventId });
    res.json({ success: true, lead });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
