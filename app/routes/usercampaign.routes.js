module.exports = app => {
    const usercampaigns = require("../controllers/usercampaign.controller.js");
  
    var router = require("express").Router();
  
    // Create a new user campaign
    router.post("/", usercampaigns.addCampaignUser);
  
    // Retrieve all user campaign
    router.get("/", usercampaigns.findAll);
  
    // Retrieve a single user campaign with id
    router.get("/:id", usercampaigns.findOne);

    app.use('/api/usercampaigns', router);
  };