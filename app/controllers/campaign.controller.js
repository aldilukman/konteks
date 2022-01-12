const db = require("../models");
const Campaign = db.campaign;
const Op = db.Sequelize.Op;
const path = require('path');
const { campaign_user } = require("../models");

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  if (!req.body.desc) {
    res.status(400).send({
      message: "desc can not be empty!"
    });
    return;
  }

  // Create a user
  const campaign = {
    code: req.body.code,
    nameimage: req.file.originalname,
    pathimage : req.file.path,
    desc : req.body.desc
  };

  // Save User in the database
  Campaign.create(campaign)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};

// Find a single News with an id
exports.findOneImage = (req, res) => {
  const id = req.params.id;
  Campaign.findByPk(id)
    .then(data => {
      if (data) {
        //res.sendFile(data.pathimage);
        

        //path.join(__dirname, '../../../')
        res.type('png','jpg');
        res.sendFile(path.join(__dirname, '../../') +"\\"+data.pathimage);
      } else {
        res.status(404).send({
          message: `Cannot find News with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error =" + err.message
      });
    });
};

// Retrieve all Campaign from the database.
exports.findAll = (req, res) => {
     const code = req.query.code;
     var condition = code ? { code: { [Op.like]: `%${code}%` } } : null;
  
    Campaign.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Campaigns."
      });
    });
};

// Find a single Campaign with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Campaign.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Campaign with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Campaign with id=" + id
        });
      });
};

// Update a Campaign by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Campaign.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Campaign was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Campaign with id=${id}. Maybe Campaign was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Campaign with id=" + id
        });
      });
};

// Delete a Campaign with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Campaign.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Campaign was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Campaign with id=${id}. Maybe Campaign was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Campaign with id=" + id
        });
      });
};

// Delete all Campaign from the database.
exports.deleteAll = (req, res) => {
    Campaign.destroy({
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
