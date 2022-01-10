module.exports = app => {
    const usercampaigns = require("../controllers/usercampaign.controller.js");
    const verifyJwtTokenController = require("../controllers/verifyJwtToken.controller.js");
    var router = require("express").Router();
  
    // Create a new user campaign
    router.post("/", [verifyJwtTokenController.verifyToken], usercampaigns.addCampaignUser);
  
    // Retrieve all user campaign
    router.get("/", usercampaigns.findAll);
  
    // Retrieve a single user campaign with id
    router.get("/:id", [verifyJwtTokenController.verifyToken], usercampaigns.findOne);

    app.use('/api/usercampaigns', router);
  };