module.exports = app => {
    const rule = require("../controllers/rule.controller.js");
  
    var router = require("express").Router();
  
    // Create a new rule
    router.post("/", rule.create);
  
    // Retrieve all rule
    router.get("/", rule.findAll);
  
    // Retrieve a single rule with id
    router.get("/:id", rule.findOne);
  
    // Update a rule with id
    router.put("/:id", rule.update);
  
    // Delete a rule with id
    router.delete("/:id", rule.delete);
  
    // Delete all rule
    router.delete("/", rule.deleteAll);
  
    app.use('/api/rule', router);
  };