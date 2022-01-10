module.exports = app => {
    const campaigns = require("../controllers/campaign.controller.js");
    const verifyJwtTokenController = require("../controllers/verifyJwtToken.controller.js");
    var router = require("express").Router();
  
    // Create a new campaign
    router.post("/",[verifyJwtTokenController.verifyToken], campaigns.create);
  
    // Retrieve all campaign
    router.get("/", campaigns.findAll);
  
    // Retrieve a single campaign with id
    router.get("/:id", campaigns.findOne);
  
    // Update a campaign with id
    router.put("/:id",[verifyJwtTokenController.verifyToken], campaigns.update);
  
    // Delete a campaign with id
    router.delete("/:id",[verifyJwtTokenController.verifyToken], campaigns.delete);
  
    // Delete all campaign
    router.delete("/",[verifyJwtTokenController.verifyToken], campaigns.deleteAll);
  
    app.use('/api/campaigns', router);
  };