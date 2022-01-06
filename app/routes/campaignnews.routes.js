module.exports = app => {
    const campaignsnews = require("../controllers/campaignnews.controller.js");
  
    var router = require("express").Router();
  
    // Create a new campaign
    router.post("/", campaignsnews.addCampaignNews);
  
    // Retrieve all campaign
    router.get("/", campaignsnews.findAll);
  
    // Retrieve a single campaign with id
    router.get("/:id", campaignsnews.findOne);
  
  
    app.use('/api/campaignsnews', router);
  };