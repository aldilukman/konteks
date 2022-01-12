module.exports = app => {
    const campaigns = require("../controllers/campaign.controller.js");
    const multer  = require('multer')
    const upload = multer({ dest: './public/data/uploads/campaign' })
    var router = require("express").Router();
  
    // Create a new campaign
    router.post("/",upload.single('image'), campaigns.create);
  
    // Retrieve all campaign
    router.get("/", campaigns.findAll);
  
    // Retrieve a single campaign with id
    router.get("/:id", campaigns.findOne);

    // Retrieve a single news with idyy
    router.get("/image/:id", campaigns.findOneImage);
  
    // Update a campaign with id
    router.put("/:id", campaigns.update);
  
    // Delete a campaign with id
    router.delete("/:id", campaigns.delete);
  
    // Delete all campaign
    router.delete("/", campaigns.deleteAll);
  
    app.use('/api/campaigns', router);
  };