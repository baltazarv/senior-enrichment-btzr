const router = require('express').Router();
const { School } = require('../db').models;

router.get('/', (req, res, next) => {
  School.findAll()
    .then(schools => res.send(schools))
    .catch(next);
});

router.post('/', (req, res, next) => {
  School.create(req.body)
    .then(school => res.send(school))
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  School.findById(req.params.id)
    .then(school => {
      Object.assign(school, req.body);
      return school.save();
    })
    .then(school => res.send(school))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  School.findById(req.params.id)
    .then(school => school.destroy())
    .then(() => res.sendStatus(204))
    .catch(next);
});

module.exports = router;
