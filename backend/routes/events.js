const router = require('express').Router();
let Event = require('../models/event.model');

router.route('/').get((req, res) => {
  Event.find().sort('name')
    .then(events => res.json(events))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const eventcode = req.body.eventcode;
  const name = req.body.name;

  const newEvent = new Event({eventcode, name});

  newEvent.save()
    .then(() => res.json(`Event ${eventcode} added!`))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;