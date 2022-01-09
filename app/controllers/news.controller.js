const db = require("../models");
const News = db.news;
const Op = db.Sequelize.Op;

// Create and Save a new News
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title || !req.body.content || !req.body.link) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a News
  const news = {
    title: req.body.title,
    content: req.body.content,
    link: req.body.link
  };

  // Save News in the database
  News.create(news)
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

// Retrieve all News from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    News.findAll({ where: condition })
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

// Find a single News with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    News.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find News with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving News with id=" + id
        });
      });
};

// Update a News by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    News.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "News was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update News with id=${id}. Maybe News was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating News with id=" + id
        });
      });
};

// Delete a News with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    News.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "News was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete News with id=${id}. Maybe News was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete News with id=" + id
        });
      });
};

// Delete all News from the database.
exports.deleteAll = (req, res) => {
    News.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} News were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all News."
          });
        });
};
