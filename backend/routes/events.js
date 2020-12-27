const router = require('express').Router();
let Event = require('../models/event.model');

router.route('/').get((req, res) => {
  Event.find().sort('name')
    .then(events => res.json(events))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const name = req.body.name;
  const competition = req.body.competition;

  const newEvent = new Event({name, competition});

  newEvent.save()
    .then(() => res.json(`Event ${name} added!`))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;