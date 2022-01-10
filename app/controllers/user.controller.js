const db = require("../models");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = db.user;
const Op = db.Sequelize.Op;
const config = require('../config/configroles');
// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a user
  const user = {
    name: req.body.name,
    password: bcrypt.hashSync(req.body.password, 8)
  };

  // Save User in the database
  User.create(user)
    .then(data => {
      res.status(200).send({
        auth: true,
        id: req.body.id,
        message: "User registered successfully!",
        errors: null,
      });
    })
    .catch(err => {
      res.status(500).send({
        auth: false,
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};

// Create and Save a new Tutorial
exports.signin = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Name can not be empty!"
    });
    return;
  }
  if (!req.body.password) {
    res.status(400).send({
      message: "Password can not be empty!"
    });
    return;
  }
  User.findOne({
    where :{
      name : req.body.name
    }
  }).then(user => {
    if (!user){
      return res.status(404).send({
        auth: false,
        id: req.body.id,
        accessToken: null,
        message: "Error",
        errors: "User Not Found."
      });
    }
    
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({
        auth: false,
        id: req.body.id,
        accessToken: null,
        message: "Error",
        errors: "Invalid Password!"
      });
    }
    var token = 'Bearer ' + jwt.sign({
      id: user.id
    }, config.secret, {
      expiresIn: 86400 //24h expired
    });

    res.status(200).send({
      auth: true,
      id: req.body.id,
      accessToken: token,
      message: "Success",
      errors: null
    });

  }).catch(err => {
    res.status(500).send({
      auth: false,
      id: req.body.id,
      accessToken: null,
      message: "Error",
      errors: err.message
    });
  });
  
};


// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  
    User.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    User.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Tutorial with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Tutorial with id=" + id
        });
      });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    User.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating User with id=" + id
        });
      });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    User.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete User with id=${id}. Maybe User was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Tutorial with id=" + id
        });
      });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    User.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Users were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all users."
          });
        });
};

exports.signout = (req, res) => {
//   req.user.deleteToken(req.token,(err,user)=>{
//     if(err) return res.status(400).send(err);
//     res.sendStatus(200);
// });
return;
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
    User.findAll({ where: { name: "" } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};