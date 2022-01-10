module.exports = app => {
    const campaignsusermessage = require("../controllers/campaignusermessage.controller.js");
    const verifyJwtTokenController = require("../controllers/verifyJwtToken.controller.js");
    var router = require("express").Router();
  
    // Create a new meesage
    router.post("/",[verifyJwtTokenController.verifyToken], campaignsusermessage.add);
    // Retrieve all messaage by Campaign id
    router.get("/:id",[verifyJwtTokenController.verifyToken], campaignsusermessage.findMessageByCampaignID);
  
    app.use('/api/campaignsusermessage', router);
  };