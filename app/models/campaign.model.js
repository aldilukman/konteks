module.exports = (sequelize, Sequelize) => {
    const campaign = sequelize.define("campaign", {
      code: {
        type: Sequelize.STRING
      }
    });
  
    return campaign;
  };