module.exports = (sequelize, Sequelize) => {
    const news = sequelize.define("news", {
      title: {
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.STRING
      },
      link: {
        type: Sequelize.STRING
      },
      nameimage: {
        type: Sequelize.STRING
      },
      pathimage: {
        type: Sequelize.STRING
      }
    });
  
    return news;
  };