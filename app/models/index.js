const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.campaign = require("./campaign.model.js")(sequelize, Sequelize);
db.news = require("./news.model.js")(sequelize, Sequelize);
db.rule = require("./rule.model.js")(sequelize, Sequelize);
db.Campaign_News = sequelize.define('campaign_news');
//db.campaign_user = sequelize.define('campaign_user');
db.campaign_user =  require("./usercampaign.model.js")(sequelize, Sequelize);
db.comment = require("./comment.model.js")(sequelize, Sequelize);

//one to one relation user - rule
db.user.belongsTo(db.rule);

//many to many relation
db.campaign.belongsToMany(db.news, {
  through: "campaign_news",
  as: "campaignsnews",
  foreignKey: "campaign_id",
});

db.news.belongsToMany(db.campaign, {
  through: "campaign_news",
  as: "newscampaign",
  foreignKey: "news_id",
});

//many to many relation campaign - user
db.campaign.belongsToMany(db.user, {
  through: db.campaign_user,
  as: "campaignsuser",
  foreignKey: "campaign_id",
});

db.user.belongsToMany(db.campaign, {
  through: db.campaign_user,
  as: "usercampaign",
  foreignKey: "user_id",
});

db.campaign_user.belongsTo(db.user,{
  foreignKey: "user_id",
  as: "user",
})


//one to many relation campaignuser - comment

db.campaign_user.hasMany(db.comment, { as: "comments" });
db.comment.belongsTo(db.campaign_user, {
  foreignKey: "campaignUserId",
  as: "campaignusercomment",
});


module.exports = db;