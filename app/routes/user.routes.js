module.exports = app => {
    const users = require("../controllers/user.controller.js");
    const verifyJwtTokenController = require("../controllers/verifyJwtToken.controller.js");
    var router = require("express").Router();
  
    // Create a new User
    router.post("/", [verifyJwtTokenController.verifyToken], users.create);
  
    // Login
    router.post("/signin", users.signin);

    // Login
    router.get("/signout", users.signout);

    // Retrieve all User
    router.get("/", [verifyJwtTokenController.verifyToken], users.findAll);
  
    // Retrieve a single User with id
    router.get("/:id",[verifyJwtTokenController.verifyToken], users.findOne);
  
    // Update a User with id
    router.put("/:id",[verifyJwtTokenController.verifyToken], users.update);
  
    // Delete a User with id
    router.delete("/:id",[verifyJwtTokenController.verifyToken], users.delete);
  
    // Delete all User
    router.delete("/",[verifyJwtTokenController.verifyToken], users.deleteAll);
  
    app.use('/api/users', router);
  };