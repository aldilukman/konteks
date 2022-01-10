module.exports = app => {
    const campaignsuser = require("../controllers/campaignuser.controller.js");
    const verifyJwtTokenController = require("../controllers/verifyJwtToken.controller.js");
    var router = require("express").Router();
  
    // Create a new campaign user
    router.post("/",[verifyJwtTokenController.verifyToken], campaignsuser.addCampaignUser);
  
    // Retrieve all campaign user
    router.get("/", campaignsuser.findAll);
  
    // Retrieve a single campaign user with id
    router.get("/:id", campaignsuser.findOne);
  
  
    app.use('/api/campaignsuser', router);
  };