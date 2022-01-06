module.exports = (sequelize, Sequelize) => {
    const rule = sequelize.define("rule", {
      mode: {
        type: Sequelize.STRING
      }
    });
  
    return rule;
  };