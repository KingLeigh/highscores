const router = require('express').Router();
let Competition = require('../models/competition.model');

router.route('/:id').get((req, res) => {
  Competition.findById(req.params.id)
    .then(competition => res.json(competition))
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
  const adminPin = req.body.adminPin > 0 ? req.body.adminPin : null;

  const newCompetition = new Competition({competitioncode, name, adminPin});

  newCompetition.save()
    .then(() => res.json(newCompetition))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;