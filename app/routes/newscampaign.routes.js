module.exports = app => {
    const newscampaigns = require("../controllers/newscampaign.controller.js");
  
    var router = require("express").Router();
  
    // Create a new campaign
    router.post("/", newscampaigns.addCampaignNews);
  
    // Retrieve all campaign
    router.get("/", newscampaigns.findAll);
  
    // Retrieve a single campaign with id
    router.get("/:id", newscampaigns.findOne);

    app.use('/api/newscampaigns', router);
  };