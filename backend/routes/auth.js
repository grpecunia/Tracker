const express = require("express");
const router = express.Router();
const Users = require("../models/users");
const passport = require("../config/passport");
const cors = require("cors");

router.use(cors());


router.post("/signup", (req, res, next) => {
  Users.register(req.body, req.body.password)
    .then((user) => {
        Users.create({ ...user })
      req.login(user, function (err, result) {
        res.status(201).json(user);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err });
    });
});

router.get('/is-logged-in', (req, res, next) => {  
  res.json(req.user)
})

router.post('/login', passport.authenticate('local'), (req, res, next) => {
  const { user } = req;
  res.status(200).json(user);
});

router.get("/logout", (req, res, next) => {
  req.logout();
  res.status(200).json({ msg: "Logged out" });
});

router.get('/Main', isAuth, (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.status(200).json({ user }))
    .catch((err) => res.status(500).json({ err }));
});

function isAuth(req, res, next) {
  req.isAuthenticated() ? next() : res.status(401).json({ msg: 'Log in first' });
}

module.exports = router;