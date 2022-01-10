module.exports = app => {
    const news = require("../controllers/news.controller.js");
    const verifyJwtTokenController = require("../controllers/verifyJwtToken.controller.js");
    const multer  = require('multer')
    const upload = multer({ dest: './public/data/uploads/' })
    var router = require("express").Router();
  
    // Create a new news
    router.post("/", upload.single('image'), [verifyJwtTokenController.verifyToken], news.create);
  
    // Retrieve all news
    router.get("/", news.findAll);
  
    // Retrieve a single news with id
    router.get("/:id", news.findOne);
  
    // Retrieve a single news with id
    router.get("/image/:id", news.findOneImage);

    // Update a news with id
    router.put("/:id", [verifyJwtTokenController.verifyToken], news.update);
  
    // Delete a news with id
    router.delete("/:id", [verifyJwtTokenController.verifyToken], news.delete);
  
    // Delete all news
    router.delete("/", [verifyJwtTokenController.verifyToken], news.deleteAll);
  
    app.use('/api/news', router);
  };