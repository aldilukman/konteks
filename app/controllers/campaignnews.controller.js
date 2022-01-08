const db = require("../models");
const Campaign = db.campaign;
const News = db.news;
const Campaign_News = db.Campaign_News;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.addCampaignNews = (req, res) => {
  // Validate request
  if (!req.body.campaign_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  if (!req.body.news_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  
  //find news
  News.findByPk(req.body.news_id)
  .then((news) => {
    if (!news) {
        res.status(400).send({
            message: "News Not Found"
        });
        return;
    }
    Campaign.findByPk(req.body.campaign_id).then((campaign) => {
      if (!campaign) {
        res.status(400).send({
            message: "Campaign Not Found"
        });
        return;
      }
      const campaign_news = {
        campaign_id: req.body.campaign_id,
        news_id: req.body.news_id
      };
      Campaign_News.create(campaign_news)
      .then(data => {
          res.send(data);
      }).catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial."
        });
      });
    });
  })
  .catch((err) => {
    console.log(">> Error while adding Compaign to News: ", err);
  });
};
// Retrieve all Campaign from the database.
exports.findAll = (req, res) => {
    const code = req.query.code;
    var condition = code ? { code: { [Op.like]: `%${code}%` } } : null;
 
    Campaign.findAll({ 
       include: 
        [
            {
            model: News,
            as: "campaignsnews",
            attributes: ["id", "title","content","hyperlink"],
            through: {
                attributes: [],
                },
            },
        ],
       where: condition 
    })
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
exports.findOne = (req, res) => {
    const id = req.params.id;
    Campaign.findByPk(
        id,{
            include: 
            [
                {
                    model: News,
                    as: "campaignsnews",
                    attributes: ["id", "title","content","hyperlink"],
                    through: {
                        attributes: [],
                    },
                },
            ]
        })
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

