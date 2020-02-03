const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();
const userMod = require("../../models/users-model.js");
const generateToken = require("./generateToken");

// * Works on LH and Heroku
// router.post("/register", (req, res, next) => {
//   let user = req.body;
//   user.password = bcrypt.hashSync(user.password, 6);
//   userMod
//     .addUser(user)
//     .then(user => {
//       // const token = generateToken(user);
//       res.status(201).json({
//         id: user.id,
//         name: user.name,
//         email: user.email
//       });
//     })
//     .catch(err => {
//       console.log(err, "register error");
//       res.status(400).json({ message: "Something went wrong saving new user" });
//       next();
//     });
// });

router.post("/register", async (req, res, next) => {
  try {
    const user = await userMod.addUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    console.log(err, "reg error");
    next(err);
  }
});

// * Works on LH and Heroku
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userMod.findBy({ email }).first();
    if (user && bcrypt.compare(password, user.password)) {
      const token = generateToken(user);
      res
        .status(200)
        .json({ message: `Welcome ${user.name} to Gigpet`, token });
    } else {
      res.status(401).json({ message: "invalid credentials" });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
});
//   userMod
//     .findBy({ email })
//     .first()
//     .then(user => {
//       if (user && bcrypt.compare(password, user.password)) {
//         const token = generateToken(user);
//         res
//           .status(200)
//           .json({ message: `Welcome ${user.name} to Gigpet`, token });
//       } else {
//         res.status(401).json({ message: "invalid credentials" });
//       }
//     })
//     .catch(err => {
//       res.status(500).json(err);
//     });
// });

module.exports = router;
