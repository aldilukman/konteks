const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to fajar application." });
});


require("./app/routes/user.routes")(app);
require("./app/routes/usercampaign.routes")(app);
require("./app/routes/campaignuser.routes")(app);
require("./app/routes/campaign.routes")(app);
require("./app/routes/campaignnews.routes")(app);
require("./app/routes/news.routes")(app);
require("./app/routes/newscampaign.routes")(app);
require("./app/routes/rule.routes")(app);
require("./app/routes/campaignusermessage.routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});