module.exports = (sequelize, Sequelize) => {
    const comment = sequelize.define("comment", {
      message: {
        type: Sequelize.STRING
      }
    });
  
    return comment;
  };