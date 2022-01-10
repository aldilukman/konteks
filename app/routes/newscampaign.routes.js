module.exports = app => {
    const newscampaigns = require("../controllers/newscampaign.controller.js");
    const verifyJwtTokenController = require("../controllers/verifyJwtToken.controller.js");
    var router = require("express").Router();
  
    // Create a new campaign news
    router.post("/", [verifyJwtTokenController.verifyToken], newscampaigns.addCampaignNews);
  
    // Retrieve all campaign news
    router.get("/", newscampaigns.findAll);
  
    // Retrieve a single campaign news with id
    router.get("/:id", newscampaigns.findOne);

    app.use('/api/newscampaigns', router);
  };