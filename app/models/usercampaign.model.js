module.exports = (sequelize, Sequelize) => {
    const campaign_user = sequelize.define("campaign_user", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      }
    });
  
    return campaign_user;
  };