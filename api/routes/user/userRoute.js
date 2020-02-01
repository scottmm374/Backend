const express = require("express");
const router = express.Router();
const userMod = require("../../models/users-model.js");

// * LH and Heroku works
router.get("/", (req, res) => {
  userMod
    .find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to retrieve users" });
    });
});

// * LH and Heroku works
router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  userMod
    .findById(id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      console.log(err);
      next();
    });
});

// ! Only works on Localhost, not Heroku

router.get("/:id/children", (req, res, next) => {
  const { id } = req.params;
  userMod
    .findChildrenByUserId(id)
    .then(children => {
      res.status(200).json(children);
    })
    .catch(err => {
      console.log(err);
      next();
    });
});
module.exports = router;
