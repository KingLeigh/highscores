const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
  User.find().sort('name')
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const usercode = req.body.usercode;
  const name = req.body.name;

  const newUser = new User({usercode, name});

  newUser.save()
    .then(() => res.json(`User ${usercode} added!`))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;