module.exports = app => {
    const news = require("../controllers/news.controller.js");
  
    var router = require("express").Router();
  
    // Create a new news
    router.post("/", news.create);
  
    // Retrieve all news
    router.get("/", news.findAll);
  
    // Retrieve a single news with id
    router.get("/:id", news.findOne);
  
    // Update a news with id
    router.put("/:id", news.update);
  
    // Delete a news with id
    router.delete("/:id", news.delete);
  
    // Delete all news
    router.delete("/", news.deleteAll);
  
    app.use('/api/news', router);
  };