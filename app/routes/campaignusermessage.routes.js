module.exports = app => {
    const campaignsusermessage = require("../controllers/campaignusermessage.controller.js");
  
    var router = require("express").Router();
  
    // Create a new campaign
    router.post("/", campaignsusermessage.add);
  

  
    app.use('/api/campaignsusermessage', router);
  };