module.exports = app => {
    const campaignsusermessage = require("../controllers/campaignusermessage.controller.js");
  
    var router = require("express").Router();
  
    // Create a new meesage
    router.post("/", campaignsusermessage.add);
    // Retrieve all messaage by Campaign id
    router.get("/:id", campaignsusermessage.findMessageByCampaignID);
  
    app.use('/api/campaignsusermessage', router);
  };