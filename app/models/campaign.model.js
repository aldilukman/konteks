module.exports = (sequelize, Sequelize) => {
    const campaign = sequelize.define("campaign", {
      code: {
        type: Sequelize.STRING
      },
      desc: {
        type: Sequelize.STRING
      },
      nameimage: {
        type: Sequelize.STRING
      },
      pathimage: {
        type: Sequelize.STRING
      }
    });
  
    return campaign;
  };