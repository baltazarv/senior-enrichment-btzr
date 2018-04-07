const router = require('express').Router();
const { Student } = require('../db').models;

router.get('/', (req, res, next) => {
  Student.findAll()
  .then(students => res.send(students))
  .catch(next);
});

router.put('/:id', (req, res, next) => {
  Student.findById(req.params.id)
    .then(student => {
      if (req.body.schoolId == -1) {
        student.schoolId = null;
      } else {
        Object.assign(student, req.body);
      }
      return student.save();
    })
    .then(student => res.send(student))
    .catch(next);
});

module.exports = router;
