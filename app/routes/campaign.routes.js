module.exports = app => {
    const campaigns = require("../controllers/campaign.controller.js");
  
    var router = require("express").Router();
  
    // Create a new campaign
    router.post("/", campaigns.create);
  
    // Retrieve all campaign
    router.get("/", campaigns.findAll);
  
    // Retrieve a single campaign with id
    router.get("/:id", campaigns.findOne);
  
    // Update a campaign with id
    router.put("/:id", campaigns.update);
  
    // Delete a campaign with id
    router.delete("/:id", campaigns.delete);
  
    // Delete all campaign
    router.delete("/", campaigns.deleteAll);
  
    app.use('/api/campaigns', router);
  };