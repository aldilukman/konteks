module.exports = app => {
    const rule = require("../controllers/rule.controller.js");
    const verifyJwtTokenController = require("../controllers/verifyJwtToken.controller.js");
    var router = require("express").Router();
  
    // Create a new rule
    router.post("/",[verifyJwtTokenController.verifyToken], rule.create);
  
    // Retrieve all rule
    router.get("/",[verifyJwtTokenController.verifyToken], rule.findAll);
  
    // Retrieve a single rule with id
    router.get("/:id",[verifyJwtTokenController.verifyToken], rule.findOne);
  
    // Update a rule with id
    router.put("/:id",[verifyJwtTokenController.verifyToken], rule.update);
  
    // Delete a rule with id
    router.delete("/:id",[verifyJwtTokenController.verifyToken], rule.delete);
  
    // Delete all rule
    router.delete("/",[verifyJwtTokenController.verifyToken], rule.deleteAll);
  
    app.use('/api/rule', router);
  };