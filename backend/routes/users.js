const router = require('express').Router();
const User = require('../models/user.model');
const ObjectId = require('mongoose').Types.ObjectId;

router.route('/:comp').get((req, res) => {
  User.find({
    "competition": new ObjectId(req.params.comp)
  }).sort('name')
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const name = req.body.name;
  const competition = req.body.competition;

  const newUser = new User({name, competition});

  newUser.save()
    .then(() => res.json(`User ${name} added!`))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;