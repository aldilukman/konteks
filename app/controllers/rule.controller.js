const db = require("../models");
const Rule = db.rule;
const Op = db.Sequelize.Op;

// Create and Save a new Rule
exports.create = (req, res) => {
  // Validate request
  if (!req.body.mode) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Rule
  const rule = {
    mode: req.body.mode
  };

  // Save Rule in the database
  Rule.create(rule)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Rule."
      });
    });
};

// Retrieve all Rule from the database.
exports.findAll = (req, res) => {
    const mode = req.query.mode;
    var condition = mode ? { mode: { [Op.like]: `%${mode}%` } } : null;
  
    Rule.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Rule."
        });
      });
};

// Find a single Rule with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Rule.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Rule with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Rule with id=" + id
        });
      });
};

// Update a Rule by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Rule.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Rule was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Rule with id=${id}. Maybe Rule was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Rule with id=" + id
        });
      });
};

// Delete a Rule with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Rule.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Rule was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Rule with id=${id}. Maybe Rule was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Rule with id=" + id
        });
      });
};

// Delete all Rule from the database.
exports.deleteAll = (req, res) => {
    Rule.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Rule were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Rule."
          });
        });
};
