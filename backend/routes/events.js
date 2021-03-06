const router = require('express').Router();
const Event = require('../models/event.model');
const ObjectId = require('mongoose').Types.ObjectId;

// TODO: Move this to a more specific route. This should be the single-event getter.
router.route('/:comp').get((req, res) => {
  Event.find({
    "competition": new ObjectId(req.params.comp)
  }).sort('name')
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