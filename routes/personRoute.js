
var express = require('express');

const { ObtenerPersons, newPerson, changePerson, deletePerson, ObtenerOnePerson } = require('../controllers/PersonController');

var router = express.Router();

router.get('/', ObtenerPersons);

router.get('/:id',ObtenerOnePerson);

router.post('/',newPerson);

router.put('/:id',changePerson);

router.delete('/:id',deletePerson);


module.exports = router;