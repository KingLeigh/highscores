const router = require('express').Router();
let Competition = require('../models/competition.model');

router.route('/:id').get((req, res) => {
  Competition.findById(req.params.id)
    .then(competition => res.json(competition))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/lookup/:code').get((req, res) => {
    const pin = req.query.p || null;
    Competition.find({"competitioncode": req.params.code})
      .then(competitions => res.json(processCompetitionForReturn(competitions[0].toObject(), pin)))
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

const processCompetitionForReturn = function(competition, pin) {
  const adminPin = competition.adminPin;
  // Remove the pin so it isn't returned to the client.
  delete competition.adminPin;

  // Permissions:
  // 0 = read
  // 1 = write (coming soon)
  // 2 = edit
  let permission = 0;
  if (adminPin == pin) {
    // Pins match (or both absent)
    permission = 2;
  }

  console.log('XYZ opening ' + competition.competitioncode + ' with permission ' + permission);

  competition.permission = permission;
  return competition;
}

module.exports = router;