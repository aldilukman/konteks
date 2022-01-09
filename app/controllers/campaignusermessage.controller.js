const db = require("../models");
const Campaign = db.campaign;
const User = db.user;
const Comment = db.comment
const Campaign_User = db.campaign_user;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.add = (req, res) => {
  // Validate request
  if (!req.body.user_id) {
    res.status(400).send({
      message: "User ID can not be empty!"
    });
    return;
  }
  if (!req.body.campaign_id) {
    res.status(400).send({
      message: "Campaign ID can not be empty!"
    });
    return;
  }
  if (!req.body.message) {
    res.status(400).send({
      message: "Message can not be empty!"
    });
    return;
  }
  
  //find news
  User.findByPk(req.body.user_id)
  .then((user) => {
    if (!user) {
        res.status(400).send({
            message: "User ID Not Found"
        });
        return;
    }
    //find campaign
    Campaign.findByPk(req.body.campaign_id).then((campaign) => {
      if (!campaign) {
        res.status(400).send({
            message: "Campaign ID Not Found"
        });
        return;
      }

      //check jika campaign dan user tersedia
      Campaign_User.findAndCountAll({
        where: {
          campaign_id: {
            [Op.eq]: req.body.campaign_id
          },
          user_id: {
            [Op.eq]: req.body.user_id
          }
        },
        offset: 10,
        limit: 2
      }).then((result) => {
        
        console.log(result);
        if(result.count == 1){
            Campaign_User.findAll({
                where: {
                    campaign_id: {
                      [Op.eq]: req.body.campaign_id
                    },
                    user_id: {
                      [Op.eq]: req.body.user_id
                    }
                  }
            }).then((data) =>{
                //masukan data message kedalam tabel
                console.log(data[0].id);
                if(!data[0].id){
                    res.status(404).send({
                        message: `Data User =${req.body.user_id} tidak terdaftar dalam Data Campaign = ${req.body.campaign_id} .`
                    });
                }else{
                    
                    // Create a comment
                    const comment = {
                        campaignUserId : data[0].id,
                        message: req.body.message
                    };
                    Comment.create(comment)
                    .then(data => {
                        res.send(data);
                        })
                    .catch(err => {
                        res.status(500).send({
                            message:
                                err.message || "Some error occurred while creating the Tutorial."
                        });
                    });
                }
                
            });
        }else{
            res.status(404).send({
                message: `Data User =${req.body.user_id} tidak terdaftar dalam Data Campaign = ${req.body.campaign_id} .`
            });
        }
    });

    });
  })
  .catch((err) => {
    console.log(">> Error while adding Compaign to News: ", err);
  });
};

exports.findMessageByCampaignID = (req, res) => {
    const idCampaign = req.params.id;
    
    Comment.findAll({
      include:[
        {
          model : Campaign_User,
          as : "campaignusercomment",
          include:[
              {
                model: db.user,
                as : "user",
                attributes: ["id", "name"],
              },
          ],
          where: {
            campaign_id: {
              [Op.eq]: idCampaign
            }
          }
        }
      ]
    }).then((data) =>{
        
      res.send(data);
      
    });

    // Campaign_User.findAll({
    //   include: 
    //   [
    //       {
            
    //           model: Comment,
    //           as: "comments",
    //           attributes: ["id", "message","createdAt"],

              
    //       },
    //   ],
    //   where: {
    //       campaign_id: {
    //         [Op.eq]: idCampaign
    //       }
    //   }
    // }).then((data) =>{
        
    //     res.send(data);
        
    // });
};

