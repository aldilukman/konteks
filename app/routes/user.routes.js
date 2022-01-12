module.exports = app => {
    const users = require("../controllers/user.controller.js");
    const verifyJwtTokenController = require("../controllers/verifyJwtToken.controller.js");
    var router = require("express").Router();
  
    // Create a new User
    // [verifyJwtTokenController.verifyToken]
    router.post("/", users.create);
  
    // Login
    router.post("/signin", users.signin);
     // Forget Password
     router.post("/forget", users.forget);

    // Login
    router.get("/signout", users.signout);

    // Retrieve all User
    router.get("/", users.findAll);
  
    // Retrieve a single User with id
    router.get("/:id",[verifyJwtTokenController.verifyToken], users.findOne);
  
    // Update a User with id
    router.put("/:id",[verifyJwtTokenController.verifyToken], users.update);
  
    // Delete a User with id
    router.delete("/:id",[verifyJwtTokenController.verifyToken], users.delete);
  
    // Delete all User
    router.delete("/", users.deleteAll);
  
    app.use('/api/users', router);
  };