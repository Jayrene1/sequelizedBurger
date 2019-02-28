var express = require("express");

var PORT = process.env.PORT || 8080;
var app = express();
var db = require("./models");

// Parse application body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

require("./routes/html-routes")(app);
require("./routes/api-routes")(app);


db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
