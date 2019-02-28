// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the posts
  app.get("/api/burgers", function(req, res) {
    db.Burger.findAll({}).then(function(dbBurger) {
      res.json(dbBurger);
    });
  });

  // Get route for retrieving a single post
  app.get("/api/burgers/:id", function(req, res) {
    // 2. Add a join here to include the Author who wrote the Post
    db.Burger.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbBurger) {
      console.log(dbBurger);
      res.json(dbBurger);
    });
  });

  // POST route for saving a new post
  app.post("/api/burgers", function(req, res) {
    console.log(req.body);
    db.Burger.create({
      burger_name: req.body.burger_name,
      devoured: false
    }).then(function(dbBurger) {
      res.json(dbBurger);
    });
  });

  // DELETE route for deleting posts
  app.delete("/api/posts/:id", function(req, res) {
    db.Burger.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbBurger) {
      res.json(dbBurger);
    });
  });

  // PUT route for updating posts
  app.put("/api/burgers", function(req, res) {
    console.log("PUT REQUEST BODY: " + req.body.id);
    db.Burger.update(
      {
        devoured: true,
      },
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbBurger) {
      res.json(dbBurger);
    });
  });
};
