module.exports = app => {
    const campaignsuser = require("../controllers/campaignuser.controller.js");
  
    var router = require("express").Router();
  
    // Create a new campaign
    router.post("/", campaignsuser.addCampaignUser);
  
    // Retrieve all campaign
    router.get("/", campaignsuser.findAll);
  
    // Retrieve a single campaign with id
    router.get("/:id", campaignsuser.findOne);
  
  
    app.use('/api/campaignsuser', router);
  };