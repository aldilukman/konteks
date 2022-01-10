module.exports = app => {
    const campaignsnews = require("../controllers/campaignnews.controller.js");
    const verifyJwtTokenController = require("../controllers/verifyJwtToken.controller.js");
    var router = require("express").Router();
  
    // Create a new campaign news
    router.post("/",[verifyJwtTokenController.verifyToken], campaignsnews.addCampaignNews);
  
    // Retrieve all campaign news
    router.get("/", campaignsnews.findAll);
  
    // Retrieve a single campaign news with id
    router.get("/:id", campaignsnews.findOne);
  
  
    app.use('/api/campaignsnews', router);
  };