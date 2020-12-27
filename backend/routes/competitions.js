const router = require('express').Router();
let Competition = require('../models/competition.model');

// TODO: This can be removed, we don't need a GetAll method.
router.route('/').get((req, res) => {
  Competition.find().sort('name')
    .then(competitions => res.json(competitions))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/lookup/:code').get((req, res) => {
    Competition.find({"competitioncode": req.params.code})
      .then(competitions => res.json(competitions[0]))
      .catch(err => res.status(400).json('Error: ' + err));
  });

router.route('/add').post((req, res) => {
  const competitioncode = req.body.competitioncode;
  const name = req.body.name;

  const newCompetition = new Competition({competitioncode, name});

  newCompetition.save()
    .then(() => res.json(newCompetition))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;