const router = require('express').Router();
let Score = require('../models/score.model');
const ObjectId = require('mongoose').Types.ObjectId;

router.route('/comp/:comp').get((req, res) => {
  Score.find({
    "competition": new ObjectId(req.params.comp)
  })
    .then(scores => res.json(scores))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const userId = req.body.userId;
  const eventId = req.body.eventId;
  const score = Number(req.body.score);
  const date = Date.parse(req.body.date);
  const competition = req.body.competition; 

  const newScore = new Score({
    userId,
    eventId,
    score,
    date,
    competition
  });

  newScore.save()
  .then(() => res.json('Score added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Score.findById(req.params.id)
    .then(score => res.json(score))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Score.findByIdAndDelete(req.params.id)
    .then(() => res.json('Score deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Score.findById(req.params.id)
    .then(score => {
      score.userId = req.body.userId;
      score.eventId = req.body.eventId;
      score.score = Number(req.body.score);
      score.date = Date.parse(req.body.date);

      score.save()
        .then(() => res.json('Score updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;